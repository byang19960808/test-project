export const FilMethods = (routes, user)=>{
    console.log(routes, '111', user)
    let filtRes = routes.filter(item => item.meta.auther.indexOf(user) > -1);
    filtRes.forEach(val =>{
        if(val.children){
            val.children = FilMethods(val.children, user);
        }
    })
    return filtRes
} 
