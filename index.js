// const { format } = require("date-fns");

function wait(ms = 0) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const basePoint = './birthdayData.json';
const listOfBirthday = document.querySelector('div.wrapper');
const addPersonToList = document.querySelector("button.add");
const searchByName = document.querySelector("[name='search']")
const searchByMonth = document.querySelector('[name="select"]')

//fetch data from the url
async function fetchBirthdayList() {
    let res = await fetch("https://gist.githubusercontent.com/Pinois/e1c72b75917985dc77f5c808e876b67f/raw/b17e08696906abeaac8bc260f57738eaa3f6abb1/birthdayPeople.json");
    const birthdayList = await res.json();
    let people = [];
    people = birthdayList;

    function setBirthdayList() {
        localStorage.setItem("people", JSON.stringify(people));
    }

    
    function getBirthdayList() {
        let listOfPeople = JSON.parse(localStorage.getItem("people"));
        if(listOfPeople !== null) {
            people = listOfPeople;
        }else {
            people = birthdayList;
        }
        displayList(people);
    }
  
  function filters () {
    const selectSearch = searchByMonth.value.toLowerCase().trim();
    const inputSearch = searchByName.value.toLowerCase().trim();
    const searchedPeople = people.filter(person => {
      return person.firstName.toLowerCase().includes(inputSearch) ||
      person.lastName.toLowerCase().includes(inputSearch)
    })
    const filteredPeople = searchedPeople.filter(person => {
      const month = new Date(person.birthday).toLocaleString("en-US", {month: "long"})
      return month.toLowerCase().includes(selectSearch)
    })
    displayList(filteredPeople)
  }
  
  //function that will display the list 
  function displayList(birthdayList) {
    // let newPeopleBirthdayArray = people.sort((a, b) => a.birthday - b.birthday);
    const htmlList = birthdayList.map(person => {
      // Store all the months in a variable
      const monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      // Get the day and month
      let date = new Date(person.birthday),
      day = date.getDate(),
      month = date.getMonth();
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
      let age = calculateAge(new Date(person.birthday));
      // Set a condition for the number of days until the birthday comes
      if (date.getMonth() < today.getMonth()) {
        birthDayYear = today.getFullYear() + 1;
        age++;
      } else if (date.getMonth() == today.getMonth() && date.getDate() > today.getDate()) {
        birthDayYear = today.getFullYear();
        age = age;
      } else if (date.getMonth() == today.getMonth() && date.getDate() < today.getDate()) {
        birthDayYear = today.getFullYear() + 1;
        age++;
      } else {
        birthDayYear = today.getFullYear();
      }
      let birthdayDate = new Date(birthDayYear, date.getMonth(), date.getDate());
      let diffDays = Math.ceil((birthdayDate.getTime() - today.getTime()) / (oneDay));
      // This is an object that is used to store the person with the days and date
      const newPerson = {
        firstName: person.firstName,
        lastName: person.lastName,
        id: person.id,
        birthday: person.birthday,
        picture: person.picture,
        ages: age,
        date: dateString,
        differenceBetweenDays: diffDays,
      }
      return newPerson;
    });
    
    const html = htmlList.sort((a, b) => a.differenceBetweenDays - b.differenceBetweenDays).map(person => {
      return `
      <div>
      <ul class="container" data-id ="${person.id}">
      <li scope="row"><img src="${person.picture}"/></li>
      <div class="container-name">
      <span class="name">
      <li class="firstname">${person.firstName}</li>
      <li class="lastname">${person.lastName}</li>
      </span>
      <li class="birthday" id="date">Turns <b>${person.ages}</b> in ${person.date}</li>
      </div>
      <li class="days">${person.differenceBetweenDays} days</li>  
      <div class="delete_edit">
      <li class="editButton"><i class="ri-edit-box-line"></i></li> 
      <li class= "deleteButton" data-id="${person.id}"><i class="ri-delete-back-2-line"></i></li>
      </div>
      </ul>
      </div>
      `;
    });
    listOfBirthday.innerHTML = html.join('');
  };
  displayList(people);
  
  async function destroyPopup(popup) {
    popup.classList.remove('open');
    // wait for 1 second, to let the animation do its work
    await wait(1000);
    // remove it from the dom
    popup.remove();
    // remove it from the javascript memory
    popup = null;
  }
      
    //function that will look for the birthday id
  const editBirthday = id => {
    const personToEdit = people.find((birthday => birthday.id == id));
    console.log(personToEdit);
    const result = editPopup(personToEdit);
    if (result) {
    }
  }
      
      
      const editPopup = (person) => {
        const birthdayDate = new Date(person.birthday).toISOString().slice(0, 10);
        const formatDate = new Date().toISOString().slice(0, 10);
        // console.log(birthdayDate);
        return new Promise(async resolve => {
          const popup = document.createElement('form');
          popup.classList.add('popup');
          popup.innerHTML =
          `<fieldset>
            <h3 class="firstandlastname">Edit ${person.firstName} ${person.lastName}</h3>
            <label>Lastname</label>
            <input type="text" name="lastName" value="${person.lastName}"/>
            <label>Firstname</label>
            <input type="text" name="firstName" value="${person.firstName}"/>
            <label>Birthday</label>
            <input 
              type="date" 
              id="start" 
              name="birthday"  
              value="${birthdayDate}"
              max="${formatDate}"
            >
            <button class="submit-edit" type="submit">Save changes</button>
          </fieldset>`;
          
          const skipButton = document.createElement('button');
          skipButton.type = 'button'; // so it doesn't submit
          skipButton.textContent = 'Cancel';
          skipButton.classList.add("cancel-edit");
          // document.body.style.overflow = "auto";
          popup.firstElementChild.appendChild(skipButton);
          document.body.appendChild(popup);
          // await wait(10);
          popup.classList.add('open');
          // document.body.style.overflow = "hidden";
          popup.addEventListener('submit', (e) => {
            e.preventDefault();
            person.lastName = e.target.lastName.value;
            person.firstName = e.target.firstName.value;
            person.birthday = e.target.birthday.value;
            person.id= Date.now().toString;
            displayList(people); 
            destroyPopup(popup);
            // document.body.style.overflow = "auto";
            }, { once: true });

            skipButton.addEventListener('click', () => {
              resolve(null);
              destroyPopup(popup);
            }, { once: true });
        });
      };
              
                  
      const deletePopup = id => {
        const deletePerson = document.createElement("form");
                document.body.appendChild(deletePerson);
                deletePerson.classList.add('popup');
                deletePerson.insertAdjacentHTML(
                  "afterbegin",`<fieldset>
                    <p>Are you sure to delete this person</p>
                    <button type="submit" class="delete">Delete</button>
                  </fieldset>
                  `);
                  
                  document.body.appendChild(deletePerson);
                  deletePerson.classList.add("open");
                  document.body.style.overflow = "hidden";
                  const skipButton = document.createElement('button');
                  skipButton.type = 'button'; // so it doesn't submit
                  skipButton.textContent = 'Cancel';
                  skipButton.classList.add("cancel-delete");
                    document.body.style.overflow = "auto";
                    deletePerson.firstElementChild.appendChild(skipButton);

                    deletePerson.addEventListener('submit',(e) => {
                      e.preventDefault()
                      const peopleToDeleteId = people.filter(personToDelete => personToDelete.id != id);
                      displayList(peopleToDeleteId);
                      destroyPopup(deletePerson);
                    }, { once: true });

                    skipButton.addEventListener('click',() => {
                        destroyPopup(deletePerson);
                        document.body.style.overflow = "auto";
                      }, { once: true }
                      );
                    }
                        
    //Function to add a person to the list
    
    const handleAddBtn = e => {
      if (e.target.closest('button.add')) {
        handleAddListBtn();
      }
    }
    
    const handleAddListBtn = () => {
      return new Promise(async function(resolve) {
        const formatDate = new Date().toISOString().slice(0, 10);
        // Create a popup form when clicking the add button
        const popupAdd = document.createElement('form');
        popupAdd.classList.add('popup');
        popupAdd.insertAdjacentHTML('afterbegin',
        `
        <form class="modalForm">
        <label>What is your Avantar?</label>
        <input type="url" name="pic" value="https://picsum.photos/id/1006/120/120?grayscale">
              <label>What is your FirstName?</label>
              <input type="text" name="firstname" placeholder="your firstname">
              <label>What is your LastName?</label>
              <input type="text" name="lastname" placeholder="your lastname">
              <label>What is your Birthday date?</label>
              <input type="date" name="birthday" max="${formatDate}">
              <div class="form-btn" required>
              <button type="submit" class="submit ">Submit</button>
              </div>
              </form>
              `);
              const skipButton = document.createElement('button');
              skipButton.type = 'button'; // so it doesn't submit
              skipButton.textContent = 'Cancel';
              skipButton.classList.add("cancel");
              document.body.style.overflow = "auto";
                        popupAdd.lastElementChild.appendChild(skipButton);
                        
                        document.body.appendChild(popupAdd);
                        popupAdd.classList.add('open');
                        document.body.style.overflow = "hidden";
                        
                        
                        // Listen to the submit event
                        popupAdd.addEventListener('submit', e => {
                          e.preventDefault();
                          const form = e.currentTarget;
                          resolve();
                          
                            
                          // Create a new object for the new person
                          const newPerson = {
                    picture: form.pic.value,
                    lastName: form.lastname.value,
                    firstName: form.firstname.value,
                    birthday: form.birthday.value,
                    id: Date.now().toString()
                  }
                  people.push(newPerson);
                  displayList(people);
                  destroyPopup(popupAdd);
                  document.body.style.overflow = "auto";
                  
                  // tbody.dispatchEvent(new CustomEvent('updatePeopleLs'));
                  
                });
                skipButton.addEventListener(
                'click',
                () => {
                  resolve(null);
                  destroyPopup(popupAdd);
                  document.body.style.overflow = "auto";
                }, { once: true }
                );
              });
            }
            addPersonToList.addEventListener('click', handleAddBtn);
            
            
            const handleClick = (e) => {
              if (e.target.closest("li.editButton")) {
            const editBirthdayId = e.target.closest("ul");
            const birthdayId = editBirthdayId.dataset.id;
            editBirthday(birthdayId);
          }
        if (e.target.closest("li.deleteButton")) {
          const deleteBirthdayId = e.target.closest("ul");
          const birthdayToDeleteId = deleteBirthdayId.dataset.id;
          console.log(birthdayToDeleteId);
          deletePopup(birthdayToDeleteId);
        }
      }

      // const setBirthday = people.localStorage.setItem("peoplesBirthday", JSON.stringify(people));
      // const getBirthday = people.localStorage.getItem("peoplesBirthday");
      
      getBirthdayList();
      listOfBirthday.addEventListener("click", handleClick);
      setBirthdayList();
      //Filter person's birthday by name  
      searchByName.addEventListener("keyup", filters);    
      //Select person's birthday by month
      searchByMonth.addEventListener("change",filters);
    }
    
    fetchBirthdayList();