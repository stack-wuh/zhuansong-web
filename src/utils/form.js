const form = [
  {
    l: '',
    f: '',
    c: '',
    params: ['用户管理'],
    list: [
      {
        label: '姓名',
        value: 'shadow',
        field: 'name',
        type: 'input',
        rule: []
      },
      {
        label: '详情',
        value: 'shadow',
        field: 'name',
        type: 'textarea',
        rule: []
      },
      {
        label: '状态',
        value: 'shadow',
        field: 'name',
        type: 'switch',
        rule: []
      },
      {
        label: '上传头像',
        value: 'shadow',
        field: 'name',
        type: 'uploadImg',
        rule: []
      },
    ],
    form: {
      name: '',
    }
  }
]

export default form
