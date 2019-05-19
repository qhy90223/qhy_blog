

import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import SimpleFluencyForm from './components/SimpleFluencyForm';

import './CreateCate.scss';
import { connect } from 'dva';

 class CreateCate extends Component {
  static displayName = 'CreateCate';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '分类管理', link: '' },
      { text: '添加分类', link: '#/cate/list' },
    ];
    return (
      <div className="create-cate-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <SimpleFluencyForm {...this.props}/>
      </div>
    );
  }
}
const mapStateToProps=({cate})=>{
  return {cate}
}
export default connect(mapStateToProps)(CreateCate)