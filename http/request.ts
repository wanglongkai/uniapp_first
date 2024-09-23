
import { toast, clearStorageSync, getStorageSync, useRouter } from '@/utils/utils'
import { BASE_URL } from '@/config/index'
import RequestManager from '@/http/requestHelper.ts'

type TMethod = "GET" | "OPTIONS" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT"


const manager = new RequestManager()

const baseRequest = async (url: string, method: TMethod, data = {}, loading = true) => {
	let requestId = manager.generateId(method, url, data)
	if (!requestId) {
		console.log('重复请求')
		return false
	}
	const header: any = {}
	header.token = getStorageSync('token') || '';

	loading && uni.showLoading({ title: 'loading' });

	return new Promise((resolve, reject) => {
			uni.request({
				url: BASE_URL + url,
				method: method || 'GET',
				header: header,
				timeout: 10000,
				data: data || {},
				complete: () => {
					manager.deleteById(requestId as string)
				},
				success: (successData) => {
					const res: any = successData.data
					if (successData.statusCode == 200) {
						if (res.resultCode == 'PA-G998') {
							clearStorageSync()
							useRouter('/pages/login/index', 'reLaunch')
						} else {
							resolve(res.data)
						}
					} else {
						toast('数据错误，请检查响应结构')
						reject(res)
					}
				},
				fail: (msg) => {
					toast('网络连接失败，请稍后重试')
					reject(msg)
				}
			})
		}).finally(() => {
		uni.hideLoading()
	});
}


const request: Record<TMethod, Function> = {} as Record<TMethod, Function>;

(["GET" , "OPTIONS" , "HEAD" , "POST" , "PUT" , "DELETE" , "TRACE" , "CONNECT"] as const).forEach((method:TMethod) => {
	request[method] = (api: string, data: object, loading: boolean) => {
		return baseRequest(api, method, data, loading)
	}
})



export default request