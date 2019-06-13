import React, { Component } from 'react';

import { Table,Pagination} from '@alifd/next';
import Loading  from '../../../../../components/Loading'
import {connect} from 'dva';

import EditDialog from './EditDialog';
import DeleteBalloon from './DeleteBalloon';

 class CustomTable extends Component {
  static displayName = 'CustomTable';

  // static propTypes = {
  //   dataSource: PropTypes.array,
  //   columns: PropTypes.array.isRequired,
  // };

  // static defaultProps = {
  //   blogList: [],
  // };
  componentDidMount() {
    // routerRedux.push({
    //   pathname:'/logout'
    // });
    
  }
  
  constructor(props) {
    super(props);
    this.state = {premd:""};
    this.columns = [
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        width: 200,
        render: (value, index, record) => (
          <span onClick={()=>this.premd(record)}>{record.title}</span>
        )
          
        
      },
      {
        title: '分类',
        dataIndex: 'cate_name',
        key: 'cate_id',
        width: 200,
      },
      {
        title: '标签',
        dataIndex: 'tag_name',
        key: 'tag_id',
        width: 150,
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: 150,
      },
      {
        title: '发布时间',
        dataIndex: 'create_time',
        key: 'create_time',
        width: 150,
      },
      {
        title: '操作',
        key: 'action',
        width: 150,
        render: (value, index, record) => {
          return (
            <span>
              <EditDialog
                index={index}
                record={record}
                getFormValues={this.getFormValues}
                {...props}
              />
              <DeleteBalloon
                handleRemove={() => this.handleRemove(value, index, record)}
              />
            </span>
          );
        },
      },
    ];
  }
 
  handleRemove =(value,index,record) =>{
     
      const {dispatch} =this.props;
      let ids=[]
      ids.push(record.id)
      dispatch({type:'blog/deleteBlog',payload:{ids:ids,authorId:record.author_id}})
  }
  renderColumns = () => {
    return this.columns.map((item) => {
      if (typeof item.render === 'function') {
        return (
          <Table.Column
            key={item.key}
            title={item.title}
            cell={item.render}
            width={item.width}
          />
        );
      }

      return (
        <Table.Column
          key={item.key}
          title={item.title}
          dataIndex={item.dataIndex}
          width={item.width}
        />
      );
    });
  };
  getFormValues=(index,values,setState)=>{
    const {dispatch} =this.props;
    
    dispatch({type:'blog/updateBlog',payload:{postBody:values,closeDialog:setState}})
  }
  handlePageChange = (currentPage) => {
    const {dispatch} =this.props;
    dispatch({type:'blog/queryBlogList',payload:{currentPage}})
  }
  render() {
    const {blogList,currentPage,totalCount,pageSize,totalPage}=this.props.blog;
    const {loading} = this.props;
  
    
    
    return <div >
      <Loading tip="加载中..." visible={loading} style={{width:'100%'}}>
          <Table 
            dataSource={blogList}
            columns={this.columns}
            hasBorder={false}>
            {this.renderColumns()}
          </Table>
          <Pagination 
            style={{marginTop:'20px',float:'right'}} 
            current={currentPage} 
            total={totalCount}
            pageSize={pageSize}
            onChange={this.handlePageChange} />
      </Loading>
         
      </div>;
  }
}
const mapStateToProps =({blog,loading}) => {
  
  
  return {blog,loading:loading.models.blog}
}
export default connect(mapStateToProps)(CustomTable)
