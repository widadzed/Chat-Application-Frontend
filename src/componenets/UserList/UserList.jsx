import React, {useState, useEffect, useContext} from 'react'
import './UserList.scss'
import {UserListItem} from 'src/componenets'
import { SocketContext } from 'src/context/SocketContext'

const UserList = ({list, selectedUser, setSelectedUser, token, currentUsername}) => {
    const socket = useContext(SocketContext);
    const [onlineUsers, setOnlineUsers] = useState([]);
    useEffect(() => {
      socket.emit('userConnected', token);

      socket.on('onlineUsers', (users) => {
        setOnlineUsers(users);
      });

      return () => {
        socket.off('userConnected');
        socket.off('OnlineUsers')
      };
    },[])

    return (
    <div id='user-list-component'>
        <h4>Welcome, {currentUsername} !</h4>
        <h3>Users List</h3>
        <div id='users-list'>
          {list.map(user => (
            <UserListItem key={user.id} username={user.username} online={onlineUsers.includes(user.id)}
            onClick={() => setSelectedUser(user.id)}
            selected={selectedUser === user.id}
            />
          ))}
        </div>
    </div>
  )
}

export default UserList