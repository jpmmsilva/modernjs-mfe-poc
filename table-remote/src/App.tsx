import { BrowserRouter, Route, Routes } from '@modern-js/runtime/router';

export default (props: { basename: string }) => {
  const { basename } = props;

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route index element={<div>Self-controlled route root - Table</div>} />
        <Route path={'path'} element={<div>Self-controlled sub route</div>} />
      </Routes>
    </BrowserRouter>
  );
};