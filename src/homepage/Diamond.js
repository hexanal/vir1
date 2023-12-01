export default function Diamond(props) {
  const {
    size = 2,
  } = props || {};

  return (
    <p
      style={{
        fontSize: `${size}rem`,
        lineHeight: 1,
        margin: `1rem 0`,
      }}
    >✦</p>
  )
}
