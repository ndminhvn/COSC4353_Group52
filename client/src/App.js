import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Page404 from './components/404/Page404';
// import './App.css';

const Navbar = lazy(() => import('./components/Navbar/Navbar'));
const Home = lazy(() => import('./pages/Home/Home'));
const Login = lazy(() => import('./pages/Login/Login'));
const QuoteHistory = lazy(() => import('./components/FuelQuote/QuoteHistory'));
const Quote = lazy(() => import('./pages/Quote/Quote'));

const App = () => {
  return (
    <Router>
      <Suspense>
        <Navbar />
        <Routes>
          <Route path='/' index element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/history' element={<QuoteHistory />} />
          <Route path='*' element={<Page404 />} />
          <Route path='/quote' element={<Quote/>}/>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;