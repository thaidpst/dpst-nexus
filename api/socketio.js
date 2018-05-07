let onlineUsers = [];

exports = module.exports = function(io) {
    io.on('connection', socket=>{
        
        let userInfo = {username: 'A guest'};    
        console.log(userInfo.username+' connected.');
        onlineUsers.push(userInfo.username);
        
        socket.on('get-online-users', ()=>{
            io.emit('online-users', onlineUsers);
        });

        socket.on('new-member', username=>{
            console.log('Getting a new user: '+username);
            io.emit('online-users', onlineUsers);
            io.emit('update-new-users');
        });

        socket.on('member-login', username=>{
            onlineUsers.splice(onlineUsers.indexOf(userInfo.username), 1);
            userInfo = {username: username};
            onlineUsers.push(userInfo.username);
            console.log(username+' logged in.');
            io.emit('online-users', onlineUsers);
        });
        socket.on('member-logout', ()=>{
            onlineUsers.splice(onlineUsers.indexOf(userInfo.username), 1);
            console.log(userInfo.username+' logged out.');
            userInfo = {username: 'A guest'};
            onlineUsers.push(userInfo.username);
            io.emit('online-users', onlineUsers);
        });

        socket.on('account-status', userId=>{
            io.emit('announce-account-status', userId);
        });
        socket.on('account-delete', userId=>{
            io.emit('announce-account-delete', userId);
        });
    
        socket.on('disconnect', ()=>{
            onlineUsers.splice(onlineUsers.indexOf(userInfo.username), 1);
            console.log(userInfo.username+' disconnected.');
            io.emit('online-users', onlineUsers);
        });
    
    });
};
