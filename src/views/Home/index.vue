<template>
  <div class="home">
    <mt-header fixed title="列表">
      <mt-button slot="right" @click="add">新建</mt-button>
    </mt-header>
    <div :style="{ height: wrapperHeight + 'px' }" class="page-header-main">
      <mt-loadmore
        ref="loadmore"
        :top-method="loadTop"
        cancelable="false">
        <div class="list">
          <mt-cell-swipe
            v-for="(item,index) in list"
            :right="[
              {
                content: 'Delete',
                style: { background: 'red', color: '#fff' },
                handler: () => deleteItem(item,index)
              }
            ]"
            :key="index"
            @click.native="goDetail(item)">
            <div class="item">
              <div>
                <div>姓名:{{ item.name }}</div>
                <div>爱好:{{ item.love }}</div>
              </div>
              <div>
                <div>梦想:{{ item.dream }}</div>
                <div>职位:{{ item.position }}</div>
              </div>
            </div>
            <!-- 离线数据增加离线标识 -->
            <div v-if="!isOnline || item.isNotUpload===1" class="offline">离线</div>
          </mt-cell-swipe>
        </div>
        <div slot="top" class="mint-loadmore-top">
          <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
          <span v-show="topStatus === 'loading'">Loading...</span>
        </div>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
import { Header, Loadmore, CellSwipe, Indicator } from 'mint-ui'
import IndexedDB from '../../libs/indexDB'
export default {
  name: 'Home',
  components: {
    Header,
    Loadmore,
    CellSwipe,
    Indicator,
  },
  data () {
    return {
      list: [],
      allLoaded: false,
      topStatus: 'loading',
      page: 0,
      wrapperHeight: 0,
      isOnline: true,
    }
  },
  mounted () {
    this.wrapperHeight = document.documentElement.clientHeight - 40
    this.getData()
  },
  methods: {
    // 获取数据
    getData () {
      let vm = this
      // 有网
      if (navigator.onLine) {
        vm.isOnline = true
        // 数据来自vuex
        vm.list = JSON.parse(JSON.stringify(vm.$store.state.helloWorld.list.slice(0, 20)))
        this.$refs.loadmore.onTopLoaded()
        let testDB = null
        IndexedDB.openDB('testDB', 1, testDB, {
          name: 'list',
          key: 'id',
        }, ['age', 'name', 'isNotUpload'], function (db) {
          testDB = db
          let arr = []
          // 此处只考虑了如果有新建的数据，在有网的情况下刷新，先查询出新建未上传的数据，再重新插入数据库
          // 此处未考虑数据编辑的情况，需要进行数据的对比，显示正确的数据
          IndexedDB.handleDataByIndex(testDB, 'list', 'isNotUpload', IDBKeyRange.only(1), function (result) {
            if (result) {
              console.log('result', result.value)
              arr.push(result.value)
            } else {
              console.log('arr', arr)
              // 筛选出未上传的数据，与接口数据合并，并显示在最上方
              vm.list = arr.concat(vm.list)
              console.log('vm.list', vm.list)
              // // 先清空testDB的值，再重新添加testDB的值
              IndexedDB.clearData(testDB, 'list')
              IndexedDB.addData(testDB, 'list', vm.list)
            }
          })
        })
      } else {
        vm.isOnline = false
        this.$refs.loadmore.onTopLoaded()
        /**
         * 无网
         * 无网情况下，不处理分页，一下展示所有缓存数据
         *  */
        let testDB = null
        console.log('无网')
        let arr = []
        IndexedDB.openDB('testDB', 1, testDB, '', '', function (db) {
          testDB = db
          IndexedDB.handleDataByCursor(testDB, 'list', function (result) {
            if (result) {
              arr.push(result.value)
            } else {
              vm.list = arr
            }
          })
        })
      }
    },
    // 删除数据
    deleteItem (item, index) {
      console.log('index', item)
      this.list.splice(index, 1)
      // 离线状态下，删除testDB和newDB数据库中的数据
      let testDB = null
      IndexedDB.openDB('testDB', 1, testDB, '', '', function (db) {
        testDB = db
        console.log(item.id)
        IndexedDB.deleteData(testDB, 'list', item.id)
      })
    },
    add () {
      this.$router.push({
        name: 'Add',
      })
    },
    goDetail (item) {
      this.$router.push({
        name: 'Detail',
        query: {
          id: item.id,
        },
      })
    },
    // 下拉刷新
    loadTop () {
      this.getData()
    },
  },
}
</script>

<style lang="stylus" scoped>
@import '../../assets/stylus/import.styl';

.home {
  > img {
    display: block;
    max-width: 320px;
    margin: 50px auto;
  }

  > h2 {
  width: 100%;
  height: 200px;
  line-height: 200px;
  text-align: center;
  color: $baseColor;
  background: $bgColor;
  border-line(bottom);
  }
  .list {
    .item {
      width 100%
      line-height 48px
      text-align left
      padding-left 10px
      background $bgColor
      border-bottom 1px solid $borderColor
      position relative
      > div{
        display flex
        > div {
          flex 1
        }
      }
      .offline {
      position absolute
      top 0
      right 0px
      width 50px
      height 48px
      color $baseColor
      }
    }
  }
  .list >>> .mint-cell-title {
    display none
  }
  .list >>> .mint-cell-value {
    width 100%
  }
}
</style>
