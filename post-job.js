const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser || currentUser.role !== "provider") {
  window.location.href = "index.html";
}

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
});

const jobForm = document.getElementById("jobForm");

jobForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const job = {
    id: Date.now(),
    providerId: currentUser.id,
    company: currentUser.company,
    title: document.getElementById("title").value.trim(),
    description: document.getElementById("description").value.trim(),
    location: document.getElementById("location").value.trim(),
    date: document.getElementById("date").value,
    hours: document.getElementById("hours").value.trim(),
    peopleNeeded: Number(document.getElementById("people").value),
    payment: Number(document.getElementById("payment").value),
    peopleAccepted: 0,
    status: "open",
    createdAt: new Date().toISOString()
  };

  const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  jobs.push(job);
  localStorage.setItem("jobs", JSON.stringify(jobs));

  alert("Job posted successfully!");

  window.location.href = "provider-dashboard.html";
});
