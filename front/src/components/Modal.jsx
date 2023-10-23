import CloseIcon from './icons/CloseIcon';
import PropTypes from 'prop-types';

const Modal = ({ children, show, setShow, title }) => {
  return (
    <div className={`${!show && 'hidden'} fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%)] max-h-full bg-slate-600 bg-opacity-50 flex justify-center items-center`}>
      <div className="relative w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow w-full m-auto flex flex-col justify-between">
          <div className='flex justify-between border-b-2 p-4'>
            <h3 className='text-xl'>{title?.toUpperCase()}</h3>
            <button onClick={() => setShow(false)}><CloseIcon /></button>
          </div>
          <div className='p-4'>{children}</div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
}

export default Modal;
