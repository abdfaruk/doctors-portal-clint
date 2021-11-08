import { Alert, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const MakeAdmin = () => {
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);
    const {token} = useAuth();
    const handleOnBlur = e => {
        setEmail(e.target.value);
    }
    const handleAdmin = e => {
        const user = {email};
        fetch('https://aqueous-gorge-58617.herokuapp.com/users/admin', {
            method: 'PUT',
            headers: {
                'authorization' : `Bearer ${token}`,
                'content-type' : 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount){
                console.log(data);
                setSuccess(true);
            }
        })


        e.preventDefault()
    }
    return (
        <div>
            <h2>Make me an admin</h2>
            <form onSubmit={handleAdmin}>
                <TextField sx={{width:'50%'}} label="Email" type="email" onBlur={handleOnBlur} variant="standard" />
                <br />
                <Button sx={{width:'50%', mt:2}} type="submit" variant="contained">make admin</Button>
            </form>
            {success && <Alert severity="success">Congratulation! Made Admin successfully!</Alert>}
        </div>
    );
};

export default MakeAdmin;