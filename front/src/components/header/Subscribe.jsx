import ButtonLink from '../ButtonLink';

const Subscribe = () => {
  return (
    <div className='text-center
    md:col-start-6 md:m-auto'>
    <ButtonLink to='register' className='bg-primary hover:bg-primary-darker text-white rounded p-1'>
      S'inscrire
    </ButtonLink>
    </div>
  );
};

export default Subscribe;