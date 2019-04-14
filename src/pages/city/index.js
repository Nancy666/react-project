import React, { Component } from 'react';
import { Card, Button, Table, Form, Select, Modal, message, Radio } from 'antd';
import axios from './../../axios';
import ExportJsonExcel from "js-export-excel";

import Utils from './../../utils/utils'
import BaseForm from './../../components/BaseForm'

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

export default class Order extends Component {
    state = {
        isOpen: false,
        list: []
    }
    params = {
        page: 1
    }
    formList = [
        {
            type:'SELECT',
            label:'选择城市',
            field:'city_id',
            placeholder:'全部',
            initialValue:1,
            width:80,
            list: [{ id: 0, name: '全部' }, { id: 1, name: '北京' }, { id: 2, name: '天津' }, { id: 3, name: '上海' },{ id:4, name: '深圳' }]
        },
        {
            type: 'SELECT',
            label: '用车模式',
            field:'mode',
            placeholder: '全部',
            initialValue: 1,
            width: 150,
            list: [{ id: 0, name: '全部' }, { id: 1, name: '指定停车点模式' }, { id: 2, name: '禁停区模式' }]
        },
        {
            type: 'SELECT',
            label: '营运模式',
            field:'op_mode',
            placeholder: '全部',
            initialValue: 1,
            width: 80,
            list: [{ id: 0, name: '全部' }, { id: 1, name: '自营' }, { id: 2, name: '加盟' }]
        },
        {
            type: 'SELECT',
            label: '加盟商授权状态',
            field:'auth_status',
            placeholder: '全部',
            initialValue: 1,
            width: 120,
            list: [{ id: 0, name: '全部' }, { id: 1, name: '已授权' }, { id: 2, name: '未授权' }]
        }
    ]
    handleFilter=(params)=>{
        // this.params ={
        //     page:1,
        //     ...params
        // } 
        
        this.requestList()
    }
    componentDidMount() {
        this.requestList()
    }
    requestList = () => {
        let _this = this;
        axios.requestList(this,'/open_city',this.params,true)
    }
    handleOpenCity = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    handleOk = (e) => {
        let cityInfo = this.cityForm.props.form.getFieldsValue();
        axios.ajax({
            url: "/open/city",
            data: {
                params: cityInfo
            }
        }).then((res) => {
            message.success(res.msg)
        })
        this.setState({
            isOpen: false,
        });
    }
    handleCancel = (e) => {
        this.setState({
            isOpen: false,
        });
    }

    // 导出excel
    exportExcel = () => {
        var option = {};
        var title = {
            one: "id",
            two: "城市名称",
            three: "用车模式",
            four: "运营模式",
            five: "授权加盟商",
            six: "城市管理员",
            seven: "城市开通时间",
            eight: "操作时间",
            nine: "操作人"
        }
        let cityList = this.state.list;
        let keys = cityList[0];
        let keysArr = []
        for (let k in keys) {
            keysArr.push(k)
        }
        let dataArr = []
        for (let i = 0; i < cityList.length; i++) {
            var obj = {}
            obj.one = cityList[i][keysArr[0]]
            obj.two = cityList[i][keysArr[1]]
            obj.three = cityList[i][keysArr[2]]
            obj.four = cityList[i][keysArr[3]]
            obj.five = cityList[i][keysArr[4]]
            obj.six = `${cityList[i][keysArr[5]].length == 1 ? cityList[i][keysArr[5]][0].user_name : cityList[i][keysArr[5]][0].user_name + ',' + cityList[i][keysArr[5]][1].user_name}`
            obj.seven = cityList[i][keysArr[6]]
            obj.eight = Utils.dateFormat(cityList[i][keysArr[7]])
            obj.nine = cityList[i][keysArr[8]]
            dataArr.push(obj)
        }
        option.datas = [{
            sheetData: [title, ...dataArr],
            sheetName: '开通城市名单',
            sheetFilter: ['one', 'two', "three", "four", "five", "six", "seven", "eight", "nine"],
            sheetHeader: ["开通城市名单"],
            columnWidths: ['', '', '', '', 8, 10, 10, 10, '']
        }
        ];
        var toExcel = new ExportJsonExcel(option);
        toExcel.saveExcel();
    }

    render() {
        const columns = [
            {
                title: "城市ID",
                dataIndex: "id"
            }, {
                title: "城市名称",
                dataIndex: "name"
            }, {
                title: "用车模式",
                dataIndex: "mode",
                render(mode) {
                    return mode == 1 ? "停车点" : "禁停区"
                }
            }, {
                title: "运营模式",
                dataIndex: "op_mode",
                render(op_mode) {
                    return op_mode == 1 ? "自营" : "加盟"
                }
            }, {
                title: "授权加盟商",
                dataIndex: "franchisee_name"
            }, {
                title: "城市管理员",
                dataIndex: "city_admins",
                render(arr) {
                    return arr.map((item) => {
                        return item.user_name;
                    }).join(",");
                }
            }, {
                title: "城市开通时间",
                dataIndex: "open_time"
            }, {
                title: "操作时间",
                dataIndex: "update_time",
                render: Utils.dateFormat
            }, {
                title: "操作人",
                dataIndex: "sys_user_name"
            }
        ]

        return (
            <div className="">
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter}></BaseForm>
                </Card>
                <Card style={{ "marginBottom": 0, "borderBottom": "none" }}>
                    <Button type="primary" onClick={this.handleOpenCity}>开通城市</Button>
                    <Button type="primary" onClick={this.exportExcel}>导出excel</Button>
                    <Modal
                        title="开通城市"
                        visible={this.state.isOpen}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <OpenCityForm wrappedComponentRef={(inst) => this.cityForm = inst} />
                    </Modal>
                </Card>
                <Card>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                    />
                </Card>
            </div>
        )
    }
}

// class FilterForm extends Component {
//     handleSubmit = (e) => {
//         e.preventDefault();
//         this.props.form.validateFields((err, values) => {
//             if (!err) {
//                 console.log(values);
//             }
//         });
//     }
//     resetForm = (e) => {
//         e.preventDefault();
//         this.props.form.resetFields();
//     }
//     render() {
//         const { getFieldDecorator } = this.props.form;
//         const formItemLayout = {
//             labelCol: {
//                 span: 5
//             },
//             wrapperCol: {
//                 span: 19
//             }
//         }
//         return (
//             <Form layout="inline">
//                 <FormItem label="选择城市：">
//                     {
//                         getFieldDecorator("city_id", {
//                             initialValue: "全部",
//                         })(
//                             <Select style={{ width: 100 }}>
//                                 <Option value="">全部</Option>
//                                 <Option value="北京">北京</Option>
//                                 <Option value="上海">上海</Option>
//                                 <Option value="天津">天津</Option>
//                                 <Option value="深圳">深圳</Option>
//                             </Select>
//                         )
//                     }
//                 </FormItem>
//                 <FormItem label="运营模式：">
//                     {
//                         getFieldDecorator("op_mode", {
//                             initialValue: "1",
//                         })(
//                             <Select style={{ width: 100 }}>
//                                 <Option value="1">自营</Option>
//                                 <Option value="2">加盟</Option>
//                             </Select>
//                         )
//                     }
//                 </FormItem>
//                 <FormItem label="用车模式：">
//                     {
//                         getFieldDecorator("use_mode", {
//                             initialValue: "1",
//                         })(
//                             <Select style={{ width: 100 }}>
//                                 <Option value="1">指定停车点</Option>
//                                 <Option value="2">禁停区</Option>
//                             </Select>
//                         )
//                     }
//                 </FormItem>
//                 <FormItem label="加盟商授权状态：">
//                     {
//                         getFieldDecorator("auth_status", {
//                             initialValue: "1",
//                         })(
//                             <Select style={{ width: 100 }}>
//                                 <Option value="1">已授权</Option>
//                                 <Option value="2">未授权</Option>
//                             </Select>
//                         )
//                     }
//                 </FormItem>
//                 <FormItem>
//                     <Button type="primary" style={{ margin: '0 20px' }} onClick={this.handleSubmit}>查询</Button>
//                     <Button onClick={this.resetForm}>重置</Button>
//                 </FormItem>
//             </Form>
//         )
//     }
// }
// FilterForm = Form.create({})(FilterForm);


class OpenCityForm extends Component {
    state = {
        value: 1
    }
    onOpMode = (e) => {
        console.log(e.target.value)
    }
    handleUseMode = (e) => {
        console.log(e.target.value)
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 },
        };

        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="horizontal">
                <FormItem label="选择城市" {...formItemLayout}>
                    {
                        getFieldDecorator('city_id', {
                            initialValue: '1'
                        })(
                            <Select>
                                <Option value="">全部</Option>
                                <Option value="1">北京市</Option>
                                <Option value="2">天津市</Option>
                                <Option value="3">深圳市</Option>
                                <Option value="4">太原市</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="营运模式" {...formItemLayout}>
                    {
                        getFieldDecorator('op_mode', {
                            initialValue: 1
                        })(
                            <RadioGroup onChange={this.onOpMode}>
                                <Radio value={1}>自营</Radio>
                                <Radio value={2}>加盟</Radio>
                            </RadioGroup>
                        )
                    }
                </FormItem>
                <FormItem label="用车模式" {...formItemLayout}>
                    {
                        getFieldDecorator('use_mode', {
                            initialValue: '1'
                        })(
                            <RadioGroup onChange={this.handleUseMode}>
                                <Radio value={1}>停车点</Radio>
                                <Radio value={2}>禁停区</Radio>
                            </RadioGroup>
                        )
                    }
                </FormItem>
            </Form>
        )
    }
}
OpenCityForm = Form.create({})(OpenCityForm);
