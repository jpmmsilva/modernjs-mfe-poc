import { Outlet, Link } from '@modern-js/runtime/router';

const Layout = () => (
  <div>
    <div>
      <Link to={'/react-remote'}>Load react-remote sub-app</Link>
    </div>
    <div>
      <Link to={'/'}>unmount sub-app</Link>
    </div>
    <Outlet />
  </div>
);

export default Layout;