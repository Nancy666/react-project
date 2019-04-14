import React ,{Component} from 'react';
import {Link} from 'react-router-dom';
export default class Main extends Component{
    render(){
        return(
            <div>Main页面
                <p>
                    <Link to='/home/test'>嵌套路由1</Link>
                </p>
                <p>
                    <Link to='/home/id'>嵌套路由1</Link>
                </p>
                {this.props.children}
            </div>
        )
    }
}