import React, { Component } from 'react';
import { Card, Col, Row } from 'antd';
import axios from '../../axios';
import './detail.less'
class Detail extends Component {
    state = {}
    componentDidMount() {
        let orderId = this.props.match.params.orderId;  //获取路由参数
        if (orderId) {
            this.getDetailInfo(orderId)
        }
    }
    getDetailInfo = (orderId) => {
        axios.ajax({
            url: "/order/detail",
            data: {
                params: {
                    orderId: orderId
                }
            },
            isShowLoading: true
        }).then((res) => {
            if (res.code === "0") {
                this.setState({
                    orderInfo: res.result
                })
                this.renderMap(res.result)
            }
        })
    }
    // 渲染地图
    renderMap = (result) => {
        // 创建地图实例，并将实例挂载到组件上,必须加window，不然报错
        this.map = new window.BMap.Map("orderDetailMap");
        this.map.enableScrollWheelZoom(true);  //鼠标滚轮缩放
        this.addMapControl()
        this.drawBikeRoute(result.position_list)
        this.drawBikeArea(result.area)
    }
    // 添加地图控件
    addMapControl = () => {
        this.map.addControl(new window.BMap.NavigationControl());
        this.map.addControl(new window.BMap.ScaleControl({ anchor: window.BMAP_ANCHOR_TOP_LEFT }));
        this.map.addControl(new window.BMap.OverviewMapControl());
        this.map.addControl(new window.BMap.MapTypeControl());
    }

    //绘制用户的行驶路线
    drawBikeRoute = (positionList) => {
        let map = this.map;
        let startPoint = '';
        let endPoint = '';
        if (positionList.length > 0) {
            let first = positionList[0];
            let last = positionList[positionList.length - 1];
            // 创建起点坐标
            startPoint = new window.BMap.Point(first.lon, first.lat)
            let startIcon = new window.BMap.Icon("/asset/start_point.png", new window.BMap.Size(36, 42), {
                imageSize: new window.BMap.Size(36, 42),
                anchor: new window.BMap.Size(18, 42),
            })
            let startMarker = new window.BMap.Marker(startPoint, { icon: startIcon }); //创建标注
            map.addOverlay(startMarker);   //将标注添加到地图

            //创建终点坐标
            endPoint = new window.BMap.Point(last.lon, last.lat)
            let endIcon = new window.BMap.Icon("/asset/end_point.png", new window.BMap.Size(36, 42), {
                imageSize: new window.BMap.Size(36, 42),
                anchor: new window.BMap.Size(18, 42),
            })
            let endMarker = new window.BMap.Marker(endPoint, { icon: endIcon }); //创建标注
            map.addOverlay(endMarker);   //将标注添加到地图

            // 绘制折线
            let pointTrack = []
            for (let i = 0; i < positionList.length; i++) {
                pointTrack.push(new window.BMap.Point(positionList[i].lon, positionList[i].lat))
            }
            var polyline = new window.BMap.Polyline(pointTrack,
                { strokeColor: "red", strokeWeight: 4, strokeOpacity: 0.5 }
            );
            map.addOverlay(polyline);
            //设置地图中心点坐标
            map.centerAndZoom(endPoint, 11);
        }
    }

    // 绘制覆盖物
    drawBikeArea = (area) => {
        let map = this.map;
        let areaTrack = []
        for (let i = 0; i < area.length; i++) {
            areaTrack.push(new window.BMap.Point(area[i].lon, area[i].lat))
        }
        let polygon = new window.BMap.Polygon(areaTrack, {
            strokeColor: '#CE0000',
            strokeWeight: 4,
            strokeOpacity: 0.7,
            fillColor: '#ff8605',
            fillOpacity: 0.4
        });  //创建多边形
        map.addOverlay(polygon);
    }

    render() {
        const info = this.state.orderInfo || {};
        return <div className="detail-wrap">
            <Card>
                <div id="orderDetailMap"></div>
            </Card>
            <ul>
                <li className="item-detail">
                    <div className="item-title">用户信息</div>
                    <Row className="item-line">
                        <Col span={3} offset={4}>用车模式</Col>
                        <Col span={17}>{info.mode == 2 ? "停车点" : "服务区"}</Col>
                    </Row>
                    <Row className="item-line">
                        <Col span={3} offset={4}>订单编号</Col>
                        <Col span={17}>{info.order_sn}</Col>
                    </Row>
                    <Row className="item-line">
                        <Col span={3} offset={4}>车辆编号</Col>
                        <Col span={17}>{info.bike_sn}</Col>
                    </Row>
                    <Row className="item-line">
                        <Col span={3} offset={4}>用户姓名</Col>
                        <Col span={17}>{info.user_name}</Col>
                    </Row>
                    <Row className="item-line">
                        <Col span={3} offset={4}>手机号码</Col>
                        <Col span={17}>{info.mobile}</Col>
                    </Row>
                </li>
                <li className="item-detail">
                    <div className="item-title">行驶轨迹</div>
                    <Row className="item-line">
                        <Col span={3} offset={4}>行程起点</Col>
                        <Col span={17}>{info.start_location}</Col>
                    </Row>
                    <Row className="item-line">
                        <Col span={3} offset={4}>行程终点</Col>
                        <Col span={17}>{info.end_location}</Col>
                    </Row>
                    <Row className="item-line">
                        <Col span={3} offset={4}>行驶里程</Col>
                        <Col span={17}>{info.distance / 1000}公里</Col>
                    </Row>
                </li>
            </ul>
        </div>
    }
}

export default Detail;