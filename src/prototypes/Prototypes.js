import { routes } from './prototypesList';
import PageLink from '../components/PageLink';

export default function Prototypes(props) {
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
