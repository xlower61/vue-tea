<template>
  <div class="search-home">
    <!-- 头部 -->
    <SearchHeader></SearchHeader>
    <!-- 中间滚动体 -->
    <section>
      <div v-if="searchList.length">
        <div class="search-history">
          <div>
            <i class="iconfont icon-shizhong"></i>
            <span>历史搜索</span>
          </div>
          <div class="search-record-clean" @click="clearSearchList">清空历史搜索记录</div>
          <!-- 使用mintUI添加清空确认窗口 npm install mint-ui -S -->
        </div>
        <ul class="search-record">
          <li v-for="(item, index) in searchList" :key="index" @click="goSearchItem(item)">{{ item }}</li>
        </ul>
      </div>
      <div class="no-history" v-else>暂无搜索记录</div>

      <div>
        <div class="recommend">
          <div>
            <i class="iconfont icon-changjingtuijian"></i>
            <span>推荐商品</span>
          </div>
        </div>
      </div>
    </section>
    <!-- 底部导航 -->
    <TabBar></TabBar>
  </div>
</template>

<script>
import TabBar from '@/components/common/TabBar.vue'
import SearchHeader from '@/components/search/SearchHeader.vue'

export default {
  name: 'SearchHomeView',
  components: { TabBar, SearchHeader },
  data() {
    return {
      searchList: []
    }
  },
  methods: {
    //清空历史搜索记录
    clearSearchList() {
      this.$dialog
        .alert({
          message: '是否清空历史搜索记录',
          showCancelButton: true
        })
        .then(() => {
          this.searchList = []
          localStorage.setItem('searchList', [])
        })
        .catch(() => {})
    },
    //点击历史记录进行搜索
    goSearchItem(item) {
      this.$router.push({
        name: 'search-list',
        query: {
          key: item
        }
      })
    }
  },
  created() {
    this.searchList = JSON.parse(localStorage.getItem('searchList')) || []
  }
}
</script>

<style scoped>
.search-home {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
section {
  flex: 1;
  overflow: hidden;
  background-color: #f5f5f5;
}

.search-history {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10.0012px;
  padding-left: 0.4rem;
  padding-right: 0.32rem;
}
.no-history {
  padding: 0.4rem;
  font-size: 0.48rem;
  text-align: center;
}
.search-history span {
  font-size: 0.48rem;
  font-weight: 400;
}
.search-history i {
  padding-right: 0.1333rem;
  color: red;
  font-size: 0.48rem;
}
.search-record {
  display: flex;
  flex-wrap: wrap;
  padding: 0.32rem 0;
}
.search-record li {
  border: 0.0267rem solid #ccc;
  font-size: 0.4267rem;
  padding: 0.08rem 0.16rem;
  margin: 0.2667rem;
  line-height: 0.4267rem;
}
.search-record-clean {
  text-align: center;
  font-size: 0.3733rem;
  color: #888;
}
.recommend {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.2667rem;
  padding-left: 0.4rem;
  padding-right: 0.32rem;
}
.recommend span {
  font-size: 0.48rem;
  font-weight: 400;
}
.recommend i {
  padding-right: 0.1333rem;
  color: red;
  font-size: 0.48rem;
}
</style>
