import React, { Component } from 'react';
import { Card, Form, Icon, Input, Button, Checkbox } from 'antd';
// import './index.less';
const FormItem = Form.Item;
class FormLogin extends Component {
    // componentDidMount() {
    //     // To disabled submit button at the beginning.
    //     this.props.form.validateFields();
    //   }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login-wrap">
                <Card title="表单登录">
                    <Form layout="vertical" style={{ width: "300px" }}>
                        <FormItem>
                            {
                                getFieldDecorator('userName', {
                                    rules: [
                                        { required: true, message: '用户名不能为空' },
                                        { min: 5, max: 10, message: "长度不在范围内" },
                                        { pattern: /^\w+$/g, message: "用户名必须为字母或数字" }
                                    ]
                                })(
                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('pwd', {
                                    rules: [{ required: true, message: '密码不能为空' }]
                                })(
                                    <Input type="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="密码" />
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('rememder', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                    rules: []
                                })(
                                    <Checkbox>Remember me</Checkbox>
                                )
                            }
                            < a href="" style={{float:'right'}}>Forgot password</a>
                        </FormItem>
                        <Button type="primary" style={{ width: "100%" }} htmlType="submit" onClick={this.handleSubmit}>登录</Button>
                    </Form>
                </Card>

            </div >
        )
    }
}
export default FormLogin = Form.create({})(FormLogin)