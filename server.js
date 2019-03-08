const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'dist')));
//указываем серверу, что при любом урле выводи файл 'dist/index.html'
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//настраиваем серверу порт
const port = process.env.PORT || '9000';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log(`Server is running! ${port}`));

