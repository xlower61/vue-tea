<template>
  <div class="home container">
    <div class="home-header">
      <div class="header">
        <HomeHeader></HomeHeader>

        <!-- 下载头部切换插件npm install ly-tab -S
    import引入，vue.use插件，便可全局使用 -->

        <van-tabs v-model="options.active" :title-active-color="options.color" :color="options.color" @change="changTab">
          <van-tab v-for="item in options.topBar" :key="item.id" :name="item.id" :title="item.title"></van-tab>
        </van-tabs>
      </div>
    </div>
    <!-- 滚动插件  npm install better-scroll -S  -->
    <!-- 滚动区域加上wrapper类 -->
    <section ref="wrapper">
      <div style="margin-bottom: 20px">
        <div v-for="(item, index) in listData" :key="index">
          <!-- 轮播图 -->
          <SwiperMain v-if="item.type === 'swiperList'" :swiperList="item.arr" @loadImg="refreshView"></SwiperMain>
          <!-- 中部5图标 -->
          <MidIcon v-if="item.type === 'iconList'" :iconList="item.arr" @loadImg="refreshView"></MidIcon>
          <!-- 推荐 -->
          <RecommendSlot v-if="item.type === 'recommendList'" :recommendList="item.arr" @loadImg="refreshView"></RecommendSlot>
          <AdS v-if="item.type === 'adSList'" :adSList="item.arr" @loadImg="refreshView"></AdS>
          <!-- 猜你喜欢 -->
          <GuessLike v-if="item.type === 'guessLikeList'" :guessLikeList="item.arr" @loadImg="refreshView"></GuessLike>
        </div>
      </div>
    </section>

    <TabBar></TabBar>
  </div>
</template>

<script>
import TabBar from '@/components/common/TabBar.vue'
import HomeHeader from '@/components/home/HomeHeader.vue'
import SwiperMain from '@/components/home/SwiperMain.vue'
import MidIcon from '@/components/home/MidIcon.vue'
import RecommendSlot from '@/components/home/RecommendSlot.vue'
import GuessLike from '@/components/home/GuessLike.vue'
import AdS from '@/components/home/AdS.vue'

//引入滚动插件better-scroll
import BetterScroll from 'better-scroll'
//引入封装的api
import { getLyTabAPI } from '@/common/api/HomeAPI'
export default {
  name: 'HomeView',
  components: { TabBar, HomeHeader, SwiperMain, MidIcon, RecommendSlot, GuessLike, AdS },
  data() {
    return {
      //tabs的数据
      options: {
        active: 0,
        topBar: [],
        color: '#b0352f'
      },
      listData: {},
      sc: {}
    }
  },
  methods: {
    //导航栏改变
    changTab(name) {
      this.getData(name)
    },
    //请求数据
    async getData(item) {
      let { data: res } = await getLyTabAPI(item)
      if (item == 0) {
        this.options.topBar = res.topBar.arr
      }
      this.listData = res.dataList
      //nextTick在页面DOM更新完毕后使用再滚动插件
      // 滚动页面子元素要比父元素高度高
      this.$nextTick(() => {
        this.sc = new BetterScroll(this.$refs.wrapper, {
          movable: true,
          click: true
        })
      })
    },
    refreshView() {
      this.sc.refresh()
    }
  },

  created() {
    this.getData(0)
  },

  mounted() {
    //如果在这个时候使用滚动条，数据还没得到，页面高度其实还是不确定的
  }
}
</script>
<style scoped>
.home-header {
  width: 100%;
}

section {
  padding-bottom: 0.8rem;
}
::v-deep .ly-tabs {
  height: 1.0667rem;
  box-shadow: none;
  border-bottom: none;
  z-index: 999;
}
</style>
