<template>
  <div class="hello">
    <mt-header fixed title="详情">
      <router-link slot="left" to="/">
        <mt-button icon="back">back</mt-button>
      </router-link>
      <mt-button v-if="isEdit" slot="right" @click="save">保存</mt-button>
      <mt-button v-if="!isEdit" slot="right" @click="edit">编辑</mt-button>
    </mt-header>
    <div :style="{ height: wrapperHeight + 'px' }" class="page-header-main">
      <div v-if="!isEdit">
        <mt-cell :value="detail.name" title="姓名"/>
        <mt-cell :value="detail.age" title="年龄"/>
        <mt-cell :value="detail.gender" title="性别"/>
        <mt-cell :value="detail.love" title="爱好"/>
        <mt-cell :value="detail.dream" title="梦想"/>
        <mt-cell :value="detail.position" title="职位"/>
      </div>
      <div v-if="isEdit">
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
  </div>
</template>

<script>
import { Header, Cell, Button, Toast, Indicator } from 'mint-ui'
import IndexedDB from '../../libs/indexDB'
export default {
  name: 'Detail',
  components: {
    Header, Cell, Button, Toast, Indicator,
  },
  data () {
    return {
      wrapperHeight: 0,
      id: this.$route.query.id,
      detail: '',
      isEdit: false,
    }
  },
  created () {
    console.log('created')
  },
  activated () {
    console.log('active')
  },
  mounted () {
    var vm = this
    this.wrapperHeight = document.documentElement.clientHeight - 40
    let testDB = null
    IndexedDB.openDB('testDB', 1, testDB, '', '', function (db) {
      let testDB = db
      console.log(vm.id)
      IndexedDB.getData(testDB, 'list', vm.id, function (result) {
        console.log('result', result)
        vm.detail = result
      })
    })
  },
  methods: {
    goBack () {
      this.$router.back()
      // this.$destroy()
    },
    // 编辑
    edit () {
      this.isEdit = true
    },
    // 保存
    save () {
      var vm = this
      this.isEdit = false
      if (navigator.onLine) {
        Toast('暂不支持在线保存')
      } else {
        // 离线状态下给数据增加离线标识
        vm.detail.isNotUpload = 1
        // 存储数据进list表
        let testDB = null
        IndexedDB.openDB('testDB', 1, testDB, '', '', function (db) {
          let testDB = db
          console.log(vm.id)
          IndexedDB.putData(testDB, 'list', [vm.detail])
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
