<template>
  <div class="title">
    <slot name="title">
      <span>火爆推荐</span>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'CardSlot'
}
</script>

<style scoped>
.title {
  text-align: center;
  font-size: 0.5333rem;
  padding: 0.2667rem 0;
}
.title span {
  position: relative;
}
.title span::before {
  content: '';
  position: absolute;
  top: 50%;
  margin-top: -0.1067rem;
  left: -0.5rem;
  display: block;
  width: 0.2133rem;
  height: 0.2133rem;
  border-radius: 50%;
  background-color: #d4c0a7;
}
.title span::after {
  content: '';
  position: absolute;
  top: 50%;
  margin-top: -0.1067rem;
  right: -0.5rem;
  display: block;
  width: 0.2133rem;
  height: 0.2133rem;
  border-radius: 50%;
  background-color: #d4c0a7;
}
</style>
