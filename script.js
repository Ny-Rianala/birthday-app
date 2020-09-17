const basePoint = './people.json';
const listOfBirthday = document.querySelector('.birthday');
const outerModal = document.querySelector('.outer-modal');
const innerModal = document.querySelector('.inner-modal');
const editBtn = document.querySelector('button .edit');
const editedForm = document.querySelector("form");
const innerConfirmModal = document.querySelector(".inner-confirm");
const outerConfirmModal = document.querySelector('.outer-confirm');


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
                        <td id="date">Turns ${person.birthday}</td>
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
            <button type="submit" id= "submit-btn" class="btn btn-primary mb-2">Save</button>
          </div>
          </form>
      `;
    outerModal.classList.add('open');
  };
  openModal();
  };
});



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


window.addEventListener('click', e => {
  if (e.target.matches(".delete")) {
    //Function that will allow the users to confirm
   const openConfirmModal = e => {
    innerConfirmModal.innerHTML = `
      <div>
        <p>Are sure to delete this item</p>
        <button class="btn" id="accept">Accept</button>
        <button class= "btn"id="cancel">Cancel</button>
      </div>
      `;
      outerConfirmModal.classList.add('confirm');
  };
  openConfirmModal();
  };
});


//function to close modals
const closeAddModal = event => {
  const isItOutside = !event.target.closest(".inner-confirm");
  if (isItOutside) {
    outerconfirm.classList.remove("confirm")
  }
};

const closeConfirmModal = () => {
  outerconfirm.classList.remove("confirm");
}
const handleKey = event => {
  if (event.key === 'Escape') {
    closeConfirmModal();
  }
};

const listUpdated = document.querySelector('.list');

const newItems = [];

const handleSubmit = e => {
  e.preventDefault();//prevent the page from reloading
  if (e.target.matches(".submit-btn")) {
    const form = e.currentTarget.item.value;
    if (!form) return;
    const item = () => {
    const html = newItems
    .map(
        item => 
            `
            <form>
              <input>${item.firstName.value}</input>
              <input>${item.lastName.value}</input>
              <input>${item.birthday.value}</input>
            </form>
            `
    )
    .join('');
    listUpdated.innerHTML = html;
  };
   newItems.push(item);
    console.log(form);
  }
  listUpdated.dispatchEvent(new CustomEvent('itemsUpdated'));
};


const mirrorToLocalStorage = () => {
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

restoreFromLocalStorage();



//listeners
window.addEventListener("keydown", handleEscapeKey);
outerModal.addEventListener("click", handleCloseModal);
window.addEventListener("key", handleKey);
outerConfirmModal.addEventListener('click',closeAddModal);
window.addEventListener("submit", handleSubmit);
// listUpdated.addEventListener('itemsUpdated', displayItems);
listUpdated.addEventListener('itemsUpdated', mirrorToLocalStorage);


