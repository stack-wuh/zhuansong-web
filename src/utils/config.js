import Vue from 'vue'
import '@/assets/style/base.scss'
import '@/assets/style/element/index.css'
import '@/assets/style/element.scss'
import '@/assets/iconfont/iconfont.css'

import {
  Button,
  Message,
  Input,
  Select,
  Option,
  Form,
  FormItem,
  Dialog,
  Loading,
  Checkbox,
  CheckboxGroup,
  InputNumber,
  Popover,
  Autocomplete,
  Tooltip,
  Table,
  TableColumn
} from 'element-ui'

Vue.use(Button)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Dialog)
Vue.use(Loading)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(InputNumber)
Vue.use(Popover)
Vue.use(Autocomplete)
Vue.use(Tooltip)
Vue.use(Table)
Vue.use(TableColumn)
Vue.prototype.$ELEMENT = {size: 'small', zIndex: 999999}
Vue.prototype.$message = Message
Vue.prototype.$loading = Loading.service

window.uploadPath = process.env.VUE_APP_BASE_URL
window.imgBasePath = 'https://res.squrab.com/www/'
