import React, { Component } from 'react';
import { Button, Form, Select, Checkbox, Input, DatePicker } from 'antd';
import Utils from './../../utils/utils';
const FormItem = Form.Item;
const Option = Select.Option;
class FilterForm extends Component {
    // 查询
    handleFilterSubmit = () => {
        let fieldsValue = this.props.form.getFieldsValue();
        this.props.filterSubmit(fieldsValue);
    }
    //重置
    reset = () => {
        this.props.form.resetFields();
    }
    initFormList = () => {
        const { getFieldDecorator } = this.props.form;
        const formList = this.props.formList;
        const formItemList = [];
        if (formList && formList.length > 0) {
            formList.forEach((item, index) => {
                let label = item.label;
                let field = item.field;
                let initialValue = item.initialValue || '';
                let placeholder = item.placeholder;
                let width = item.width;
                let optionList = item.list;
                if (item.type == "时间查询") {
                    const begin_time = <FormItem label="订单时间" key="begin_time">
                        {
                            getFieldDecorator("begin_time")(
                                <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss"></DatePicker>
                            )
                        }
                    </FormItem>
                    formItemList.push(begin_time)
                    const end_time = <FormItem label="~&nbsp;" colon={false} key="end_time">
                        {
                            getFieldDecorator("end_time")(
                                <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss"></DatePicker>
                            )
                        }
                    </FormItem>
                    formItemList.push(end_time)
                } else if (item.type == "INPUT") {
                    const INPUT = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator(field, {
                                initialValue: initialValue
                            })(
                                <Input type="text" placeholder={placeholder}></Input>
                            )
                        }
                    </FormItem>
                    formItemList.push(INPUT)
                } else if (item.type == "SELECT") {
                    const SELECT = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator(field, {
                                initialValue: initialValue
                            })(
                                <Select style={{ width: width }} placeholder={placeholder}>
                                    {
                                        optionList.map((item, index) => {
                                            return <Option key={item.name} value={item.id}>{item.name}</Option>
                                        })
                                    }
                                </Select>
                            )
                        }
                    </FormItem>
                    formItemList.push(SELECT)
                } else if (item.type == "CHECKBOX") {
                    const CHECKBOX = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field], {
                                valuePropName: 'checkbox',
                                initialValue: initialValue
                            })(
                                <Checkbox>{label}</Checkbox>
                            )
                        }
                    </FormItem>
                    formItemList.push(CHECKBOX)
                } else if (item.type == "DATE") {
                    const DATE = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field], {
                            })(
                                <DatePicker>{label}</DatePicker>
                            )
                        }
                    </FormItem>
                    formItemList.push(DATE)
                }
            })
        }
        return formItemList;
    }
    render() {
        return (
            <Form layout="inline" >
                {this.initFormList()}
                <FormItem>
                    <Button type="primary" onClick={this.handleFilterSubmit}>查询</Button>
                    <Button type="primary" onClick={this.reset}>重置</Button>
                </FormItem>
            </Form>
        )
    }
}
export default Form.create({})(FilterForm);
