import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Typography } from '@mui/material';

import './Home.css';

const Home = () => {
  return (
    <div id='home'>
      {/* <img src={bgImage} alt='bgImage' id='home-background' /> */}
      <div className='text-center mb-5'>
        <h1>Fuel Rate Predictor</h1>
        <Typography style={{color: 'white'}}>
          Click the button below and we will get the best rate for you!
        </Typography>
      </div>
      <Button variant='contained' href='/quote' id='rate-btn' size='lg'>
        Get the Quote today!
        <ArrowForwardIcon id='arrow-icon' sx={{ mr: 1 }} />
      </Button>
    </div>
  );
}

export default Home;