export const state = {
  author: 'shadow',

  isShowDialog: false,
  dialogTitle: 'Tips',

  searchForm: {
    pageNum: 1
  },

  tableData: [
    {},{},{}
  ],
  total: 11,
  currPageNum: 1
}

export const mutations = {
  /**
   * [DIALOG_CLAOSE_SYNC 同步关闭dialog对话框]
   * @param {[type]}  state          [description]
   * @param {Boolean} [status=false] [description]
   */
  DIALOG_CLAOSE_SYNC: (state, status = false) => {
    state.isShowDialog = status
    state.dialogTitle = '提示内容'
  },
  /**
   * [SEARCH_FORM_CLEAR_SYNC 同步清除search的表单]
   * @param {[type]} state [description]
   */
  CLEAR_SEARCH_FORM_SYNC: state => {
    state.searchForm = {}
  },
  /**
   * [SET_SEARCH_FROM_SYNC 同步设置search的form表单]
   * @param {[type]} state  [description]
   * @param {[type]} params [description]
   */
  SET_SEARCH_FROM_SYNC: (state, params) => {
    state.searchForm = {...state.searchForm, ...params}
  }
}

export const actions = {
  /**
   * [DIALOG_CLOSE_ASYNC 异步关闭对话框]
   * @param {[type]} commit [description]
   */
  DIALOG_CLOSE_ASYNC: ({commit}) => {
    setTimeout(() => {
      commit('DIALOG_CLAOSE_SYNC')
    }, 1000, false)
  },
}

export const getters = {}
