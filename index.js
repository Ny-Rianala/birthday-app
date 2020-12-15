function wait(ms = 0) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const basePoint = './birthdayData.json';
const listOfBirthday = document.querySelector('tbody');
const addPersonToList = document.querySelector("button.add");
console.log(addPersonToList);



//fetch data from the url
async function fetchBirthdayList() {
    let res = await fetch("https://gist.githubusercontent.com/Pinois/e1c72b75917985dc77f5c808e876b67f/raw/93debb7463fbaaec29622221b8f9e719bd5b119f/birthdayPeople.json");
    const birthdayList = await res.json();
    console.log(birthdayList);
    let people = [];
    people = birthdayList;
    console.log(people);



    //function that will display the list 
    function displayList() {

        let newPeopleBirthdayArray = people.sort((a, b) => a.birthday - b.birthday);

        const htmlList = newPeopleBirthdayArray.map(person => {
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
            // Set a condition for the number of days untill the birthday comes
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
        console.log(htmlList);
        const html = htmlList.map(person => {
            return `
            <tr class="container" data-id ="${person.id}">
                <th scope="row"><img src="${person.picture}"/></th>
                <td class="firstname">${person.firstName}</td>
                <td class="lastname">${person.lastName}</td>
                <td class="birthday" id="date">Turns ${person.ages} in ${person.date}</td>
                <td>${person.differenceBetweenDays} days</td>  
                <td><button  class="editButton"><i class="ri-edit-box-fill"></i></button></td> 
                <td><button class= "deleteButton" data-id="${person.id}"><i class="ri-delete-back-2-line"></i></button></td>
            </tr>
            `;
        });
        listOfBirthday.innerHTML = html.join('');
    };
    displayList();

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
        const birthdayId = people.find((birthday => birthday.id == id));
        console.log(birthdayId);
        const result = editPopup(birthdayId);
        if (result) {
            displayList(result);
        }
    }


    const editPopup = person => {
        return new Promise(async resolve => {
            const popup = document.createElement('form');
            popup.classList.add('popup');
            popup.innerHTML =
                `<fieldset>
                <h3>Edit ${person.firstName} ${person.lastName}</h3>
                <label>Lastname</label>
                <input type="text" name="lastName" value="${person.lastName}"/>
                <label>Firstname</label>
                <input type="text" name="firstName" value="${person.firstName}"/>
                <label>Birthday</label>
                <input type="date" id="start" name="tripStart"value="2000-01-01" min="2000-01-01" max="2020-12-31">
                <button class="submit" type="submit">Save</button>
        </fieldset>`;

            const skipButton = document.createElement('button');
            skipButton.type = 'button'; // so it doesn't submit
            skipButton.textContent = 'Cancel';
            popup.firstElementChild.appendChild(skipButton);
            document.body.appendChild(popup);
            // await wait(10);
            popup.classList.add('open');
            popup.addEventListener(
                'submit',
                e => {
                    e.preventDefault();
                    person.lastName = e.target.lastName.value;
                    person.firstName = e.target.firstName.value;
                    person.birthday = e.target.tripStart.value;
                    resolve();
                    displayList()
                    destroyPopup(popup);
                }, { once: true }
            );
            skipButton.addEventListener(
                'click',
                () => {
                    resolve(null);
                    destroyPopup(popup);
                }, { once: true }
            );
        });
    };


    const deletePopup = id => {

        const peopleToDeleteId = people.filter(personToDelete => personToDelete.id !== id);
        console.log(peopleToDeleteId);
        const deletePerson = document.createElement("div");
        document.body.appendChild(deletePerson);
        deletePerson.classList.add('popup');
        deletePerson.insertAdjacentHTML(
            "afterbegin",
            `
                <fieldset>
                    <p>Are you sure to delete this person</p>
                    <button type="submit" class="delete">Delete</button>
                </fieldset>
                `);

        document.body.appendChild(deletePerson);
        deletePerson.classList.add("open");
        const skipButton = document.createElement('button');
        skipButton.type = 'button'; // so it doesn't submit
        skipButton.textContent = 'Cancel';
        deletePerson.firstElementChild.appendChild(skipButton);
        deletePerson.addEventListener(
            'click',
            (e) => {
                e.preventDefault()
                const deletebtn = e.target.closest('button.delete');
                if (deletebtn) {
                    people = peopleToDeleteId;
                    displayList(people);
                    destroyPopup(deletePerson);
                }
            },
        );
        skipButton.addEventListener(
            'click',
            () => {
                destroyPopup(deletePerson);
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
            // Create a popup form when clicking the add button
            const popupAdd = document.createElement('form');
            popupAdd.classList.add('popup');
            popupAdd.insertAdjacentHTML('afterbegin', `
                <form class="modalForm">
                        <label>What is your Avantar?</label>
                        <input type="url" name="pic" value="https://bit.ly/35LplYa">
                        <label>What is your LastName?</label>
                        <input type="text" name="lastname" value="Kati">
                        <label>What is your FirstName?</label>
                        <input type="text" name="firstname" value="Nirina">
                        <label>What is your Birthday date?</label>
                        <input type="date" name="birthday" value="05/05/1998">
                    <div class="form-btn">
                        <button type="submit" class="submit ">Submit</button>
                    </div>
                </form>
            `);
            const skipButton = document.createElement('button');
            skipButton.type = 'button'; // so it doesn't submit
            skipButton.textContent = 'Cancel';
            popupAdd.firstElementChild.appendChild(skipButton);

            document.body.appendChild(popupAdd);
            popupAdd.classList.add('open');


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
                    id: Date.now()
                }
                people.push(newPerson);
                displayList(people);
                // destroyPopup(popupAdd);

                // tbody.dispatchEvent(new CustomEvent('updatePeopleLs'));
            });
            skipButton.addEventListener(
                'click',
                () => {
                    resolve(null);
                    destroyPopup(popupAdd);
                }, { once: true }
            );
        });
    }
    addPersonToList.addEventListener('click', handleAddBtn);


    const handleClick = (e) => {
        if (e.target.closest("button.editButton")) {
            const editBirthdayId = e.target.closest("tr");
            const birthdayId = editBirthdayId.dataset.id;
            editBirthday(birthdayId);
        }
        if (e.target.closest("button.deleteButton")) {
            const deleteBirthdayId = e.target.closest("tr");
            const birthdayToDeleteId = deleteBirthdayId.dataset.id;
            console.log(birthdayToDeleteId);
            deletePopup(birthdayToDeleteId);
        }
    }
    listOfBirthday.addEventListener("click", handleClick);
}

fetchBirthdayList();