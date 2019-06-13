
import React,{Component} from 'react'
const  Praser = require('./Praser')
import A from './aaa'
export default class App extends Component {
    state={
      html:""
    }
    render() {
      
      return (
        <div >
          <textarea id="md_editor" style={{zIndex:'-1',position:'relative',}}></textarea>
          
          <div className="markdown-body" dangerouslySetInnerHTML={{__html:this.state.html}}></div>
        </div>
      );
    }
  
    componentDidMount(){
     
      var ele_textarea = document.getElementById('md_editor');
      var mditor =  Mditor.fromTextarea(ele_textarea);
      const _this=this
      const initValue=_this.props.mditorValue
      mditor.on('ready',function(){
        mditor.value = initValue;
        mditor.on('changed', function(){
            _this.props.getMditorValue(mditor.value)
        });
        mditor.editor.on('drop',function(event){
            console.log('drop',event);
        });
        mditor.editor.on('paste',function(event){
            console.log('paste',event.clipboardData.types);
        });
        mditor.on('head-dblclick',function(){
            console.log('head-dblclick');
        });
    });
    }
  }
  