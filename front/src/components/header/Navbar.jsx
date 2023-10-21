import { useContext } from 'react';
import Login from './Login';
import Subscribe from './Subscribe';
import LaunchResearch from './LaunchResearch';
import PlaceAd from './PlaceAd';
import Logo from './Logo'
import {UserContext} from '../../contexts/UserContext'
import ConnectedDropdown from './ConnectedDropdown';

const Navbar = () => {
    const {user} = useContext(UserContext);
    
    return (
        <>
        <nav className='grid grid-flow-rows auto-rows-max gap-3
        md:grid md:grid-rows-1 md:grid-cols-6'>
                <Logo/>
                <LaunchResearch/>
                {user?.name && <PlaceAd/>}

                {user ?
                    (<ConnectedDropdown />)
                    :
                    (<>
                        <Login/>
                        <Subscribe/>
                    </>)
                }
        </nav>
        </>
    );
};

export default Navbar;