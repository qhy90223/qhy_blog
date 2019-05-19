import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Tab } from '@alifd/next';
import axios from 'axios';
import CustomTable from './components/CustomTable';
import EditDialog from './components/EditDialog';
import DeleteBalloon from './components/DeleteBalloon';
import {connect} from 'dva';
const TabPane = Tab.Item;

const tabs = [{ tab: '全部', key: 'all' }, { tab: '审核中', key: 'review' }];

class TabTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: {},
      tabKey: 'all',
    };
    this.columns = [
      
      {
        title: '用户名',
        dataIndex: 'userName',
        key: 'userName',
        width: 100,
      },
      {
        title: '昵称',
        dataIndex: 'realName',
        key: 'realName',
        width: 100,
      },
      {
        title: '邮箱',
        dataIndex: 'eMail',
        key: 'eMail',
        width: 150,
      },
      {
        title: '用户组',
        dataIndex: 'group',
        key: 'group',
        width: 120,
      },
      {
        title: '文章数',
        dataIndex: 'articleNums',
        key: 'articleNums',
        width: 80,
      },
      {
        title: '评论数',
        dataIndex: 'commentNums',
        key: 'commentNums',
        width: 80,
      },
      {
        title: '注册时间',
        dataIndex: 'registerTime',
        key: 'registerTime',
        width: 150,
      },
      {
        title: '最后登录时间',
        dataIndex: 'LastLoginTime',
        key: 'LastLoginTime',
        width: 150,
      },
      {
        title: '操作',
        key: 'action',
        width: 200,
        render: (value, index, record) => {
          return (
            <span>
              <EditDialog
                index={index}
                record={record}
                getFormValues={this.getFormValues}
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

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({type:'user/queryUserList'})
  }

  getFormValues = (values,closeDialog) => {
    const {dispatch} = this.props;
    dispatch({type:'user/updateUser',payload:{postBody:values,closeDialog}})
  };

  handleRemove = (record) => {
    const {dispatch} = this.props;
    let ids=[]
    ids.push(record.userId)
    dispatch({type:'user/deleteUser',payload:{postBody:{ids}}})
   
  };

  handleTabChange = (key) => {
    this.setState({
      tabKey: key,
    });
  };

  render() {
    const { userList } = this.props.user;
    return (
      <div className="tab-table">
        <IceContainer style={{ padding: '0 20px 20px' }}>
          <Tab onChange={this.handleTabChange}>
            {tabs.map((item) => {
              return (
                <TabPane title={item.tab} key={item.key}>
                  <CustomTable
                    dataSource={userList}
                    columns={this.columns}
                    hasBorder={false}
                  />
                </TabPane>
              );
            })}
          </Tab>
        </IceContainer>
      </div>
    );
  }
}
const mapStateToProps=({user})=>{
  return {user}
}
export default connect(mapStateToProps)(TabTable)