const basePoint = './people.json';
const listOfBirthday = document.querySelector('.birthday');

//fetch data from the url
async function fetchBirthdayList () {
    let res = await fetch(`${basePoint}?q=`);
    const birthdayList = await res.json();
    const html = birthdayList
    .sort(function(a, b) {
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
                        <td>
                          <button class= "edit" class="btn btn-primary">Edit</button>
                        </td>
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


const deleteBirthday = (e) => {
	// code delete function here
	const button = e.target.closest('.delete');
	if (button) {
		const personToDelete = e.target.closest("tr");
		console.log(personToDelete);
		const id = personToDelete.dataset.id;
		console.log(id);
		deletePopup(id);
	}
};




fetchBirthdayList();



