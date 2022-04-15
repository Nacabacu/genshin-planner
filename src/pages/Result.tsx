import { Box } from '@mui/material';
import { useState } from 'react';

function Result() {
  const [isBig, setIsBig] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setIsBig(!isBig)}>
        Test
      </button>
      <Box className={`h-12 w-12 bg-cyan-400 transition-all ${isBig ? 'translate-y-0' : 'translate-y-full'}`} />
    </>
  );
}

export default Result;
