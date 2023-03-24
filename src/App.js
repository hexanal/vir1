import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { routes } from './routes';
import { routes as prototypesRoutes } from './prototypes/prototypesList';

const combinedRoutes = [
  ...routes,
  ...prototypesRoutes,
];

const router = createBrowserRouter(combinedRoutes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

