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
  name: 'SearchView',
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
          showConfirmButton: true,
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
  padding-top: 10px;
  padding-left: 15px;
  padding-right: 12px;
}
.no-history {
  padding: 15px;
  font-size: 18px;
  text-align: center;
}
.search-history span {
  font-size: 18px;
  font-weight: 400;
}
.search-history i {
  padding-right: 5px;
  color: red;
  font-size: 18px;
}
.search-record {
  display: flex;
  flex-wrap: wrap;
  padding: 12px 0;
}
.search-record li {
  border: 1px solid #ccc;
  font-size: 16px;
  padding: 3px 6px;
  margin: 10px;
  line-height: 16px;
}
.search-record-clean {
  text-align: center;
  font-size: 14px;
  color: #888;
}
.recommend {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  padding-left: 15px;
  padding-right: 12px;
}
.recommend span {
  font-size: 18px;
  font-weight: 400;
}
.recommend i {
  padding-right: 5px;
  color: red;
  font-size: 18px;
}
</style>
