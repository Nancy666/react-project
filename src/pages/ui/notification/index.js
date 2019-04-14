import React, { Component } from 'react';
import { Card, Button, notification } from 'antd'

// import './index.less';
export default class Notification extends Component {
    openNotification = (type, place) => {
        if (place) {
            notification.config({   //全局位置设置，全局生效
                placement: place
            });
        }
        notification[type]({
            message: '发工资了！',
            description: '好开心呀*v*'
        })
    }
    render() {
        return (
            <div className="loadingWrap">
                <Card title="通知提醒框">
                    <Button type="primary" onClick={() => this.openNotification("success")}>Success</Button>
                    <Button type="primary" onClick={() => this.openNotification("info")}>Warning</Button>
                    <Button type="primary" onClick={() => this.openNotification("warning")}>Info</Button>
                    <Button type="primary" onClick={() => this.openNotification("error")}>Error</Button>
                    <Button type="primary" onClick={() => this.openNotification("warn")}>Warn</Button>
                    <Button type="primary" onClick={() => this.openNotification("open")}>Open</Button>
                </Card>
                <Card title="通知提醒框">
                    <Button type="primary" onClick={() => this.openNotification("success", "topLeft")}>topLeftSuccess</Button>
                    <Button type="primary" onClick={() => this.openNotification("info", "topRight")}>topRightWarning</Button>
                    <Button type="primary" onClick={() => this.openNotification("warning", "bottomLeft")}>bottomLeftInfo</Button>
                    <Button type="primary" onClick={() => this.openNotification("error", "bottomRight")}>bottomRightError</Button>
                </Card>
            </div>
        )
    }
}