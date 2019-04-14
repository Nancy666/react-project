import React, { Component } from 'react';
import { Modal, Button, Card } from 'antd';
import './index.less';

export default class Modals extends Component {
    state = {
        visible1: false,
        visible2: false,
        visible3: false,
        visible4: false
    }
    showModal = (type) => {
        this.setState({
            [type]: true
        })
    }
    handleOk = (type) => {
        this.setState({
            [type]: false
        })
    }
    handleCancel = (type) => {
        this.setState({
            [type]: false
        })
    }
    showConfirm = (type) => {
        Modal[type]({
            title: "删除",
            content: '你确定要删除吗？',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        })
    }
    render() {
        return (
            <div className="modalsWrap">
                <Card title="基础对话框">
                    <Button type="primary" onClick={() => this.showModal("visible1")}>
                        Open
                    </Button>
                    <Button type="primary" onClick={() => this.showModal("visible2")}>
                        垂直居中弹框
                    </Button>
                    <Button type="primary" onClick={() => this.showModal("visible3")}>
                        距离顶部20px
                    </Button>
                    <Button type="primary" onClick={() => this.showModal("visible4")}>
                        自定义按钮文字
                    </Button>
                    <Modal
                        title="基础对话框"
                        visible={this.state.visible1}
                        onOk={() => this.handleOk("visible1")}
                        onCancel={() => this.handleCancel("visible1")}
                    >
                        <p>Some contents...</p>
                    </Modal>
                    <Modal
                        title="垂直居中对话框"
                        visible={this.state.visible2}
                        onOk={() => this.handleOk("visible2")}
                        onCancel={() => this.handleCancel("visible2")}
                        centered
                    >
                        <p>今天你学会react了吗</p>
                    </Modal>
                    <Modal
                        title="距离顶部20px对话框"
                        visible={this.state.visible3}
                        onOk={() => this.handleOk("visible3")}
                        onCancel={() => this.handleCancel("visible3")}
                        style={{ top: 20 }}
                    >
                        <p>哈哈哈哈哈</p>
                    </Modal>
                    <Modal
                        title="自定义按钮文字"
                        visible={this.state.visible4}
                        onOk={() => this.handleOk("visible4")}
                        onCancel={() => this.handleCancel("visible4")}
                        okText="好的"
                        cancelText="算了吧"
                    >
                        <p>Bla bla ...</p>
                        <p>Bla bla ...</p>
                        <p>Bla bla ...</p>
                    </Modal>

                </Card>
                <Card title="信息确认框">
                    <Button type="primary" onClick={() => this.showConfirm("confirm")}>
                        Confirm
                    </Button>
                    <Button type="primary" onClick={() => this.showConfirm("success")}>
                        Success
                    </Button>
                    <Button type="primary" onClick={() => this.showConfirm("error")}>
                        Error
                    </Button>
                    <Button type="primary" onClick={() => this.showConfirm("warning")}>
                        Warning
                    </Button>
                    <Button type="primary" onClick={() => this.showConfirm("info")}>
                        Info
                    </Button>
                </Card>
            </div>
        )
    }
}