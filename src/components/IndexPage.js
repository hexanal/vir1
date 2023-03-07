import { Link } from "react-router-dom";
import { routes } from '../App';

export default function IndexPage(props) {
  return (
    <ul
      style={{
        paddingLeft: 0,
        margin: 0,
      }}
    >
      {routes.map((r,i) => {
        const { path = '—', element = null } = r || {};
        const { type = null } = element || {};
        const { name = null } = type || {};
        return (
          <li
            key={path}
            style={{
              display: 'inline-block',
              marginLeft: `${Math.random() * 2}rem`,
              marginBottom: '2rem',
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
  );
};
