// https://github.com/dkfbasel/vuex-i18n

import Vue from 'vue'
import VuexI18n from 'vuex-i18n'

import store from '@/store'

import en from '../en'
import zh from '../zh'

Vue.use(VuexI18n.plugin, store)

Vue.i18n.add('en', en)
Vue.i18n.add('zh', zh)

Vue.i18n.set('zh')
