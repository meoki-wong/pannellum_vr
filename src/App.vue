<template>
  <div class="container">
	<div v-for="(item, index) in componentsList" :key="index" @click="changeTempl(item)">
		{{item.name}}
	</div>
	<component :is='templ'></component>
  </div>
</template>

<script>
export default {
	data(){
		return {
			componentsList: [
				{
					name: 'excel中英文转换',
					templ: () => import('./component/translateExcel.vue')
				}
			],
			templ: () => import('./component/translateExcel.vue')
		}
	},
	methods: {
		changeTempl(item){
			if(this.templ == item.templ) {
				console.log('一致');
				return
			}
			this.templ = item.templ
		}
	}
}
</script>

<style>

</style>