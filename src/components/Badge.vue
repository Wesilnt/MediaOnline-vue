<template>
	<span class="qhht-badge" :class="`qhht-badge-${status}`">
		<slot />{{badge}}</span>
</template>
<script>
	const puzzleTypes = [1200, 1202, 1203, 1204]
	export default {
		name: 'Badge',
		props: {
			status: {
				default: 1202,
			}
		},
		computed: {
			badge: function() {
				let text = '中'
				if (this.status === 1203 || this.status === 1205) {
					text = '成功'
				} else if (this.status === 1204) {
					text = '失败'
				}
				return text
			}
		}
	}
</script>
<style scoped lang="less">
	.qhht-badge {
		border-radius: 8px;
		padding: 2px 8px;
		color: #fff;

		&-1203,
		&-1205 {
			color: #ffa32f;
			background: transparent;
		}

		&-1204 {
			background: #ccc;
		}

		&-1202 {
			background: #ffa32f;
		}
	}
</style>
