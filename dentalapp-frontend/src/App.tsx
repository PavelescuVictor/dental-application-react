import { Suspense } from 'react';
import { Navbar, SplashScreen, ScrollTop, Footer, GlobalAlertLoader } from 'components';
import routes, { renderRoutes } from 'routes/routes';

// const Home = lazy(() =>
//   Promise.all([import('./modules/home'), new Promise((resolve) => setTimeout(resolve, 1800))]).then(
//     ([moduleExports]) => moduleExports
//   )
// );

function App() {
  window.onunload = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Suspense fallback={<SplashScreen />}>
      <Navbar />
      <GlobalAlertLoader />
      {renderRoutes(routes)}
      <ScrollTop />
      <Footer />
    </Suspense>
  );
}

export default App;
