import React, { Suspense } from 'react';

const RemoteList = React.lazy(() => import('modernJsRemote/List'));
const App = () => {
 
  return (
    <div>
      <h1>React Host</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <RemoteList mfData={{ data: ['data1', 'data2', 'data3'] }} />
      </Suspense>
    </div>
  );
};

export default App;
