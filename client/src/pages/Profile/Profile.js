import UserProfile from '../../components/Forms/UserProfile';
import "./Profile.css"
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  return (
    <div className='container mt-3 p-3'>
      <div className='row justify-content-center'>
        <div className="col-md-5">
          <UserProfile />
        </div>
      </div>
    </div>
  );
}
  
export default Login;