import React,{Component} from 'react';
import {HashRouter , Route , Link} from 'react-router-dom';
const Main = () =>{
    return (
        <div>Main页面</div>
    )
}
const About = () =>{
    return (
        <div>About页面</div>
    )
}
const Topics = () =>{
    return (
        <div>Topics页面</div>
    )
}
export default class Home extends Component{
    render(){
        return(
            // HashRouter里只能有一个子节点
            <HashRouter>
                <div>
                    <ul>
                        <li>
                            <Link to="/">qqqq</Link>
                        </li>
                        <li>
                            <Link to="/about">wwww</Link>
                        </li>
                        <li>
                            <Link to="/topics">eeee</Link>
                        </li>
                    </ul>
                    <hr/>

                    <Route path="/" exact={true} component={Main}></Route>
                    <Route path='/about' component={About}></Route>
                    <Route path='/topics' component={Topics}></Route>
                </div>
            </HashRouter>
        )
    }
}