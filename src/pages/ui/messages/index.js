import React, { Component } from 'react';
import { Card, Button, message } from 'antd';
// import './index.less';
export default class Messages extends Component {
    showMessages = (type) => {
        message[type]("请注意安全")
    }
    showMes=()=>{
        const hide=message.loading("进行中...");
        setInterval(hide,500)
    }
    render() {
        return (
            <div className="messageWrap">
                <Card title="全局提示框">
                    <Button type="primary" onClick={() => this.showMessages("info")}>Info</Button>
                    <Button type="primary" onClick={() => this.showMessages("success")}>Success</Button>
                    <Button type="primary" onClick={() => this.showMessages("error")}>Error</Button>
                    <Button type="primary" onClick={() => this.showMessages("warning")}>Warning</Button>
                    <Button type="primary" onClick={() => this.showMessages("loading")}>Loading</Button>
                    <Button type="primary" onClick={ this.showMes }>异步移除</Button>
                </Card>
            </div>
        )
    }
}