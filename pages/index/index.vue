<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{BASE_URL}}</text>
		</view>
		<button @click="handleRequest">发送请求</button>
	</view>
</template>

<script lang='ts' setup>
	import {ref } from	'vue'
	import {BASE_URL} from '@/config'
	import  request  from '@/http/request';
	const formData = ref({
		userName: '182898112',
		password: 'Wlk45345353'
	})
	const handleRequest = () => {
		request.POST('/login/login', formData.value).then((res: any) => {
			console.log(res, 21)
		})
	}
</script>

<style scoped lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: red;
	}
</style>
