import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import TabTable from './components/TabTable';
import {connect} from 'dva';
import './PostList.scss';
class PostList extends Component {
  static displayName = 'PostList';

  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    
  }
  
  render() {
    const {blog} = this.props
    const breadcrumb = [
      { text: '文章管理', link: '' },
      { text: '文章列表', link: '#/post/list' },
    ];
    return (
      <div className="post-list-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <TabTable blog={blog}/>
      </div>
    );
  }
}
const mapStateToProps =({blog}) => {
  return {blog}
}
export default connect(mapStateToProps)(PostList)
