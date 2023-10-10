import React, { Children } from 'react';

const Button = ({children}) => {
    return (
        <button>
            {children}
        </button>
    );
};

export default Button;