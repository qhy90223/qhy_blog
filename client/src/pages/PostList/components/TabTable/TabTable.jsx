import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Tab } from '@alifd/next';
import axios from 'axios';
import CustomTable from './components/CustomTable';
import {connect} from 'dva';

const TabPane = Tab.Item;

const tabs = [
  { tab: '全部', key: '0' },
  { tab: '已发布', key: '1' },
  { tab: '审核中', key: '2' },
  { tab: '已拒绝', key: '3' },
];

class TabTable extends Component {
  static displayName = 'TabTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      dataSource: {},
      tabKey: '0',
    };
    
  }

  componentDidMount() {
    const {dispatch} = this.props;
    const {tabKey}=this.state;
    dispatch({type:'blog/queryBlogList',payload:{blogState:tabKey}})
  }

  getFormValues = (dataIndex, values) => {
    const { dataSource, tabKey } = this.state;
    dataSource[tabKey][dataIndex] = values;
    this.setState({
      dataSource,
    });
  };

  handleRemove = (value, index) => {
    const { dataSource, tabKey } = this.state;
    dataSource[tabKey].splice(index, 1);
    this.setState({
      dataSource,
    });
  };

  handleTabChange = (key) => {
    const {dispatch}=this.props;
    dispatch({type:'blog/queryBlogList',payload:{blogState:key}})
    this.setState({
      tabKey: key,
    });
  };

  render() {
    const { dataSource } = this.state;
    return (
      <div className="tab-table">
        <IceContainer style={{ padding: '0 20px 20px' }}>
          <Tab onChange={this.handleTabChange}>
            {tabs.map((item) => {
              return (
                <TabPane title={item.tab} key={item.key}>
                  <CustomTable
                    
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
const mapStateToProps =({blog}) => {
  return {blog}
}
export default connect(mapStateToProps)(TabTable)
