const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser || currentUser.role !== "provider") {
  window.location.href = "index.html";
}


document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
});

const jobs = JSON.parse(localStorage.getItem("jobs")) || [];

document.getElementById("companyName").innerText = currentUser.company;
document.getElementById("ownerName").innerText = currentUser.name;
document.getElementById("companyEmail").innerText = currentUser.email;

const companyJobs = jobs.filter(job => job.providerId === currentUser.id);
document.getElementById("jobCount").innerText = companyJobs.length;

const jobsContainer = document.getElementById("companyJobs");

if (companyJobs.length === 0) {
  jobsContainer.innerHTML = "<p>No jobs posted yet.</p>";
}

companyJobs.forEach(job => {
  const div = document.createElement("div");
  div.className = "job-item";

  div.innerHTML = `
    <span class="company-badge">${job.company}</span>
    <h4>${job.title}</h4>
    <p class="job-meta">
      ${job.location} • ${job.date} • ${job.hours}
    </p>
    <p><strong>Rs. ${job.payment}</strong></p>
    <p>Status: <strong>${job.status}</strong></p>
  `;

  jobsContainer.appendChild(div);
});
