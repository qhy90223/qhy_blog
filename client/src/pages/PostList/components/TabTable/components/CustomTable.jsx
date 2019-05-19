import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from '@alifd/next';
import {connect} from 'dva';
import {routerRedux} from 'dva/router'
import EditDialog from './EditDialog';
import DeleteBalloon from './DeleteBalloon';
const marked =require('marked') ;
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
  premd=(record)=>{
    const str=marked(record.content.toString())
    console.log(str,'str');
    const premd=document.getElementById('premd');
    premd.innerHTML=str
    
  }
  handleRemove =(value,index,record) =>{
      console.log(value,index,record,'1111');
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
    console.log(index,values);
    dispatch({type:'blog/updateBlog',payload:{postBody:values,closeDialog:setState}})
  }
  render() {
    const {blogList}=this.props.blog
 
  
    return <div>
          <Table 
            dataSource={blogList}
            columns={this.columns}
            hasBorder={false}>
            {this.renderColumns()}
          </Table>
          <div id="premd" className="for-preview for-markdown-preview"></div>
          </div>;
  }
}
const mapStateToProps =({blog}) => {
  return {blog}
}
export default connect(mapStateToProps)(CustomTable)
