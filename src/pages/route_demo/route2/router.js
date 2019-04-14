import React, { Component} from 'react';
import {HashRouter as Router, Route,Link,Switch} from 'react-router-dom';
import Home from './Home';
import About from './About';
import Topic from './Topic';
import Main from './Main';
import Info from './Info';
import Nomatch from './Nomatch';



export default class IRouter extends Component{
    render(){
        return(
            <Router>
                <Home>
                    <Switch>
                        <Route path='/home' render={()=>(
                            <Main>
                                <Route path='/home/:value' component={Info}></Route>
                            </Main>
                        )}></Route>
                        <Route path='/about' component={About}></Route>
                        <Route path='/topic' component={Topic}></Route>
                        <Route component={Nomatch}></Route>
                    </Switch>
                </Home>
            </Router>
        )
    }
}