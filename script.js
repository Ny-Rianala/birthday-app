const basePoint = './people.json';
const listOfBirthday = document.querySelector('.birthday');
const editBtn = document.querySelector('button .edit');
const editedForm = document.querySelector("form");
const innerConfirmModal = document.querySelector(".inner-confirm-modal");
const outerConfirmModal = document.querySelector('.outer-confirm-modal');
const innerModal = document.querySelector('.inner-modal');
const outerModal = document.querySelector(".outer-modal");
const addedList = document.querySelector(".list");
const tbody = document.querySelector('tbody');


//fetch data from the url
async function fetchBirthdayList() {
  let res = await fetch(`${basePoint}?q=`);
  const birthdayList = await res.json();
  const html = birthdayList
    .sort(function (a, b) {
      return a.birthday - b.birthday;
    })
    .map(person => {
      return `
            <div>
                <tbody>
                    <tr>
                      <th scope="row"><img src="${person.picture}"/></th>
                        <td class="firstname">${person.firstName}</td>
                        <td class="lastname">${person.lastName}</td>
                        <td class="birthday" id="date">Turns ${person.birthday}</td>
                        <td>${person.id}</td>  
                        <td><button class= "edit">Edit</button></td> 
                        <td><button class= "delete">Delete</button></td>                 
                    </tr>
                </body>
            </div>
            `;
    });
  listOfBirthday.innerHTML = html.join('');
}

fetchBirthdayList();

//Listen for a click to the edit button
  window.addEventListener('click', e => {
    if (e.target.matches(".edit")) {
  const tableList = e.target.closest("tr");
  let firstName = tableList.querySelector(".firstname"); 
  let lastName = tableList.querySelector(".lastname");
  let birthday = tableList.querySelector(".birthday");
  let id = tableList.dataset.id;

  //Function that will allow the users to edit the list
    const form = document.createElement("form");
    form.classList.add("inner-modal", "open");
    form.insertAdjacentHTML("afterbegin", 
    `<div class="form-group row">
            <label for="name" class="col-sm-2 col-form-label">First Name</label>
            <div class="col-sm-10">
              <input type="text" class="form-control form-control-lg" name="firstname" id="firstname" value="${firstName.textContent}">
            </div>
          </div>
          <div class="form-group row">
            <label for="name" class="col-sm-2 col-form-label">Last Name</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" name="lastname" id="lastname" value="${lastName.textContent}">
            </div>
          </div>
          <div class="form-group row">
            <label for="text" class="col-sm-2 col-form-label">Birthday</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" name="birthday" id="birthday" value="${birthday.textContent}" >
            </div>
          </div>
          <div class="col-auto">
            <button type="submit" id= "submit-btn" class="btn btn-primary mb-2">Save</button>
          </div>
          <div class="col-auto">
            <button type= "button" id= "cancel-btn" class="btn btn-primary mb-2">Cancel</button>
          </div>
   `);
  document.body.appendChild(form); 

  //listen for submit button
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // Get the input values from the form
    const editedFirstName = e.target.firstname.value;
    const editedLastName = e.target.lastname.value;
    const editedBirthday = e.target.birthday.value;

    // Change the content of the birthday
    firstName.textContent = editedFirstName;
    lastName.textContent = editedLastName; 
    birthday.textContent = editedBirthday;
    const cancelButton = (e) => {
			if (cancelButton) {
        form.remove("inner-modal", "open");
			}
    }
		window.addEventListener("click", cancelButton);
  })
  };
});


//remove the modal

const handleCloseModal = event => {
  const isOutside = !event.target.closest(".inner-modal");
  if (isOutside) {
      outerModal.classList.remove("open")
  }
};

const closeModal  = () => {
  outerModal.classList.remove("open");
}


//Listen for the delete button
window.addEventListener('click', e => {
    if (e.target.matches(".delete")) {
        // If the delete button is clicked, show this modal
          const html = `
          <div class="delete-birthday">
            <p>
              Are you sure you want to delete
            </p>
            <button type="button" class="confirm-btn">Confirm</button>
            <button type="button" class="cancel-btn">Cancel</button>
          </div>`;
          console.log(innerConfirmModal);
          innerConfirmModal.innerHTML = html;
          outerConfirmModal.classList.add('confirm');
        };      


const confirmDeleteContainer = e.target.closest(".delete-birthday");


  //confirm the delete
  const confirmDelete = e.target.closest(".confirm-btn");
  if (confirmDelete) {
    let searchElement = people.filter(person => person.id !== id);
    birthdayList(searchElement);
  }
  window.addEventListener("click", confirmDelete);

  // Cancel the warning
  const cancelBtn = (e) => {
    if (cancelBtn) {
      confirmDeleteContainer.remove("confirm");
    }
  }
  window.addEventListener("click", cancelBtn);
})



//remove the modal
const handleCloseConfirmModal = event => {
  const isOutside = !event.target.closest(".inner-confirm-modal");
  if (isOutside) {
      outerConfirmModal.classList.remove("confirm");
  }
};


//listeners
outerModal.addEventListener("click", handleCloseModal);
outerConfirmModal.addEventListener("click", handleCloseConfirmModal);



