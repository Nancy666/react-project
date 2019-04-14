import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

import App from './App'; //包裹所有页面路由
import Login from './pages/login';
import Admin from './Admin';
import Common from './Common';
import Buttons from './pages/ui/buttons';
import Modals from './pages/ui/modals';
import Loadings from './pages/ui/loadings';
import Notify from './pages/ui/notification';
import Messages from './pages/ui/messages';
import Tabs from './pages/ui/tabs';
import Gallery from './pages/ui/gallery';
import Carousel from './pages/ui/carousel';
import Nomatch from './pages/nomatch';
import FormLogin from './pages/form/login';
import FormReg from './pages/form/register';
import BasicTable from './pages/table/basic-table';
import HighTable from './pages/table/high-table';
// import City from './pages/city';
import Order from './pages/order';
import OrderDetail from './pages/order/detail'
import User from './pages/user';

const Loading = () => <div></div>;

//基于路由的代码分割
const City = Loadable({
    loader: () => import('./pages/city'),
    loading: Loading
});

export default class IRouter extends Component {
    render() {
        return (
            <HashRouter>
                <App>
                    {/* 平级路由 */}
                    <Route path='/login' component={Login}></Route>
                    <Route
                        path='/admin'
                        render={() =>
                            <Admin>
                                <Switch>
                                    <Route path='/admin/ui/buttons' component={Buttons}></Route>
                                    <Route path='/admin/ui/modals' component={Modals}></Route>
                                    <Route path='/admin/ui/loadings' component={Loadings}></Route>
                                    <Route path='/admin/ui/notification' component={Notify}></Route>
                                    <Route path='/admin/ui/messages' component={Messages}></Route>
                                    <Route path='/admin/ui/tabs' component={Tabs}></Route>
                                    <Route path='/admin/ui/gallery' component={Gallery}></Route>
                                    <Route path='/admin/ui/carousel' component={Carousel}></Route>
                                    <Route path='/admin/form/login' component={FormLogin}></Route>
                                    <Route path='/admin/form/reg' component={FormReg}></Route>
                                    <Route path='/admin/table/basic' component={BasicTable}></Route>
                                    <Route path='/admin/table/high' component={HighTable}></Route>
                                    <Route path='/admin/city' component={City}></Route>
                                    <Route path='/admin/order' component={Order}></Route>
                                    <Route path='/admin/user' component={User}></Route>
                                    <Route component={Nomatch}></Route>
                                </Switch>
                            </Admin>}>
                    </Route>
                    <Route
                        path='/common'
                        render={() => <Common>
                            <Switch>
                                <Route path='/common/order/detail/:orderId' component={OrderDetail}></Route>
                            </Switch>
                        </Common>}></Route>
                </App>
            </HashRouter>
        )
    }
}