import { Form, Link, useLoaderData, redirect } from "react-router-dom";
import { getJob } from "../scripts";

export async function loader({ params, request }) {
  // For holding search keys(title, location)
  const url = new URL(request.url);
  const title = url.searchParams.get("title") || "";
  const location = url.searchParams.get("location") || "";

  const job = await getJob(params.id);

  return { job, title, location };
}

export async function action({ params, request }) {
  // For holding search keys(title, location)
  const url = new URL(request.url);
  const title = url.searchParams.get("title") || "";
  const location = url.searchParams.get("location") || "";
  return redirect(
    `/jobs/${params.id}/edit?title=${title}&location=${location}`
  );
}

export default function JobDetail() {
  const { job, title, location } = useLoaderData();
  return (
    <div id="job_detail_page">
      <h2>{job.title}</h2>
      <div>{job.location}</div>
      <div>
        <Link
          to={`/jobs/${job.id}/apply/${job.title}?title=${title}&location=${location}`}
        >
          <button type="submit" className="search_button">
            Apply Now!
          </button>
        </Link>
      </div>
      <div className=" job-item">
        <p className="label">Job Type: </p>
        <p className="item">{job.jobType}</p>
      </div>
      <div className=" job-item">
        <p className="label">Company URL: </p>
        <p className="item">{job.url}</p>
      </div>
      <div className="job-item">
        <p className="label">Job Description: </p>
        {/* breakdown the description into a line List */}
        {job.description.split("\n").map((line, index) => (
          <p className="item" key={index}>
            {line}
          </p>
        ))}
      </div>
      <div className="button-container">
        <Form method="post">
          <button type="submit" className="button">
            Edit (Administrator)
          </button>
        </Form>
      </div>
    </div>
  );
}
