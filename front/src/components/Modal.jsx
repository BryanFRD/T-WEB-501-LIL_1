import React from 'react';

const Modal = ({ children, show }) => {
  return (
    <div className={`${!show && 'hidden'} fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
      <div className="relative w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
