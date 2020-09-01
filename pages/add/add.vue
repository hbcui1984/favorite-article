<template>
	<view class="content">
		<form @submit="formSubmit">
			<view class="uni-form-item uni-column">
				<view class="title">标题</view>
				<input class="uni-input" name="title" placeholder="请输入文章标题" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">地址</view>
				<input class="uni-input" name="url" placeholder="请输入文章地址" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">Tag</view>
				<input class="uni-input" name="tags" placeholder="便于搜索" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">简评</view>
				<textarea class="uni-textarea" name="comment" />
				</view>
	  
	  <view class="uni-form-item uni-column">
	    <button type="primary" form-type="submit">添加</button>
	  </view>
    </form>
  </view>
</template>

<script>
  import db from '@/js_sdk/uni-clientDB/index.js'
  const dbCmd = db.command
  
  export default {
    data() {
      return {
        title: 'Hello'
      }
    },
    onLoad() {
    },
    methods: {
      formSubmit: function(e) {
        console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
		
       uniCloud.callFunction({
       	name: 'uni-clientDB',
       	data: {
       		command: db.collection('articles').add(e.detail.value)
       	}
       }).then((res) => {
       	if (res.result.code === 0) {
       		uni.showToast({
       			icon: 'none',
       			title: '新增成功'
       		})
       		uni.$emit('reloadTodoList')
       		uni.navigateBack()
       	} else {
       		uni.showModal({
       			content: res.result.msg || '新增失败',
       			showCancel: false
       		})
       	}
       }).catch((e) => {
       	uni.showModal({
       		content: '请求服务失败',
       		showCancel: false
       	})
       }).finally(() => {
       	uni.hideLoading()
       })
        
      },
      formReset: function(e) {
        console.log('清空数据')
      }
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
