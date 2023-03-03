export default function Graph({
  children,
  style,
  withoutLines = false,
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      // preserveAspectRatio="none"
      style={{
        width: '100%',
        height: '100%',
        stroke: 'rgb(0 0 0 / 1)',
        strokeWidth: '1px',
        ...style,
      }}
    >
      {!withoutLines ? (
        <>
          <line vectorEffect="non-scaling-stroke" x1="0" x2="100" y1="50" y2="50" />
          <line vectorEffect="non-scaling-stroke" x1="50" x2="50" y1="0" y2="100" />
        </>
      ): null}
      {children}
    </svg>
  );
};

