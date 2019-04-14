import React ,{Component} from 'react';
export default class Info extends Component{
    render(){
        return(
            <div>Info页面
                <p>获取到的动态参数是:{this.props.match.params.value}</p>
            </div>
        )
    }
}