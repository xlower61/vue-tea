<template>
  <div class="like">
    <CardSlot>
      <template #title>
        <span>猜你喜欢</span>
      </template>
    </CardSlot>
    <ul>
      <li v-for="item in guessLikeList" :key="item.id" @click="goDetail(item.id)">
        <h2>
          <img v-lazy="item.imgURL" alt="" />
        </h2>
        <h3>{{ item.name }}</h3>
        <div>
          <span>￥</span>
          <b>{{ item.price }}</b>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import CardSlot from '@/components/home/CardSlot.vue'
export default {
  name: 'GuessLike',
  components: { CardSlot },
  props: {
    guessLikeList: {
      type: Array
    }
  },
  data() {
    return {}
  },
  methods: {
    goDetail(id) {
      this.$router.push(
        {
          name: 'Detail',
          //显式，地址栏有参数
          query: {
            id
          }
          //隐式
          // params: {
          //   id
          // }
        },
        () => {},
        () => {}
      )
    }
  }
}
</script>

<style scoped>
.like ul {
  display: flex;
  flex-wrap: wrap;
}
.like ul li {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
}
.like h3 {
  padding: 0 6px;
  width: 85%;
  font-size: 14px;
  font-weight: 400;
  color: #888;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.like ul li > div {
  width: 90%;
  text-align: left;
  padding: 6px;
}
.like ul li span {
  font-size: 16px;
  color: #ff0000;
}
.like ul li b {
  font-weight: 600;
  font-size: 18px;
  color: #ff0000;
}
.like img {
  width: 176px;
  height: 176px;
}
</style>
