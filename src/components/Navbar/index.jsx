import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className="my-3 d-flex justify-content-around align-items-center">
      <Link className="text-decoration-none text-dark" to="/">
        <h1 className="fw-bold">Social media</h1>
      </Link>
      <Link to="/create">
        <button className="d-none d-md-block btn btn-dark btn-lg">
          Crear Post
        </button>
        <button className="d-md-none btn btn-dark btn-lg">Crear</button>
      </Link>
    </div>
  );
}
