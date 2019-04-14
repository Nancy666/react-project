import React ,{Component} from 'react';
import {Link} from 'react-router-dom';
export default class Home extends Component{
    render(){
        return(
            <div>
                <ul>
                    <li><Link to='/home'>hahah</Link></li>
                    <li><Link to='/about'>22222</Link></li>
                    <li><Link to='/topic'>33333</Link></li>
                </ul>
                <hr/>
                {/* this.props.children是指组件的所有子节点 */}
                {this.props.children}
            </div>
        )
    }
}