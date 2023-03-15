import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import UserProfile from '../../components/Forms/UserProfile';
import { getToken } from '../../utils/useToken.js';
import ProfileForm from '../../components/Forms/ProfileForm';
import background from '../../assets/pages-bg.jpg';
import "./Profile.css";


const Profile = () => {
  const token = getToken();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  // check if user has logged in
  useEffect(() => {
    if (!token) {
      setMessage('Our system detected that you are not logged in yet. Redirecting to the login screen ...');
      setTimeout(() => {
        navigate('/login', { replace: true });
        window.location.reload(true);
      }, 1500);
    }
  }, [token, navigate]);

  if (!token) {
    return (
      <h3 className='text-center' style={{marginTop: '20vh'}}>
        {message && <p>{message}</p>}
      </h3>
    )
  }
  else {
    return (
      <div>
        <img src={background} alt='bgImage' id='bgImage' />
            <ProfileForm />
      </div>
    );
  }
}
  
export default Profile;