

import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import SimpleFluencyForm from './components/SimpleFluencyForm';
import {connect}  from 'dva';
import './CreateTag.scss';

 class CreateTag extends Component {
  static displayName = 'CreateTag';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '标签管理', link: '' },
      { text: '添加标签', link: '#/tag/create' },
    ];
    return (
      <div className="create-tag-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <SimpleFluencyForm {...this.props}/>
      </div>
    );
  }
}
const mapStateToProps=({tag,blog})=>{
  return {tag,blog}
}
export default connect(mapStateToProps)(CreateTag)
