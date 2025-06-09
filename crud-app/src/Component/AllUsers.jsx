import { useState, useEffect } from 'react';
import { 
    Table, 
    TableHead, 
    TableCell, 
    TableRow, 
    TableBody, 
    Button, 
    styled,
    Chip,
    Paper,
    Typography,
    Box,
    TextField
} from '@mui/material'
import { getUsers, deleteUser } from '../Service/api';
import { Link } from 'react-router-dom';

const StyledTable = styled(Table)`
    width: 100%;
`;

const THead = styled(TableRow)`
    & > th {
        font-size: 16px;
        background: #1a237e;
        color: #FFFFFF;
    }
`;

const TRow = styled(TableRow)`
    & > td{
        font-size: 14px
    }
    &:hover {
        background-color: #f5f5f5;
    }
`;

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    
    useEffect(() => {
        getAllUsers();
    }, []);

    const deleteUserData = async (id) => {
        if (window.confirm('Are you sure you want to delete this library card?')) {
            await deleteUser(id);
            getAllUsers();
        }
    }

    const getAllUsers = async () => {
        let response = await getUsers();
        setUsers(response.data);
    }

    const getStatusColor = (status) => {
        switch(status) {
            case 'active': return 'success';
            case 'expired': return 'error';
            case 'suspended': return 'warning';
            default: return 'default';
        }
    }

    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.cardNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Paper elevation={3} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" component="h1">
                    Library Card Management
                </Typography>
            </Box>

            <TextField
                fullWidth
                placeholder="Search by name, card number, or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ mb: 3 }}
            />

            <StyledTable>
                <TableHead>
                    <THead>
                        <TableCell>Card Number</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Issue Date</TableCell>
                        <TableCell>Expiry Date</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                    </THead>
                </TableHead>
                <TableBody>
                    {filteredUsers.map((user) => (
                        <TRow key={user._id}>
                            <TableCell>{user.cardNumber}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.phone}</TableCell>
                            <TableCell>{new Date(user.issueDate).toLocaleDateString()}</TableCell>
                            <TableCell>{new Date(user.expiryDate).toLocaleDateString()}</TableCell>
                            <TableCell>
                                <Chip 
                                    label={user.status} 
                                    color={getStatusColor(user.status)}
                                    size="small"
                                />
                            </TableCell>
                            <TableCell>
                                <Button 
                                    color="primary" 
                                    variant="contained" 
                                    style={{marginRight:10}} 
                                    component={Link} 
                                    to={`/edit/${user._id}`}
                                >
                                    Edit
                                </Button>
                                <Button 
                                    color="error" 
                                    variant="contained" 
                                    onClick={() => deleteUserData(user._id)}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TRow>
                    ))}
                </TableBody>
            </StyledTable>
        </Paper>
    )
}

export default AllUsers;