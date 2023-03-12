import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';
import bgImage from '../../assets/homepage-bg.png';

import './Home.css';

const Home = () => {
  return (
    <>
    <div id='home'>
      <img src={bgImage} alt='bgImage' id='loginBg' />
      <div className='text-center'>
        <h1>Fuel Rate Predictor</h1>
        <Typography>Click the button below and we will get the best rate for you!</Typography>
      </div>
      <div className='h-50 d-flex flex-column align-items-center justify-content-around btn-group'>
        <Button variant='contained' href='/quote' id='rate-btn' className='mb-5' size='lg'>
            Get the Quote today!
            <ArrowForwardIcon id='arrow-icon' sx={{ mr: 1 }} />
        </Button>
      </div>
    </div>
    </>
  );
}

export default Home;