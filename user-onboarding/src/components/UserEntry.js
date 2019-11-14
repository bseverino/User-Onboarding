import React from 'react';

const UserEntry = props => {
    return (
        <div className='user-list'>
            {props.userInfo.map(user => (
                <div key={user.id} className='user-card'>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Role: {user.role}</p>
                </div>
            ))}
        </div>
    )
};

export default UserEntry;