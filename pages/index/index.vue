<template>
	<view class="bg-content">
		<image class="logo" src="/static/logo.png"></image>
		
		<view class="login-form">
			<view class="title">医疗机构登录</view>
			<uni-forms ref="loginForm" :modelValue="loginFormData" :rules="rules">
				<uni-forms-item label="用户名" required name="userName">
					<uni-easyinput v-model="loginFormData.userName" placeholder="请输入用户名" />
				</uni-forms-item>
				<uni-forms-item label="密码" required name="password">
					<uni-easyinput v-model="loginFormData.password" placeholder="请输入密码" />
				</uni-forms-item>
				<button type="primary" @click="submit">登录</button>
			</uni-forms>
		</view>
	</view>
</template>

<script lang='ts' setup>
import { ref } from 'vue';
type TFormData = {
	userName: string
	password: string
}
const loginForm = ref();
const loginFormData = ref<TFormData>({
	userName: '',
	password: ''
})
const rules = {
	userName: {
		rules: [{
			required: true,
			errorMessage: '用户名不能为空'
		}]
	},
	password: {
		rules: [{
			required: true,
			errorMessage: '密码不能为空'
		}]
	}
}
const submit = () => {
	loginForm.value.validate().then((res:TFormData) => {
		console.log(res, 40)
	})
}
</script>

<style scoped lang="scss">
	.bg-content{
		position: relative;
		background: url(https://qingnang.sciai.com.cn/assets/login-bg-3M5Ylhcp.jpg);
		background-size: cover;
		width: 100vw;
		height: 100vh;
		.logo{
			position: absolute;
			height: 80rpx;
			width: 200rpx;
			top: 30rpx;
			left: 30rpx;
		}
		:deep(.uni-forms-item__label){
			width: 0 !important;
			padding: 0 !important;
			font-size: 0;
		}
		.login-form{
			position: absolute;
			background-color: #fff;
			padding: 35rpx;
			border-radius: 10rpx;
			width: 70%;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -70%);
			.title{
				text-align: center;
				font-weight: bold;
				margin-bottom: 25rpx;
			}
		}
	}
</style>
