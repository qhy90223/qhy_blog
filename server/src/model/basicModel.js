class Model{
  constructor(data,message){
    if(typeof data ==='string'){
      this.message = data
      data=null
      message=null
    }
    if(message){
      this.message=message||"";
    }
    if(data){
      this.entity=data||null
    }
  }
}
class SuccessModel extends Model{
  constructor(data,message){
    super(data,message)
    this.success=true
  }
}
class ErrorModel extends Model{
  constructor(data,message){
    super(data,message)
    this.success=false
  }
}
module.exports={
  SuccessModel,ErrorModel
}
