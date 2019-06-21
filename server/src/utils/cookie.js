export const getCookie = (cookieName) => {
    let cookieValue
    document.cookie.split(';').forEach((item,i)=>{  
        let arr = []
        let arr=item.split('=')
        if(arr[0]===cookieName){
            cookieValue=arr[1]
        }
    })
    return cookieValue

}

