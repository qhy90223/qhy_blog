import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Editor from 'for-editor'
import {connect} from 'dva';
class ForEditer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.blog.editerValue
    }
  }
  componentDidMount() {
    this.props.getEditerValue(this.saveChange.bind(this))
  }
  
  //直接保存
  saveChange(){
    const {value}=this.state;

    console.log(value,'value');
    
    return value
  }
  
  handleChange(value) {
    const {dispatch}= this.props;
    this.setState({
      value
    })
  }

  render() {
    const {value}=this.state;
    const { EditorValue } = this.props.blog
    const {onSave} =this.props;
    return (
      <Editor 
        value={value} 
        onChange={this.handleChange.bind(this)} 
        onSave={()=>onSave(value)}  
      />
    )
  }
}
const mapStateToProps=({blog})=>{
    return {blog}
}
export default connect(mapStateToProps)(ForEditer)