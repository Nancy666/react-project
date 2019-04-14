import React, { Component } from 'react';

import { Card, Spin, Icon, Alert,Switch } from 'antd'
import './index.less'

export default class Loadings extends Component {
    state={
        isSpin1:false,
        isSpin2:false
    }
    changeLoading1=(value)=>{
        this.setState({
            isSpin1:value
        })
    }
    changeLoading2=(value)=>{
        this.setState({
            isSpin2:value
        })
    }
    render() {
        const antIcon = <Icon type="loading" style={{ fontSize: 24 }} />
        return (
            <div className="loadingWrap">
                <Card title='spin的用法'>
                    <Spin size="small" className="spin" />
                    <Spin size="default" className="spin" />
                    <Spin size="large" className="spin" />
                    <Spin indicator={antIcon}></Spin>
                </Card>
                <Card title='spin的用法'>
                    <Spin size="default" className="spin" spinning={this.state.isSpin1} tip="加载中...">
                        <Alert
                            message="Alert message title"
                            description="Further details about the context of this alert."
                            type="info"   
                        />
                    </Spin>
                    开关：<Switch onChange={this.changeLoading1} className="switch"/>
                    <Spin size="default" className="spin" spinning={this.state.isSpin2} tip="加载中..." indicator={antIcon}>
                        <Alert
                            message="Alert message title"
                            description="Further details about the context of this alert."
                            type="warning"   
                        />
                    </Spin>
                    开关：<Switch onChange={this.changeLoading2} className="switch"/>
                </Card>
            </div>
        )
    }
}