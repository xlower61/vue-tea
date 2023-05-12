<template>
  <div class="ad">
    <ul>
      <li v-for="item in adSList" :key="item.id">
        <img v-lazy="item.imgURL" alt="" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AdS',
  props: {
    adSList: {
      type: Array
    }
  }
}
</script>

<style scoped>
.ad {
  width: 100%;
}
.ad img {
  width: 100%;
  height: 112px;
}
</style>
