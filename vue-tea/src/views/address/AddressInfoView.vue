<template>
  <div class="address-info container">
    <CommonHeader>
      <template #title>编辑地址</template>
    </CommonHeader>
    <section>
      <van-address-edit v-if="item.id == 0" :area-list="areaList" show-set-default show-search-result @save="onSave" />
      <van-address-edit v-else :area-list="areaList" :address-info="item" show-set-default :show-delete="true" @save="updateAddress" @delete="onDelete" />
    </section>
    <TabBar></TabBar>
  </div>
</template>

<script>
import CommonHeader from '@/components/common/CommonHeader.vue'
import TabBar from '@/components/common/TabBar.vue'
import { saveAddressAPI, updateAddressAPI, deleteAddressAPI } from '@/common/api/AddressAPI'
export default {
  name: 'AddressInfoView',
  components: { CommonHeader, TabBar },
  data() {
    return {
      item: { id: 0 },
      areaList: {
        province_list: {
          110000: '北京市',
          120000: '天津市'
        },
        city_list: {
          110100: '北京市',
          120100: '天津市'
        },
        county_list: {
          110101: '东城区',
          110102: '西城区'
          // ....
        }
      },
      searchResult: []
    }
  },
  methods: {
    async onSave(addressInfo) {
      addressInfo.isDefault = addressInfo.isDefault ? 1 : 0
      let { data: res } = await saveAddressAPI(addressInfo)
      this.$toast(res.data.msg)

      if (res.data.success) {
        this.$router.back()
      }
    },
    async updateAddress(addressInfo) {
      addressInfo.isDefault = addressInfo.isDefault ? 1 : 0
      let { data: res } = await updateAddressAPI(addressInfo)
      this.$toast(res.data.msg)
      if (res.data.success) {
        this.$router.back()
      }
    },
    async onDelete() {
      let id = this.item.id
      let { data: res } = await deleteAddressAPI(id)
      this.$toast(res.data.msg)
      if (res.data.success) {
        this.$router.back()
      }
    }
  },
  created() {
    this.item = this.$route.params.item
    if (this.$route.params.item) {
      this.item.isDefault = this.item.isDefault == '1' ? true : false
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  background-color: #f5f5f5;

  /deep/ .van-button--danger {
    background-color: #b0352f;
    border: 0.02667rem solid #b0352f;
  }
  /deep/ .van-switch--on {
    background-color: #b0352f;
  }
}
</style>
