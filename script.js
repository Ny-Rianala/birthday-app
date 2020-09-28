const basePoint = './people.json';
const listOfBirthday = document.querySelector('.birthday');
// const outerModal = document.querySelector('.outer-modal');
// const innerModal = document.querySelector('.inner-modal');
const editBtn = document.querySelector('button .edit');
const editedForm = document.querySelector("form");
const innerConfirmModal = document.querySelector(".inner-confirm");
const outerConfirmModal = document.querySelector('.outer-confirm');
const addedList = document.querySelector(".list");


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

    //Function that will allow the users to edit the list
    const form = document.createElement("form");
    form.classList.add("inner-modal", "popup", "open");
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
        form.classList.remove("open");
			}
    }
		window.addEventListener("click", cancelButton);
  })
  };
});



const deleteBirthday = (e) => {
  // If the delete icon is clicked, show this modal
  const deleteButton = e.target.closest("button.delete")
  if (deleteButton) {
    innerConfirmModal.innerHTML = `
    <div class="delete_container">
      <p class="warning">
        Are you sure you want to delete
      </p>
      <button type="button"  class="confirm">Confirm</button>
      <button type="button" class="cancel">Delete</button>
    </div>`;
    outerConfirmModal.classList.add('open');
  }

  // Grab the confirm and cancel delete buttons container
  const confirmDeleteContainer = e.target.closest(".delete_container");

  // Delete it
  const confirmDelete = e.target.closest(".confirm");
  if (confirmDelete) {
    const elementToDelete = tbody.querySelector(".container");
    const id = elementToDelete.dataset.id;
    let findElement = people.filter(person => person.id !== id);
    deletePopup();
  }

  // Cancel the delete warning
  const cancelDelete = e.target.closest(".cancel");
  if (cancelDelete){
    outerConfirmModal.remove();
    deletePopup();
  }
}; 


      
//listeners
// window.addEventListener("keydown", handleEscapeKey);
// outerModal.addEventListener("click", handleCloseModal);
window.addEventListener("key", handleKey);
outerConfirmModal.addEventListener('click',closeAddModal);
window.addEventListener("submit", handleSubmit);
listUpdated.addEventListener('itemsUpdated', mirrorToLocalStorage);























/*const mirrorToLocalStorage = () => {
  console.info('mirroring item to local storage');
  localStorage.setItem("newItems", JSON.stringify(newItems));
};

const restoreFromLocalStorage = () => {
  console.info('restoring from LS');
  const lsItems = JSON.parse(localStorage.getItem('newItems'));
  //check if there is smthg inside the local storage
  if (lsItems) {
      //push has no limit for argument
      newItems.push(...lsItems);
      listUpdated.dispatchEvent(new CustomEvent('itemsUpdated'));
  }
};

restoreFromLocalStorage();*/

