import { useLoaderData, Form, redirect, useNavigate } from "react-router-dom";
import { getJob } from "../scripts";

export async function loader({ params }) {
  // Get application form data from sessionStorage
  const applicationFormDataString = sessionStorage.getItem("applicationForm");
  const applicationFormData = JSON.parse(applicationFormDataString);

  const job = await getJob(params.id);

  return { applicationFormData, job };
}

export async function action({ request }) {
  // For holding search keys(title, location)
  const url = new URL(request.url);
  const title = url.searchParams.get("title") || "";
  const location = url.searchParams.get("location") || "";
  // Send form data
  // release sessionStrage
  sessionStorage.removeItem("applicationForm");

  return redirect(`/jobs/success?title=${title}&location=${location}`);
}

export default function ApplyConfirmation() {
  const { applicationFormData, job } = useLoaderData();
  const navigate = useNavigate();
  return (
    <div id="job_apply_confirmation_page">
      <div className="job-info">
        <p className="job-title"> {job.title}</p>
        <p className="job-location"> {job.location}</p>
      </div>
      <Form id="apply-confirmation-form" method="post">
        <h2>Application Form</h2>
        <label>
          <span>First Name: </span>
          <p>
            {applicationFormData && applicationFormData.first
              ? applicationFormData.first
              : ""}
          </p>
        </label>
        <label>
          <span>Last Name: </span>
          <p>
            {applicationFormData && applicationFormData.last
              ? applicationFormData.last
              : ""}
          </p>
        </label>
        <label>
          <span>Address: </span>
          <p>
            {applicationFormData && applicationFormData.address
              ? applicationFormData.address
              : ""}
          </p>
        </label>
        <label>
          <span>E-mail: </span>
          <p>
            {applicationFormData && applicationFormData.email
              ? applicationFormData.email
              : ""}
          </p>
        </label>
        <label>
          <span>Phone: </span>
          <p>
            {applicationFormData && applicationFormData.phone
              ? applicationFormData.phone
              : ""}
          </p>
        </label>
        <div className="button-container">
          <button type="submit" className="search_button ">
            Apply!
          </button>
          <button
            type="button"
            className="cancel_button"
            onClick={() => {
              navigate(-1);
            }}
          >
            Cancel
          </button>
        </div>
      </Form>
    </div>
  );
}
