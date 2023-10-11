import React from 'react';

const Input = ({hasError, errorMessage, title, placeholder, name, type = 'text'}) => {
  return (
    <div>
        <label className="block text-dark text-sm font-bold mb-2">
          {title}
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-dark leading-tight focus:outline-none focus:shadow-outline" type={type} name={name} placeholder={placeholder} />
        {hasError &&
          <p className="text-red-500 text-xs italic">{errorMessage}</p>
        }
      </div>
  );
};

export default Input;