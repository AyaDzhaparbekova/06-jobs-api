import {
  enableInput,
  inputEnabled,
  message,
  setDiv,
  setToken,
  token,
} from "./index.js";

import { showAddEdit } from "./addEdit.js";
import { showLoginRegister } from "./loginRegister.js";

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
        message.textContent = "You have been logged off.";
        jobsTable.replaceChildren(jobsTableHeader);
        showLoginRegister();

      } else if (e.target.classList.contains("editButton")) {
        message.textContent = "";
        showAddEdit(e.target.dataset.id);

      } else if (e.target.classList.contains("deleteButton")) {
        enableInput(false);
        const jobId = e.target.dataset.id;

        try {
          const response = await fetch(`/api/v1/jobs/${jobId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await response.json();

          if (response.status === 200) {
            message.textContent = data.msg;
            showJobs(); 
          } else {
            message.textContent = data.msg || "Failed to delete the entry.";
          }
        } catch (err) {
          console.log(err);
          message.textContent = "A communication error occurred.";
        }

        enableInput(true);
      }
    }
  });
};

export const showJobs = async () => {
  enableInput(false);

  try {
    const response = await fetch("/api/v1/jobs", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();

    let children = [jobsTableHeader];

    if (response.status === 200 && data.jobs.length > 0) {
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
    }

    jobsTable.replaceChildren(...children);
  } catch (err) {
    console.log(err);
    message.textContent = "A communication error occurred.";
  }

  enableInput(true);
  setDiv(jobsDiv);
};


