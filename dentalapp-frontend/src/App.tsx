import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar, SplashScreen, ScrollTop, Footer } from 'components';

// const Home = lazy(() =>
//   Promise.all([import('./modules/home'), new Promise((resolve) => setTimeout(resolve, 1800))]).then(
//     ([moduleExports]) => moduleExports
//   )
// );

const Home = lazy(() => import('./modules/home'));
const LoginPage = lazy(() => import('./modules/login'));

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
        <Route path="doctors" element={<></>} />
        <Route path="/patients" element={<></>} />
        <Route path="/orders" element={<></>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<></>} />
        <Route path="/admin-page" element={<></>} />
        <Route path="/profile" element={<></>} />
      </Routes>
      <ScrollTop />
      <Footer />
    </Suspense>
  );
}

export default App;
