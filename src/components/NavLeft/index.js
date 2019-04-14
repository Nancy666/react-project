import React, { Component } from 'react';
import MenuConfig from './../../config/menuConfig';
import './index.less';
import {NavLink} from 'react-router-dom';

import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

export default class NavLeft extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuNodeTree:null,   
        }
    }
    componentWillMount() {
        //数据是通过MenuConfig得到的，得到数据以后，通过调用renderMenu方法得到节点树
        const menuNodeTree = this.renderMenu(MenuConfig)
        this.setState({
            menuNodeTree:menuNodeTree
        })
    }
    // 菜单递归渲染
    renderMenu = (data) => {
        return data.map((item,index) => {
            if (item.children) {
                return (
                    <SubMenu key={item.key} title={item.title}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return <Menu.Item key={item.key} title={item.title}>
                <NavLink to={item.key}>{item.title}</NavLink>
            </Menu.Item>
        })
    }
    render() { 
        return (
            <div>
                <div>
                    <img src="/asset/logo-ant.svg" className="logo" alt="" />
                    <h1>爱玩啥后台管理系统</h1>
                </div>
                <Menu theme="dark" mode="vertical">
                    {this.state.menuNodeTree}
                </Menu>
            </div>
        )
    }
}