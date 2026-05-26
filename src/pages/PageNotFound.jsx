import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="not-found-shell">
      <h1>404</h1>
      <h3>Page Not Found</h3>
      <p>The page you are looking for does not exist.</p>

      <div className="d-flex gap-2">
        <Link to="/" className="btn btn-primary">
          Back Home
        </Link>

        <Link to="/dashboard" className="btn btn-outline-dark">
          Go Dashboard
        </Link>
      </div>
    </div>
  );
}

export default PageNotFound;
