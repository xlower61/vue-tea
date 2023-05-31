<template>
  <div class="order container">
    <CommonHeader>
      <template #title>提交订单</template>
    </CommonHeader>
    <section>
      <div class="order-address">
        <h3>收货信息：</h3>
        <div class="address-content" @click="goPath">
          <div v-if="selectedAddress">
            <div>
              <span>{{ selectedAddress.name }}</span>
              <span>{{ selectedAddress.tel }}</span>
            </div>
            <div>
              <span v-if="selectedAddress.isDefault == 1" style="color: #b0352f">[默认]</span>
              <span>{{ selectedAddress.province }}</span>
              <span>{{ selectedAddress.city }}</span>
              <span>{{ selectedAddress.county }}</span>
              <span>{{ selectedAddress.addressDetail }}</span>
            </div>
          </div>
          <div v-else style="color: #b0352f; padding: 0.2667rem 0.5333rem">由于没有默认地址，请选择一个收货地址！</div>
          <van-icon name="arrow" size=".5333rem" color="#999" />
        </div>
      </div>
      <div class="pay-method">
        <div class="title">支付方式：</div>
        <van-radio-group v-model="radioPayment" direction="horizontal" class="radio">
          <van-radio name="wx" checked-color="#b0352f" icon-size=".4267rem">微信支付</van-radio>
          <van-radio name="aliPay" checked-color="#b0352f" icon-size=".4267rem">支付宝支付</van-radio>
        </van-radio-group>
      </div>
      <div class="order-goods">
        <ul>
          <li v-for="item in order.goods" :key="item.id">
            <div>
              <img :src="item.goods_imgURL" alt="" />
            </div>
            <div class="goods-content">
              <h4>{{ item.goods_name }}</h4>
              <div class="goods-price-num">
                <span class="goods-price">￥{{ item.goods_price }}</span>
                <span class="goods-num">x{{ item.goods_num }}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="order-price"></div>
    </section>
    <footer>
      <div class="num-price">
        共<span> {{ order.num }} </span>件，总金额：<span class="price">￥{{ order.price }}</span>
      </div>
      <div class="submit" @click="SUBMIT_ORDER({ address: selectedAddress })">提交订单</div>
    </footer>
  </div>
</template>

<script>
import CommonHeader from '@/components/common/CommonHeader.vue'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'OrderView',
  components: { CommonHeader },
  data() {
    return {
      radioPayment: 'wx',
      selectedAddress: {}
    }
  },
  computed: {
    ...mapState({
      order: (state) => state.order.order
    })
  },
  methods: {
    ...mapActions(['GET_ORDER', 'SUBMIT_ORDER']),
    goPath() {
      this.$router.push({
        path: '/address',
        query: { type: 'select' }
      })
    }
  },
  activated() {
    //地址选择
    this.selectedAddress = sessionStorage.getItem('tea-address') == 'undefined' ? false : JSON.parse(sessionStorage.getItem('tea-address'))
    this.GET_ORDER({ orderStatus: 1 })
  }
}
</script>

<style lang="scss" scoped>
section {
  overflow: auto;
  background-color: #f5f5f5;
  .order-address {
    color: #555;
    h3 {
      font-size: 0.4267rem;
      padding: 0.2667rem;
      font-weight: 400;
    }
    .address-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;
      font-size: 0.3733rem;
      padding: 0.2667rem;

      span {
        padding-right: 6px;
      }
    }
  }
  .pay-method {
    margin-top: 0.3733rem;
    padding: 0.2667rem;
    background-color: #fff;
    color: #555;
    .title {
      font-size: 0.4267rem;
      padding-bottom: 0.2667rem;
      font-weight: 400;
    }
    .radio {
      font-size: 0.32rem;
    }
  }

  .order-goods {
    margin-top: 0.3733rem;

    ul {
      li {
        display: flex;
        align-items: center;
        font-size: 0.3733rem;
        margin-top: 0.2667rem;
        background-color: #fff;
        padding: 0.2667rem;
        img {
          width: 1.9733rem;
          height: 1.9733rem;
          border: 0.0267rem solid #ccc;
        }
        .goods-content {
          flex: 1;
          height: 1.9733rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 0.2667rem;
          h4 {
            font-weight: 600;
          }
          .goods-price-num {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.4267rem;
            .goods-price {
              color: #b0352f;
            }
          }
        }
      }
    }
  }
}

footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 1.38rem;
  border-top: 0.0267rem solid #ccc;
  .num-price {
    padding: 0 0.2667rem;
    font-size: 0.32rem;
    span {
      color: #b0352f;
    }
    .price {
      font-size: 0.4267rem;
    }
  }
  .submit {
    width: 3.2rem;
    line-height: 1.38rem;
    text-align: center;
    background-color: #b0352f;
    color: #fff;
    font-size: 0.4rem;
  }
}
</style>
