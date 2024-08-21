import React, { useEffect, useState } from 'react'
import './Chat.scss'
import { UserList, ChatWindow } from 'src/componenets'
import {UsersService} from 'src/services/api/UsersService';
import { SocketContext, socket } from 'src/context/SocketContext';

const Chat = ({token, currentUser, currentUsername}) => {

  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  

  useEffect(() => {
    const getUserList = async () => {
      const list = await UsersService.getAll(token);
      setUserList(list)
    }
    getUserList();
  }, [token])

  return (
    <div id='chat-page'>
        <SocketContext.Provider value={socket}>
          <UserList list={userList} selectedUser={selectedUser} currentUsername={currentUsername} setSelectedUser={setSelectedUser} token={token}/>
          <ChatWindow selectedUser={selectedUser} token={token} currentUser={currentUser}/>
        </SocketContext.Provider>
    </div>
  )
}

export default Chat