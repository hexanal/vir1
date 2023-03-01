export default function Logger({ use }) {
  return (
    <ul
        style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          listStyleType: 'circle',
          listStylePosition: 'inside',
          padding: '0.25rem',
          border: '1px solid',
          fontSize: '0.85rem',
        }}
    >
      {Object.keys(use).map(k => (
        <li key={k}>
          {k}: {use[k]}
        </li>
      ))}
    </ul>
  );
}

