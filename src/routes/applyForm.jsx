import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { getJob } from "../scripts";

//Load the job information
export async function loader({ params }) {
  // const job = { id: params.id, title: params.title };
  //getJob for location
  const job = await getJob(params.id);

  // fill the input fields when canceling from applyConfirmation
  // get from data from sessionStorage
  const applicationFormDataString = sessionStorage.getItem("applicationForm");
  const applicationFormData = JSON.parse(applicationFormDataString);
  console.log("applicationFormData", applicationFormData);

  return { job, applicationFormData };
}

//Submit the application
export async function action({ request }) {
  // Get form data
  const applicationFormData = await request.formData();

  const applicationDataObject = {};
  applicationFormData.forEach((value, key) => {
    applicationDataObject[key] = value;
  });

  // Set form data to sessionStorage
  const applicationFormString = JSON.stringify(applicationDataObject);
  sessionStorage.setItem("applicationForm", applicationFormString);

  // For holding search keys(title, location)
  const url = new URL(request.url);
  const title = url.searchParams.get("title") || "";
  const location = url.searchParams.get("location") || "";

  // redirect to comfirmation page with the form data
  return redirect(`confirmation?title=${title}&location=${location}`);
}

export default function ApplyForm() {
  const { job, applicationFormData } = useLoaderData();
  console.log("applicationFormData in ApplyForm", applicationFormData);
  const navigate = useNavigate();

  return (
    <div id="job_application_page">
      <div className="job-info">
        <p className="job-title"> {job.title}</p>
        <p className="job-location"> {job.location}</p>
      </div>
      <Form method="post" id="apply-form">
        <h2>Application Form</h2>
        <label id="form_first_name">
          <span>First Name</span>
          <input
            placeholder="First Name"
            aria-label="First Name"
            type="text"
            name="first"
            defaultValue={
              applicationFormData && applicationFormData.first
                ? applicationFormData.first
                : ""
            }
          />
        </label>
        <label id="form_last_name">
          <span>Last Name</span>
          <input
            placeholder="Last Name"
            aria-label="Last Name"
            type="text"
            name="last"
            defaultValue={
              applicationFormData && applicationFormData.last
                ? applicationFormData.last
                : ""
            }
          />
        </label>
        <label id="form_address">
          <span>Address</span>
          <input
            placeholder="Address"
            aria-label="Address"
            type="text"
            name="address"
            defaultValue={
              applicationFormData && applicationFormData.address
                ? applicationFormData.address
                : ""
            }
          />
        </label>
        <label id="form_email">
          <span>Email</span>
          <input
            placeholder="aaa@aaaa.com"
            aria-label="Email"
            type="text"
            name="email"
            defaultValue={
              applicationFormData && applicationFormData.email
                ? applicationFormData.email
                : ""
            }
          />
        </label>
        <label id="form_phone">
          <span>Phone</span>
          <input
            placeholder="Phone"
            aria-label="Phone"
            type="text"
            name="phone"
            defaultValue={
              applicationFormData && applicationFormData.phone
                ? applicationFormData.phone
                : ""
            }
          />
        </label>
        <p className="button-container">
          <button type="submit" className="search_button">
            Comfirm
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
        </p>
      </Form>
    </div>
  );
}
