import { Route, Routes } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Planning from './Planning';
import Result from './Result';

function App() {
  return (
    <div className="flex h-screen flex-col text-gray-300">
      <Navbar className="content-padding flex-initial bg-gray-900" />
      <div className="content-padding flex-grow bg-gray-800">
        <Routes>
          <Route path={`${import.meta.env.VITE_BASE}/`} element={<Planning />} />
          <Route path={`${import.meta.env.VITE_BASE}/result`} element={<Result />} />
        </Routes>
      </div>
      <Footer className="content-padding flex-initial bg-gray-900" />
    </div>
  );
}

export default App;
