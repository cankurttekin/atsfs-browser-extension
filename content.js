async function extractJobDetails() {
  const jobTitle = document.querySelector(".jobs-unified-top-card__job-title")?.innerText;
  const company = document.querySelector(".jobs-unified-top-card__company-name")?.innerText;
  const location = document.querySelector(".jobs-unified-top-card__bullet")?.innerText;
  const postedDate = document.querySelector(".jobs-unified-top-card__posted-date")?.innerText;

  return { jobTitle, company, location, postedDate };
}

async function sendJobToBackend(jobData) {
  try {
    const response = await fetch("https://backend-url.com/api/job-applications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${await getAuthToken()}`
      },
      body: JSON.stringify(jobData)
    });

    if (response.ok) {
      alert("Job application added successfully!");
    } else {
      console.error("Failed to add job application.");
    }
  } catch (error) {
    console.error("Error sending job data:", error);
  }
}

async function handleJobApplication() {
  const jobData = await extractJobDetails();
  if (jobData.jobTitle && jobData.company) {
    await sendJobToBackend(jobData);
  }
}

// event listener to LinkedIn's "Apply" button
const applyButton = document.querySelector(".jobs-apply-button");
if (applyButton) {
  applyButton.addEventListener("click", handleJobApplication);
}
