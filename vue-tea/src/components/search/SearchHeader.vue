<template>
  <div class="search-header">
    <!-- 左 -->
    <i class="iconfont icon-31fanhui1 search-return" @click="goBack"></i>
    <!-- 中 -->
    <div class="search-mid">
      <i class="iconfont icon-search"></i>
      <form action="" onsubmit="return false" @keyup.enter="goSearchList">
        <input type="text" placeholder="搜索您喜欢的商品" v-model.trim="searchVal" ref="input" />
      </form>
    </div>
    <!-- 右 -->
    <div class="search-btn" @click="goSearchList">搜索</div>
  </div>
</template>

<script>
export default {
  name: 'searchHeader',
  data() {
    return {
      //上个路由传来的查询参数
      searchVal: this.$route.query.key || '',
      searchList: []
    }
  },
  mounted() {
    window.addEventListener('touchend', this.myTouchMove, true)
  },
  deactivated() {
    window.removeEventListener('touchend', this.myTouchMove, false) // 收起之后移除监听器
  },
  methods: {
    myTouchMove() {
      this.$refs.input.blur() // 表单失去焦点键盘就会自动收起
    },
    goBack() {
      if (this.$router.history.current.name == 'search-list') {
        this.$router.push('/search')
      } else {
        this.$router.push('/')
      }
    },
    goSearchList() {
      if (!this.searchVal) {
        return
      }

      //判断之前有没有搜索记录的本地存储
      if (!localStorage.getItem('searchList')) {
        //没有
        localStorage.setItem('searchList', '[]')
      } else {
        //有
        //获取
        this.searchList = JSON.parse(localStorage.getItem('searchList'))
      }

      //新增搜索历史的内容
      this.searchList.unshift(this.searchVal)
      //去重，利用set
      let newList = new Set(this.searchList)
      //set转数组再转json
      localStorage.setItem('searchList', JSON.stringify(Array.from(newList)))

      if (this.searchVal !== this.$route.query.key) {
        this.$router.push({
          //query传值，记得数据要json字符串化和解析
          //params刷新会改变
          name: 'search-list',
          query: {
            key: this.searchVal
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.search-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 1.6rem;
  background-color: #b0352f;
  color: #fff;
}
.search-return {
  padding-left: 0.2667rem;
  padding-right: 0.4267rem;
  font-size: 0.64rem;
}
.search-mid {
  display: flex;
  align-items: center;
  flex: 1;
  height: 0.8533rem;
  border-radius: 0.32rem;
  background-color: #fff;
}

.search-mid form {
  display: flex;
  justify-content: center;
  width: 100%;
}
.search-mid input {
  width: 100%;
  font-size: 0.3733rem;
  color: #222;
}
.search-mid i {
  color: #666;
  line-height: 1.6267rem;
  padding-left: 0.2667rem;
  padding-right: 0.2667rem;
}
.search-btn {
  padding-left: 0.4267rem;
  padding-right: 0.32rem;
  font-size: 0.3733rem;
}
</style>
