import React, { Component } from 'react';
import { Card, Table, Modal, Button, message } from 'antd';
import Axios from './../../../axios';
import Utils from './../../../utils/utils';

// import './index.less';
export default class BasicTable extends Component {
	state = {
		data: null,
		data2: [],
		selectedRowKeys: null,
		selectedItem: null,
		selectedIds: [],   //多选选中的项的ID的数组
		selectedRows: null ,    //多选选中的项
		
	}
	params={
		page:1
	}
	componentDidMount() {
		let data = [{
			key: '0',
			id: '1',
			name: '胡彦斌',
			age: 32,
			sex: 1,
			address: '西湖区湖底公园1号',
			birthday: '2018-01-01'
		}, {
			key: '1',
			id: '2',
			name: '胡彦祖',
			age: 42,
			sex: "1",
			address: '西湖区湖底公园1号',
			birthday: '2018-01-01'
		}];
		this.setState({
			data: data
		})
		this.request()
	}
	request = () => {
		var _this = this;
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
				data2: res.result.list,
				selectedRowKeys:[],
				selectedRows:null,
				pagination:Utils.pagination(res,(current)=>{
					//to-do
					console.log(res)
					_this.params.page = current;
					this.request()
				})
			})
		})
	}
	/*
	* recode  选中的某一行的值
	* index   选中的某一行的下标
	*/
	onRowClick = (recode, index) => {
		console.log(recode, index)
		const selected = [index + 1];
		this.setState({
			selectedRowKeys: selected,
			selectedItem: recode
		})
		Modal.info({
			title: "内容",
			content: `用户名为：${recode.name}，年龄是${recode.age}岁`
		})

	}
	//多选
	onSelectChange = (selectedRowKeys, selectedRows) => {
		// console.log('selectedRowKeys changed: ', selectedRowKeys,selectedRows);
		let ids = [];
		selectedRows.map((item, index) => {
			ids.push(item.id)
		})

		this.setState({
			selectedRowKeys,
			selectedIds: ids,
			selectedRows
		});
	}
	//多选删除操作
	handleDelete = () => {
		let selectedRows = this.state.selectedRows;
		console.log(selectedRows)
		let ids = [];
		selectedRows.map((item, index) => {
			ids.push(item.id)
		})
		Modal.confirm({
			title: "你确定要删除这些吗？",
			content: `${ids.join(",")}`,
			okText:"确认",
			cancelText:"取消",
			onOk:()=>{
				message.success('删除成功')
				this.request();   //删除成功以后重新请求一次数据，并将原来的selectedRows和selectedRowKeys重置为空。
			}	
		})
	}
	render() {
		const columns = [{
			title: 'id',
			dataIndex: 'id',   //定义的字段
			key: 'id'
		}, {
			title: '用户名',
			dataIndex: 'name',   //定义的字段
			key: 'name'
		}, {
			title: '年龄',
			dataIndex: 'age',
			key: 'age'
		}, {
			title: '性别',
			dataIndex: 'sex',
			key: 'sex',
			render(sex) {
				return sex == 1 ? "男" : "女"
			}
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
			}
		}, {
			title: '住址',
			dataIndex: 'address',
			key: 'address'
		}, {
			title: '生日',
			dataIndex: 'birthday',
			key: 'birthday'
		}];
		const {selectedRowKeys,selectedRows} = this.state;
		const rowSelection = {
			type: "radio",
			selectedRowKeys  //记录的是单选框被选中
		};
		const rowCheckboxSelection = {
			type: "checkbox",
			selectedRowKeys,
			selectedRows,
			onChange: this.onSelectChange,
		};
		return (
			<div className="table-wrap">
				<Card title="基础表格">
					<Table
						columns={columns}
						dataSource={this.state.data}
						bordered={true}
						pagination={false}
					/>
				</Card>
				<Card title="动态数据渲染表格-Mock">
					<Table
						columns={columns}
						dataSource={this.state.data2}
						bordered={true}
						pagination={false}
					/>
				</Card>
				<Card title="动态数据渲染表格-单选-Mock">
					<Table
						columns={columns}
						dataSource={this.state.data2}
						bordered={true}
						pagination={false}
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
				<Card title="动态数据渲染表格-多选-Mock">
					<div>
						<Button type="primary" style={{ marginBottom: 10 }} onClick={this.handleDelete}>删除</Button>
					</div>
					<Table
						columns={columns}
						dataSource={this.state.data2}
						bordered={true}
						pagination={false}
						rowSelection={rowCheckboxSelection}   //表格行是否可选择
					/>
				</Card>
				<Card title="动态数据渲染表格-分页-Mock">
					<Table
						columns={columns}
						dataSource={this.state.data2}
						bordered={true}
						pagination={this.state.pagination}
					/>
				</Card>
			</div>
		)
	}
}