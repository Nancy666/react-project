import React, { Component } from 'react';
import { Card, Button, Table, Form, Select, Modal } from 'antd';
import axios from '../../axios';
import Utils from './../../utils/utils';
import './index.less';
import ExportJsonExcel from "js-export-excel";
import BaseForm from './../../components/BaseForm';
import Etable from './../../components/Etable';

const FormItem = Form.Item;
const Option = Select.Option;

class Order extends Component {
    state = {
        list: [],
        pagination: null,
        selectedRows: [],
        selectedItem: null,  //被选中的数据项
        finishOrderVisible: false,
        bikeInfo: {}
    }
    params = {
        page: 1
    }
    formList = [
        {
            type: 'SELECT',
            label: '城市',
            field: 'city',
            placeholder: '全部',
            initialValue: 1,
            width: 80,
            list: [{ id: 0, name: '全部' }, { id: 1, name: '北京' }, { id: 2, name: '天津' }, { id: 3, name: '上海' }, { id: 4, name: '深圳' }]
        },
        {
            type: '时间查询'
        },
        {
            type: 'SELECT',
            label: '订单状态',
            field: 'order_status',
            placeholder: '全部',
            initialValue: 1,
            width: 120,
            list: [{ id: 0, name: '全部' }, { id: 1, name: '进行中' }, { id: 2, name: '结束行程' }]
        }
    ]
    handlefilter = (params) => {
        // Moment时间对象转js时间对象
        let start = new Date(params.begin_time).getTime();
        let end = new Date(params.end_time).getTime();
        this.params = {
            page: 1,
            ...params,
            begin_time: start,
            end_time: end
        }
        this.requestList();
    }
    componentDidMount() {
        this.requestList()
    }

    requestList = () => {
        let _this = this;
        axios.requestList(this, '/order/list', this.params)
    }

    //选中某一行
    onRowClick = (recode, index) => {
        // console.log(recode, index)
        const selected = [index];
        console.log(selected.length)
        if (selected.length == 1) {
            console.log(9)
            this.setState({
                selectedRowKeys: [],
                selectedItem: null
            })
        }
        this.setState({
            selectedRowKeys: selected,
            selectedItem: recode
        })
    }
    openOrderDetail = () => {
        //判断是否有选中某一条数据
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: "信息",
                content: `请先选择一条数据`
            })
            return;
        }
        window.open(`/#/common/order/detail/${item.user_id}`, '_blank')
    }

    // 导出excel
    exportExcel = () => {
        var option = {};
        var title = {
            one: "ID",
            two: "订单编号",
            three: "车辆编号",
            four: "用户ID",
            five: "用户名",
            six: "手机号",
            seven: "里程(米)",
            eight: "行驶时长",
            nine: "状态",
            ten: "开始时间",
            eleven: "结束时间",
            twelve: "订单金额(元)",
            thirteen: "实付金额(元)"
        }
        let orderList = this.state.list;
        let keys = orderList[0];
        let keysArr = []
        for (let k in keys) {
            keysArr.push(k)
        }
        let dataArr = []
        for (let i = 0; i < orderList.length; i++) {
            var obj = {}
            obj.one = orderList[i][keysArr[0]]
            obj.two = orderList[i][keysArr[1]]
            obj.three = orderList[i][keysArr[2]]
            obj.four = orderList[i][keysArr[3]]
            obj.five = orderList[i][keysArr[4]]
            obj.six = orderList[i][keysArr[5]]
            obj.seven = orderList[i][keysArr[6]]
            obj.eight = orderList[i][keysArr[7]]
            obj.nine = orderList[i][keysArr[8]]
            obj.ten = orderList[i][keysArr[9]]
            obj.eleven = orderList[i][keysArr[10]]
            obj.twelve = orderList[i][keysArr[11]]
            obj.thirteen = orderList[i][keysArr[12]]

            dataArr.push(obj)
        }
        option.datas = [{
            sheetData: [title, ...dataArr],
            sheetName: '全部订单',
            sheetFilter: ['one', 'two', "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen"],
            sheetHeader: ["全部订单"],
            columnWidths: ['', '', '', '', '', '', '', '', '', '', '', '', '']
        }];
        var toExcel = new ExportJsonExcel(option);
        toExcel.saveExcel();
    }
    // // 确认结束订单
    // finishOrder = (e) => {
    //     let item = this.state.selectedItem;
    //     axios.ajax({
    //         url:"/order/finish_order",
    //         data:{
    //             params:{
    //                 id:item.id
    //             },
    //             isShowLoading:false
    //         }
    //     }).then((res)=>{
    //         console.log(res)
    //         if(res.code==0){
    //             this.setState({
    //                 finishOrderVisible:true
    //             })
    //         }
    //     })
    //   }

    cancelOrderConfirm = (e) => {
        this.setState({
            finishOrderVisible: false,
        });
    }
    render() {
        const columns = [{
            title: '订单编号',
            dataIndex: 'order_sn'
        }, {
            title: '车辆编号',
            dataIndex: 'bike_sn'
        }, {
            title: '用户名',
            dataIndex: 'user_name'
        }, {
            title: '手机号',
            dataIndex: 'mobile'
        }, {
            title: '里程',
            dataIndex: 'distance'
        }, {
            title: '行驶时长',
            dataIndex: 'total_time'
        }, {
            title: '状态',
            dataIndex: 'status'
        }, {
            title: '开始时间',
            dataIndex: 'start_time'
        }, {
            title: '结束时间',
            dataIndex: 'end_time'
        }, {
            title: '订单金额',
            dataIndex: 'total_fee'
        }, {
            title: '实付金额',
            dataIndex: 'user_pay'
        }];
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            type: "radio",
            selectedRowKeys  //记录的是单选框被选中
        };
        const formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 16 }
        }
        return (
            <div>
                <Card>
                    {/* <FilterForm></FilterForm> */}
                    <BaseForm formList={this.formList} filterSubmit={this.handlefilter} />
                </Card>
                <Card style={{ marginBottom: 0, borderBottom: 0 }}>
                    <Button type="primary" onClick={this.openOrderDetail}>订单详情</Button>
                    <Button onClick={this.closeOrder} >结束订单</Button>
                    <Button type="primary" onClick={this.exportExcel}>导出excel</Button>
                </Card>
                <div style={{ backgroundColor: "#fff" }}>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                        rowSelection={rowSelection}   //表格行是否可选择
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record, index)
                                }
                            };
                        }}
                    />
                </div>

                {/* <Modal
                    title="结束订单"
                    visible={this.state.finishOrderVisible}
                    onCancel={this.cancelOrderConfirm}
                    onOk={this.finishOrder}
                    style={{width:600}}
                    okText="确认"
                    cancelText="取消"
                    destroyOnClose={true}
                >
                    <Form layout="horizontal">
                        <FormItem label="车辆编号" {...formItemLayout}>{this.state.bikeInfo.bike_sn}</FormItem>
                        <FormItem label="剩余电量" {...formItemLayout}>{this.state.bikeInfo.battery+"%"}</FormItem>
                        <FormItem label="行程开始时间" {...formItemLayout}>{this.state.bikeInfo.start_time}</FormItem>
                        <FormItem label="当前位置" {...formItemLayout}>{this.state.bikeInfo.location}</FormItem>
                    </Form>
                </Modal>      */}
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
//     onChange = (date, dateString) => {
//         console.log(dateString);
//     }
//     render() {
//         const { getFieldDecorator } = this.props.form;
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
//                 <FormItem label="订单时间：">
//                     {
//                         getFieldDecorator("start_time", {

//                         })(
//                             <DatePicker onChange={this.onChange} locale={locale} showTime format="YYYY-MM-DD HH:mm:ss" />
//                         )
//                     }&nbsp;~&nbsp;
//                     {
//                         getFieldDecorator("end_time", {

//                         })(
//                             <DatePicker onChange={this.onChange} locale={locale} showTime format="YYYY-MM-DD HH:mm:ss" />
//                         )
//                     }
//                 </FormItem>

//                 <FormItem label="订单状态：">
//                     {
//                         getFieldDecorator("status", {
//                             initialValue: "1",
//                         })(
//                             <Select style={{ width: 150 }}>
//                                 <Option value="1">全部</Option>
//                                 <Option value="2">进行中</Option>
//                                 <Option value="2">进行中（临时锁车）</Option>
//                                 <Option value="2">行程结束</Option>
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
export default Order;