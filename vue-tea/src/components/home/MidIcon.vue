<template>
  <ul class="icon">
    <li v-for="item in iconList" :key="item.id">
      <img :src="item.imagURL" alt="" />
      <span>{{ item.title }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'MidIcon',
  props: {
    iconList: {
      type: Array
    }
  },
  data() {
    return {}
  }
}
</script>

<style scoped>
.icon {
  display: flex;
  justify-content: space-around;
  padding: 0.4rem 0;
}
.icon li {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.icon img {
  width: 1.0133rem;
}
.icon span {
  font-size: 0.4rem;
  padding: 0.16rem 0;
}
</style>
