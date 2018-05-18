import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

import { ipHost } from 'globals';

@Injectable()
export class SocketioService {

  private socket = io(ipHost);
  public onlineUsers;

  constructor(
  ) { }

  connect() {
    this.socket.on('online-users', function(onlineUsers) {
      this.onlineUsers = onlineUsers;
    }.bind(this));
    this.socket.emit('get-online-users');
  }
  getSocket() {return this.socket}

  getOnlineUsers() {return this.onlineUsers}

  newMember(username) {this.socket.emit('new-member', username)}

  login(username) {this.socket.emit('member-login', username)}
  logout() {this.socket.emit('member-logout')}

  // User account changing
  accountStatus(userId) {this.socket.emit('account-status', userId)}
  accountPrivilage(userId) {this.socket.emit('account-privilage', userId)}
  deleteAccount(userId) {this.socket.emit('account-delete', userId)}

  // Forms
  userFormSubmitted(formId) {this.socket.emit('form-submitted', formId)}
  deletedUserForm(form) {this.socket.emit('form-deleted', form)}
  submittedFormStatusChange(form) {
    this.socket.emit('form-status', form.formId);
    this.socket.emit('form-user-status', form);
  }

}
