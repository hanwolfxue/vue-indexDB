<template>
  <div class="hello">
    <mt-header fixed title="新建">
      <router-link slot="left" to="/">
        <mt-button icon="back">back</mt-button>
      </router-link>
      <mt-button slot="right" @click="submit">提交</mt-button>
    </mt-header>
    <div :style="{ height: wrapperHeight + 'px' }" class="page-header-main">
      <div class="editItem">
        <div>姓名</div>
        <input v-model="detail.name" type="text" placeholder="请输入内容">
      </div>
      <div class="editItem">
        <div>年龄</div>
        <input v-model="detail.age" type="text" placeholder="请输入内容">
      </div>
      <div class="editItem">
        <div>性别</div>
        <input v-model="detail.gender" type="text" placeholder="请输入内容">
      </div>
      <div class="editItem">
        <div>爱好</div>
        <input v-model="detail.love" type="text" placeholder="请输入内容">
      </div>
      <div class="editItem">
        <div>梦想</div>
        <input v-model="detail.dream" type="text" placeholder="请输入内容">
      </div>
      <div class="editItem">
        <div>职位</div>
        <input v-model="detail.position" type="text" placeholder="请输入内容">
      </div>
    </div>
  </div>
</template>

<script>
import { Header, Cell, Button, Toast, Indicator } from 'mint-ui'
import IndexedDB from '../../libs/indexDB'
const shortid = require('shortid')
export default {
  name: 'Add',
  components: {
    Header, Cell, Button, Toast, Indicator,
  },
  data () {
    return {
      wrapperHeight: 0,
      detail: {
        id: '',
        name: '',
        age: '',
        gender: '',
        love: '',
        dream: '',
        position: '',
        isNotUpload: 0,
      },
    }
  },
  created () {
    console.log('created12345678')
  },
  activated () {
    console.log('active1')
  },
  mounted () {
    this.wrapperHeight = document.documentElement.clientHeight - 40
  },
  methods: {
    goBack () {
      this.$router.back()
    //   this.$destroy()
    },
    // 提交
    submit () {
      var vm = this
      if (navigator.onLine) {
        Toast('暂不支持在线提交')
      } else {
        vm.detail.isNotUpload = 1
        // 离线状态下通过shorid生成唯一id
        vm.detail.id = shortid.generate()
        // 存储数据进newList表,新建的数据和从接口获取的数据分开放
        let testDB = null
        IndexedDB.openDB('testDB', 1, testDB, '', '', function (db) {
          testDB = db
          IndexedDB.addData(testDB, 'list', [vm.detail], function (result) {
            vm.$router.back()
          })
        })
      }
    },
  },
}
</script>
<style lang="stylus" scoped>
@import '../../assets/stylus/import.styl';
  .editItem {
    height 48px
    line-height 48px
    border-bottom 1px solid $borderColor
    display flex
    padding 0 10px 0 10px
    input {
      height 95%
      flex 1
      text-align right
    }
  }
</style>
