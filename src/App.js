import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import A001 from './components/A001';
import A002 from './components/A002';
import A003 from './components/A003';
import A004 from './components/A004';
import AverageAcceleration from './components/AverageAcceleration';
import B001 from './components/B001';
import B002 from './components/B002';
import B003 from './components/B003';
import B004 from './components/B004';
import B005 from './components/B005';
import B006 from './components/B006';
import B007 from './components/B007';
import C001 from './components/C001';
import C002 from './components/C002';

import TrajA from './components/TrajA';

import Beansies from './components/Beansies';
import CoolBeans from './components/CoolBeans';
import Cooler from './components/Cooler';

import DateTime from './components/DateTime';

import IndexPage from './components/IndexPage';
import MoveThree from './components/MoveThree';

export const routes = [
  { path: '/', element: <IndexPage />, },
  { path: '/A001', element: <A001 />, },
  { path: '/A002', element: <A002 />, },
  { path: '/A003', element: <A003 />, },
  { path: '/A004', element: <A004 />, },
  { path: '/avg-accel', element: <AverageAcceleration />, },
  { path: '/B001', element: <B001 />, },
  { path: '/B002', element: <B002 />, },
  { path: '/B003', element: <B003 />, },
  { path: '/B004', element: <B004 />, },
  { path: '/B005', element: <B005 />, },
  { path: '/B006', element: <B006 />, },
  { path: '/B007', element: <B007 />, },
  { path: '/C001', element: <C001 />, },
  { path: '/C002', element: <C002 />, },
  { path: '/traj-a', element: <TrajA />, },
  { path: '/datetime', element: <DateTime />, },
  { path: '/beansies', element: <Beansies />, },
  { path: '/cool-beans', element: <CoolBeans />, },
  { path: '/cooler', element: <Cooler />, },
  { path: '/move-three', element: <MoveThree />, },
];

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
