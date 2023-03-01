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
        {routes.map((r,i) => {
          const { path = '—', element = null } = r || {};
          const { type = null } = element || {};
          const { name = null } = type || {};
          return (
            <li
              key={path}
              style={{
                display: 'inline-block',
                marginTop: `3em`,
                marginLeft: `${Math.random() * 5}rem`,
                marginBottom: '1rem',
                transform: `
                  translate(${Math.random() * 1}rem, ${Math.random() * 3}rem)
                  rotate(${(Math.random()-1) * 10}deg)
                `
              }}
            >
              <Link
                to={path}
                style={{
                  display: 'inline-block',
                  padding: '1rem',
                  backgroundColor: `hsl(${i * 10}, ${50}%, ${50}%)`,
                  color: 'rgb(255 255 255)',
                  textDecoration: 'none',
                }}
              >
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
