import { Link } from "react-router-dom";
import { routes } from '../App';

export default function IndexPage(props) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        cursor: 'crosshair'
      }}
    >
      <ul>
        {routes.map(r => {
          const { path = '—', element = null } = r || {};
          const { type = null } = element || {};
          const { name = null } = type || {};
          return (
            <li key={path}>
              <Link to={path}>
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
