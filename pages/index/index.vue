<template>
	<view class="content">
		<uni-list>
			<uni-list-item v-for="item in list" :key="item._id" :title="item.title" :to="'/pages/detail/detail?url='+encodeURIComponent(item.url) "></uni-list-item>
		</uni-list>
  </view>
</template>

<script>
  import db from '@/js_sdk/uni-clientDB/index.js'
  const dbCmd = db.command
  
  export default {
    data() {
      return {
        list: []
      }
    },
    onLoad() {
		uniCloud.callFunction({
			name: 'uni-clientDB',
			data: {
				command: db.collection('articles').get()
			}
		}).then((res) => {
			console.log(JSON.stringify(res))
			if (res.result.code === 0) {
				this.list = res.result.data
			} else {
				uni.showModal({
					content: res.result.msg || '获取数据失败',
					showCancel: false
				})
			}
		}).catch((e) => {
			console.log(JSON.stringify(e))
			uni.showModal({
				content: '请求服务失败',
				showCancel: false
			})
		}).finally(() => {
			this.loadList = false
			uni.hideLoading()
		})
    },
    methods: {

    }
  }
</script>

<style>
	

	
	
  .content {
    display: flex;
    flex-direction: column;
    padding: 15px;
  }
</style>
