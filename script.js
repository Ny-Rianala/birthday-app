const basePoint = './birthdayData.json';
const listOfBirthday = document.querySelector('.birthday');
// const editBtn = document.querySelector('button .edit');
const editedForm = document.querySelector("form");
const innerConfirmModal = document.querySelector(".inner-confirm-modal");
const outerConfirmModal = document.querySelector('.outer-confirm-modal');
// const addBirthday = document.querySelector("button .addButton")
// const innerModal = document.querySelector('.inner-modal');
// const outerModal = document.querySelector(".outer-modal");


//fetch data from the url
async function fetchBirthdayList() {
  let res = await fetch(basePoint);
  const birthdayList = await res.json();
  // console.log(birthdayList);
  let people = [];
  people = birthdayList;
  console.log(people);


//function that will display the list 
const displayPersonsList = () => {
  newPeopleArray = persons.map(data => { 
     // Store all the months in a variable
     const monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
     // Get the day and month
     let date = new Date(data.birthday), day = date.getDate(), month = date.getMonth();
     // Adding "st", "nd", "rd" depending on the number
     if (day == 1 || day == 21 || day == 31) {
         day = day + "st";
     } else if (day == 2 || day == 22) {
         day = day + "nd";
     } else if (day == 3 || day == 23) {
         day = day + "rd";
     } else {
         day = day + "th";
     }
     // Get the full converted date
     const dateString = monthName[month] + " " + day;
     // To get the number of the days
     const oneDay = 1000 * 60 * 60 * 24;
     // get current year  
     const today = new Date();
     let birthDayYear;
     // A function that calculates the age each person
     function calculateAge(dob) { 
         let diffMs = Date.now() - dob.getTime();
         let ageDt = new Date(diffMs); 
         return Math.abs(ageDt.getUTCFullYear() - 1970);
     }
     // Assign the age in a variable so that we can use it with the object
     let age = calculateAge(new Date(data.birthday));
     // Set a condition for the number of days untill the birthday comes
     if (date.getMonth() < today.getMonth()) {
         birthDayYear = today.getFullYear() + 1;
         age++;
     } else if (date.getMonth() == today.getMonth() && date.getDate() > today.getDate()) {
         birthDayYear = today.getFullYear();
         age = age;
     }
     else if (date.getMonth() == today.getMonth() && date.getDate() < today.getDate()) {
         birthDayYear = today.getFullYear() + 1;
         age++;
     } else {
         birthDayYear = today.getFullYear();
     }
     let birthdayDate = new Date(birthDayYear, date.getMonth(), date.getDate());
     let diffDays = Math.ceil((birthdayDate.getTime() - today.getTime()) / (oneDay));
     // This is an object that is used to store the person with the days and date
     const newPerson = {
         firstName: data.firstName,
         lastName: data.lastName,
         id: data.id,
         birthday: data.birthday,
         picture: data.picture, 
         ages: age,
         date: dateString,
         days: diffDays,
     }
     return newPerson;
 });
  
     // This is an object that is used to store the person with the days and date
     return `
            <div>
                <tbody>
                    <tr data-id ="${person.id}">
                      <th scope="row"><img src="${person.picture}"/></th>
                        <td class="firstname">${person.firstName}</td>
                        <td class="lastname">${person.lastName}</td>
                        <td class="birthday" id="date">Turns ${person.ages} in ${person.date}</td>
                        <td>${person.differenceBetweenDays} days</td>  
                        <td><button  class="edit-btn"><img class="edit" src="/images/edit.png" alt=""></button></td> 
                        <td><button class= "delete-btn" data-id="${person.id}"><img class="delete" src="/images/delete.png" alt=""></button></td>
                    </tr>
                </tbody>
            </div>
            `;
    };
  listOfBirthday.innerHTML = html.join('');
}
 

//  const newPerson = {
//   firstName: data.firstName,
//   lastName: data.lastName,
//   id: data.id,
//   birthday: data.birthday,
//   picture: data.picture, 
//   ages: age,
//   date: dateString,
//   differenceBetweenDays: differenceDays,
// }

 


  
     

// console.log(birthdayList);
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

      const editPerson  = async id => {
        console.log(newPeopleBirthdayArray);
        const birthday =  people.find((person => person.id == id));
        console.log(birthday);
        
      }
      console.log(editPerson);

  const editedList = person => {
    return new Promise(async resolve => {
      const popup = document.createElement("form")
      popup.classList.add('popup');

      popup.insertAdjacentHTML("afterbegin", 
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
                <input type="text" class="form-control" name="birthday" id="birthday" value="${person.birthday ? new Date(person.birthday).toISOString.subString(0, 10) : ""}" >
              </div>
            </div>
            <div class="col-auto">
              <button type="submit" id= "submit-btn" class="btn btn-primary mb-2">Save</button>
            </div>
            <div class="col-auto">
              <button type= "submit" id= "cancel-btn" class="btn btn-primary mb-2">Cancel</button>
            </div>
    `);
  document.body.appendChild(popup);
  popup.classList.add('open');
  })}

  //listen for submit button
  popup.addEventListener("submit", (e) => {
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
}})

async function destroyPopup(popup) {
	popup.classList.remove('open');
	// wait for 1 second, to let the animation do its work
	await wait(1000);
	// remove it from the dom
	popup.remove();
	// remove it from the javascript memory
	popup = null;
}

//Function for add new birthday
async function AddNewBirthday (e) {
  e.preventDefault();
  const newPerson = {};
  const result = await editedList(newPerson);
  if (result) {
    result.id = Date.now().toString();
  }
}

// EVENT DELEGATION FOR EVENTS ON LIST

const handleClick = e => {
	const deleteButton = e.target.closest('button.delete-btn');
	if (deleteButton) {
		const idToDelete = deleteButton.dataset.id;
    deletePerson(idToDelete);
  }

  const addButton = e.target.closest("button.addButton");
  if(addButton) {
    AddNewBirthday();
  }
 
}

document.body.addEventListener("click", handleClick);
//Delete an item from the list

const deletePerson = async id => {
	const person = newPeopleBirthdayArray.find(person => person.id === id);
	const result = await deletePopup(person);
	if (result) {
		newPeopleBirthdayArray = newPeopleBirthdayArray.filter(person => person.id !== result.id);
		showPeople(newPeopleBirthdayArray);
		updateLocalStorage();
	}
}

const deletePopup = person => {
	return new Promise(async resolve => {
		// create the html form
		const popup = document.createElement('form');
		popup.classList.add('popup');
		popup.insertAdjacentHTML(
			'afterbegin',
			`<fieldset>
				<h5>Delete ${person.firstName} ${person.lastName}</h5>
				<p>Are you sure you want to delete this person from the list?</p>
        <button type="submit">Delete</button>
      </fieldset>
		`
		);

		const skipButton = document.createElement('button');
		skipButton.type = 'button'; 
    skipButton.textContent = 'Cancel';
		skipButton.classList.add('cancel');
    popup.lastElementChild.appendChild(skipButton);
    
		skipButton.addEventListener(
			'click',
			() => {
				resolve(null);
				destroyPopup(popup);
			},
			{ once: true }
		);

		popup.addEventListener(
			'submit',
			e => {
				e.preventDefault();
				resolve(person);
				destroyPopup(popup);
			},
			{ once: true }
		);

		// document.body.appendChild(popup);
		// await wait(50);
		// popup.classList.add('open');
	});
}