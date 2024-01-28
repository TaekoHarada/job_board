import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { getJob, updateJob } from "../scripts";

export async function loader({ params }) {
  const job = await getJob(params.id);
  return { job };
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  const id = await updateJob(params.id, updates);

  // For holding search keys(title, location)
  const url = new URL(request.url);
  const title = url.searchParams.get("title") || "";
  const location = url.searchParams.get("location") || "";

  return redirect(`/jobs/${id}?title=${title}&location=${location}`);
}

export default function EditJob() {
  const { job } = useLoaderData();
  const navigate = useNavigate();

  return (
    <div id="job_edit_page">
      <Form method="post" id="editjob-form">
        <label id="form_job_title">
          <span>Job Title: </span>
          <input
            placeholder="Job Title"
            aria-label="Job Title"
            type="text"
            name="title"
            defaultValue={job.title}
          />
        </label>
        <label>
          <span>Location: </span>
          <input
            placeholder="Location"
            aria-label="Location"
            type="text"
            name="location"
            defaultValue={job.location}
          />
        </label>
        <label>
          <span>Job Type: </span>
          <input
            placeholder="Job Type"
            aria-label="jobType"
            type="text"
            name="jobType"
            defaultValue={job.jobType}
          />
        </label>
        <label>
          <span>URL: </span>
          <input
            placeholder="https://example.com/"
            aria-label="Company URL"
            type="text"
            name="url"
            defaultValue={job.url}
          />
        </label>
        <label className="job-description">
          <p>Job Description: </p>
          <textarea
            name="description"
            defaultValue={job.description}
            rows={6}
          />
        </label>
        <p className="button-container">
          <button type="submit" className="button">
            Save! (Admin)
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
