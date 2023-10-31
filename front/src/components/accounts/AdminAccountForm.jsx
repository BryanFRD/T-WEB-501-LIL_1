import PropTypes from 'prop-types';

const AdminAccountForm = ({handleSubmit, data, handleInputChange}) => {
  return (
    <form className='w-3/4 flex flex-col gap-8' onSubmit={handleSubmit}>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4'>
        <label>Nom:</label>
        <input type="text" className='border-b-2 border-primary rounded bg-slate-200 py-1 px-2 md:col-span-2 lg:col-span-4' value={data?.lastname} placeholder='Nom' name='lastname' onChange={handleInputChange}/>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4'>
        <label className=''>Prénom:</label>
        <input type="text" className='border-b-2 border-primary rounded bg-slate-200 py-1 px-2 md:col-span-2 lg:col-span-4' value={data?.firstname} placeholder='Prénom' name='lastname' onChange={handleInputChange}/>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4'>
        <label className='md:whitespace-nowrap'>Nom du compte:</label>
        <input type="text" className='border-b-2 border-primary rounded bg-slate-200 py-1 px-2 md:col-span-2 lg:col-span-4' value={data?.name} placeholder='Nom du compte' name='name' onChange={handleInputChange}/>
      </div>
      <button className='px-4 py-2 ms-auto bg-green-600 hover:bg-green-700 text-white font-semibold rounded'>Modifier</button>
    </form>
  );
};

AdminAccountForm.propTypes = {
  handleSubmit: PropTypes.func,
  data: PropTypes.object,
  handleInputChange: PropTypes.func,
}

export default AdminAccountForm;