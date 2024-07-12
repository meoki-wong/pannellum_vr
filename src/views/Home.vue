<template>
	<div class="home-container">
		<div id="container"></div>
		<van-action-sheet v-model="showModal" title="菜单">
			<div class="modal-content">
				<div class="goods-item" v-for="(item, index) in goodsList" :key="index">
					<img class="goods-image" :src="item.img" />
					<div class="right-info-box">
						<div>
							<div class="title">
								{{ item.detail }}
							</div>
							<div class="time">
								{{ item.serviceTime }}
							</div>
						</div>
						<div class="price-box">
							<div class="price">
								<span class="num"><span class="logo">¥</span>{{ item.price }}</span
								><span class="word">起</span>
							</div>
							<div class="bussiness-btn" @click="goDetail(item)">{{ '去下单' }}</div>
						</div>
					</div>
				</div>
			</div>
		</van-action-sheet>
	</div>
</template>

<script>
export default {
	data() {
		return {
			vr: null,
			showModal: false,
			goodsList: [],
			titleArray: [
				{
					title: "标题1",
				},
				{
					title: "标题2",
				},
				{
					title: "标题3",
				},
				{
					title: "标题4",
				},
			],
		};
	},
	mounted() {
		this.init();
		this.getProductData();
		document.addEventListener("UniAppJSBridgeReady", () => {
			window.uni.getEnv((res) => {
				console.log("----res", JSON.stringify(res));
			});
		});
	},
	methods: {
		showToast() {
			this.showModal = true;
		},
		goDetail(item){
			window.uni.navigateTo({
				url: '/pages/activeDetail/activeDetail?id='+item.productId
			})
		},
		async getProductData() {
			let res = await this.$axios.get('/product/getByCategory', {type: 0})
			// let res = await this.$axios.post("/translation");
			// let { data } = res.data;
			if (res.code == 200) {
				this.goodsList = res.data || [];
			} else {
				this.$toast("获取商品列表失败");
			}
			console.log(res);
		},
		domForDialog() {
			return `
				<ul>
					${this.titleArray
						.map((item) => {
							return `<li class="dialog-item">${item.title}</li>`;
						})
						.join("")}
				</ul>	
			`;
		},

		init() {
			var width = window.innerWidth;
			var height = window.innerHeight;
			var container = document.getElementById("container");
			container.style.width = `${width}px`;
			container.style.height = `${height}px`;
			// let _this = this
			this.vr = window.pannellum.viewer("container", {
				default: {
					firstScene: "living", // 设置首次显示场景
					// sceneFadeDuration: 2000, // 场景切换过渡时间
					autoLoad: true, // 自动加载
					// hotSpotDebug: true, // 热点调试
				},
				scenes: {
					// 场景 - 客厅
					living: {
						sceneId: "living",
						type: "equirectangular",
						panorama: require("../../public/vrs2.jpeg"),
						hotSpots: [
							// {
							// 	pitch: -26,
							// 	yaw: -125,
							// 	text: "进入场景2",
							// 	type: "scene",
							// 	sceneId: "room",
							// },
							{
								pitch: 1.12,
								yaw: -137.6,
								text: "进店",
								type: "scene",
								sceneId: "room",
							},
							// {
							// 	pitch: -14,
							// 	yaw: -10,
							// 	// text: "测试点击",
							// 	type: "info",
							// 	clickHandlerFunc: this.showToast,
							// },
						],
					},

					// 场景 - 房间
					room: {
						sceneId: "room",
						type: "cubemap",
						preview:
							"https://img.alicdn.com/imgextra/i1/O1CN01dVOIEe1IhEcaIPw2z_!!6000000000924-0-tps-100-100.jpg",
						cubeMap: [
							// 图片方位图顺序必须一致
							"https://gw.alicdn.com/imgextra/i3/O1CN01550SRA1JcwWgs0sIj_!!6000000001050-0-tps-1500-1500.jpg",
							"https://img.alicdn.com/imgextra/i4/O1CN01e796bV1P2CRfCQkrA_!!6000000001782-0-tps-1500-1500.jpg",
							"https://img.alicdn.com/imgextra/i4/O1CN01GcW84X29SHK4oJlWc_!!6000000008066-0-tps-1500-1500.jpg",
							"https://img.alicdn.com/imgextra/i2/O1CN01ZHLck11GX2ZgBHA4o_!!6000000000631-0-tps-1500-1500.jpg",
							"https://img.alicdn.com/imgextra/i2/O1CN019c9xKu1ig1aC7pWPk_!!6000000004441-0-tps-1500-1500.jpg",
							"https://img.alicdn.com/imgextra/i4/O1CN01XfaKOu1kzNYODz7HD_!!6000000004754-0-tps-1500-1500.jpg",
						],
						hotSpots: [
							{
								pitch: 0,
								yaw: -10,
								text: "进入场景1",
								type: "scene",
								sceneId: "living",
							},
							{
								pitch: -14,
								yaw: -220,
								// text: "测试点击",
								type: "info",
								clickHandlerFunc: this.showToast,
							},
						],
					},
				},
			});
			this.vr.on("load", function () {
				console.log("-------->>>>1.");
			});
			this.vr.on("scenechange", function (e) {
				console.log("-------->>>>2.", e);
			});
		},
	},
};
</script>

<style lang="less" scoped>
@import "./home.less";
</style>
