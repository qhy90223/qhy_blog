import { Loading } from '@alifd/next';
import './index.less'
const indicator1 = (<div className="load-container load1">
    <div className="loader">loading...</div>
</div>);
const indicator7 = (<div className="load-container load7">
    <div className="loader">loading...</div>
</div>);
import React, { Component } from 'react'

export default class SelfLoading extends Component {
    render() {
        const {visible,fullScreen,size,tip} = this.props;
        return (
            <Loading 
                tip ={tip?tip:'数据加载中...'}
                // indicator={indicator1} 
                style={{width:'100%'}}
                visible={visible}
                fullScreen={fullScreen?fullScreen:false}
                size ={size?size:'medium'}
            >
                {this.props.children}
            </Loading>
        )
    }
}

