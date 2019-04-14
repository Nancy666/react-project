import React, { Component } from 'react';
import { Card, Table, Badge, Popconfirm } from 'antd';
import Axios from './../../../axios';
// import Utils from './../../../utils/utils';

// import './index.less';
export default class HighTable extends Component {
    state = {
        dataSource: [],
        sortOrder: ''
    }
    params = {
        page: 1
    }
    componentDidMount() {
        this.request();
    }
    request = () => {
        // var _this = this;
        Axios.ajax({
            url: "/table/list",
            data: {
                params: {
                    page: this.params.page
                },
                isShowLoading: true
            }
        }).then(res => {
            this.setState({
                dataSource: res.result.list
            })
        })
    }
    handleSort = (pagination, filters, sorter) => {
        this.setState({
            sortOrder: sorter.order
        })
        console.log(sorter.order)
    }
    handleDeleteItem = (id) => {
        console.log(id)
        // console.log(r)
        //         Modal.confirm(
        //             {
        //                 title: '确认',
        //                 content: '你确定要删除这一项吗？',
        //                 onOk() {
        //                     message.success("删除成功")

        //                 },
        //                 onCancel() { },
        //             }
        //         )
        //         this.request()
    }
    render() {
        const columns = [{
            title: 'id',
            dataIndex: 'id',   //定义的字段
            key: 'id',
            width: 130
        }, {
            title: '用户名',
            dataIndex: 'name',   //定义的字段
            key: 'name',
            width: 150
        }, {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
            width: 150
        }, {
            title: '性别',
            dataIndex: 'sex',
            key: 'sex',
            render(sex) {
                return sex == 1 ? "男" : "女"
            },
            width: 150
        }, {
            title: '状态',
            dataIndex: 'state',
            key: 'state',
            render(state) {
                let config = {
                    "1": "绝色美女",
                    "2": "风流才子",
                    "3": "咸鱼一条",
                    "4": "有点无聊",
                    "5": "百度FE"
                }
                return config[state]
            },
            width: 150
        }, {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
            width: 200
        }, {
            title: '生日',
            dataIndex: 'birthday',
            key: 'birthday',
            width: 150
        }];

        const columns2 = [{
            title: 'id',
            dataIndex: 'id',   //定义的字段
            key: 'id',
            width: 100,
            fixed: 'left'
        }, {
            title: '用户名',
            dataIndex: 'name',   //定义的字段
            key: 'name',
            width: 100,
            fixed: 'left'
        }, {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
            width: 150,
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.age - b.age,
        }, {
            title: '性别',
            dataIndex: 'sex',
            key: 'sex',
            render(sex) {
                return sex == 1 ? "男" : "女"
            },
            width: 150
        }, {
            title: '状态',
            dataIndex: 'state',
            key: 'state',
            render(state) {
                let config = {
                    "1": "绝色美女",
                    "2": "风流才子",
                    "3": "咸鱼一条",
                    "4": "有点无聊",
                    "5": "百度FE"
                }
                return config[state]
            },
            width: 150
        }, {
            title: '住址',
            dataIndex: 'address',
            key: 'address1',
            width: 200
        }, {
            title: '住址',
            dataIndex: 'address',
            key: 'address2',
            width: 200
        }, {
            title: '住址',
            dataIndex: 'address',
            key: 'address3',
            width: 200
        }, {
            title: '住址',
            dataIndex: 'address',
            key: 'address4',
            width: 200
        }, {
            title: '住址',
            dataIndex: 'address',
            key: 'address5',
            width: 200
        }, {
            title: '住址',
            dataIndex: 'address',
            key: 'address6',
            width: 200
        }, {
            title: '住址',
            dataIndex: 'address',
            key: 'address7',
            width: 200
        }, {
            title: '住址',
            dataIndex: 'address',
            key: 'address8',
            width: 200
        }, {
            title: '生日',
            dataIndex: 'birthday',
            key: 'birthday',
            width: 150,
            fixed: "right"
        }];

        const columns3 = [{
            title: 'id',
            dataIndex: 'id',   //定义的字段
            key: 'id',
            width: 100
        }, {
            title: '用户名',
            dataIndex: 'name',   //定义的字段
            key: 'name',
            width: 100,
        }, {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
            width: 150,
            sortOrder: this.state.sortOrder,
            sorter: (a, b) => a.age - b.age,
        }, {
            title: '性别',
            dataIndex: 'sex',
            key: 'sex',
            render(sex) {
                return sex == 1 ? "男" : "女"
            },
            width: 150
        }, {
            title: '状态',
            dataIndex: 'state',
            key: 'state',
            render(state) {
                let config = {
                    "1": "绝色美女",
                    "2": "风流才子",
                    "3": "咸鱼一条",
                    "4": "有点无聊",
                    "5": "百度FE"
                }
                return config[state]
            },
            width: 150
        }, {
            title: '住址',
            dataIndex: 'address',
            key: 'address1',
            width: 200
        }, {
            title: '生日',
            dataIndex: 'birthday',
            key: 'birthday',
            width: 150
        }];


        const columns4 = [{
            title: 'id',
            dataIndex: 'id',   //定义的字段
            key: 'id',
            width: 100
        }, {
            title: '用户名',
            dataIndex: 'name',   //定义的字段
            key: 'name',
            width: 100,
        }, {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
            width: 150
        }, {
            title: '性别',
            dataIndex: 'sex',
            key: 'sex',
            render(sex) {
                return sex == 1 ? "男" : "女"
            },
            width: 150
        }, {
            title: '状态',
            dataIndex: 'state',
            key: 'state',
            render(state) {
                let config = {
                    "1": <Badge status="success" text="已完成" />,
                    "2": <Badge status="processing" text="进行中" />,
                    "3": <Badge status="error" text="未开启" />
                }
                return config[state]
            },
            width: 150
        }, {
            title: '住址',
            dataIndex: 'address',
            key: 'address1',
            width: 200
        }, {
            title: '操作',
            width: 150,
            render: (text, record, index) => {
                //获取该行的id，可以获取的到，传到函数里的时候打印直接把整个表格所有行id全部打印了
                const Id = record.id;
                // console.log(text, record, index)
                // return (
                //     <Button onClick={(Id,recode)=>{this.handleDeleteItem(Id,recode)}}>删除</Button>
                // )
                return (
                    <Popconfirm title="确定删除？" onConfirm={() => this.handleDeleteItem(Id)}>
                        <a href="#">删除</a>
                    </Popconfirm>
                );
            }
        }];
        return (
            <div>
                <Card title="表头固定">
                    <Table
                        columns={columns}
                        dataSource={this.state.dataSource}
                        bordered={true}
                        pagination={true}
                        scroll={{ y: 240 }}
                    />
                </Card>
                <Card title="左侧固定-Mock">
                    <Table
                        columns={columns2}
                        dataSource={this.state.dataSource}
                        bordered={true}
                        pagination={false}
                        scroll={{ x: 2410 }}
                    />
                </Card>
                <Card title="年龄排序-Mock">
                    <Table
                        columns={columns3}
                        dataSource={this.state.dataSource}
                        bordered={true}
                        pagination={false}
                        onChange={this.handleSort}
                    />
                </Card>
                <Card title="操作按钮-Mock">
                    <Table
                        columns={columns4}
                        dataSource={this.state.dataSource}
                        bordered={true}
                        pagination={false}
                    />
                </Card>
            </div>
        )
    }
}