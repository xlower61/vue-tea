<template>
  <div class="search-list">
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
      <ul v-if="goodsListLength">
        <li v-for="(item, index) in goodsList" :key="index" @click="goDetail(item.id)">
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
import { getSearchAPI } from '@/common/api/getSearchAPI.js'
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
      },
      goodsListLength: 0
    }
  },
  created() {
    this.getSearchData()
  },
  watch: {
    //监听路由query.key变化
    $route() {
      this.getSearchData()
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
      if (res.data) {
        this.goodsListLength = res.data.length
      }
      this.goodsList = res.data
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
        query: {
          id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.search-list {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  ul {
    display: flex;
    justify-content: space-around;
    padding: 8px 0;
    font-size: 16px;

    li {
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: 600;

      .jiantou {
        display: flex;
        flex-direction: column;
        padding-left: 8px;

        i {
          font-size: 1px;
          padding: 2px 0;
          margin: -2px 0;
        }
      }
    }
  }
}

.active {
  color: red;
}

section {
  flex: 1;
  overflow: hidden;
  background-color: #f5f5f5;

  ul {
    display: flex;
    flex-wrap: wrap;

    li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 50%;
      padding: 10px;
      box-sizing: border-box;

      img {
        width: 170px;
        height: 170px;
      }

      h3 {
        width: 100%;
        font-size: 14px;
        color: #222;
        font-weight: 400;
        padding: 6px 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .price {
        display: flex;
        justify-content: space-between;
        width: 100%;
        font-size: 14px;

        div:first-child {
          padding: 3px 6px;
          color: #b0352f;

          span {
            font-size: 12px;
          }

          b {
            font-size: 16px;
          }
        }
        div:last-child {
          padding: 3px 6px;
          color: #fff;
          background-color: #b0352f;
          border-radius: 6px;
        }
      }
    }
  }

  .noGoods {
    width: 50%;
    margin: 100px auto;
    text-align: center;
    border: 1px solid #b0352f;
    border-radius: 16px;
    color: #b0352f;
  }
}
</style>
