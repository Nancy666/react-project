import React, { Component } from 'react';
import { Card, Row, Col, Modal } from 'antd';
const { Meta } = Card;
// import './index.less';
export default class Gallery extends Component {
    state = {
        visible: false,
        imgUrl: '',
        imgs: [
            ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png"],
            ["7.png", "9.png", "8.png", "10.png", "11.png", "16.png"],
            ["12.png", "14.png", "15.png", "13.png", "17.png", "18.png"],
            ["19.png", "20.png", "21.png", "22.png", "23.png", "24.png"]
        ]
    }
    showModal = (item) => {
        this.setState({
            visible: true,
            imgUrl: `/gallery/${item}`
        });
    }
    handleCancel = () => {
        this.setState({
            visible: false
        })
    }
    render() {
        const imgList = this.state.imgs.map((list) => list.map((item) =>
            <Card
                hoverable
                cover={<img alt="example" src={"/gallery/" + item} onClick={() => this.showModal(item)} />}
            >
                <Meta
                    title="Europe Street beat"
                    description="www.instagram.com"
                />
            </Card>
        ))

        return (
            <div className="galleryWrap">
                <Row gutter={10}>
                    {
                        imgList.map((i, index) =>
                            <Col span={6}>
                                {imgList[index]}
                            </Col>
                        )
                    }
                </Row>
                <Modal
                    title="图片展示"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <img src={this.state.imgUrl} style={{ width: '100%' }} />
                </Modal>
            </div>
        )
    }
}