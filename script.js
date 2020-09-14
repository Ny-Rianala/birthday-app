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
                    </tr>
                </body>
            </div>
            `;
    });
    listOfBirthday.innerHTML = html.join('');
}

fetchBirthdayList();



