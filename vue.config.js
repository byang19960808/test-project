<<<<<<< HEAD
module.exports={
  devServer:{
      proxy:{
          "/api":{
              target:"http://169.254.204.201:7001/",
              changeOrigin:true,
              pathRewrite:function (path, req) { return path.replace('/api', '') } 
          }
      }
  }
}
=======
module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:7001',
                changeOrigin:true, 
                pathRewrite:{ "^/api":"" }
            }, 
            "/test":{
                target:"http://169.254.222.111:3333"
            }, 
            "/dev":{
                target:"http://169.254.111.11:1212"
            }
        }
    }
}
>>>>>>> an
