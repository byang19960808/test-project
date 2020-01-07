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