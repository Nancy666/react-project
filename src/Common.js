import React, { Component } from 'react';
import { Row } from 'antd';

import Header from './components/Header';

import './style/common.less';

export default class Common extends Component {
    render() {
        return (
            <div>
                <Row className="simple-header">
                    <Header menuType="second"></Header>
                </Row>
                <Row>
                    {this.props.children}
                </Row>

            </div>
        )
    }
}