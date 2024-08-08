import React, {useState, useEffect, useContext} from 'react'
import './ChatWindow.scss'
import { SocketContext } from 'src/context/SocketContext';
import { MessagesService } from 'src/services/api/MessagesService';



const ChatWindow = ({selectedUser, token, currentUser}) => {
  const socket = useContext(SocketContext);

  const [messagesList, setMessagesList] = useState([]);
  const [message, setMessage] = useState('');

    useEffect(() => {
      const getUserList = async () => {
        const list = await MessagesService.get(selectedUser, token);
        setMessagesList(list)
      }
      if(selectedUser) getUserList();

      socket.on('message', (data) => {
        console.log(data)
        if(data.sender_id === selectedUser || data.sender_id === currentUser) {
          setMessagesList((prevMessages) => [...prevMessages, data]);
        }
      });

      return () => {
        socket.off('message');
      };

    }, [selectedUser])

    const handleSend = async (e) => {
      e.preventDefault();
      if(message.length > 0) {
        socket.emit('sendMessage', { token, to: selectedUser, message: message.trim() });
        setMessage("");
      }
    }

    return (
    <div id='chat-window-component'>
        <div id='messages-playground'>
            {messagesList && messagesList.map(message => (
              <div key={message.id} className={`message ${message.sender_id === selectedUser ? 'received' : 'sent'}`}>{message.message}</div>
            ))}
        </div>
        <form onSubmit={(e) => handleSend(e)}>
            <div id='message-input'>
                <input type="text" placeholder='Type your message'
                value={message} onChange={(e) => setMessage(e.target.value)}
                />
                <button type='submit'>Send</button>
            </div>
        </form>
    </div>
  )
}

export default ChatWindow