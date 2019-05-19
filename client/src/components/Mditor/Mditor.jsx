
import React,{Component} from 'react'
export default class App extends Component {
    render() {
      return (
        <div>
          <textarea id="md_editor"></textarea>
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
        console.log('mditor', mditor.value);
        // console.log('toolbar', mditor.toolbar);
        mditor.on('changed', function(){
            _this.props.getMditorValue(mditor.value)
            console.log('changed',mditor.value);
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
  