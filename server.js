var path = require('path')
var express = require('express')
var app = express()

var port = process.env.PORT || 8080

var server = app.listen(port, function () {
    var host = server.address().address
    var port = server.address().port

    console.log('Landing page listening att http://%s:%s', host, port)
})

var sendFileOpts = {
    root: path.resolve(__dirname, 'public'),
    dotfiles: 'deny'
}

app.use('/static', express.static(path.resolve(__dirname, 'public')))

app.get('*', function (req, res) {
    res.sendFile('index.html', sendFileOpts)
})
