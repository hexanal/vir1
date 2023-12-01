import Markdown from "react-markdown";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState, useRef } from "react";
import Diamond from "./Diamond";


const MARKDOWN_CONTENT = `

Salut David!



—fred

`;

function MarkdownContent() {
  useEffect( () => {
    document.title = 'yo';
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
        <Markdown>
          {MARKDOWN_CONTENT}
        </Markdown>
      </div>
    </div>

  </div>
}

export default MarkdownContent;

