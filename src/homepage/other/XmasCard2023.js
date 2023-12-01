import { Link } from "react-router-dom";
import { useEffect } from "react";

function Other() {
  useEffect( () => {
    document.title = 'Happy Holidays!';
  }, []);

  return <div>
    <div
      style={{
        textAlign: 'center',
        padding: '0 1rem 5rem',
        transformStyle: 'preserve-3d',
        perspective: '1000',
      }}
    >
      <h1
        style={{
          fontSize: 0,
          height: 0,
          margin: 0,
        }}
      >
        happy holidays!
      </h1>

      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1000px',
          margin: '1rem auto',
          padding: '0.25rem 1rem',
          lineHeight: 1.5,
        }}
      >
        <img 
          style={{
            display: 'block',
            width: '100%',
            // transform: `rotateX(45deg) rotateY(-5deg)`,
            boxShadow: `0 0.5rem 2rem -1rem black`,
          }}
          src="/IMAGES/THE_MERCYS_XMAS_CARD_2023_a.jpg"
          alt="The Mercy’s Xmas Card 2023"
        />
        <blockquote
          style={{
            marginTop: '3rem'
          }}
        >
          <h3>
            Joyeuses Fêtes, de la part des Mercy!
          </h3>

          <cite>Fred, June, Fannie, et Nova.</cite>
        </blockquote>
        <div style={{
          fontSize: '10rem',
        }}>
          🎄
        </div>
      </div>
    </div>

  </div>
}

export default Other;

