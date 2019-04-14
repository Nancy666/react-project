import React, { Component } from 'react';
import { Button, Form, Select, Checkbox, Input, DatePicker, Table } from 'antd';
import Utils from './../../utils/utils';
export default class Etable extends Component {
    tableInit = () => {
        return <Table
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
    }
    render() {
        return <div>

        </div>
    }
}