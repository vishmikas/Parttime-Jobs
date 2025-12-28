const roleSelect = document.getElementById("role");
const companyField = document.getElementById("companyField");

roleSelect.addEventListener("change", () => {
  companyField.style.display =
    roleSelect.value === "provider" ? "block" : "none";
});
