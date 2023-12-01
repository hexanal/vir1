import { Link } from "react-router-dom";
import { useCallback, useEffect, useState, useRef } from "react";
import Diamond from "./Diamond";

function Now() {
  useEffect( () => {
    document.title = 'now';
  }, []);

  return <div>
    <div
      style={{
        padding: '0 0 5rem',
      }}
    >
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <p><small>Back to <Link to="/">home page</Link>.</small></p>
        <hr />
      </div>

      <h1
        style={{
          textAlign: 'center',
          margin: '2rem 0 0',
        }}
      >
        now
      </h1>

      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '666px',
          margin: '1rem auto',
          padding: '0.25rem 1rem',
          lineHeight: 1.5,
        }}
      >
        <h2>26 october, 2023</h2>

        <ul
          style={{
            listStyleType: 'upper-roman',
          }}
        >
          <li>
            <p>almost finished working on some weird music project.</p>
          </li>
          <li>
            <p>added some stuff to the website; finally re-encoded a few videos and implemented them.</p>
          </li>
          <li>
            <p>trying to get back into the game, somehow.</p>
          </li>
        </ul>

        <div
          style={{
            textAlign: 'center',
          }}
        >
          <Diamond />
        </div>

        <h2>more about website:</h2>
        <p>Okay, let's be honest: for a professional developer's website, this one's rather lackluster wouldn't you say?!</p>
        <p>There is a time for building things the right way, following time-tested best practices, checking all the items in the old "Is it production-ready?" checklist.</p>
        <p>Then there is another time: experimenting wildly without care for stability, legibility, etc.</p>
        <p>I believe that leaving the door constantly open for experimentation makes things <strong>fun</strong> and <strong>interesting</strong>.</p>

        <div
          style={{
            textAlign: 'center',
          }}
        >
          <Diamond />
        </div>

        <p>And as I am trying to reorient myself toward more emphasis on creativity and <em>ideation</em>, I feel like I should not go too deep into the <em>nitty-gritty</em> of proper web development.</p>
        <p>Even if I <strong>could!</strong></p>

        <div
          style={{
            textAlign: 'center',
          }}
        >
          <Diamond />
        </div>

        <p>— “Then why is this website's design so grey and dull if you want to prove to the world that you're <em>creative</em>?”</p>

        <p>I thought maybe a minimalistic, stripped down interface would make the content shine all the brighter.</p>
        <p>Granted, there isn't a lot of content as of today.</p>
        <p>Soon?</p>

      </div>
    </div>

  </div>
}

export default Now;

