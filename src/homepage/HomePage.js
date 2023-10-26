import { useEffect } from "react";

function HomePage() {
  useEffect( () => {
    document.title = 'fredmercy';
  }, []);

  return <div
    className="HomePage"
  >
  </div>
}

export default HomePage;
