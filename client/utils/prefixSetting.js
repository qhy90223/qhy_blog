const prefix= (arr,str) =>{
  if(typeof arr === 'Array'|| !arr.length){
    return arr
  }
  const recursion = arr => {
    arr.forEach(e => {
      e.path = str+e.path;
      if(e.children&&e.children.length){
        recursion(e.children)
      }
    });
  };
  recursion(arr)
  return arr
}
export {
  prefix
}