var connect = require('connect');
var serveStatic = require('serve-static');
var port = process.env.PORT || 8080;
connect().use(serveStatic(process.cwd()+"/dist")).listen(port, function(){
    console.log('Server running on '+port+'...');
});
