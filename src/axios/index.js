// 封装请求
import Jsonp from 'jsonp';
import axios from 'axios';
import config from './../config';
import {Modal} from 'antd';
import Utils from './../utils/utils';

export default class Axios {
    static requestList(_this,url,params,isMock){
        var data={
            params:params
        }
        this.ajax({
            url:url,
            data:data,
            isMock
        }).then((res)=>{
            let list;
            if (res.code == 0) {
                list = res.result.list.map((item, index) => {
                    item.key = index;
                    return item;
                })
            }
            _this.setState({
                list,
                pagination: Utils.pagination(res, (current) => {
                    _this.params.page = current;
                    _this.requestList();
                })
            })
        })
    }
    static jsonp(option) {
        return new Promise((resolve, reject) => {
            Jsonp(option.url, {
                param: "callback"
            }, function (err, response) {
                // debugger;
                if (response.status === "success") {
                    resolve(response);
                } else {
                    reject(response.message);
                }
            })
        })
    }
    static ajax(option) {
        let loading;
        if(option.data && option.data.isShowLoading !== false){
            loading = document.getElementById("ajaxLoading");
            loading.style.display = 'block'
        }
        let baseApi='';
        if(option.isMock){
            baseApi = "https://www.easy-mock.com/mock/5bf40f2058243e76789c20f4/api";
        }else{
            //真实接口
            baseApi = "https://www.easy-mock.com/mock/5bf40f2058243e76789c20f4/";  
        }
        return new Promise((resolve, reject) => {
            axios({
                method: "get",
                url: option.url,
                params: (option.data && option.data.params) || '',
                baseURL: baseApi
            }).then((response) => {
                if(option.data && option.data.isShowLoading !== false){
                    loading = document.getElementById("ajaxLoading");
                    loading.style.display = 'none'
                }
                if (response.status == 200) {
                    let res = response.data;
                    if (res.code == '0') {
                        resolve(res)
                    }else{
                        //返回错误信息的提示
                        Modal.info({
                            title:'提示',
                            content:res.msg
                        })
                    }
                } else {
                    reject(response);
                }
            })
        })
    }
}