<template>
  <div class="recommend">
    <CardSlot>
      <template #title>
        <span>爆款推荐</span>
      </template>
    </CardSlot>
    <ul>
      <li v-for="item in recommendList" :key="item.id">
        <div class="recommend-item">
          <img v-lazy="item.imgURL" alt="" />
          <div class="item-detail">
            <h3>{{ item.name }}</h3>
            <p>{{ item.content }}</p>
            <div class="price">
              <span>￥</span>
              <b>{{ item.price }}</b>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import CardSlot from '@/components/home/CardSlot.vue'
export default {
  name: 'RecommendSlot',
  components: { CardSlot },
  props: {
    recommendList: {
      type: Array
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.recommend ul {
  .recommend-item {
    position: relative;
    text-align: center;
    img {
      width: 90%;
      height: 3.84rem;
      border-radius: 0.32rem;
    }
    .item-detail {
      position: absolute;
      top: 20%;
      right: 12%;
      h3 {
        font-size: 0.3733rem;
      }
      p {
        font-size: 0.4267rem;
      }
      .price {
        color: red;
        font-size: 0.5333rem;
      }
    }
  }
}
</style>
