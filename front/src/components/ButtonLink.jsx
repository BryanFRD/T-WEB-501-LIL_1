import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ButtonLink = ({onClick, children, className = '', to = ''}) => {
  return (
    <Link className={`${className} px-4 py-2 font-semibold transition-all`} onClick={onClick} to={to}>
      {children}
    </Link>
  );
};

ButtonLink.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  to: PropTypes.string
};

export default ButtonLink;