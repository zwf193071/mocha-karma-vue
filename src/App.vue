<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
	import '../static/css/font.css';

	export default {
		name: 'App',
		mounted () {
			// 通知提示时长设为3秒
			this.$Notice.config({
				duration: 3
			});
			// 全局提示时长设为3秒
			this.$Message.config({
				duration: 2
			});
		},
		watch: {
			$route () {
				this.$Modal.remove();
			}
		}
	};
</script>

<style>
	body {
		/*上下按钮上三角箭头的颜色*/
		scrollbar-arrow-color: rgb(225, 230, 234);
		/*滚动条阴影的颜色*/
		scrollbar-shadow-color: rgb(249, 250, 252);
		/*滚动条背景颜色*/
		scrollbar-track-color: rgb(249, 250, 252);
		/*滚动条的基本颜色*/
		scrollbar-base-color: rgb(225, 230, 234);
		/*以上2项适用与：body、div、textarea、iframe*/
	}

	/* 滚动条整体部分 */
	::-webkit-scrollbar {
		width: 6px;
		margin-right: 2px;
	}
	/* 滚动条两端的按钮 */
	::-webkit-scrollbar-button {
		display: none;
	}
	::-webkit-scrollbar:horizontal {
		height: 6px;
		margin-bottom: 2px;
	}
	/* 外层轨道 */
	::-webkit-scrollbar-track {
		border-radius: 4px;
	}
	/*内层轨道，滚动条中间部分 */
	::-webkit-scrollbar-track-piece {
		background-color: #f2f6fa;
		border-radius: 4px;
	}
	/* 滑块 */
	::-webkit-scrollbar-thumb {
		width: 6px;
		border-radius: 4px;
		background: #e1e6eb;
	}
	/* 边角 */
	::-webkit-scrollbar-corner {
		width: 6px;
		background-color: #e1e6eb;
	}
	/* 鼠标移入滑块 */
	::-webkit-scrollbar-thumb:hover {
		background: #e1e6eb;
	}

	#app {
		font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑',
			Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}
	/*所有表格字体变为14px*/
	.ivu-table {
		font-size: 14px !important;
	}
	/*自动输入框的下拉列表高度*/
	.ivu-auto-complete .ivu-select-dropdown-list {
		max-height: 250px;
		overflow: auto;
	}

	.ivu-page {
		text-align: right;
	}
	.ivu-page-total {
		float: left;
		margin-left: 30px;
		font-size: 14px;
	}
	.ivu-page-item:hover {
		border: 1px solid #2d8cf0;
	}
	.ivu-page-item:hover a {
		color: #2d8cf0;
	}
	.ivu-page-item-active {
		border: 1px solid #2d8cf0;
	}
	.ivu-page-item-active a {
		color: #2d8cf0;
	}

	.ivu-page-next:hover,
	.ivu-page-prev:hover {
		border: 1px solid #2d8cf0;
	}
	.ivu-page-next:hover a i,
	.ivu-page-prev:hover a i {
		color: #2d8cf0;
	}

	.ivu-table:before {
		background-color: #e8eaec;
	}

	.ivu-input-wrapper .ivu-input-suffix i {
		color: rgba(0, 0, 0, 0.25);
	}
	.physic-network .ivu-table-wrapper {
		border: 0;
	}
	.physic-network .ivu-table th {
		height: 54px;
		background-color: #f8fafc;
		border-bottom: 0;
	}
	.physic-network .ivu-table:after {
		height: 0;
	}
	.physic-network .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td {
		background: #fff;
	}
	.physic-network .ivu-table-stripe .ivu-table-body .ivu-table-row:hover td {
		background-color: #ebf7ff;
	}
	.m-header .refresh-btn {
		width: 80px;
		height: 32px;
		color: #1890ff;
		border-color: #1890ff;
	}
	.m-header .ivu-input-wrapper .ivu-input {
		font-size: 14px;
		border: 1px solid #e2e8f0;
	}
	::-webkit-input-placeholder,
	::-moz-placeholder,
	:-ms-input-placeholder {
		color: #c4cdda;
	}

	.ivu-table-wrapper > .ivu-spin-fix {
		border: 0;
	}
</style>
