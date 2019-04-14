import React, { Component } from 'react';
import { Card, Form, Button, Input, Checkbox, Radio, Select, Switch, DatePicker, TimePicker, Upload, Icon, InputNumber } from 'antd';
import moment from "moment";
// import './index.less';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TextArea = Input.TextArea;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
class FormReg extends Component {
    state = {
        loading: false,
        imageUrl:''
      }

      handleChange = (info) => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, imageUrl => this.setState({
            imageUrl,
            loading: false,
          }));
        }
      }
      handleReg = (e) =>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
            }
        });
      }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: 24,
                sm: 4
            },
            wrapperCol: {
                xs: 24,
                sm: 12
            }
        }
        const offsetLayout = {
            wrapperCol:{
                sm:{
                    span:24,
                    offset:4
                }
            }
        }
        const uploadButton = (
            <div>
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">上传</div>
            </div>
          );
        return (
            <div className="reg-wrap">
                <Card title="表单注册">
                    <Form layout="horizontal">
                        <FormItem label="用户名" {...formItemLayout}>
                            {getFieldDecorator('userName', {
                                initialValue: '',
                                rules: [{
                                    required: true, message: '用户名不能为空',
                                }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="密码" {...formItemLayout}>
                            {getFieldDecorator('userPwd', {
                                initialValue: '',
                                rules: [{
                                    required: true, message: '密码不能为空',
                                }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="性别" {...formItemLayout}>
                            {getFieldDecorator('sex', {
                                initialValue: '1',
                                rules: [{}],
                            })(
                                <RadioGroup>
                                    <Radio value="male">男</Radio>
                                    <Radio value="female">女</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                        <FormItem label="年龄" {...formItemLayout}>
                            {getFieldDecorator('age', {
                                initialValue: '18',
                                rules: [{}],
                            })(
                                <InputNumber></InputNumber>
                            )}
                        </FormItem>
                        <FormItem label="当前状态" {...formItemLayout}>
                            {getFieldDecorator('state', {
                                initialValue: '2',
                                rules: [{}],
                            })(
                                <Select>
                                    <Option value="1">值1</Option>
                                    <Option value="2">值2</Option>
                                    <Option value="3">值3</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label="爱好" {...formItemLayout}>
                            {getFieldDecorator('hobby', {
                                initialValue: ["1","2"],
                                rules: [{
                                    required: true, message: '爱好不能为空',
                                }],
                            })(
                                <Select mode="multiple">
                                    <Option value="1">篮球</Option>
                                    <Option value="2">足球</Option>
                                    <Option value="3">羽毛球</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label="是否已婚" {...formItemLayout}>
                            {getFieldDecorator('isMarried', {
                                valuePropName:"checked",
                                initialValue: true
                            })(
                               <Switch></Switch>
                            )}
                        </FormItem>
                        <FormItem label="生日" {...formItemLayout}>
                            {getFieldDecorator('birthday', {
                                initialValue: moment("2018-08-08")   //将值传给后台时需要将moment对象转换为毫秒或者字符串
                            })(
                               <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"></DatePicker>
                            )}
                        </FormItem>
                        <FormItem label="联系地址" {...formItemLayout}>
                            {getFieldDecorator('address', {
                                initialValue: '北京市海淀区'   //将值传给后台时需要将moment对象转换为毫秒或者字符串
                            })(
                                <TextArea
                                    autosize={{minRows:4,maxRows:6}}
                                ></TextArea>
                            )}
                        </FormItem>
                        <FormItem label="早起时间" {...formItemLayout}>
                            {getFieldDecorator('time', {
                                
                            })(
                                <TimePicker>
                                ></TimePicker>
                            )}
                        </FormItem>
                        <FormItem label="头像" {...formItemLayout}>
                            {getFieldDecorator('imageUrl', {
                                initialValue: ''   
                            })(
                                <Upload
                                    listType="picture-card"
                                    action="//jsonplaceholder.typicode.com/posts/"
                                    onChange={this.handleChange}
                                    showUploadList={false}
                                    >
                                    {this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar" /> : uploadButton}
                                    </Upload>
                            )}

                        </FormItem>
                        <FormItem label="" {...offsetLayout}>
                            {getFieldDecorator('agreement', {
                                initialValue: ''   
                            })(
                               <Checkbox>我已阅读<a href="#">网络管理办法</a></Checkbox>
                            )}

                        </FormItem>
                        <FormItem {...offsetLayout}>
                               <Button type="primary" onClick={this.handleReg}>注册</Button>
                        </FormItem>
                    
                    </Form>
                </Card>
            </div>
        )
    }
}
export default FormReg = Form.create({})(FormReg)