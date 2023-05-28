<template>
  <div>
    <keep-alive exclude="AddressInfoView">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'AddressView'
}
</script>

<style></style>
