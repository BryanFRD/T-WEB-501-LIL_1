import React from 'react';
import Button from './Button';

const Navbar = () => {
    return (
        <nav>
          <ul>
            <li>Lancer la recherche</li>
            <li>Déposer une annonce</li>
            </ul>
            <Button>Se connecter</Button>
            <Button>S'inscrire</Button>
        </nav>
    );
};

export default Navbar;