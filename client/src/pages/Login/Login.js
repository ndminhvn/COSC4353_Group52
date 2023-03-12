import UserAuthForm from '../../components/Forms/UserAuthForm';
import bgImage from '../../assets/pages-bg.jpg';

import './Login.css';

const Login = () => {
  return (
    <div>
      <img src={bgImage} alt='bgImage' id='bgImage' />
      <UserAuthForm />
    </div>
  );
}
  
export default Login;