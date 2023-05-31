<template>
  <div class="ad">
    <ul>
      <li v-for="item in adSList" :key="item.id">
        <CardSlot v-if="item.title">
          <template #title>
            <span>{{ item.title }}</span>
          </template>
        </CardSlot>
        <img :src="item.imgURL" alt="" @load="loadImage()" :class="{ bd: item.bd }" />
      </li>
    </ul>
  </div>
</template>

<script>
import CardSlot from '@/components/home/CardSlot.vue'
export default {
  name: 'AdS',
  props: {
    adSList: {
      type: Array
    }
  },
  components: { CardSlot },
  methods: {
    loadImage() {
      this.$emit('loadImg')
    }
  }
}
</script>

<style lang="scss" scoped>
.ad {
  width: 100%;
  ul {
    li {
      font-size: 0;
      img {
        width: 100%;
        display: block;

        box-sizing: border-box;
      }
    }
  }
}
.bd {
  border: 1px solid #ddd;
  border-bottom: 0;
}
</style>
