<template>
	<div id="container"></div>
</template>

<script>
export default {
	data() {
		return {
			vr: null,
		};
	},
	mounted() {
		this.init();
	},
	methods: {
		testClick(){
			console.log('------=======>点击触发');
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
					hotSpotDebug: true, // 热点调试
				},
				scenes: {
					// 场景 - 客厅
					living: {
						sceneId: "living",
						type: "equirectangular",
						panorama:
							"https://img.alicdn.com/imgextra/i2/6000000004217/O1CN01djW9bE1h1QprTMP5d_!!6000000004217-0-hotel.jpg",
						hotSpots: [
							{
								pitch: -26,
								yaw: -125,
								text: "进入场景2",
								type: "scene",
								sceneId: "room",
							},
							{
								pitch: -14,
								yaw: -0.49,
								text: "测试点击",
								type: "info",
								clickHandlerFunc: function(e) {
									console.log('---点击粗发', e);
								}
							},
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
#container {
	position: relative;
	.loading {
		position: absolute;
		top: 50%;
		left: 50%;
		font-size: 30px;
	}
}
</style>
