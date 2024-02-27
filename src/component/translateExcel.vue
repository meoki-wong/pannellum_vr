<template>
	<div>
		<input type="file" @change="handleFileUpload" accept=".xlsx, .xls" />
		<button v-if="isProcessed" @click="downloadModifiedExcel">Download Modified Excel</button>
	</div>
</template>

<script>
import XLSX from "xlsx";
import md5 from "js-md5";
export default {
	data() {
		return {
			selectedFile: null,
			workbook: null,
			isProcessed: false,
		};
	},
	async mounted() {},
	methods: {
		isEnglishText(str) {
			// 正则表达式包含大小写字母、空格、常见标点符号
			return /^[a-zA-Z\s,.;:"'?!-]+$/.test(str);
		},
		async tranValue(val) {
			let signStr = await md5(`20240227001974547${val}3257165f8sVv2rnu9gfwGw3wek5`);
			let params = {
				query: val,
				from: "en",
				to: "zh",
				appid: "20240227001974547",
				salt: 3257165,
				sign: signStr,
			};
			let res = await this.$axios.post(`/translation`, params);
			let { data, code } = res.data;
			if (code == 200) {
				return data.trans_result[0].dst;
			} else {
				return val;
			}
		},
		handleFileUpload(event) {
			const file = event.target.files[0];
			if (file) {
				this.selectedFile = file;
				this.processExcelFile();
			}
		},
		processExcelFile() {
			const reader = new FileReader();
			reader.onload = async (e) => {
				const data = new Uint8Array(e.target.result);
				this.workbook = XLSX.read(data, { type: "array" });
				this.$toast.loading({
					message: "加载中...",
					forbidClick: true,
					loadingType: "spinner",
				});
				// Modify the workbook here...
				await this.modifyWorkbook();
				this.$toast.clear();
				// Set flag to indicate the file has been processed
				this.isProcessed = true;
			};
			reader.readAsArrayBuffer(this.selectedFile);
		},

		async modifyWorkbook() {
			const worksheetName = this.workbook.SheetNames[0];
			const worksheet = this.workbook.Sheets[worksheetName];

			// 遍历工作表中的所有单元格
			for (let cell in worksheet) {
				// 确保我们只处理单元格地址，而不是其他工作表属性
				if (cell.match(/^[A-Z]+[0-9]+$/)) {
					// 获取单元格的值
					let cellValue = worksheet[cell].w || worksheet[cell].v;

					// 根据单元格的值和地址进行修改
					// 这里你可以添加自己的逻辑来决定是否修改单元格的值
					// 以及如何修改它
					if (typeof cellValue === "string" && this.isEnglishText(cellValue)) {
						// 假设我们只修改数字字符串，给它们加1
						worksheet[cell].w = await this.tranValue(cellValue);
						worksheet[cell].v = await this.tranValue(cellValue);
					}
					this.workbook.Sheets[worksheetName] = worksheet;
					// 其他修改逻辑可以在这里添加
				}
			}
		},
		downloadModifiedExcel() {
			const worksheetName = this.workbook.SheetNames[0];
			const worksheet = this.workbook.Sheets[worksheetName];
			console.log("--worksheet", worksheet);

			// Create a new workbook with the modified worksheet
			const newWorkbook = XLSX.utils.book_new();
			XLSX.utils.book_append_sheet(newWorkbook, worksheet, worksheetName);

			// Convert the workbook to a Blob
			const excelData = XLSX.write(newWorkbook, { bookType: "xlsx", type: "binary" });
			const blob = new Blob([this.s2ab(excelData)], { type: "application/octet-stream" });

			// Create a download link and simulate click
			const downloadUrl = URL.createObjectURL(blob);
			const downloadLink = document.createElement("a");
			downloadLink.href = downloadUrl;
			downloadLink.download = "modified_data.xlsx";
			document.body.appendChild(downloadLink);
			downloadLink.click();
			document.body.removeChild(downloadLink);
		},
		s2ab(s) {
			const buffer = new ArrayBuffer(s.length);
			const view = new Uint8Array(buffer);
			for (let i = 0; i < s.length; i++) {
				view[i] = s.charCodeAt(i) & 0xff;
			}
			return buffer;
		},
	},
};
</script>
