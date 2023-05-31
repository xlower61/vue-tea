<template>
  <div class="like">
    <CardSlot>
      <template #title>
        <span>产品推荐</span>
      </template>
    </CardSlot>
    <ul>
      <li v-for="item in guessLikeList" :key="item.id" @click="goDetail(item.id)">
        <h2>
          <img v-lazy="item.imgURL" alt="" @load="loadImage()" />
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
        `detail/${id}`,
        () => {},
        () => {}
      )
    },
    loadImage() {
      this.$emit('loadImg')
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
  padding: 0 0.16rem;
  width: 85%;
  font-size: 0.3733rem;
  font-weight: 400;
  color: #888;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.like ul li > div {
  width: 90%;
  text-align: left;
  padding: 0.16rem;
}
.like ul li span {
  font-size: 0.4267rem;
  color: #ff0000;
}
.like ul li b {
  font-weight: 600;
  font-size: 0.48rem;
  color: #ff0000;
}
.like img {
  width: 4.6933rem;
  height: 4.6933rem;
  border-radius: 0.4rem;
}
</style>
