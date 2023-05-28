<template>
  <div>zhifu</div>
</template>

<script>
import { payResultsAPI } from '@/common/api/OrderAPI'
export default {
  name: 'PayResultView',
  created() {
    this.getResult()
  },
  methods: {
    async getResult() {
      let { data: res } = await payResultsAPI(this.$route.query.out_trade_no, this.$route.query.trade_no)
      console.log(res)
    }
  }
}
</script>

<style></style>
