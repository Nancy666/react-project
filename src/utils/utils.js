import React, { Component } from 'react';

export default {
    dateFormat(_date) {
        let date = new Date(_date);
        if (!date) return '';
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    },
    pagination(data, callback) {
        return {
            onChange: (current) => {
                callback(current)
            },
            current: data.result.current,   //接口返回的分页数据
            pageSize: data.result.page_size,
            total: data.result.total,
            showTotal: () => {
                return `共${data.result.total}条`
            },
            showQuickJumper: true   //是否可以跳转到某一页
        }
    },
}