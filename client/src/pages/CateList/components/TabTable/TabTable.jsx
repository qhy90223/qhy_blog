import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import CustomTable from './components/CustomTable';
import EditDialog from './components/EditDialog';
import DeleteBalloon from './components/DeleteBalloon';
import {connect} from 'dva';

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
        dataIndex: 'cateName',
        key: 'cateName',
        width: 150,
      },
      {
        title: '缩写名',
        dataIndex: 'cateShortName',
        key: 'cateShortName',
        width: 150,
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
                handleRemove={() => this.handleRemove(record)}
              />
            </span>
          );
        },
      },
    ];
  }

  getFormValues = ( values,closeDialog) => {
    const {dispatch} = this.props;
    
    
    dispatch({type:'cate/updateCate',payload:{postBody:values,closeDialog}})
  };

  handleRemove = (record) => {
    
    
      let ids=[]
      ids.push(record.cateId)
      const {dispatch}=this.props;
      dispatch({type:'cate/deleteCate',payload:{postBody:{ids}}})
    
  };
  componentDidMount() {
    const { dispatch} = this.props;
    dispatch({type:'cate/queryCateList'})
  }
  
  render() {
    const {cateList} = this.props.cate
    return (
      <div className="tab-table">
        <IceContainer>
          <CustomTable
            dataSource={cateList}
            columns={this.columns}
            hasBorder={false}
          />
        </IceContainer>
      </div>
    );
  }
}
const mapStateToProps=({cate,blog})=>{
  return {cate,blog}
}
export default connect(mapStateToProps)(TabTable)