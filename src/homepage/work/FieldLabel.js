import Graph from "../../components/viz/Graph";
import TheCanvas from "../../experiments/TheCanvas";

export default function FieldLabel(props) {
  const {
    children,
  } = props || {};

  return (
    <div
      style={{
        fontSize: '0.75rem',
        fontWeight: '400',
        margin: '1rem 0 0.25rem',
        textAlign: 'right',
      }}
    >
      {children}
    </div>
  );
}
