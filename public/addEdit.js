import { enableInput, setDiv, token } from "./index.js";
import { showJobs } from "./jobs.js";

let addEditDiv;

export const handleAddEdit = () => {
  addEditDiv = document.getElementById("add-edit");
  const button = document.getElementById("save-job");

  addEditDiv.addEventListener("click", async (e) => {
    if (e.target === button) {

      const company = document.getElementById("company").value;
      const position = document.getElementById("position").value;
      const status = document.getElementById("status").value;

      enableInput(false);

      await fetch("/api/v1/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ company, position, status }),
      });

      showJobs();
      enableInput(true);
    }
  });
};

export const showAddEdit = (id) => {
  setDiv(addEditDiv);
};
