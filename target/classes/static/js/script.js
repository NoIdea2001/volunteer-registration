document.addEventListener("DOMContentLoaded", () => {
  loadVolunteers();
  setupForm();
  setupModal();
});

function setupForm() {
  const form = document.getElementById("volunteerForm");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      availability: document.getElementById("availability").value,
    };

    try {
      const response = await fetch("/api/volunteers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        form.reset();
        await loadVolunteers();
        showMessage("Registration successful!", "success");
      } else {
        const error = await response.json();
        showMessage(
          error.message || "Registration failed. Please try again.",
          "error"
        );
      }
    } catch (error) {
      showMessage("An error occurred. Please try again.", "error");
    }
  });
}

async function loadVolunteers() {
  try {
    const response = await fetch("/api/volunteers");
    const volunteers = await response.json();
    displayVolunteers(volunteers);
  } catch (error) {
    showMessage("Failed to load volunteers.", "error");
  }
}

function displayVolunteers(volunteers) {
  const volunteersListDiv = document.getElementById("volunteersList");
  volunteersListDiv.innerHTML = "";

  volunteers.forEach((volunteer) => {
    const volunteerCard = document.createElement("div");
    volunteerCard.className = "volunteer-card";
    volunteerCard.innerHTML = `
            <h3>${volunteer.name}</h3>
            <p><strong>Email:</strong> ${volunteer.email}</p>
            ${
              volunteer.availability
                ? `<p><strong>Availability:</strong> ${volunteer.availability}</p>`
                : ""
            }
            <button class="btn-delete" onclick="deleteVolunteer(${
              volunteer.id
            })">Delete</button>
            <button class="btn-update" onclick="showUpdateModal(${
              volunteer.id
            }, '${volunteer.name}', '${volunteer.email}', '${
      volunteer.availability || ""
    }')">Update</button>
        `;
    volunteersListDiv.appendChild(volunteerCard);
  });
}

function setupModal() {
  const modal = document.getElementById("updateModal");
  const span = document.getElementsByClassName("close")[0];
  const updateForm = document.getElementById("updateForm");

  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  updateForm.onsubmit = async function (e) {
    e.preventDefault();
    const id = document.getElementById("updateId").value;
    const formData = {
      name: document.getElementById("updateName").value,
      email: document.getElementById("updateEmail").value,
      availability: document.getElementById("updateAvailability").value,
    };

    try {
      const response = await fetch(`/api/volunteers/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        modal.style.display = "none";
        await loadVolunteers();
        showMessage("Volunteer updated successfully!", "success");
      } else {
        const error = await response.json();
        showMessage(
          error.message || "Update failed. Please try again.",
          "error"
        );
      }
    } catch (error) {
      showMessage("An error occurred while updating.", "error");
    }
  };
}

function showUpdateModal(id, name, email, availability) {
  const modal = document.getElementById("updateModal");
  document.getElementById("updateId").value = id;
  document.getElementById("updateName").value = name;
  document.getElementById("updateEmail").value = email;
  document.getElementById("updateAvailability").value = availability;
  modal.style.display = "block";
}

async function deleteVolunteer(id) {
  if (!confirm("Are you sure you want to delete this volunteer?")) {
    return;
  }

  try {
    const response = await fetch(`/api/volunteers/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      await loadVolunteers();
      showMessage("Volunteer deleted successfully.", "success");
    } else {
      showMessage("Failed to delete volunteer.", "error");
    }
  } catch (error) {
    showMessage("An error occurred while deleting the volunteer.", "error");
  }
}

function showMessage(message, type) {
  const container = document.querySelector(".form-container");
  const existingMessage = container.querySelector(".message");
  if (existingMessage) {
    existingMessage.remove();
  }

  const messageElement = document.createElement("div");
  messageElement.className = `message ${type}`;
  messageElement.textContent = message;
  container.insertBefore(
    messageElement,
    document.getElementById("volunteerForm")
  );

  setTimeout(() => {
    messageElement.remove();
  }, 5000);
}
