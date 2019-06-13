import React, { Component } from 'react';
import { Dialog, Button, Form, Input, Field ,Select} from '@alifd/next';
const FormItem = Form.Item;
import IceContainer from '@icedesign/container';  
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import Mditor from '../../../../../components/Mditor/Mditor'
export default class EditDialog extends Component {
  static displayName = 'EditDialog';
  static defaultProps = {};
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      dataIndex: null,
      content: null,
      valueFn:"",
      selectValue:"1"
    };
    this.field = new Field(this);
  }
  getMditorValue=(content)=>{
    this.setState({
      content
    })
  }
  handleSubmit = () => {
    const {selectValue}=this.state;
    this.field.validate((errors, values) => {
      if (errors) {
        console.log('Errors in form!!!');
        return;
      }
      values.content=this.state.content
      values.state=selectValue
      const { dataIndex } = this.state;
      this.props.getFormValues(dataIndex, values,this.setState.bind(this));
    });
  };

  onOpen = (index, record) => {
    const {dispatch} = this.props;
    let {title,cate_name,author,state,content,id,author_id}=record
    dispatch({type:'blog/setEditerValue',payload:{editerValue:content}}) 
    this.field.setValues({ title, id,authorId:author_id,state});
    this.setState({
      visible: true,
      dataIndex: index,
      content,
      selectValue:state
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
      selectValue:"1"
    });
  };
  onSaveEditer = (value) =>{
    const {dispatch}=this.props;
    dispatch({type:'blog/setEditerValue',payload:{editerValue:value}}) 
  }
  getEditerValue=(valueFn)=>{
    this.setState({
      valueFn
    })
  }
  changeSelect=(selectValue)=>{
    
    this.setState({
      selectValue
    })
  }
  render() {
    const init = this.field.init;
    const { index, record } = this.props;
    const {content} = this.state;
    const formItemLayout = {
      labelCol: {
        fixedSpan: 6,
      },
      wrapperCol: {
        span: 14,
      },
    };

    return (
      <div style={styles.editDialog}>
        <Button type="primary" onClick={() => this.onOpen(index, record)}>
          编辑
        </Button>
        <Dialog
          style={{ minWidth:'60vw'}}
          visible={this.state.visible}
          onOk={this.handleSubmit}
          align="tc tc"
          closeable="esc,mask,close"
          onCancel={this.onClose}
          onClose={this.onClose}
          title="编辑"
        >
          
            <Form field={this.field}>
            <FormItem label="标题：" {...formItemLayout}>
              <Input
                {...init('title', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
              />
            </FormItem>
            <FormItem label="状态：" {...formItemLayout}>
              {/* <IceFormBinder
                    name="state"
              > */}
              
                <Select
                  style={{width:'100%'}}
                  // mode="multiple"
                  onChange={this.changeSelect}
                  value={this.state.selectValue}
                  
                  placeholder="请选择状态"
                  dataSource={[
                    { label: '已发布', value: "1" },
                    { label: '审核中', value: "2" },
                    { label: '已拒绝', value: "3" },
                  ]}
                />
             
               
              {/* </IceFormBinder> */}
            </FormItem>

            <FormItem label="正文" required>
              <div style={{minHeight:'400px'}}>
              <Mditor getMditorValue={this.getMditorValue} mditorValue={content}/>
              </div>
              
            </FormItem>
            </Form>
            
         
          
        </Dialog>
      </div>
    );
  }
}

const styles = {
  editDialog: {
    display: 'inline-block',
    marginRight: '5px',
  },
};
