import { useEffect } from "react";
import { Link } from "react-router-dom";
import usePointer  from "../hooks/usePointer";
import useReefer  from "../hooks/useReefer";
import "./One.css";

function One() {
  const { pointers } = usePointer();
  const { ratio = [0.5, 0.5] } = pointers[0] || {};

  const yo = useReefer(ratio[0]);
  const yo2 = useReefer(ratio[1]);

  // console.log([ yo, yo2 ]);

  useEffect( () => {
    document.title = 'who?';
  }, []);

  return <div>
    <div className="full">
    </div>

    <div
      style={{
        position: 'relative',
        zIndex: 10,
      }}
    >
      <h1>who am i</h1>
      <p>I have been a “frontend developer” for over a decade.</p>
      <p>Today, I am trying to become a “multimedia artist”.</p>
      <p>Let’s see how that goes!</p>

      <h2>areas of interest</h2>
      <p>You may browse my past projects:</p>
      <Link to="/work">
        view work
      </Link>

      <p>I am also producing music:</p>
      <Link to="/music">
        i like music
      </Link>

      <p>Or you may explore my strange world of experimentation:</p>
      <Link to="/space">
        i like space
      </Link>
      <Link to="/cars">
        i like cars
      </Link>
      <Link to="/nature">
        i like nature
      </Link>
      <Link to="/art">
        i like art
      </Link>
    </div>
  </div>
}

export default One;
