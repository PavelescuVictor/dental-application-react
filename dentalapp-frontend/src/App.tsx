import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
// import ExampleLazyLoad from 'modules/exampleLazyLoad';
import Home from './modules/home';

// const Home = lazy(() => import('./modules/home'));
// const Program = lazy(() => import('./modules/program'));

function App() {
  window.onunload = () => {
    window.scrollTo(0, 0);
  };

  return (
    // <Suspense fallback={<SplashScreen />}>
    //   <Menu />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
    </Routes>
    // </Suspense>
  );
}

export default App;
