
type TIcon = "none" | "success" | "loading" | "error" | "fail" | "exception"
/**
 * 提示方法
 * @param {String} title 提示文字
 * @param {String}  icon icon图片
 * @param {Number}  duration 提示时间
 */
export function toast(title: string, icon: TIcon = 'none', duration: number = 1500) {
	if(title) {
		uni.showToast({
		    title,
		    icon,
		    duration
		})
	}
}

/**
 * 设置缓存
 * @param {String} key 键名
 * @param {String} data 值
 */
export function setStorageSync(key: string, data: string) {
    uni.setStorageSync(key, data)
}

/**
 * 获取缓存
 * @param {String} key 键名
 */
export function getStorageSync(key: string) {
    return uni.getStorageSync(key)
}

/**
 * 删除缓存
 * @param {String} key 键名
 */
export function removeStorageSync(key: string) {
    return uni.removeStorageSync(key)
}

/**
 * 清空缓存
 */
export function clearStorageSync() {
    return uni.clearStorageSync()
}


export function useRouter(url: string | number, params = {}, type = 'navigateTo') {
    try {
        if (Object.keys(params).length) url = `${url}?data=${encodeURIComponent(JSON.stringify(params))}`
        if (type === 'navigateBack') {
            uni[type]({ delta: url as number })
        } else {
            uni[type]({ url })
        }
    } catch (error) {
        console.error(error)
    }
}

/**
 * 预览图片
 * @param {Array} urls 图片链接
 */
export function previewImage(urls: Array<any>, itemList = ['发送给朋友', '保存图片', '收藏']) {
    uni.previewImage({
        urls,
        longPressActions: {
            itemList,
            fail: function (error) {
                console.error(error,'===previewImage')
            }
        }
    })
}

/**
 * 保存图片到本地
 * @param {String} filePath 图片临时路径
 **/
export function saveImage(filePath: any) {
    if (!filePath) return false
    uni.saveImageToPhotosAlbum({
        filePath,
        success: (_res) => {
            toast('图片保存成功', 'success')
        },
        fail: (err) => {
            if (err.errMsg === 'saveImageToPhotosAlbum:fail:auth denied' || err.errMsg === 'saveImageToPhotosAlbum:fail auth deny') {
                uni.showModal({
                    title: '提示',
                    content: '需要您授权保存相册',
                    showCancel: false,
                    success: (_modalSuccess) => {
                        uni.openSetting({
                            success(settingdata) {
                                if (settingdata.authSetting['scope.writePhotosAlbum']) {
                                    uni.showModal({
                                        title: '提示',
                                        content: '获取权限成功,再次点击图片即可保存',
                                        showCancel: false
                                    })
                                } else {
                                    uni.showModal({
                                        title: '提示',
                                        content: '获取权限失败，将无法保存到相册哦~',
                                        showCancel: false
                                    })
                                }
                            },
                            fail(failData) {
                                console.log('failData', failData)
                            }
                        })
                    }
                })
            }
        }
    })
}
