import React from 'react'
import Avatar from './Avatar'
import { Link } from 'react-router-dom'
 

const UserCard2 = ({user}) => {

   


    return (
        <div  >
            <div>
                <Link to={`/profile/${user._id}`}  
                className="d-flex align-items-center">
                    
                    <Avatar src={user.avatar} size="big-avatar" />

                    <div className="ml-1" style={{transform: 'translateY(-2px)'}}>
                        <span className="d-block">{user.username}</span>
                        
                    </div>
                </Link>
            </div>
          
        </div>
    )
}

export default UserCard2
