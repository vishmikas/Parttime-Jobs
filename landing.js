const latestJobsContainer = document.getElementById("latestJobs");
const jobs = JSON.parse(localStorage.getItem("jobs")) || [];

const latestJobs = jobs
  .filter(job => job.status === "open")
  .sort((a,b) => b.id - a.id)
  .slice(0, 5);

if (latestJobs.length === 0) {
  latestJobsContainer.innerHTML = "<p>No jobs available right now.</p>";
}

latestJobs.forEach(job => {
  const div = document.createElement("div");
  div.className = "job-item";

  div.innerHTML = `
    <h4>${job.title}</h4>
    <p class="job-meta">
        <a href="company-view.html?providerId=${job.providerId}" 
            class="company-link">
            ${job.company}
        </a><br>
        • ${job.location} • ${job.date}
    </p>
  `;

  latestJobsContainer.appendChild(div);
});
