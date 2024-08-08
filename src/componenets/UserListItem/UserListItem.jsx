import React from 'react'
import defaultPfp from 'src/assets/img/default-pfp.png'
import './UserListItem.scss'

const UserListItem = ({username, online, selected, onClick}) => {
  return (
    <div className={`user-list-item-component ${selected ? "selected": ""}`} onClick={onClick}>
      <div className='avatar-wrapper'>
        <img className='profile-pic' src={defaultPfp} alt="" />
        <div className='presence-indicator' style={{backgroundColor: online ? "green" : "gray"}}></div>
      </div>
      <p>{username}</p>
      {/* <div className='message-notification'></div> */}
    </div>
  )
}

export default UserListItem