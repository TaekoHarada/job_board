import { useRouteError, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";

export default function Error() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h2>Error!</h2>
      <p>An error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>

      <div className="return">
        <Link to={`/`}>
          <p>
            <FontAwesomeIcon icon={faArrowRotateLeft} />
            {} Click to go back to home
          </p>
        </Link>
      </div>
    </div>
  );
}
