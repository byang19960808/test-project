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
