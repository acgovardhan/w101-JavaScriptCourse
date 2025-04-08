let userEnteries = JSON.parse(localStorage.getItem("userEntries")) || [];

const retrieveEntries = () => {
  let entries = localStorage.getItem("userEntries");
  if (entries) {
    entries = JSON.parse(entries);
  } else {
    entries = [];
  }
  return entries;
};

const displayEntries = () => {
  const entries = retrieveEntries();
  const tableEnteries = entries
    .map((entry) => {
      const nameCell = `<td class='border px-4 py-2'>${entry.name}</td>`;
      const emailCell = `<td class='border px-4 py-2'>${entry.email}</td>`;
      const passwordCell = `<td class='border px-4 py-2'>${entry.password}</td>`;
      const dobCell = `<td class='border px-4 py-2'>${entry.dob}</td>`;
      const acceptTermsCell = `<td class='border px-4 py-2'>${entry.acceptTerms}</td>`;
      const tableRow = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
      return tableRow;
    })
    .join("\n");

  const table = `<table class='table-auto w-full'>
    <tr>
      <th class='px-4 py-2'>Name</th>
      <th class='px-4 py-2'>Email</th>
      <th class='px-4 py-2'>Password</th>
      <th class='px-4 py-2'>Dob</th>
      <th class='px-4 py-2'>Accepted terms?</th>
    </tr>
    ${tableEnteries}
  </table>`;

  document.getElementById("userEnteries").innerHTML = table;
};

const email = document.getElementById("email");
email.addEventListener("input", () => validateEmail(email));

function validateEmail(element) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(element.value)) {
    element.setCustomValidity("Please enter a valid email address!!");
    element.reportValidity();
  } else {
    element.setCustomValidity("");
  }
}

const dobInput = document.getElementById("dob");
dobInput.addEventListener("input", () => validateDob(dobInput));

function validateDob(element) {
  if (!element.value) {
    element.setCustomValidity("Please select a date.");
    element.reportValidity();
    return;
  }

  const selectedDate = new Date(element.value);
  const today = new Date();

  const minDate = new Date();
  minDate.setFullYear(today.getFullYear() - 55);
  const maxDate = new Date();
  maxDate.setFullYear(today.getFullYear() - 18);

  if (selectedDate < minDate || selectedDate > maxDate) {
    element.setCustomValidity(
      "Date of Birth must be for an age between 18 and 55."
    );
  } else {
    element.setCustomValidity("");
  }
  element.reportValidity();
}

let userForm = document.getElementById("user_form");

const saveUserForm = (event) => {
  event.preventDefault();

  if (!email.checkValidity()) {
    Validate(email);
    return;
  }

  if (!dobInput.checkValidity()) {
    validateDob(dobInput);
    return;
  }

  const entry = {
    name: document.getElementById("name").value,
    email: email.value,
    password: document.getElementById("password").value,
    dob: dobInput.value,
    acceptTerms: document.getElementById("acceptTerms").checked,
  };

  userEnteries.push(entry);
  localStorage.setItem("userEntries", JSON.stringify(userEnteries));
  displayEntries();
};

userForm.addEventListener("submit", saveUserForm);

displayEntries();
