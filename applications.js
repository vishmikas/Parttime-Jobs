const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const jobId = Number(localStorage.getItem("selectedJobId"));

if (!currentUser || currentUser.role !== "provider") {
  window.location.href = "index.html";
}

const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
const users = JSON.parse(localStorage.getItem("users")) || [];
let applications = JSON.parse(localStorage.getItem("applications")) || [];

const job = jobs.find(j => j.id === jobId && j.providerId === currentUser.id);

if (!job) {
  alert("Unauthorized access");
  window.location.href = "provider-dashboard.html";
}

const applicantList = document.getElementById("applicantList");

const jobApplications = applications.filter(app => app.jobId === jobId);

if (jobApplications.length === 0) {
  applicantList.innerHTML = "<p>No applications yet.</p>";
}

jobApplications.forEach(app => {
  const seeker = users.find(u => u.id === app.seekerId);

  const div = document.createElement("div");
  div.className = "job-item";

  div.innerHTML = `
    <h4>${seeker?.name || "Unknown User"}</h4>
    <p>Email: ${seeker?.email || "-"}</p>
    <p>Status: <strong>${app.status}</strong></p>

    ${
      app.status === "pending"
        ? `
          <div class="job-actions">
              <button class="edit" onclick="updateStatus(${app.id}, 'accepted')">Accept</button>
              <button class="delete" onclick="updateStatus(${app.id}, 'rejected')">Reject</button>
          </div>
        `
        : ""
    }
  `;

  applicantList.appendChild(div);
});

function updateStatus(appId, newStatus) {
  applications = applications.map(app => {
    if (app.id === appId) {
      app.status = newStatus;
    }
    return app;
  });

  if (newStatus === "accepted") {
    const jobIndex = jobs.findIndex(j => j.id === jobId);
    jobs[jobIndex].status = "closed";

    applications = applications.map(app => {
      if (app.jobId === jobId && app.status === "pending") {
        app.status = "rejected";
      }
      return app;
    });

    localStorage.setItem("jobs", JSON.stringify(jobs));
  }

  localStorage.setItem("applications", JSON.stringify(applications));

  alert(`Applicant ${newStatus}`);
  window.location.reload();
}

