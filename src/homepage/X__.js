import usePointer  from "../hooks/usePointer";
import useReefer  from "../hooks/useReefer";
import Spire from "../experiments/Spire";
import "./One.css";

function One() {
  const { pointers } = usePointer();
  const { ratio = [0.5, 0.5] } = pointers[0] || {};

  const yo = useReefer(ratio[0]);
  const yo2 = useReefer(ratio[1]);

  // console.log([ yo, yo2 ]);

  return <div>
    <div
      className="One"
    >
      <Spire
        origin={[yo, yo2]}
        // noControls
        color={`rgb(0 0 0 / 1`}
        timeOffset={0}
      />
    </div>
    <div
      style={{
        position: 'relative',
        zIndex: 10,
      }}
    >
      <h1>wow you're on my website now</h1>
      <p>cool beans</p>
    </div>
  </div>
}

export default One;
