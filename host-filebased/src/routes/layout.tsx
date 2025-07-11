import { Outlet, Link } from '@modern-js/runtime/router';

const Layout = () => (
  <div>
    <div>
      <Link to={'/table'}>Load file-base routing sub-app</Link>
    </div>
    <div>
      <Link to={'/dashboard'}>Load self-controlled routing sub-app</Link>
    </div>
    <div>
      <Link to={'/'}>unmount sub-app</Link>
    </div>
    <Outlet />
  </div>
);

export default Layout;