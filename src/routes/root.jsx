import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandshake } from "@fortawesome/free-solid-svg-icons";
import { Outlet, Link, useLoaderData, Form, redirect } from "react-router-dom";
import { JOBS, getJobs, createJob, setInitialJob } from "../scripts";
import githubMarkImage from "../images/github-mark.png";

// Set Initial
setInitialJob(JOBS);

export async function loader({ request }) {
  // This is for showing search result every time
  const url = new URL(request.url);
  const title = url.searchParams.get("title") || "";
  const location = url.searchParams.get("location") || "";

  const jobs = await getJobs({ title, location });
  return { jobs, title, location };
}
export async function action({ request }) {
  // Add a New Job
  const job = await createJob();

  // For holding search keys(title, location) and showing search result every time
  const url = new URL(request.url);
  const title = url.searchParams.get("title") || "";
  const location = url.searchParams.get("location") || "";

  return redirect(`/jobs/${job.id}/edit?title=${title}&location=${location}`);
}

export default function Root() {
  const { jobs, title, location } = useLoaderData();

  return (
    <div className=" flex">
      <div id="sidebar">
        <Link to={"/"}>
          <div className="flex" id="title-container">
            <p className="logo">
              <FontAwesomeIcon icon={faHandshake} />
            </p>
            <h1>CareerHub</h1>
          </div>
        </Link>
        <div id="search-container">
          <Form
            method="get"
            id="search-form"
            role="search"
            className="flex-column "
          >
            <label>
              <span>Job Title</span>
              <input
                id="title"
                type="search"
                name="title"
                placeholder="job title"
                defaultValue={title}
              ></input>
            </label>
            <label>
              <span>Location</span>
              <input
                id="location"
                type="search"
                name="location"
                placeholder="location"
                defaultValue={location}
              ></input>
            </label>
            <button className="search_button" type="submit">
              Search Jobs
            </button>
          </Form>
        </div>
        <nav id="job-list-nav">
          <ul>
            {jobs.map((job) => (
              <li key={job.id}>
                <Link
                  to={`/jobs/${job.id}?title=${title}&location=${location}`}
                >
                  <p>{job.title}</p>
                </Link>
                <p className="align-rignt">{job.location}</p>
              </li>
            ))}
          </ul>
        </nav>
        <Form method="post" id="add-new-job-form">
          <button className="button" type="submit">
            Add a New Job (Admin)
          </button>
        </Form>
      </div>
      <main>
        <div id="main-contents">
          <Outlet />
        </div>
        <footer>
          Taeko Harada
          <img
            src={githubMarkImage}
            className="github-mark"
            alt="github-mark"
            width="20px"
            height="20px"
          />
          <a href="https://github.com/TaekoHarada/job_board" target="_blank">
            <p className="github-url">Github - Job Board (React Router)</p>
          </a>
        </footer>
      </main>
    </div>
  );
}
