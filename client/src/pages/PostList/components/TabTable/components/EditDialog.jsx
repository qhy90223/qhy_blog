import React, { Component } from 'react';
import { Dialog, Button, Form, Input, Field } from '@alifd/next';
const FormItem = Form.Item;
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
      valueFn:""
    };
    this.field = new Field(this);
  }
  getMditorValue=(content)=>{
    this.setState({
      content
    })
  }
  handleSubmit = () => {
    this.field.validate((errors, values) => {
      if (errors) {
        console.log('Errors in form!!!');
        return;
      }
      values.content=this.state.content
      const { dataIndex } = this.state;
      this.props.getFormValues(dataIndex, values,this.setState.bind(this));
    });
  };

  onOpen = (index, record) => {
    const {dispatch} = this.props;
    let {title,cate_name,author,state,content,id,author_id}=record
    dispatch({type:'blog/setEditerValue',payload:{editerValue:content}}) 
    this.field.setValues({ title, id,authorId:author_id});
    this.setState({
      visible: true,
      dataIndex: index,
      content
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
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
          style={{ width: 640 }}
          visible={this.state.visible}
          onOk={this.handleSubmit}
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

            {/* <FormItem label="作者：" {...formItemLayout}>
              <Input
                {...init('author', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
              />
            </FormItem> */}

            {/* <FormItem label="状态：" {...formItemLayout}>
              <Input
                {...init('status', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
              />
            </FormItem> */}

            <FormItem label="正文" required>
              {/* <RichEditor value={this.state.content}/> */}
                {/* <IceFormBinder name="content1">
                  
                </IceFormBinder> */}
                <Mditor getMditorValue={this.getMditorValue} mditorValue={content}/>
                {/* <ForEditer onSave={this.onSaveEditer} getEditerValue={this.getEditerValue}/> */}
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
