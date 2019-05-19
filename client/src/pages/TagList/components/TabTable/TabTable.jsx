import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import CustomTable from './components/CustomTable';
import EditDialog from './components/EditDialog';
import DeleteBalloon from './components/DeleteBalloon';
import {connect} from 'dva'

class TabTable extends Component {
  static displayName = 'TabTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      
    };
    this.columns = [
      {
        title: '名称',
        dataIndex: 'tagName',
        key: 'name',
        width: 200,
      },
      {
        title: '缩写名',
        dataIndex: 'tagShortName',
        key: 'tagShortName',
        width: 200,
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        width: 150,
      },
      {
        title: '更新时间',
        width: 150,
        dataIndex: 'lastUpdateTime',
        key: 'lastUpdateTime',
      }, 
      {
        title: '文章数',
        dataIndex: 'articleNums',
        key: 'articleNums',
        width: 200,
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

  getFormValues = (values) => {
    const {dispatch} = this.props;
    dispatch({type:'tag/updateTag',payload:{postBody:values,closeDialog:this.setState.bind(this)}})
  };

  handleRemove = (value, index, record) => {
    const {dispatch} = this.props;
    let ids=[]
    ids.push(record.tagId)
    dispatch({type:'tag/deleteTag',payload:{postBody:{ids}}})
    
  };
  componentDidMount() {
    const { dispatch} = this.props;
    dispatch({type:'tag/queryTagList'})
  }
  render() {
    const {tagList}=this.props.tag
    return (
      <div className="tab-table">
        <IceContainer>
          <CustomTable
            dataSource={tagList}
            columns={this.columns}
            hasBorder={false}
          />
        </IceContainer>
      </div>
    );
  }
}
const mapStateToProps=({tag,blog})=>{
  return {tag,blog}
}
export default connect(mapStateToProps)(TabTable)
