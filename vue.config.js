module.exports = {
    devServer: {
      open:true,
        proxy: {
            '/api': {
                target: 'http://169.254.204.201:7001',
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
