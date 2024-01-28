// Initial Data
export const JOBS = [
  {
    id: "11111",
    title: "Java Developer",
    location: "Calgary, AB",
    jobType: "Full-time",
    url: "https://company1.com/",
    description:
      "You will develop software with Java.\nYou will develop software with Java.\n > Java\n > Java \n > Java",
    // postedDate: date (wiil be used for sorting)
  },
  {
    id: "22222",
    title: "Super Java Developer",
    location: "Tokyo, Japan",
    jobType: "Remote",
    url: "https://company1.com/",
    description:
      "You will develop software using Java. \n > Java \n > Java\n > Java",
    // postedDate: date
  },
  {
    id: "33333",
    title: "Frontend Developer",
    location: "Toronto, ON",
    jobType: "Full-time",
    url: "https://company1.com/",
    description:
      "Good at UI/UX.You will develop software using React.\n > JavaScript\n > React",
    // postedDate: date
  },
  {
    id: "44444",
    title: "Backend Developer",
    location: "Toronto, ON, Canada",
    jobType: "Part-time",
    url: "https://company1.com/",
    description:
      "Good at UI/UX.You will develop software using React.\n > JavaScript\n > Node.js",
    // postedDate: date
  },
];

// function for sorting a job list in alphabetical order
function sortJobList(jobList) {
  const sortedList = jobList.sort((a, b) => {
    if (a.title.toUpperCase() < b.title.toUpperCase()) {
      return -1;
    }
    if (a.title.toUpperCase() > b.title.toUpperCase()) {
      return 1;
    }
    // names must be equal
    return 0;
  });

  return sortedList;
}

// Set Initial data to localStorage
export function setInitialJob(jobs) {
  const jobsString = JSON.stringify(jobs);
  localStorage.setItem("jobsData", jobsString);
}

// get job list
export async function getJobs(query) {
  const storedJobsString = localStorage.getItem("jobsData");
  const storedJobs = JSON.parse(storedJobsString);

  //No search, return all jobs
  if (
    (query.title == null || query.title == undefined) &&
    (query.location == null || query.location == undefined)
  ) {
    console.log("query are null or undefined");
    return sortJobList(storedJobs);
  }

  let jobList = [];
  console.log("query ", query);

  storedJobs.map((job) => {
    if (
      job.title.toLowerCase().includes(query.title.toLowerCase()) &&
      job.location.toLowerCase().includes(query.location.toLowerCase())
    ) {
      jobList.push(job);
    }
  });

  return sortJobList(jobList);
}

// get job detail
export async function getJob(id) {
  const storedJobsString = localStorage.getItem("jobsData");
  const storedJobs = JSON.parse(storedJobsString);

  return storedJobs.find((job) => job.id === id);
}

// create a job detail
export async function createJob() {
  const storedJobsString = localStorage.getItem("jobsData");
  let storedJobs = JSON.parse(storedJobsString);

  const newJob = {
    id: Math.floor(10000 + Math.random() * 90000).toString(),
    title: "New Super Java Developer",
    location: "Calgary, AB, Canada",
    jobType: "Full-time",
    url: "https://new_company.com/",
    description: "You will develop software using Java.",
  };

  // add to localStorage
  storedJobs = [...storedJobs, newJob];

  localStorage.setItem("jobsData", JSON.stringify(storedJobs));

  return newJob;
}

// create a job detail
export async function updateJob(id, updates) {
  const storedJobsString = localStorage.getItem("jobsData");
  let storedJobs = JSON.parse(storedJobsString);

  storedJobs = storedJobs.map((job) => {
    if (job.id === id) {
      // If the object has the matching id, update its fields
      console.log("{ ...job, ...updates }", { ...job, ...updates });
      return { ...job, ...updates };
    }
    // Otherwise, return the original object unchanged
    return job;
  });

  // set to localStorage
  localStorage.setItem("jobsData", JSON.stringify(storedJobs));

  return id;
}
