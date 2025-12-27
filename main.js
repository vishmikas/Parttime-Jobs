const loginBtn = document.getElementById("loginBtn");
const loginModal = document.getElementById("loginModal");
const closeModal = document.getElementById("closeModal");

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  loginModal.style.display = "flex";
});

closeModal.addEventListener("click", () => {
  loginModal.style.display = "none";
});

// Close when clicking outside modal
window.addEventListener("click", (e) => {
  if (e.target === loginModal) {
    loginModal.style.display = "none";
  }
});
