<template>
  <div class="swiper">
    <!-- npm uninstall swiper@5.2.0 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#b0352f">
      <van-swipe-item v-for="item in swiperList" :key="item.id">
        <img v-lazy="item.imgURL" alt="" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: 'SwiperMain',

  props: {
    swiperList: {
      type: Array
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.swiper {
  margin-top: 0.16rem;
}
.my-swipe .van-swipe-item {
  color: #ccc;
  font-size: 0.7467rem;
  height: 4.32rem;
  text-align: center;
  background-color: #fff;
  img {
    width: 100%;
  }
}
</style>
