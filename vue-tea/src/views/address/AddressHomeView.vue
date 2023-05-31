<template>
  <div class="address-home container">
    <CommonHeader>
      <template #title> 我的地址 </template>
    </CommonHeader>
    <section>
      <ul v-if="addressList.length">
        <li v-for="item in addressList" :key="item.id" @click="goAddressInfo(item)">
          <div>
            <div>
              <span>{{ item.name }}</span>
              <span>{{ item.tel }}</span>
            </div>
            <div class="address-detail">
              <span class="active" v-if="item.isDefault === 1">[默认]</span>
              <span>{{ item.province }}</span>
              <span>{{ item.city }}</span>
              <span>{{ item.county }}</span>
              <span>{{ item.addressDetail }}</span>
            </div>
          </div>
          <div>
            <van-icon name="arrow" />
          </div>
        </li>
      </ul>
      <div class="no-address" v-else>暂无地址信息</div>
      <div class="add-address" @click="goAddressInfo({ id: 0 })">添加地址</div>
    </section>
    <TabBar></TabBar>
  </div>
</template>

<script>
import CommonHeader from '@/components/common/CommonHeader.vue'
import TabBar from '@/components/common/TabBar.vue'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'AddressHomeView',
  components: { CommonHeader, TabBar },
  data() {
    return {
      addressSelected: false
    }
  },
  computed: {
    ...mapState({
      addressList: (state) => state.address.addressList
    })
  },
  methods: {
    ...mapActions(['GET_ADDRESS_DATA']),
    goAddressInfo(item) {
      console.log(item)
      //如果使在订单点击选择，跳转回去订单页
      if (this.addressSelected && item.id !== 0) {
        this.$store.commit('GET_SELECT_ADDRESS', item.id)
        this.addressSelected = false
        this.$router.back()
      } else {
        this.$router.push({
          name: 'address-info',
          params: {
            item
          }
        })
      }
    }
  },
  activated() {
    this.GET_ADDRESS_DATA()
    //订单页面进来的
    if (this.$route.query.type == 'select') {
      this.addressSelected = true
    }
  }
  //不会执行
  // destroyed() {
  //   console.log('destroy')
  // }
}
</script>

<style lang="scss" scoped>
section {
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  ul {
    width: 100%;
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.3733rem 0.4rem;
      background-color: #fff;
      margin: 0.16rem 0;
      span {
        font-size: 0.3467rem;
        padding-right: 0.4rem;
      }
      .address-detail {
        span {
          padding-right: 0.16rem;
        }
      }
      .active {
        color: #b0352f;
      }
    }
  }
  .add-address {
    margin: 0.8rem 0;
    width: 3.2rem;
    line-height: 1.0667rem;
    font-size: 0.48rem;
    text-align: center;
    background-color: #b0352f;
    color: #fff;
    border-radius: 0.16rem;
  }
}
.no-address {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2.6667rem;
  color: #aaa;
}
</style>
