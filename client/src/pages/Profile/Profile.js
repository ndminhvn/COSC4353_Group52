import UserProfile from '../../components/Forms/UserProfile';
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  return (
    <div className='container mt-3 mb-6'>
      <div className='row'>
        <div className="col-md-5">
          <UserProfile />
        </div>
      </div>
    </div>
  );
}
  
export default Login;