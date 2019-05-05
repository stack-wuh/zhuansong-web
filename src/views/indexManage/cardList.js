import {validPhone} from '@/utils/valid'
const CardList = 
[
    [{
            label: '发货地址',
            type: 'inputsearch',
            field: 'temp_send',
            rule: [{
                required: true,
                message: '请选择有效发货地址',
                trigger: ['change', 'blur']
            }],
            placeholder: '请搜索发货地址'
        },
        {
            label: '详细地址',
            field: 'detailed',
            class: 'my-input__220',
            rule: [{
                required: true,
                message: '请编辑有效详细地址',
                trigger: ['change', 'blur']
            }],
            placeholder: '请补充详细地址'
        },
        {
            label: '发货人',
            field: 'shipper',
            class: 'my-input__220',
            rule: [{
                required: true,
                message: '请编辑发货人姓名',
                trigger: ['blur']
            }],
            placeholder: '请填写发货人姓名'
        },
        {
            label: '联系电话',
            class: 'my-input__220',
            field: 'shipper_phone',
            rule: [{
                required: true,
                validator: validPhone,
                trigger: ['blur']
            }],
            placeholder: '请填写发货人电话'
        }
    ],
    [{
            label: '收货地址',
            type: 'inputsearch',
            field: 'temp_receive',
            rule: [{
                required: true,
                message: '请选择有效收货地址',
                trigger: ['change', 'blur']
            }],
             placeholder: '请搜索收货地址'
        },
        {
            label: '详细地址',
            class: 'my-input__220',
            field: 'detailed',
            rule: [{
                required: true,
                message: '请编辑有效详细地址',
                trigger: ['change', 'blur']
            }],
            placeholder: '请补充详细地址'
        },
        {
            label: '收货人',
            field: 'recipient',
            class: 'my-input__220',
            rule: [{
                required: true,
                message: '请编辑收货人姓名',
                trigger: ['change', 'blur']
            }],
            placeholder: '请填写收货人姓名'
        },
        {
            label: '联系电话',
            class: 'my-input__220',
            field: 'recipient_phone',
            rule: [{
                required: true,
                validator: validPhone,
                trigger: ['change', 'blur']
            }],
            placeholder: '请填写收货人电话'
        }
    ],
    [{
            label: '物品信息',
            type: 'checkbox',
            field: 'goods_type',
            rule: [{
                required: true,
                message: '请选择一个标签',
                trigger: ['blur']
            }]
        },
        {
            label: '重量',
            field: 'weight',
            type: 'inputrange',
            rule: [{
                required: true,
                message: '请编辑重量',
                trigger: ['change', 'click']
            }]
        },
        {
            label: '备注信息',
            type: 'textarea',
            field: 'note'
        }
    ]
]
export default CardList