const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser || currentUser.role !== "provider") {
  window.location.href = "index.html";
}

document.getElementById("providerName").innerText = currentUser.name;

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
});

const jobs = JSON.parse(localStorage.getItem("jobs")) || [];

const providerJobs = jobs.filter(job => job.providerId === currentUser.id);

document.getElementById("totalJobs").innerText = providerJobs.length;

const jobList = document.getElementById("jobList");

if (providerJobs.length === 0) {
  jobList.innerHTML = "<p>No jobs posted yet.</p>";
}

providerJobs.forEach(job => {
  const div = document.createElement("div");
  div.className = "job-item";

  div.innerHTML = `
    <h4>${job.title}</h4>
    <p class="job-meta">
        <strong>${job.company}</strong> • ${job.location}
    </p>
    <p class="job-meta">${job.location} • ${job.date} • Rs. ${job.payment}</p>
    <p>Status: <strong>${job.status}</strong></p><br>

    <div class="job-actions">
        <button class="edit" onclick="viewApplicants(${job.id})">
            View Applicants
        </button>
    </div>
`   ;

  jobList.appendChild(div);
});

function viewApplicants(jobId) {
  localStorage.setItem("selectedJobId", jobId);
  window.location.href = "applications.html";
}

