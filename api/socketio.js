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

        // Announcement: User account changing
        socket.on('account-status', userId=>{
            io.emit('announce-account-status', userId);
            io.emit('announce-admin-account-status', userId);
        });
        socket.on('account-delete', userId=>{io.emit('announce-account-delete', userId)});
        socket.on('account-privilage', userId=>{io.emit('announce-account-privilage', userId)});

        // Announcement: Forms
        socket.on('form-submitted', formId=>{
            io.emit('announce-form-submitted', formId);
            io.emit('announce-form-pending-number');
        });
        socket.on('form-deleted', form=>{
            io.emit('announce-form-deleted', form);
            io.emit('announce-form-pending-number');
        });
        socket.on('form-status', formId=>{
            io.emit('announce-form-status', formId);
            io.emit('announce-form-pending-number');
        });
        socket.on('form-user-status', form=>{io.emit('announce-form-user-status', form)});
    
        socket.on('disconnect', ()=>{
            onlineUsers.splice(onlineUsers.indexOf(userInfo.username), 1);
            console.log(userInfo.username+' disconnected.');
            io.emit('online-users', onlineUsers);
        });
    
    });
};
