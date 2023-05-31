<template>
  <div class="detail" @scroll="appearBar($event)">
    <header>
      <div class="header-return" v-show="isShow">
        <i class="iconfont icon-31fanhui1" @click="goBack()"></i>
        <i class="iconfont icon-home" @click="goHome()"></i>
      </div>
      <div class="header-bar" v-show="!isShow" :style="styleOption">
        <i class="iconfont icon-31fanhui1" @click="goBack()"></i>
        <div>商品详情</div>
        <div>商品评价</div>
        <i class="iconfont icon-home" @click="goHome()"></i>
      </div>
    </header>
    <section>
      <van-swipe :autoplay="3000" class="my-swipe" @change="onChange">
        <van-swipe-item v-for="(item, index) in good_detail.imgURL" :key="index">
          <img :src="good_detail.imgURL" />
        </van-swipe-item>
        <template #indicator>
          <div class="custom-indicator">{{ currentImage + 1 }}/{{ 1 }}</div>
        </template>
      </van-swipe>

      <div class="good-information">
        <div class="good-brief">
          <div class="good-name">
            <h2>{{ good_detail.name }}</h2>
            <span>{{ good_detail.content }}</span>
          </div>
          <div class="good-price">
            <div class="good-price-now">
              <span>￥</span>
              <b>{{ good_detail.price }}</b>
            </div>
            <div class="good-price-origin">
              <span>价格：</span>
              <s>￥139</s>
            </div>
          </div>
        </div>
      </div>

      <div class="discount-information">
        <div class="discount-paper">
          <p class="paper-name">优惠券</p>
          <i class="paper-box">
            <div class="paper-l">
              <div class="paper-price">
                <i>￥</i>
                <span>10</span>
              </div>
              <span>满60减100元</span>
            </div>
            <p class="paper-r">
              <span>立</span>
              <span>即</span>
              <span>领</span>
              <span>取</span>
            </p>
          </i>
          <div class="paper-count">共4张</div>
        </div>
        <div class="serve-information">
          <h3>服务</h3>
          <div>
            <span v-for="item in serveList" :key="item.id">
              <i>√</i>
              <span>{{ item.data }}</span>
            </span>
          </div>
          <em></em>
        </div>
      </div>

      <div class="good-img-introduce">
        <img src="/images/introduce.jpg" alt="" />
        <img src="/images/introduce.jpg" alt="" />
        <img src="/images/introduce.jpg" alt="" />
        <img src="/images/introduce.jpg" alt="" />
        <img src="/images/introduce.jpg" alt="" />
        <img src="/images/introduce.jpg" alt="" />
      </div>
    </section>

    <footer>
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" @click="onClickIcon" />
        <van-goods-action-icon icon="cart-o" text="购物车" badge="5" @click="onClickIcon" />
        <van-goods-action-icon icon="star" text="收藏" color="#ccc" @click="onClickIcon" />
        <van-goods-action-button type="warning" text="加入购物车" @click="onClickCart" />
        <van-goods-action-button type="danger" text="立即购买" @click="onClickButton" />
      </van-goods-action>
    </footer>
  </div>
</template>

<script>
import { getDetailAPI } from '@/common/api/DetailAPI'
import { addCartAPI } from '@/common/api/CartAPI.js'
export default {
  name: 'DetailView',
  data() {
    return {
      isShow: true,
      currentImage: 0,
      styleOption: {},
      good_detail: {},
      lastId: 0,
      firstIn: false,
      serveList: [
        { id: 0, data: '满99包邮' },
        { id: 1, data: '48小时发货' },
        { id: 2, data: '48小时发货' }
      ]
    }
  },

  methods: {
    //透明度根据高度切换
    appearBar(e) {
      let flag = 1
      if (flag) {
        flag = 0
        let timer = setTimeout(() => {
          if (e.target.scrollTop >= 200) {
            let op = ((e.target.scrollTop - 200) / 30) * 0.1
            this.isShow = false
            this.styleOption = {
              opacity: op
            }
          } else {
            this.isShow = true
          }
          flag = 1
          clearTimeout(timer)
        }, 60)
      }
    },
    goBack() {
      this.$router.back()
    },
    goHome() {
      this.$router.push('/')
    },
    onClickIcon() {
      this.$toast('点击图标')
    },
    onClickButton() {
      this.$toast('点击按钮')
    },
    async onClickCart() {
      let id = this.$route.params.id
      let { data: res } = await addCartAPI(id)
      this.$toast(res.data.msg)
    },
    //改变轮播图右下角数字
    onChange(index) {
      this.current = index
    },
    async getData(id) {
      this.good_detail = {}
      let { data: res } = await getDetailAPI(id)
      this.good_detail = res.data.data
      //记录上一次访问的id
      this.lastId = this.$route.params.id
      console.log(res.data)
    }
  },
  created() {
    this.getData(this.$route.params.id)
  },
  //使用keep-alive缓存 提升性能，减少不必要请求
  activated() {
    //判断是否第一次进入
    if (this.firstIn) {
      //不是第一次进入，判断是否查看同一个
      if (this.lastId != this.$route.params.id) {
        this.getData(this.$route.params.id)
      }
    }
  },
  deactivated() {
    this.firstIn = true
  }
}
</script>

<style lang="scss" scoped>
.detail {
  background-color: #f5f5f5;
  height: 100vh;
  overflow-y: scroll;
  header {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    width: 100%;
    height: 1.1733rem;
    .header-return {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 1.1733rem;

      i {
        width: 0.9067rem;
        height: 0.9067rem;
        font-size: 0.6933rem;
        text-align: center;
        line-height: 0.9067rem;
        color: #eee;
        background-color: rgba($color: #000000, $alpha: 0.3);
        border-radius: 50%;
        margin: 0 0.2667rem;
      }
    }
    .header-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 1.1733rem;
      background-color: #fff;
      i {
        font-size: 0.5867rem;
        padding: 0 0.2667rem;
      }
      div {
        font-size: 0.4267rem;
        padding: 0 0.2667rem;
      }
    }
  }

  section {
    .my-swipe {
      .van-swipe-item {
        color: #fff;
        font-size: 0.5333rem;
        text-align: center;
        img {
          height: 10rem;
        }
      }

      .custom-indicator {
        position: absolute;
        right: 0.16rem;
        bottom: 0.2133rem;
        padding: 0.0533rem 0.1333rem;
        font-size: 0.4rem;
        color: #fff;
        background: rgba(0, 0, 0, 0.3);
      }
    }

    .good-information {
      background-color: #fff;
      border-bottom: 0.0267rem solid #e1e1e1;
      .good-name {
        padding: 0.2667rem 0;
        border-bottom: 0.0267rem solid #eee;
        margin: 0 0.32rem;
        h2 {
          font-size: 0.48rem;
          font-weight: 500;
        }
        span {
          padding-top: 0.08rem;
          font-size: 0.3733rem;
          color: #999;
        }
      }

      .good-price {
        padding: 0.4267rem 0.32rem;
        .good-price-now {
          color: red;
          span {
            font-size: 0.4rem;
          }
        }
        .good-price-origin {
          color: #999;
          font-size: 0.3733rem;
          s {
            text-decoration: line-through;
          }
        }
      }
    }

    .discount-information {
      margin: 0.2667rem 0;
      background-color: #fff;
      .discount-paper {
        display: flex;
        justify-content: space-between;
        padding: 0.2933rem 0;
        margin: 0 0.2667rem;
        border-bottom: 0.0267rem solid #eee;

        .paper-name {
          font-size: 0.35rem;
          color: #999;
        }

        .paper-box {
          display: flex;
          color: #ff615e;
          background-color: #fff1f1;
          padding-left: 0.2667rem;
          padding-top: 0.16rem;
          padding-right: 0.2667rem;

          .paper-l {
            padding-right: 0.5867rem;
            .paper-price {
              i {
                font-size: 0.32rem;
              }
              span {
                font-size: 0.75rem;
              }
            }
            span {
              font-size: 0.3rem;
            }
          }

          .paper-r {
            display: flex;
            flex-direction: column;
            font-size: 0.32rem;
            border-left: 1px solid #ddd;
            padding-left: 0.2667rem;
          }
        }

        .paper-count {
          padding-right: 0.2133rem;
          position: relative;
          font-size: 0.35rem;
          color: #000;
          &::before {
            content: '';
            position: absolute;
            top: 0.2667rem;
            right: 0;
            width: 0.2rem;
            height: 0.2rem;
            border-left: 1px solid #999;
            border-top: 1px solid #999;
            -webkit-transform: translate3d(0, -50%, 0) rotateZ(135deg);
          }
        }
      }
      .serve-information {
        padding: 0.2933rem 0.2667rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        h3 {
          font-size: 0.35rem;
          color: #999;
          font-weight: 400;
          padding-right: 0.8rem;
        }
        div {
          padding-right: 2rem;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          span {
            i {
              font-size: 0.3733rem;
            }
            span {
              font-size: 0.3733rem;
            }
            padding-right: 0.2667rem;
          }
        }
        em {
          position: relative;
          padding-left: 0.8rem;
          &::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 0.2rem;
            height: 0.2rem;
            border-left: 1px solid #999;
            border-top: 1px solid #999;
            -webkit-transform: translate3d(0, -50%, 0) rotateZ(135deg);
          }
        }
      }
    }
    .good-img-introduce {
      width: 100%;
      img {
        width: 100%;
      }
    }
  }

  footer {
    width: 100%;
    height: 1.3067rem;
  }
}
</style>
