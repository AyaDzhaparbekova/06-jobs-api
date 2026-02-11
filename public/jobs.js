import {
  inputEnabled,
  setDiv,
  message,
  setToken,
  token,
  enableInput,
} from "./index.js";

import { showLoginRegister } from "./loginRegister.js";
import { showAddEdit } from "./addEdit.js";

let jobsDiv;
let jobsTable;
let jobsTableHeader;

export const handleJobs = () => {
  jobsDiv = document.getElementById("jobs");
  jobsTable = document.getElementById("jobs-table");
  jobsTableHeader = document.getElementById("jobs-table-header");

  const logoff = document.getElementById("logoff");
  const addJob = document.getElementById("add-job");

  jobsDiv.addEventListener("click", async (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {

      if (e.target === addJob) {
        showAddEdit(null);

      } else if (e.target === logoff) {
        setToken(null);
        jobsTable.replaceChildren(jobsTableHeader);
        showLoginRegister();

      } else if (e.target.classList.contains("editButton")) {
        showAddEdit(e.target.dataset.id);

      } else if (e.target.classList.contains("deleteButton")) {

        enableInput(false);

        await fetch(`/api/v1/jobs/${e.target.dataset.id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });

        showJobs();
        enableInput(true);
      }
    }
  });
};

export const showJobs = async () => {
  enableInput(false);

  const response = await fetch("/api/v1/jobs", {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();

  let children = [jobsTableHeader];

  for (let job of data.jobs) {
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${job.company}</td>
      <td>${job.position}</td>
      <td>${job.status}</td>
      <td><button class="editButton" data-id="${job._id}">edit</button></td>
      <td><button class="deleteButton" data-id="${job._id}">delete</button></td>
    `;
    children.push(row);
  }

  jobsTable.replaceChildren(...children);
  enableInput(true);
  setDiv(jobsDiv);
};


