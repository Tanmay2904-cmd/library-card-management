import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1 style={{ fontSize: '72px', color: '#000' }}>404</h1>
            <h2>Page Not Found</h2>
            <p>The page you are looking for does not exist.</p>
            <Link to="/" style={{ textDecoration: 'none' }}>
                <button style={{ 
                    padding: '10px 20px', 
                    backgroundColor: '#000', 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginTop: '20px'
                }}>
                    Go to Home
                </button>
            </Link>
        </div>
    )
}

export default NotFound;