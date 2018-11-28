<template>
	<div class="qhht-flex list">
		<BookCell :book="book" v-for="book in data" :key="book.id" :class="{emptyItem:!book.id}" />
	</div>
</template>

<script>
	import BookCell from '../components/homeComponents/BookCell.vue'
	export default {
		name: 'BookList',
		components: {
			BookCell
		},
		props: ['data']
	}
</script>

<style lang="less" scoped>
	.list {
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.emptyItem {
		visibility: hidden;
	}
</style>
