import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className='text-center
        md:col-start-5 md:m-auto'>
        <Link to="login">
            Se&nbsp;connecter
            </Link>
        </div>
    );
};

export default Login;