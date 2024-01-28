import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";

export default function ApplySuccess() {
  return (
    <>
      <div id="apply_success_page">
        <h2>Success!!</h2>
        <p>Your application has submited.</p>
      </div>
      <div className="return">
        <Link to={`/`}>
          <p>
            <FontAwesomeIcon icon={faArrowRotateLeft} />
            {} Click to go back to home
          </p>
        </Link>
      </div>
    </>
  );
}
