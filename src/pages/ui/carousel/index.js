import React, { Component } from 'react';
import { Card, Carousel } from 'antd';
import './index.less';
export default class CarouselDemo extends Component {
    onChange(a) {
        console.log(a);
      }
    render() {
        return (
            <div className="carWrap">
                <Card title="走马灯">
                    <Carousel autoplay={true} effect="fade" vertical={false} afterChange={this.onChange}>
                        <div><h3>1</h3></div>
                        <div><h3>2</h3></div>
                        <div><h3>3</h3></div>
                        <div><h3>4</h3></div>
                    </Carousel>
                </Card>
                <Card title="走马灯">
                    <Carousel autoplay={true} effect="fade">
                        <img src="/carousel-img/carousel-1.jpg" alt=""/>
                        <img src="/carousel-img/carousel-2.jpg" alt=""/>
                        <img src="/carousel-img/carousel-3.jpg" alt=""/>
                    </Carousel>
                </Card>
            </div>
        )
    }
}