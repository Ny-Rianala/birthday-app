const basePoint = './people.json';
const listOfBirthday = document.querySelector('.birthday');
const outerModal = document.querySelector('.outer-modal');
const innerModal = document.querySelector('.inner-modal');
const addBtn = document.querySelector('button.edit');


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
                        <td>${person.firstName}</td>
                        <td>${person.lastName}</td>
                        <td>${person.birthday}</td>
                        <td>${person.id}</td>  
                        <td><button class= "edit">Edit</button></td>                  
                        <td>
                          <button class= "delete" class="btn btn-primary">Delete</button>
                        </td>
                    </tr>
                </body>
            </div>
            `;
    });
  listOfBirthday.innerHTML = html.join('');
}

fetchBirthdayList()


//Function that will allow the users to edit the list
const openModal = e => {
  innerModal.innerHTML = `
      <form>
          <div class="form-group row">
            <label for="name" class="col-sm-2 col-form-label">First Name</label>
            <div class="col-sm-10">
              <input type="text" class="form-control form-control-lg" id="inputName3" placeholder="First Name">
            </div>
          </div>
          <div class="form-group row">
            <label for="name" class="col-sm-2 col-form-label">Last Name</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="inputLastName" placeholder="Last name">
            </div>
          </div>
          <div class="form-group row">
            <label for="text" class="col-sm-2 col-form-label">Birthday</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="inputNumber" placeholder="birthday">
            </div>
          </div>
          <div class="col-auto">
            <button type="submit" class="btn btn-secondary mb-2">Add</button>
          </div>
        </form>
    `;
  outerModal.classList.add('open');

};

//function to close modals
const handleCloseModal = event => {
  const isOutside = !event.target.closest(".inner-modal");
  if (isOutside) {
    outerModal.classList.remove("open")
  }
};

const closeModal = () => {
  outerModal.classList.remove("open");
}
const handleEscapeKey = event => {
  if (event.key === 'Escape') {
    closeModal();
  }
};

const handleBtnClick = e => {
  if (e.target.matches("button.served")) {
    const edit = event.target.closest(".edit");
    deleteOrder(edit);
  }
};

//Listeners
window.addEventListener("click", handleBtnClick);
window.addEventListener("keydown", handleEscapeKey);
outerModal.addEventListener("click", handleCloseModal);
addBtn.addEventListener("click", openModal);


// const deleteBirthday = (e) => {
// 	// code delete function here
// 	const button = e.target.closest('.delete');
// 	if (button) {
// 		const personToDelete = e.target.closest("tr");
// 		console.log(personToDelete);
// 		const id = personToDelete.dataset.id;
// 		console.log(id);
// 		deletePopup(id);
// 	}
// };




