import { useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { ResourcesKey, useLocalizationContext } from '../contexts/localizationContext';
import Farm from './Farm';
import Plan from './Plan';

function App() {
  const { resources } = useLocalizationContext();
  const getTooptip = useCallback((id: string) => resources[id as ResourcesKey], [resources]);

  return (
    <div className="flex min-h-screen flex-col text-gray-300">
      <div className="content-padding flex justify-center bg-gray-900">
        <Navbar />
      </div>
      <div className="content-padding flex flex-grow justify-center bg-gray-800">
        <Routes>
          <Route path={`${import.meta.env.VITE_BASE}/`} element={<Plan />} />
          <Route path={`${import.meta.env.VITE_BASE}/farm`} element={<Farm />} />
        </Routes>
      </div>
      <div className="content-padding flex justify-center bg-gray-900">
        <Footer />
      </div>
      <ReactTooltip place="top" type="dark" effect="float" getContent={getTooptip} />
    </div>
  );
}

export default App;
