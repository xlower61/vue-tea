<template>
  <div class="list">
    <header>
      <div class="return">
        <i class="iconfont icon-31fanhui1 search-return" @click="goBack"></i>
      </div>
      <div class="search">
        <i class="iconfont icon-search"></i>
        <span>搜你喜欢...</span>
      </div>
      <div class="home">
        <i class="iconfont icon-home"></i>
      </div>
    </header>
    <section>
      <div class="list-l" ref="left">
        <ul>
          <li v-for="item in leftList" :key="item.id" :class="{ active: currentIndex == item.id }" @click="scrollToRight(item.id)">{{ item.name }}</li>
        </ul>
      </div>
      <div class="list-r" ref="right">
        <div class="list-r-content">
          <div class="view-img"><img v-lazy="bigpic" alt="" /></div>
          <ul>
            <li v-for="item in rightList" :key="item.id" class="shop-list">
              <h2>
                <div>{{ item.name }}</div>
              </h2>
              <ul class="list-content">
                <li v-for="(i, index) in item.list" :key="index">
                  <!-- 这里懒加载会导致scroll跳转而显示不出 -->
                  <img :src="i.imgURL" alt="" />
                  <span>{{ i.name }}</span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <TabBar></TabBar>
  </div>
</template>

<script>
import TabBar from '@/components/common/TabBar.vue'
import { getSortAPI } from '@/common/api/getSortAPI'
//引入滚动插件better-scroll
import BetterScroll from 'better-scroll'
export default {
  name: 'ListView',
  components: { TabBar },
  data() {
    return {
      bigpic: '/images/tgy.jpeg',
      leftList: [],
      rightList: [],
      //右边滚动
      rightScroll: '',
      //右侧每一块的高度
      rightHeightList: [],
      rightY: 100
    }
  },
  //计算属性，计算哪个active
  computed: {
    currentIndex() {
      //利用findIndex找到滚动距离对应下标
      return this.rightHeightList.findIndex((v, i) => {
        return this.rightY >= v && this.rightY < this.rightHeightList[i + 1]
      })
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      let { data: res } = await getSortAPI()
      res.sort.forEach((v) => {
        this.leftList.push({
          id: v.id,
          name: v.name
        })
        this.rightList.push(v.data)
      })
      this.$nextTick(() => {
        //左侧滑动(betterscroll会自动屏蔽click事件，只有修改了probeType才会返回坐标)
        this.scroll = new BetterScroll(this.$refs.left, { movable: false, click: true, probeType: 3 })
        //右侧滑动
        this.rightScroll = new BetterScroll(this.$refs.right, { click: true, probeType: 3 })
        //最开始0px，用数组rightHeight记录
        this.rightHeightList.push(0)
        //但其实是从100px开始加的
        let height = 100
        //获取右侧每一块
        let lis = this.$refs.right.getElementsByClassName('shop-list')
        Array.from(lis).forEach((v) => {
          height += v.clientHeight
          this.rightHeightList.push(height)
        })
        let flag = 1
        //监听滚动
        this.rightScroll.on('scroll', (pos) => {
          //使用节流阀更改rightY属性
          if (flag) {
            flag = 0
            let timer = setTimeout(() => {
              this.rightY = Math.abs(pos.y)
              flag = 1
              clearTimeout(timer)
            }, 15)
          }
        })
      })
    },
    scrollToRight(item) {
      //利用点击的id和betterscroll的scrollTo事件
      this.rightScroll.scrollTo(0, -this.rightHeightList[item], 500)
    },
    goBack() {
      this.$router.back()
    }
  }
}
</script>
<style lang="scss" scoped>
.list {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    background-color: #b0352f;

    .return {
      padding: 0 16px;
      i {
        color: #fff;
        font-size: 24px;
      }
    }

    .search {
      flex: 1;
      display: flex;
      align-items: center;
      height: 30px;
      background-color: #fff;
      padding: 0 16px;
      border-radius: 16px;
      color: #999;
      i {
        font-size: 18px;
        padding-right: 6px;
      }
      span {
        font-size: 16px;
      }
    }

    .home {
      padding: 0 16px;

      i {
        font-size: 28px;
        color: #fff;
      }
    }
  }

  section {
    flex: 1;
    overflow: hidden;
    display: flex;
    .list-l {
      width: 93px;
      background-color: #fff;
      overflow: hidden;
      border-right: 1px solid #ccc;

      ul {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow: hidden;

        li {
          width: 100%;
          padding: 4px 0;
          margin: 12px 0;
          text-align: center;
          font-size: 16px;
        }
        .active {
          color: #b0352f;
          border-left: 5px solid #b0352f;
          box-sizing: border-box;
          padding-right: 5px;
        }
      }
    }
    .list-r {
      flex: 1;
      overflow: hidden;
      .list-r-content {
        display: flex;
        flex-direction: column;
        .view-img {
          height: 100px;
          img {
            display: block;
            width: 90%;
            height: 90%;
            margin: 0 auto;
          }
        }
        .shop-list:last-child {
          padding-bottom: 440px;
        }
        .shop-list {
          text-align: center;
          h2 {
            div {
              position: relative;
              display: inline-block;
              font-size: 24px;
              font-weight: 400;
              padding: 16px 0;
            }
            div::before {
              position: absolute;
              left: -30px;
              content: '—';
              font-weight: 900;
              color: #ddd;
            }
            div::after {
              position: absolute;
              right: -30px;
              content: '—';
              font-weight: 900;
              color: #ddd;
            }
          }

          .list-content {
            display: flex;
            flex-wrap: wrap;

            li {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              width: 33.3%;
              height: 33.3%;
              padding: 10px 0;

              img {
                width: 53px;
                height: 53px;
              }
              span {
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }
}
/deep/ .tabbar {
  border-top: 1px solid #ccc;
}
</style>
