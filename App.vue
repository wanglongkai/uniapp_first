<script lang="ts" setup>
	import {onLaunch, onShow, onHide} from '@dcloudio/uni-app'
	
	onLaunch(() => {
		console.log('App Launch')
	})
	
	onShow(() => {
		console.log('App Show')
	})
	onHide(() => {
		console.log('App Hide')
	})
</script>

<style scoped lang="scss">
	/*每个页面公共css */
</style>
