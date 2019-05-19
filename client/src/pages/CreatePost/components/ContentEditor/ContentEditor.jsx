import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Form, Button, Select, Message } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import {connect} from 'dva';
import Mditor from '../../../../components/Mditor/Mditor'
const { Row, Col } = Grid;
const FormItem = Form.Item;

class ContentEditor extends Component {
  static displayName = 'ContentEditor';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
   
    this.state = {
      valueFn:"",
      
      value: {
        title: '',
        desc: '',
        author_id: '',
        content: '543',
        cate_id: [],
        tag_id:[],
        
      },
    };
  }
  componentWillMount() {
    const {dispatch}=this.props;
  
    dispatch({type:'blog/setEditerValue',payload:{editerValue:""}}) 
  }
  componentDidMount() {
    // const _this=this
    // const {content} = this.state;
    // window.addEventListener('message',(e)=>{
    //   if(e.parent!==e.source) return 
    //   console.log(e.date,'23333');
      
    //   _this.setState({
    //     content:e.data
    //   })
    // })
    
   }
    
  getMditorValue=(content)=>{
    this.setState({
      content
    })
  }
  
  formChange = (mditorValue) => {
    const {value}=this.state;
    value.content=mditorValue;
    this.setState({
      value,
    });
  };
  
  handleSubmit = () => {
    const {dispatch} = this.props;
    const _this=this
    
    this.postForm.validateAll((errors, values) => {
      
      if (errors) {
        console.log(errors);
        return false;
      }
      
      let {cate_id,tag_id} = values
      if(cate_id.length){
        values.cate_id=cate_id[0]
      }else{
        values.cate_id=0
      }
      if(tag_id.length){
        values.tag_id=tag_id[0]
      }else{
        values.tag_id=0
      }
      // values.content=this.state.content
      // console.log(_this.state.valueFn());
     values.content=_this.state.value.content
     
      
      // dispatch({type:'blog/setEditerValue',payload:{editerValue}}) 
      dispatch({type:'blog/createBlog',payload:{postBody:values}})
      // Message.success('提交成功');
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
    const {content} = this.state.value;
  
    
    
    return (
      <div className="content-editor">
        <IceFormBinderWrapper
          ref={(refInstance) => {
            this.postForm = refInstance;
          }}
          value={this.state.value}
          onChange={this.formChange}
        >
          <IceContainer>
            <h2 style={styles.title}>添加文章</h2>
            <Form labelAlign="top" style={styles.form}>
              <Row>
                <Col span="11">
                  <FormItem label="标题" required>
                    <IceFormBinder name="title" required message="标题必填">
                      <Input placeholder="这里填写文章标题" />
                    </IceFormBinder>
                    <IceFormError name="title" />
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="11">
                <FormItem label="分类" >
                    <IceFormBinder
                      name="cate_id"
                      // type="array"
                      // message="分类必填支持多个"
                    >
                      <Select
                        style={styles.cats}
                        // mode="multiple"
                        placeholder="请选择分类"
                        dataSource={[
                          { label: '分类1', value: '1' },
                          { label: '分类2', value: '2' },
                          { label: '分类3', value: '3' },
                        ]}
                      />
                    </IceFormBinder>
                    <IceFormError
                      name="cate_id"
                      render={(errors) => {
                        console.log('errors', errors);
                        return (
                          <div>
                            <span style={{ color: 'red' }}>
                              {errors.map(item => item.message).join(',')}
                            </span>
                            <span style={{ marginLeft: 10 }}>
                              不知道选择什么分类？请 <a href="#">点击这里</a>{' '}
                              查看
                            </span>
                          </div>
                        );
                      }}
                    />
                  </FormItem>
                </Col>  
                <Col span="11" offset="2">
                  <FormItem label="标签" >
                    <IceFormBinder
                      name="tag_id"
                      // required
                      // type="array"
                      // message="分类必填支持多个"
                    >
                      <Select
                        style={styles.cats}
                        // mode="multiple"
                        placeholder="请选择标签"
                        dataSource={[
                          { label: '标签1', value: '1' },
                          { label: '标签2', value: '2' },
                          { label: '标签3', value: '3' },
                        ]}
                      />
                    </IceFormBinder>
                    <IceFormError
                      name="tag_id"
                      render={(errors) => {
                        console.log('errors', errors);
                        return (
                          <div>
                            <span style={{ color: 'red' }}>
                              {errors.map(item => item.message).join(',')}
                            </span>
                            <span style={{ marginLeft: 10 }}>
                              不知道选择什么标签？请 <a href="#">点击这里</a>{' '}
                              查看
                            </span>
                          </div>
                        );
                      }}
                    />
                  </FormItem>
                </Col>
              </Row>
              <FormItem label="描述">
                <IceFormBinder name="desc">
                  <Input.TextArea placeholder="这里填写正文描述" />
                </IceFormBinder>
              </FormItem>
              <FormItem label="正文" >
              <IceFormBinder name="content">
                  <Mditor getMditorValue={this.getMditorValue} mditorValue={content}/>
              </IceFormBinder>
              </FormItem>
              <FormItem label=" ">
                <Button type="primary" onClick={this.handleSubmit} >
                  发布文章
                </Button>
              </FormItem>
            </Form>
          </IceContainer>
        </IceFormBinderWrapper>
      </div>
    );
  }
}

const styles = {
  title: {
    margin: '0px 0px 20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
  form: {
    marginTop: 30,
  },
  cats: {
    width: '100%',
  },
};
const mapStateToProps=({blog})=>{
  return {blog}
}
export default connect(mapStateToProps)(ContentEditor)