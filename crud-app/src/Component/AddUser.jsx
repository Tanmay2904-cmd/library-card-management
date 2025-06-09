import { useState } from 'react';
import { 
    FormControl, 
    InputLabel, 
    Input, 
    Button, 
    styled, 
    Typography,
    TextField,
    Paper,
    Grid,
    Box
} from '@mui/material';
import { addUser } from '../Service/api';
import { useNavigate } from 'react-router-dom';

const Container = styled(Paper)`
    padding: 30px;
    margin: 20px 0;
`;

const StyledFormControl = styled(FormControl)`
    margin: 20px 0;
`;

const AddUser = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
        expiryDate: ''
    });
    const [error, setError] = useState('');
    const { name, email, phone, expiryDate } = user;
    
    let navigate = useNavigate();

    const onValueChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
        setError('');
    }

    const validateForm = () => {
        if (!name || !email || !phone || !expiryDate) {
            setError('All fields are required');
            return false;
        }
        if (!email.includes('@')) {
            setError('Please enter a valid email');
            return false;
        }
        return true;
    }

    const addUserDetails = async() => {
        if (!validateForm()) return;

        try {
            const response = await addUser(user);
            console.log('Library card generated successfully:', response.data);
            navigate('/all');
        } catch (error) {
            console.error('Error generating library card:', error);
            setError(error.response?.data?.message || 'Error generating library card. Please try again.');
        }
    }

    return (
        <Container elevation={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" component="h1">
                    Issue New Library Card
                </Typography>
            </Box>

            {error && (
                <Typography color="error" sx={{ mb: 2 }}>
                    {error}
                </Typography>
            )}

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <StyledFormControl fullWidth>
                        <InputLabel>Full Name</InputLabel>
                        <Input 
                            onChange={(e) => onValueChange(e)} 
                            name='name' 
                            value={name}
                        />
                    </StyledFormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <StyledFormControl fullWidth>
                        <InputLabel>Email</InputLabel>
                        <Input 
                            onChange={(e) => onValueChange(e)} 
                            name='email' 
                            value={email}
                        />
                    </StyledFormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <StyledFormControl fullWidth>
                        <InputLabel>Phone Number</InputLabel>
                        <Input 
                            onChange={(e) => onValueChange(e)} 
                            name='phone' 
                            value={phone}
                        />
                    </StyledFormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <StyledFormControl fullWidth>
                        <TextField
                            label="Card Expiry Date"
                            type="date"
                            name="expiryDate"
                            value={expiryDate}
                            onChange={(e) => onValueChange(e)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </StyledFormControl>
                </Grid>
            </Grid>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => addUserDetails()}
                    size="large"
                >
                    Generate Library Card
                </Button>
            </Box>
        </Container>
    )
}

export default AddUser;