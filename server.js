var server = require('http').createServer();
var io = require('socket.io')(server);
io.on('connection',function(socket){
    socket.join('midiMix');
    socket.on('notePlayed',function(data){
        console.log(data);
        io.to('midiMix').emit('notePlayed',data);
    });
}); 
server.listen(3001,(err)=>{
    if(err)
        console.log('Ouch it hearts', err);
    else{
        console.log('listening at 3001');
    }
});