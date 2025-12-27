const jobs = [
  {
    title: "Warehouse Helper",
    location: "Colombo",
    payment: "Rs. 3000 / day",
    date: "Tomorrow"
  },
  {
    title: "Event Setup Crew",
    location: "Kandy",
    payment: "Rs. 2500 / day",
    date: "Today"
  }
];

const container = document.getElementById("jobsContainer");

jobs.forEach(job => {
  const card = document.createElement("div");
  card.className = "job-card";

  card.innerHTML = `
    <h3>${job.title}</h3>
    <p class="meta">${job.location} • ${job.date}</p>
    <p>${job.payment}</p>
    <button class="apply-btn">Apply</button>
  `;

  container.appendChild(card);
});
