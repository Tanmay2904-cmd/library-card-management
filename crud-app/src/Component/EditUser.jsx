import { useState, useEffect, useCallback } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, styled, Typography } from '@mui/material';
import { editUser, getUser } from '../Service/api';
import { useNavigate, useParams } from 'react-router-dom';

const initialValue = {
    name: '',
    username: '',
    email: '',
    phone: ''
}

const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px;
`;

const EditUser = () => {
    const [user, setUser] = useState(initialValue);
    const [error, setError] = useState('');
    const { name, username, email, phone } = user;
    
    const { id } = useParams();
    let navigate = useNavigate();

    const onValueChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
        setError('');
    }

    const loadUserDetails = useCallback(async () => {
        try {
            const response = await getUser(id);
            setUser(response.data);
        } catch (error) {
            console.error('Error loading user:', error);
            setError('Error loading user details. Please try again.');
        }
    }, [id]);

    useEffect(() => {
        loadUserDetails();
    }, [loadUserDetails]);

    const validateForm = () => {
        if (!name || !username || !email || !phone) {
            setError('All fields are required');
            return false;
        }
        if (!email.includes('@')) {
            setError('Please enter a valid email');
            return false;
        }
        return true;
    }

    const editUserDetails = async() => {
        if (!validateForm()) return;

        try {
            await editUser(id, user);
            navigate('/all');
        } catch (error) {
            console.error('Error editing user:', error);
            setError(error.response?.data?.message || 'Error editing user. Please try again.');
        }
    }

    return (
        <Container>
            <Typography variant="h4">Edit User</Typography>
            {error && <Typography color="error">{error}</Typography>}
            <FormControl>
                <InputLabel htmlFor="my-input">Name</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='name' value={name} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Username</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='username' value={username} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Email</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='email' value={email} id="my-input"/>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Phone</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='phone' value={phone} id="my-input" />
            </FormControl>
            <FormControl>
                <Button variant="contained" color="primary" onClick={() => editUserDetails()}>Edit User</Button>
            </FormControl>
        </Container>
    )
}

export default EditUser;