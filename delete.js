// Listen for the delete button
window.addEventListener('click', e => {
    if (e.target.matches(".delete")) {
        // If the delete button is clicked, show this modal
          const html = `
          <div class="delete-birthday">
            <p>
              Are you sure you want to delete
            </p>
            <button type="submit" class="confirm-btn">Confirm</button>
            <button type="submit" class="cancel-btn">Cancel</button>
          </div>`;
          innerConfirmModal.innerHTML = html;
          outerConfirmModal.classList.add('confirm');
        };      

   const confirmDeleteContainer = e.target.closest(".delete-birthday");


  //confirm the delete
  const confirmDelete = e.target.closest(".confirm-btn");
  if (confirmDelete) {
    let searchElement = newPeopleBirthdayArray.filter(person => person.id !== id);
    newPeopleBirthdayArray(searchElement);
  }
  window.addEventListener("click", confirmDelete);

  // Cancel the warning
  const cancelButton = (e) => {
    if (cancelButton) {
      confirmDeleteContainer.remove("confirm");
    }
  }
  window.addEventListener("click", cancelButton);
})



//remove the modal
const handleCloseConfirmModal = event => {
  const isOutside = !event.target.closest(".inner-confirm-modal");
  if (isOutside) {
      outerConfirmModal.classList.remove("confirm");
  }
};


listeners
outerModal.addEventListener("click", handleCloseModal);
outerConfirmModal.addEventListener("click", handleCloseConfirmModal);