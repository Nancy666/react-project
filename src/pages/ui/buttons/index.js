import React, { Component } from 'react';
import './index.less';

import { Card, Button, Icon, Radio } from 'antd';

export default class Buttons extends Component {
    state = {
        loading: true,
        size:"default"
    }
    closeloading = () => {
        this.setState({
            loading: !this.state.loading
        })
    }
    handleSizeChange = (e) =>{
        this.setState({
            size:e.target.value
        })
    }
    render() {
        return (
            <div className="buttonWrap">
                <Card title="基础按钮" className="btnWrap">
                    <Button type="primary">主按钮</Button>
                    <Button>默认按钮</Button>
                    <Button type="dashed">按钮</Button>
                    <Button type="danger">按钮</Button>
                    <Button disabled={true}>禁用按钮</Button>
                </Card>
                <Card title="图形按钮" className="btnWrap">
                    <Button icon="plus">创建</Button>
                    <Button type="primary" icon="edit">编辑</Button>
                    <Button type="dashed" icon="delete">删除</Button>
                    <Button icon="search">搜索</Button>
                    <Button type="primary" icon="download">下载</Button>
                </Card>
                <Card title="loading按钮" className="btnWrap">
                    <Button type="primary" loading={this.state.loading}>提交</Button>
                    <Button type="primary" loading={this.state.loading} shape="circle"></Button>
                    <Button loading={this.state.loading}>点击加载</Button>
                    <Button type="primary" onClick={this.closeloading}>关闭</Button>
                </Card>
                <Card title="按钮组">
                    <Button.Group>
                        <Button type="primary">
                            <Icon type="left" />Go back
                        </Button>
                        <Button type="primary">
                            Go forward<Icon type="right" />
                        </Button>
                    </Button.Group>
                </Card>
                <Card title="按钮尺寸" className="btnWrap">
                    <Radio.Group onChange={this.handleSizeChange}>
                        <Radio value="large">大</Radio>
                        <Radio value="default">中</Radio>
                        <Radio value="small">小</Radio>
                    </Radio.Group>
                    <Button type="primary" size={this.state.size}>提交</Button>
                    <Button size={this.state.size}>默认按钮</Button>
                    <Button type="dashed" size={this.state.size}>次按钮</Button>
                </Card>
            </div>
        )
    }
}