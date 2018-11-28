<template>
	<div>
		<VideoList v-if="columnType === 'onlineCourse'" />
		<VisionList v-if="columnType === 'onlineVision'" />
		<Readings v-if="columnType === 'reading'" />
		<!--分销分享组件-->
		<DistributorShare v-model="show"></DistributorShare>
	</div>
</template>

<script>
	import VideoList from './onlineCourse/VideoList'
	import VisionList from './onlineVision/VisionList'
	import Readings from './readings/Readings'
	import DistributorShare from '../components/share/DistributorShare'
	export default {
		name: 'ColumnList',
		data() {
			return {
				show: false,
				columnType: this.$route.params.columnType,
			}
		},
		components: {
			VideoList,
			VisionList,
			Readings,
			DistributorShare
		}
	}
</script>

<style lang="scss" scoped>

</style>
