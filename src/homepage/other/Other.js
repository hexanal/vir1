import { Link } from "react-router-dom";
import { useCallback, useEffect, useState, useRef } from "react";
import Wave from "../symbols/Wave";
import Diamond from "../Diamond";

function Other() {
  useEffect( () => {
    document.title = 'other';
  }, []);

  return <div>
    <div
      style={{
        textAlign: 'center',
        transformStyle: 'preserve-3d',
        perspective: '1000',
        padding: '8rem 1rem 0',
      }}
    >
      <h1
        style={{
          fontSize: 0,
          height: 0,
          margin: 0,
        }}
      >
        other
      </h1>

      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '512px',
          margin: '1rem auto',
          padding: '0.25rem 1rem',
          lineHeight: 1.5,
        }}
      >
        <h2>hello</h2>
        <p>this my website.</p>
        <p>it is under heavy development right <em>now</em></p>
        <p>read me rambling about <Link to="/now">what i'm doing now</Link></p>
        <Diamond />
        <p>i am a <strong>web developer</strong></p>
        <p>i have been for <em>over 10 years</em></p>
        <Diamond />
        <p>since <strong>2023</strong>, i am trying something new</p>
        <p>the creative process and artistic considerations are at the focus of my interests</p>
        <p>i wish to become a <strong>multimedia artist</strong></p>
        <Diamond />
        <p>the web is still one of my favorite medium of expression</p>
        <p>i will use to showcase my <strong>creative</strong> sensibilities</p>
        <Diamond />
        <p>this website might <strong>not</strong> be built to the highest standards</p>
        <p>so be it</p>
      </div>
    </div>

  </div>
}

export default Other;

