import LoginForm from '../components/login/LoginForm';

const LoginScreen = () => {
  return (
    <div className='flex flex-col justify-center align-center'>
      <h1 className='text-center text-4xl mt-8 font-semibold'>Connexion</h1>
      <div className='md:p-16 w-full md:w-2/3 xl:w-3/5 mx-auto'>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginScreen;