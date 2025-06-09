import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddUser from './Component/AddUser';
import AllUsers from './Component/AllUsers';
import EditUser from './Component/EditUser';
import NotFound from './Component/NotFound';
import { 
    AppBar, 
    Toolbar, 
    Typography, 
    Button, 
    Container,
    Box,
    Paper,
    styled
} from '@mui/material';
import { Link } from 'react-router-dom';

const StyledAppBar = styled(AppBar)`
    background: linear-gradient(45deg, #2c3e50, #34495e);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

const StyledButton = styled(Button)`
    margin: 0 10px;
    text-transform: none;
    font-size: 1rem;
    padding: 8px 16px;
    border-radius: 20px;
    transition: all 0.3s ease;
    
    &:hover {
        background: rgba(255, 255, 255, 0.1);
        transform: translateY(-2px);
    }
`;

const HeaderImage = styled(Box)`
    background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), 
                url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
    background-size: cover;
    background-position: center;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    margin-bottom: 30px;
    text-align: center;
`;

const WelcomeText = styled(Typography)`
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    background: linear-gradient(45deg, #fff, #e3f2fd);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: fadeIn 1.5s ease-in;

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const SubText = styled(Typography)`
    font-size: 1.5rem;
    font-weight: 400;
    color: #e3f2fd;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    animation: fadeIn 1.5s ease-in 0.5s both;
`;

const Footer = styled(Box)`
    position: fixed;
    bottom: 30px;
    right: 40px;
    padding: 10px;
    background: transparent;
    pointer-events: none;
`;

const Signature = styled(Typography)`
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem;
    color: #2c3e50;
    opacity: 0.15;
    letter-spacing: 2px;
    font-weight: 500;
    text-transform: uppercase;
`;

const App = () => {
    return (
        <Router>
            <StyledAppBar position="static">
                <Toolbar sx={{ py: 1 }}>
                    <Typography 
                        variant="h6" 
                        component="div" 
                        sx={{ 
                            flexGrow: 1,
                            fontWeight: 600,
                            letterSpacing: '0.5px',
                            background: 'linear-gradient(45deg, #fff, #ecf0f1)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}
                    >
                        Library Card Generation & Management System
                    </Typography>
                    <StyledButton 
                        color="inherit" 
                        component={Link} 
                        to="/all"
                        sx={{
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            '&:hover': {
                                border: '1px solid rgba(255, 255, 255, 0.4)'
                            }
                        }}
                    >
                        All Library Cards
                    </StyledButton>
                    <StyledButton 
                        color="inherit" 
                        component={Link} 
                        to="/add"
                        sx={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            '&:hover': {
                                background: 'rgba(255, 255, 255, 0.2)'
                            }
                        }}
                    >
                        Generate New Card
                    </StyledButton>
                </Toolbar>
            </StyledAppBar>

            <HeaderImage>
                <WelcomeText variant="h1" component="h1">
                    Discover Your Next Great Read
                </WelcomeText>
                <SubText>
                    Your journey through the world of books begins here
                </SubText>
            </HeaderImage>

            <Container maxWidth="lg">
                <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                    <Routes>
                        <Route path="/" element={<AllUsers />} />
                        <Route path="/add" element={<AddUser />} />
                        <Route path="/all" element={<AllUsers />} />
                        <Route path="/edit/:id" element={<EditUser />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Paper>
            </Container>

            <Footer>
                <Signature>
                    TANMAY
                </Signature>
            </Footer>
        </Router>
    );
};

export default App;