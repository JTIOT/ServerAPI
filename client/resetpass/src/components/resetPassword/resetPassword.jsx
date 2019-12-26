import React from 'react';

const ResetPassword = ({match})=>{

    const {userId, token} = match.params;
    console.log('match', match);
    return (
        <div>
            <h1>{userId}</h1>
            <h1>{token}</h1>
        </div>
    );
}

export default ResetPassword;