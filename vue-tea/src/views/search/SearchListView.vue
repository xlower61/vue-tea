<template>
  <div class="search-list container">
    <div class="big-header">
      <SearchHeader></SearchHeader>
      <ul>
        <li v-for="(item, index) in chooseList.data" :key="index" @click="changeTab(index)">
          <!-- 样式绑定 -->
          <div :class="{ active: chooseList.currentIndex === index }">{{ item.key }}</div>
          <div class="jiantou" v-if="item.has === 1">
            <i class="iconfont icon-xiangshangjiantou" :class="{ active: item.status === 1 }"></i>
            <i class="iconfont icon-xiangxiajiantou" :class="{ active: item.status === 2 }"></i>
          </div>
        </li>
      </ul>
    </div>
    <section>
      <ul v-if="goodsList.length">
        <li v-for="item in goodsList" :key="item.id" @click="goDetail(item.id)">
          <img v-lazy="item.imgURL" alt="" />
          <h3>{{ item.name }}</h3>
          <div class="price">
            <div>
              <span>￥</span>
              <b>{{ item.price }}</b>
            </div>
            <div>立即购买</div>
          </div>
        </li>
      </ul>

      <div class="noGoods" v-else>没有商品捏...</div>
    </section>

    <TabBar></TabBar>
  </div>
</template>

<script>
import SearchHeader from '@/components/search/SearchHeader.vue'
import TabBar from '@/components/common/TabBar.vue'
import { getSearchAPI } from '@/common/api/SearchAPI.js'
export default {
  name: 'SearchListView',
  components: { SearchHeader, TabBar },
  data() {
    return {
      goodsList: [],
      searchVal: '',
      chooseList: {
        currentIndex: 0,
        //status:0 都不亮  status:1 上箭头亮 status:2 下箭头亮
        data: [
          { name: 'common', key: '综合', has: 0 },
          { name: 'price', key: '价格', has: 1, status: 0 },
          { name: 'num', key: '销量', has: 1, status: 0 },
          { name: 'common', key: '筛选', has: 0 }
        ]
      }
    }
  },
  created() {
    this.getSearchData()
  },
  watch: {
    //监听路由query.key变化
    $route() {
      if (this.$route.query.key) this.getSearchData()
    }
  },
  computed: {
    orderBy() {
      //筛选还没实现，直接跟综合一样，数据库内容为空
      let obj = this.chooseList.data[this.chooseList.currentIndex]
      let means = obj.status === 2 ? 'desc' : 'asc'
      return { [obj.name]: means }
    }
  },
  methods: {
    //请求得到搜索数据
    async getSearchData() {
      const { data: res } = await getSearchAPI(this.$route.query.key, this.orderBy)
      this.goodsList = res.data.data
    },
    //改变标签变红
    changeTab(index) {
      this.chooseList.currentIndex = index
      this.chooseList.data.forEach((v, i) => {
        if (i != index) {
          v.status = 0
        }
      })
      //改变箭头颜色
      this.chooseList.data[index].status = this.chooseList.data[index].status === 2 ? 1 : 2
      this.getSearchData()
    },
    //进入商品详情页
    goDetail(id) {
      this.$router.push({
        name: 'Detail',
        params: {
          id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.big-header {
  display: flex;
  flex-direction: column;
  overflow: hidden;

  ul {
    display: flex;
    justify-content: space-around;
    padding: 0.2133rem 0;
    font-size: 0.4267rem;

    li {
      display: flex;
      align-items: center;
      font-size: 0.3733rem;
      font-weight: 600;

      .jiantou {
        display: flex;
        flex-direction: column;
        padding-left: 0.2133rem;

        i {
          font-size: 0.0267rem;
          padding: 0.0533rem 0;
          margin: -0.0533rem 0;
        }
      }
    }
  }
}

.active {
  color: red;
}

section {
  background-color: #f5f5f5;

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 50%;
      padding: 0.2667rem;
      box-sizing: border-box;

      img {
        width: 4.5333rem;
        height: 4.5333rem;
      }

      h3 {
        width: 100%;
        font-size: 0.3733rem;
        color: #222;
        font-weight: 400;
        padding: 0.16rem 0.2667rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .price {
        display: flex;
        justify-content: space-between;
        width: 100%;
        font-size: 0.3733rem;

        div:first-child {
          padding: 0.08rem 0.16rem;
          color: #b0352f;

          span {
            font-size: 0.32rem;
          }

          b {
            font-size: 0.4267rem;
          }
        }
        div:last-child {
          padding: 0.08rem 0.16rem;
          color: #fff;
          background-color: #b0352f;
          border-radius: 0.16rem;
        }
      }
    }
  }

  .noGoods {
    width: 50%;
    margin: 2.6667rem auto;
    text-align: center;
    color: #aaa;
  }
}
</style>
