import PortMock from '@/utils/portMock'

const state = {
  data: [],
  info: {}
}

const mutations = {
  /**
   * [GET_TABLE_LIST 获取表格的入口列表]
   * @param {[type]} state [description]
   */
  GET_TABLE_LIST: state => {
    state.data = PortMock.map((kk, kd) => ({
      time: new Date().toLocaleDateString().replace(/\//g, '-'),
      city: '武汉',
      ...kk
    }))
  },

  /**
   * [GET_TABLE_LIST_INFO 获取详情]
   * @param {[type]} state [description]
   * @param {[type]} id    [description]
   */
  GET_TABLE_LIST_INFO: (state, id) => {
    state.info = PortMock.find(kk => kk.id == id)
  }
}

const actions = {

}

const getters = {

}

export default  {
  state, mutations, actions, getters

}
