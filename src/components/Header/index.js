import React, { Component } from 'react';
import Util from './../../utils/utils';
import moment from 'moment';
import 'moment/locale/zh-cn';
import Axios from './../../axios';

import './index.less'
import { Row, Col } from 'antd';

export default class Header extends Component {
    state={
        isMounted:false
    }
    constructor(props) {
        super(props)
        this.state = {
            currentUser: "Nancy",
            sysTime: null,
            city: "北京",
            weather: null,
            dayPicUrl: null
        }
    }
    //跨域方式调用百度api
    getWeatherAPIData() {
        Axios.jsonp({
            url: 'http://api.map.baidu.com/telematics/v3/weather?location=' + encodeURIComponent(this.state.city) + '&output=json&ak=3p49MVra6urFRGOT9s8UBWr2',
        }).then((res) => {
            if (res.status === "success") {
                let data = res.results[0].weather_data[0];
                if(this.state.isMounted){
                    this.setState({
                        weather: data.weather,
                        dayPicUrl: data.dayPictureUrl
                    })
                }
            }
        })
    }
    componentWillMount() {
        setInterval(() => {
            // let sysTime = moment().format('MMMM Do YYYY, h:mm:ss a')
            let sysTime = Util.dateFormat(new Date().getTime());
            this.setState({
                sysTime
            })
        }, 1000)    
            this.getWeatherAPIData()
    }
    render() {
        const menuType = this.props.menuType;
        return (
            <div className={menuType ? 'header bg' : "header"}>
                <Row className="header-top">
                    <Col span={24}>
                        {
                            menuType ? 
                            <div className="menuSecond">
                                <img src="/asset/logo-ant.svg" alt="" style={{float: "left",width: "40px",marginTop: "10px",marginLeft: "20px"}}/>
                                <span style={{float: "left",fontSize:"16px",padding: "0 20px"}}>爱玩啥后台管理系统</span>
                            </div> :"" 
                        }
                        <span>欢迎，{this.state.currentUser}</span>
                        <a>退出</a>
                    </Col>
                </Row>
                {
                    menuType ? '' : <Row className="breadcrumb">
                        <Col span={4} className="bread-title">首页</Col>
                        <Col span={20} className="weather">
                            <span className="date">{this.state.sysTime}</span>
                            <span className="weather">
                                <span className="dayPic"><img src={this.state.dayPicUrl} alt="" /></span>
                                <span className="weather-detail">{this.state.weather}</span>
                            </span>
                        </Col>
                    </Row>
                }
            </div>
        )
    }
}