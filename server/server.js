'use strict';

const fs = require('fs');
const request = require('request');

let app = require('express')();
let http = require('http');
let server = http.Server(app);
let io = require('socket.io')(server);

let aprsUrl = 'https://api.aprs.fi/api/get?name=KE8SQL-1&what=loc&apikey=102610.5EN6bqzAGtNzKfBc&format=json';
let logDir = 'C:\\temp';


function EnsureDirectoryExists(dir){
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
  }
}

EnsureDirectoryExists(logDir);


io.on('connection', (socket) => {
  console.log('user connected');
  
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  
  socket.on('add-message', (message) => {
    io.emit('message', {type:'new-message', text: message});    
  });

  socket.on('set-title', (genericObj) => {
    io.emit('new-title', genericObj);    
  });

  socket.on('set-scrollingtext', (genericObj) => {
    io.emit('new-scrollingtext', genericObj);    
  });

});

server.listen(5000, () => {
  console.log('started on port 5000');
});


app.get('/api/aprsdata', function(req,res){

  var aprsRequest = request.get(aprsUrl,function (err, aprsRes, aprsBody) {  
    let aprsData = JSON.parse(aprsBody);
    WriteAprsToLog(aprsData);
    
    if(aprsData.found == 1){
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(aprsData.entries[0]));
    }
  });

});

function WriteAprsToLog(aprsData){
  if(!!aprsData && aprsData.found == 1){
    let content = JSON.stringify(aprsData);
    var filePath = logDir + '\\' + aprsData.entries[0].time + '.json';
      fs.writeFile(filePath, content, 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
      }); 
  }
}
