
import React, { useState, useEffect, useContext } from 'react';
import './ChatWindow.scss';
import { SocketContext } from 'src/context/SocketContext';
import { MessagesService } from 'src/services/api/MessagesService';

const ChatWindow = ({ selectedUser, token, currentUser }) => {
  const socket = useContext(SocketContext);

  const [messagesList, setMessagesList] = useState([]);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState('');
  const [seenMessages, setSeenMessages] = useState({});

  useEffect(() => {
    const getUserList = async () => {
      const list = await MessagesService.get(selectedUser, token);
      setMessagesList(list);
    };

    if (selectedUser) getUserList();

    socket.on('message', (data) => {
      if (data.sender_id === selectedUser || data.sender_id === currentUser) {
        setMessagesList((prevMessages) => [...prevMessages, data]);
      }
    
      
      if (data.sender_id === selectedUser) {
        socket.emit('messageSeen', { from: currentUser, to: selectedUser });
      }
    });

    socket.on('userTyping', (username) => {
      setTypingUser(username || '');  
    });

    socket.on('messageSeen', ({ fromUser, toUser }) => {
      if (fromUser === selectedUser && toUser === currentUser) {
        setSeenMessages((prevSeenMessages) => ({
          ...prevSeenMessages,
          [selectedUser]: true,
        }));
      }
    });

    return () => {
      socket.off('message');
      socket.off('userTyping');
      socket.off('messageSeen');
    };
  }, [selectedUser, currentUser]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (message.length > 0) {
      socket.emit('sendMessage', { token, to: selectedUser, message: message.trim() });
      setMessage('');
    }
  };

  
  let typingTimeout;

  const handleTyping = (e) => {
    setMessage(e.target.value);

    if (!isTyping) {
      setIsTyping(true);
      socket.emit('typing', { from: currentUser, to: selectedUser });
    }

  
    clearTimeout(typingTimeout);

    typingTimeout = setTimeout(() => {
      setIsTyping(false);
      socket.emit('typing', { from: currentUser, to: null });  
    }, 2000);  
  };

  return (
    <div id='chat-window-component'>
      <div id='messages-playground'>
        {messagesList.map((message, index) => (
          <div key={message.id} className={`message ${message.sender_id === selectedUser ? 'received' : 'sent'}`}>
            {message.message}
           
            {message.sender_id === currentUser && index === messagesList.length - 1 && seenMessages[selectedUser] && (
              <div className="seen-status">Seen</div>
            )}
          </div>
        ))}
        {typingUser && <div className="typing-indicator">{`typing...`}</div>}
      </div>
      <form onSubmit={(e) => handleSend(e)}>
        <div id='message-input'>
          <input
            type="text"
            placeholder='Type your message'
            value={message}
            onChange={(e) => handleTyping(e)}
          />
          <button type='submit'>Send</button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;
