<template>
  <div class="cart container">
    <header>
      <i class="iconfont icon-31fanhui1 search-return" @click="goBack"></i>
      <span>购物车</span>
      <span @click="isShowNav">{{ isNav ? '完成' : '编辑' }}</span>
    </header>

    <section>
      <div class="cart-title">
        <van-checkbox :value="isSelectedAll" @click="FOLLOW_ALL_CHECK_BTN(isSelectedAll)"></van-checkbox>
        <span>商品</span>
      </div>
      <ul>
        <li v-for="item in cartList" :key="item.id">
          <div>
            <van-checkbox v-model="item.checked"></van-checkbox>
          </div>
          <div class="goods">
            <div class="good-img">
              <img v-lazy="item.goods_imgURL" alt="" />
            </div>
            <div class="goods-content">
              <div class="goods-title">
                <span>{{ item.goods_name }}</span>
                <i class="iconfont icon-lajitong" @click="DELETE_GOODS({ method: 0, id: item.id })"></i>
              </div>
              <div class="goods-price">
                <p>￥{{ item.goods_price }}</p>
              </div>
              <div>
                <van-stepper v-model="item.goods_num" integer min="1" @change="CHANGE_NUM({ num: $event, item })" />
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="nolist" v-if="!cartList.length">暂未添加商品，去逛逛吧！</div>
    </section>

    <footer>
      <div class="radio">
        <van-checkbox :value="isSelectedAll" @click="FOLLOW_ALL_CHECK_BTN(isSelectedAll)"></van-checkbox>
      </div>
      <div class="total" v-show="!isNav">
        <div>
          共有
          <span class="total-active">{{ total.num }}</span>
          件商品
        </div>
        <div>
          <span>总计：</span>
          <span class="total-active">￥{{ total.price.toFixed(2) }} + 0茶币</span>
        </div>
      </div>
      <div class="order" v-show="!isNav" @click="goOrder">去结算</div>
      <div class="order" v-show="isNav" @click="DELETE_GOODS({ method: 1, id: 'all' })">删除</div>
    </footer>
  </div>
</template>

<script>
import { addOrderAPI } from '@/common/api/OrderAPI'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
export default {
  name: 'CartView',
  data() {
    return {
      isNav: false
    }
  },
  computed: {
    ...mapState({
      cartList: (state) => state.cart.cartList,
      addressList: (state) => state.address.addressList
    }),
    ...mapGetters(['isSelectedAll', 'total', 'selectedList'])
  },
  methods: {
    ...mapMutations(['FOLLOW_ALL_CHECK_BTN', 'INIT_ORDER_ID']),
    ...mapActions(['GET_CART_DATA', 'GET_ADDRESS_DATA', 'DELETE_GOODS', 'CHANGE_NUM']),
    //返回上一级
    goBack() {
      this.$router.back()
    },
    //点击编辑或者完成
    isShowNav() {
      this.isNav = !this.isNav
    },
    //去结算页面
    async goOrder() {
      //没选中商品
      if (this.total.num === 0) {
        return this.$toast('请选择至少一件商品')
      }
      let { data: res } = await addOrderAPI(this.selectedList)
      if (res.data.success) {
        this.INIT_ORDER_ID(res.data.order_id)
        this.$router.push({ name: 'Order' })
      }
    }
  },
  watch: {
    addressList() {
      sessionStorage.setItem('tea-address', JSON.stringify(this.addressList.filter((v) => v.isDefault == 1)[0]))
    }
  },

  activated() {
    this.GET_CART_DATA()
    this.GET_ADDRESS_DATA()
  }
}
</script>
<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 1.6rem;
  color: #fff;
  background-color: #b0352f;
  padding: 0 0.4267rem;
  i {
    font-size: 0.64rem;
  }
  span {
    font-size: 0.4267rem;
  }
}

section {
  overflow: auto;
  background-color: #f5f5f5;
  .cart-title {
    display: flex;
    padding: 0.24rem 0.3733rem;
    align-items: center;
    span {
      padding: 0 0.3rem;
      font-size: 0.5333rem;
      font-weight: 500;
    }
  }
  ul {
    display: flex;
    flex-direction: column;
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.08rem 0.5333rem;
      background-color: #fff;
      margin: 0.2133rem 0;
      img {
        width: 1.9733rem;
        height: 1.9733rem;
      }

      .goods {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 0.4rem;

        .goods-content {
          display: flex;
          flex: 1;
          justify-content: space-between;
          flex-direction: column;
          padding-left: 0.4rem;
          .goods-title {
            display: flex;
            justify-content: space-between;
            padding-top: 0.16rem;

            i {
              font-size: 0.5867rem;
            }
            span {
              font-size: 0.32rem;
              padding-right: 0.3733rem;
            }
          }
          .goods-price {
            color: #b0352f;
            font-size: 0.3733rem;
            padding: 0.16rem 0;
          }
          /deep/ .van-stepper {
            text-align: right;
          }
        }
      }
    }
  }
  .nolist {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2.6667rem;
    color: #aaa;
    font-size: 0.48rem;
  }
}

footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 1.38rem;
  border-top: 0.0533rem solid #ccc;
  box-sizing: border-box;
  .radio {
    padding: 0 0.4rem;
  }
  .total {
    flex: 1;
    font-size: 0.32rem;
    .total-active {
      color: #b0352f;
    }
  }
  .order {
    line-height: 1.38rem;
    width: 1.3333rem;
    font-size: 0.4267rem;
    padding: 0 0.5333rem;
    color: #fff;
    background-color: #b0352f;
    text-align: center;
  }
}
</style>
