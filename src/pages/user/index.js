import React, { Component } from 'react'
import { Card, Button, Table, Modal, Form, Input, DatePicker, Radio, Select, message } from 'antd'
import axios from './../../axios'
import Utils from './../../utils/utils'
import BaseForm from './../../components/BaseForm';
import moment from 'moment';


const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { TextArea } = Input;
export default class User extends Component {
    state = {
        list: [],
        pagination: null,
        selectedRowKeys: [],
        selectedItem: [],
        visible: false,
        addForm: {
            name: '',
            sex: '',
            isMarried: '',
            birthday: 1547185776221,
            address: '',
            state: ''
        },
        type:''
    }
    params = {
        page: 1
    }
    componentDidMount() {
        this.requestList()
    }
    requestList = () => {
        let _this = this;
        axios.requestList(this, '/user/list', this.params, true)
    }
    // 新增员工
    addUser = () => {
        this.setState({
            visible: true
        });
    }
    //编辑员工
    editUser = () => {
        let selectedKey = this.state.selectedRowKeys;
        let selectedItem = this.state.selectedItem;
        if (selectedKey.length != 1 && selectedItem.length != 1) {
            message.info('请选择1条数据');
        } else {
            this.setState({
                addForm: { ...selectedItem[0] },
                visible: true
            })
        }
    }

    //员工详情
    userDetail = () => {
        let selectedKey = this.state.selectedRowKeys;
        let selectedItem = this.state.selectedItem;
        if (selectedKey.length != 1 && selectedItem.length != 1) {
            message.info('请选择1条数据');
        } else {
            this.setState({
                addForm: { ...selectedItem[0] },
                visible: true,
                type: 'detail'
            })
        }
    }
    //删除员工
    deleteUser = () => {

    }
    handleOk = (e) => {
        //得到表单对象
        let formValue = this.refs.getFormValue;
        formValue.validateFields((err, values) => {
            if (!err) {
                console.log(values);//这里可以拿到数据
                //这里可以提交表单数据
                axios.ajax({
                    url: '/user/add',
                    data: {
                        params: values
                    }
                }).then((res) => {
                    console.log(res)
                    if(this.state.type==''){
                        if (res.code == 0) {
                            message.info("添加成功")
                        }
                    }
                   
                })
                this.setState({
                    visible: false,
                    selectedRowKeys: [],
                    selectedItem: []
                });
                //调用表单对象的重置方法，将表单重置为空
                formValue.resetFields()
            } else {
                console.log(err)
            }
        });
    }

    handleCancel = (e) => {
        //得到表单对象
        this.setState({
            visible: false,
            selectedRowKeys: [],
            selectedItem: []
        });
        let formValue = this.refs.getFormValue;
        formValue.resetFields() //清空表单
    }


    formList = [
        {
            type: 'INPUT',
            label: '用户名',
            key: 'user_name',
            field: 'user_name',
            placeholder: '请输入用户名称',
            width: 80
        },
        {
            type: 'DATE',
            label: '请选择入职日期',
            field: 'user_date',
            key: 'user_date',
            placeholder: '请输入日期',
            width: 150
        }
    ]
    filterSubmit = (params) => {
        let user_date = new Date(params.user_date).getTime();
        this.params = {
            page: 1,
            ...params,
            user_date
        }
        this.requestList();
    }
    /*
    *selectedRowKeys  被选中项的下标
    *selectedItem   被选中项
    */
    onRowClick = (record, index) => {
        const selectedRowKeys = [...this.state.selectedRowKeys];
        const selectedItem = [...this.state.selectedItem];
        //判断数组中是否包含某个对象
        const result = selectedItem.some(item => {
            if (item.key == index) {
                return true
            }
        })

        if (selectedRowKeys.indexOf(index) >= 0 && result == true) {
            let key = selectedRowKeys.indexOf(index);
            selectedRowKeys.splice(key, 1);
            selectedItem.splice(key, 1)
        } else {
            selectedRowKeys.push(index);
            selectedItem.push(record)
        }
        this.setState({ selectedRowKeys, selectedItem }, () => {
            console.log(this.state.selectedRowKeys)
        });
    }

    //全选
    onSelectedRowKeysChange = (selectedRowKeys, selectedItem) => {
        this.setState({ selectedRowKeys, selectedItem }, () => {
            console.log(selectedRowKeys, selectedItem)
        });
    }

    render() {
        const columns = [{
            title: 'id',
            dataIndex: 'id'
        }, {
            title: '用户名',
            dataIndex: 'name'
        }, {
            title: '性别',
            dataIndex: 'sex',
            render(sex) {
                return sex == 1 ? '男' : '女'
            }
        }, {
            title: "婚否",
            dataIndex: "isMarried",
            render(isMarried) {
                return isMarried == 1 ? "已婚" : "未婚"
            }
        }, {
            title: '心情状态',
            dataIndex: 'state',
            render(state) {
                let config = {
                    '1': '开心',
                    '2': '快乐',
                    '3': '幸福',
                    '4': '积极向上',
                    '5': '勇往直前'
                }
                return config[state];
            }
        }, {
            title: '生日',
            dataIndex: 'birthday'
        }, {
            title: '联系地址',
            dataIndex: 'address'
        }];
        const { selectedRowKeys, selectedItem } = this.state;
        const rowSelection = {
            type: "checkbox",
            selectedRowKeys,  //记录的是单选框被选中
            selectedItem,
            onChange: this.onSelectedRowKeysChange,
        };
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.filterSubmit}></BaseForm>
                </Card>
                <Card>
                    <Button type="primary" onClick={this.addUser}>创建员工</Button>
                    <Button type="primary" onClick={this.editUser}>编辑员工</Button>
                    <Button type="primary" onClick={this.userDetail}>员工详情</Button>
                    <Button type="primary" onClick={this.deleteUser}>删除员工</Button>
                </Card>
                <Card style={{ borderTop: '0px' }}>
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
                </Card>
                <Modal
                    title="填写用户信息"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText='确认'
                    cancelText='取消'
                >
                    <AddFormWrap ref="getFormValue" addForm={this.state.addForm} type={this.state.type}></AddFormWrap>
                </Modal>
            </div>
        )
    }
}

class addForm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { addForm, type } = this.props;
        console.log(type)
        const formItemLayout = {
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 13
            }
        };
        const { getFieldDecorator } = this.props.form;
        const dateFormat = 'YYYY/MM/DD';

        return (
            <Form layout='horizontal'>
                <FormItem label="用户名" {...formItemLayout}>
                    {type == "detail" ? addForm.name : getFieldDecorator('name', {
                        initialValue: addForm.name,
                        rules: [{ type: 'string', required: true, message: '请输入用户名' }],
                    })(
                        <Input type="text"></Input>
                    )}
                </FormItem>
                <FormItem label="性别" {...formItemLayout}>
                    {type == "detail" ? addForm.sex :getFieldDecorator('sex', {
                        initialValue: addForm.sex,
                        rules: [{ type: 'number', required: true, message: '请选择性别' }],
                    })(
                        <RadioGroup>
                            <Radio value={1}>男</Radio>
                            <Radio value={2}>女</Radio>
                        </RadioGroup>
                    )}

                </FormItem>
                <FormItem label="婚否" {...formItemLayout}>
                    {type == "detail" ? addForm.isMarried :getFieldDecorator('isMarried', {
                        initialValue: addForm.isMarried,
                        rules: [{ type: 'number', required: true, message: '请选择婚姻状况' }],
                    })(
                        <RadioGroup>
                            <Radio value={1}>已婚</Radio>
                            <Radio value={2}>未婚</Radio>
                        </RadioGroup>
                    )}

                </FormItem>
                <FormItem label="心情状态" {...formItemLayout}>
                    {type == "detail" ? addForm.state :getFieldDecorator('state', {
                        initialValue: addForm.state,
                        rules: [{ type: 'number', required: true, message: '请输入近期状态' }],
                    })(
                        <Select style={{ width: 120 }}>
                            <Option value={1}>开心</Option>
                            <Option value={2}>快乐</Option>
                            <Option value={3}>幸福</Option>
                            <Option value={4}>积极向上</Option>
                            <Option value={5}>勇往直前</Option>
                        </Select>
                    )}

                </FormItem>
                <FormItem label="生日" {...formItemLayout}>
                    {type == "detail" ? addForm.birthday :getFieldDecorator('birthday', {
                        initialValue: moment(addForm.birthday),
                        rules: [{ type: 'object', required: true, message: '请选择日期' }],
                    })(
                        <DatePicker format={dateFormat}></DatePicker>
                    )}
                </FormItem>
                <FormItem label="联系地址" {...formItemLayout}>
                    {type == "detail" ? addForm.address :getFieldDecorator('address', {
                        initialValue: addForm.address,
                        rules: [{ type: 'string', required: true, message: '请输入地址' }],
                    })(
                        <TextArea row={4}></TextArea>
                    )}
                </FormItem>
            </Form>
        )
    }
}
const AddFormWrap = Form.create()(addForm);