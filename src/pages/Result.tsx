import { useState } from 'react';

function Result() {
  const [isBig, setIsBig] = useState(false);
  return (
    <button type="button" onClick={() => setIsBig(!isBig)}>
      Test
    </button>
  );
}

export default Result;
