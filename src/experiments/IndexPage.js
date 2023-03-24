import { Link } from "react-router-dom";
import { routes } from '../routes';
import PageLink from '../components/PageLink';

export default function IndexPage(props) {
  return (
    <ul
      style={{
        paddingLeft: 0,
        margin: 0,
        overflowX: 'hidden',
        overflowY: 'auto',
        height: '100%',
      }}
    >
      {routes.map(PageLink)}
    </ul>
  );
};

