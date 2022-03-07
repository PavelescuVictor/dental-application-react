import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar, SplashScreen, ScrollTop, Footer } from 'components';

// const Home = lazy(() =>
//   Promise.all([import('./modules/home'), new Promise((resolve) => setTimeout(resolve, 1800))]).then(
//     ([moduleExports]) => moduleExports
//   )
// );

const Home = lazy(() => import('./modules/home'));
const Login = lazy(() => import('./modules/login'));

function App() {
  window.onunload = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Suspense fallback={<SplashScreen />}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <ScrollTop />
      <Footer />
    </Suspense>
  );
}

export default App;
