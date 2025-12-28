// Get providerId from URL
const params = new URLSearchParams(window.location.search);
const providerId = Number(params.get("providerId"));

const users = JSON.parse(localStorage.getItem("users")) || [];
const jobs = JSON.parse(localStorage.getItem("jobs")) || [];

// Find provider
const provider = users.find(
  u => u.id === providerId && u.role === "provider"
);

if (!provider) {
  alert("Company not found");
  window.location.href = "index.html";
}

// Set company name
document.getElementById("companyName").innerText = provider.company;

// Filter jobs by provider
const companyJobs = jobs.filter(
  job => job.providerId === providerId && job.status === "open"
);

const container = document.getElementById("companyJobs");

if (companyJobs.length === 0) {
  container.innerHTML = "<p>No active jobs.</p>";
}

companyJobs.forEach(job => {
  const div = document.createElement("div");
  div.className = "job-item";

  div.innerHTML = `
    <h4>${job.title}</h4>
    <p class="job-meta">
      ${job.location} • ${job.date} • Rs. ${job.payment}
    </p>
  `;

  container.appendChild(div);
});
