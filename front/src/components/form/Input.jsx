import PropTypes from 'prop-types';

const Input = ({errors, title, placeholder, name, type = 'text'}) => {
  return (
    <div>
        <label className="block text-dark text-sm font-bold mb-2">
          {title}
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-dark leading-tight focus:outline-none focus:shadow-outline" type={type} name={name} placeholder={placeholder} />
        <ul className='list-disc ms-10 mt-2'>
          {errors?.map((error) => (
            <li key={error} className='text-red-600'>{error}</li>
          ))}
        </ul>
      </div>
  );
};

Input.propTypes = {
  errors: PropTypes.array,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
}

export default Input;