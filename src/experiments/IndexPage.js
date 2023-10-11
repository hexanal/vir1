import { Route, Link, Outlet, useLocation } from "react-router-dom";
import { routes } from '../routes';
import PageLink from '../components/PageLink';

export default function IndexPage(props) {
  const { pathname }  = useLocation();
  const experiments = routes.filter(r => r.path === '/x');

  return (
    <div className="full">
      { pathname === '/x' ? (
        <ul
          style={{
            position: 'relative',
            zIndex: 1,
            paddingLeft: 0,
            margin: 0,
            overflowX: 'hidden',
            overflowY: 'auto',
            height: '100%',
          }}
        >
          {experiments.map(PageLink)}
        </ul>
      ) : null}

      <Outlet />
    </div>
  );
};

