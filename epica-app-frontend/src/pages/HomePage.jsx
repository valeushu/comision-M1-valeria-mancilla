import styles from "../styles/Landing.module.css";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className={styles.container}>
      <h1>Home Page</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
        labore placeat repellendus earum eum obcaecati tempora ipsum ab magnam
        impedit, quod dolores eos soluta voluptatum eveniet fuga eius. Laborum,
        quasi?
      </p>
      <Link to="/post">Go to Post's</Link>
    </div>
  );
}
export default HomePage;
