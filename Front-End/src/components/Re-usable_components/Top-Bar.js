//import component
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default function TopBar() {
  return (
    <div className="d-flex top-bar shadow" style={{ justifyContent: "space-between" }}>
      <h1>store</h1>
      <Button>
        <Link to="/" style={{ color: "white" }} className="registernav">
          Go To Web Site
        </Link>
      </Button>
    </div>
  );
}
