const express = require('express')();
const server = require('http').createServer(express);
const io = require('socket.io')(server);

const path = require('path');
const { generatePDF  } = require("./generatePDF");

const port = 3000

io.on('connection', function(socket) {
  console.log('connected to client');

  socket.on('disconnect', function () {
     console.log('disconnected from client');
  });
});

express.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

express.get('/output', function(req, res) {
  res.sendFile(path.join(__dirname + '/output.pdf'));
});


express.post('/generate-pdf', async (req, res) => {
  res.send({status: true});
  await generatePDF(io);
})

server.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))