// experiments
import A001 from './experiments/A001';
import A002 from './experiments/A002';
import A003 from './experiments/A003';
import A004 from './experiments/A004';
import AverageAcceleration from './experiments/AverageAcceleration';
import B001 from './experiments/B001';
import B002 from './experiments/B002';
import B003 from './experiments/B003';
import B004 from './experiments/B004';
import B005 from './experiments/B005';
import B006 from './experiments/B006';
import B007 from './experiments/B007';
import C001 from './experiments/C001';
import C002 from './experiments/C002';

import TrajA from './experiments/TrajA';
import TrajB from './experiments/TrajB';
import TrajC from './experiments/TrajC';
import Selekshun from './experiments/Selekshun';
import SomeControls from './experiments/SomeControls';
import AgainControls from './experiments/AgainControls';
import MessyControls from './experiments/MessyControls';
import EvenMoreControls from './experiments/EvenMoreControls';
import HitsOnly from './experiments/HitsOnly';

import DanceMofo from './experiments/DanceMofo';
import TheCanvas from './experiments/TheCanvas';

import Beansies from './experiments/Beansies';
import CoolBeans from './experiments/CoolBeans';
import Cooler from './experiments/Cooler';

import DateTime from './experiments/DateTime';

import IndexPage from './experiments/IndexPage';
import MoveThree from './experiments/MoveThree';

import Growing from './experiments/Growing';
import GrowingTaller from './experiments/GrowingTaller';
import TextTree from './experiments/TextTree';
import Positioning from './experiments/Positioning';
import SizeUp from './experiments/SizeUp';
import FourGraphs from './experiments/FourGraphs';
import Womblous from './experiments/Womblous';
import Wiggley from './experiments/Wiggley';
import Cursoor from './experiments/Cursoor';

import GamepadViz from './experiments/viz/GamepadViz';
import GPT from './experiments/three/GPT';
import GPT2 from './experiments/three/GPT2';

// p5
import PeeFiveOne from './experiments/p5/PeeFiveOne';
import PeeFiveTwo from './experiments/p5/PeeFiveTwo';
import PeeFiveThree from './experiments/p5/PeeFiveThree';
import PeeFiveFour from './experiments/p5/PeeFiveFour';

import Prototypes from './prototypes/Prototypes';

export const routes = [
  //
  { path: '/', element: <IndexPage />, },
  { path: '/prototypes', element: <Prototypes />, },

  { path: '/gamepad', element: <GamepadViz />, },

  // mehxperiments
  { path: 'A001', element: <A001 />, },
  { path: 'A002', element: <A002 />, },
  { path: 'A003', element: <A003 />, },
  { path: 'A004', element: <A004 />, },
  // { path: 'avg-accel', element: <AverageAcceleration />, },
  { path: 'B001', element: <B001 />, },
  { path: 'B002', element: <B002 />, },
  { path: 'B003', element: <B003 />, },
  { path: 'B004', element: <B004 />, },
  { path: 'B005', element: <B005 />, },
  { path: 'B006', element: <B006 />, },
  { path: 'B007', element: <B007 />, },
  { path: 'C001', element: <C001 />, },
  { path: 'C002', element: <C002 />, },
  // { path: 'traj-a', element: <TrajA />, },
  // { path: 'traj-b', element: <TrajB />, },
  // { path: 'traj-c', element: <TrajC />, },
  // { path: 'selekshun', element: <Selekshun />, },
  // { path: 'some-controls', element: <SomeControls />, },
  // { path: 'dance-mofo', element: <DanceMofo />, },
  { path: 'the-canvas', element: <TheCanvas />, },
  { path: 'hits-only', element: <HitsOnly />, },
  { path: 'datetime', element: <DateTime />, },
  // { path: 'beansies', element: <Beansies />, },
  // { path: 'cool-beans', element: <CoolBeans />, },
  // { path: 'cooler', element: <Cooler />, },
  { path: 'move-three', element: <MoveThree />, },
  // { path: 'again-controls', element: <AgainControls />, },
  // { path: 'messy-controls', element: <MessyControls />, },
  // { path: 'even-more-controls', element: <EvenMoreControls />, },
  { path: 'growing', element: <Growing />, },
  { path: 'growing-taller', element: <GrowingTaller />, },
  { path: 'text-tree', element: <TextTree />, },
  { path: 'positioning', element: <Positioning />, },
  { path: 'size-up', element: <SizeUp />, },
  { path: '4-graphs', element: <FourGraphs />, },
  { path: 'womb', element: <Womblous />, },

  { path: 'wiggley', element: <Wiggley />, },
  { path: 'cursoor', element: <Cursoor />, },

  { path: '/p5/PeeFiveOne', element: <PeeFiveOne />, },
  { path: '/p5/PeeFiveTwo', element: <PeeFiveTwo />, },
  { path: '/p5/PeeFiveThree', element: <PeeFiveThree />, },
  { path: '/p5/PeeFiveFour', element: <PeeFiveFour />, },

  { path: '/three/gpt', element: <GPT />, },
  { path: '/three/gpt2', element: <GPT2 />, },
];

