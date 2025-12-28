const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser || currentUser.role !== "seeker") {
  window.location.href = "index.html";
}

document.getElementById("seekerName").innerText = currentUser.name;

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
});

const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
const applications = JSON.parse(localStorage.getItem("applications")) || [];

const openJobs = jobs.filter(job => job.status === "open");

document.getElementById("availableJobs").innerText = openJobs.length;

const myApplications = applications.filter(
  app => app.seekerId === currentUser.id
);
document.getElementById("appliedJobsCount").innerText = myApplications.length;

const jobList = document.getElementById("jobList");
const appliedList = document.getElementById("appliedList");

if (openJobs.length === 0) {
  jobList.innerHTML = "<p>No jobs available right now.</p>";
}

openJobs.forEach(job => {
  const alreadyApplied = myApplications.some(app => app.jobId === job.id);

  const div = document.createElement("div");
  div.className = "job-item";

  div.innerHTML = `
    <h4>${job.title}</h4>
    <p class="job-meta">
        <strong>${job.company}</strong> • ${job.location}
    </p>
    <p class="job-meta">
      ${job.location} • ${job.date} • Rs. ${job.payment}
    </p>
    <p>${job.description}</p><br>
    <div class="job-actions">
      ${
        alreadyApplied
          ? `<button disabled>Applied</button>`
          : `<button class="edit" onclick="applyJob(${job.id})">Apply</button>`
      }
    </div>
  `;

  jobList.appendChild(div);
});

if (myApplications.length === 0) {
  appliedList.innerHTML = "<p>You haven't applied for any jobs yet.</p>";
}

myApplications.forEach(app => {
  const job = jobs.find(j => j.id === app.jobId);
  if (!job) return;

  const div = document.createElement("div");
  div.className = "job-item";

  div.innerHTML = `
    <h4>${job.title}</h4>
    <p class="job-meta">
      ${job.location} • ${job.date}
    </p>
    <p>Status: <strong>${app.status}</strong></p>
  `;

  appliedList.appendChild(div);
});

function applyJob(jobId) {
  const applications = JSON.parse(localStorage.getItem("applications")) || [];

  applications.push({
    id: Date.now(),
    jobId,
    seekerId: currentUser.id,
    status: "pending",
    appliedAt: new Date().toISOString()
  });

  localStorage.setItem("applications", JSON.stringify(applications));

  alert("Applied successfully!");
  window.location.reload();
}
