# Term 3 JS Project : Birthday App

Hey team! So the final project here will be a birthday list.

We have a list of persons. The app will show us whose person is the closest to have their birthday.

You have a file in the project called person.json. It contains a list of persons, and we want to add all those persons to our birthday list app.

The first time you launch the app, it should fetch all the data from the people.json local file. You can use fetch for that, it also works with local files.

Once they are loaded in the app, you can save them on localstorage, and you don't need to work with the json file anymore.

The app will show the list of people, sorted by the ones who will have their birthday the soonest.

![assets/Screenshot_2020-09-12_at_16.57.18.png](assets/Screenshot_2020-09-12_at_16.57.18.png)

The screenshot is just an example of a possible layout. Feel free to create a custom layout with boostrap if you want to.

The users will be able to add a new element on the list (only on the app list localstorage, not on the json). Here are the fields :

-   first name
-   last name
-   birthday (datepicker)
-   an url for their avatar image
-   an id for handling the operations on the objects. (no need to add that on the form)

The users should be able to edit an element on the list. When you click the edit button, a modal should appear with a form inside, to edit any attribute.

The users should be able to delete an element. There will be a modal that will ask if you're sure to delete the element.

Every action should be persisted into the local storage.

Here is the package you should use for handling date computations. Add it as a dependency of your project

[https://date-fns.org/v1.29.0/docs/differenceInYears](https://date-fns.org/v1.29.0/docs/differenceInYears)

Again, try to make a plan, by dividing big tasks into smaller ones.
You have the whole week to work on it. You can collaborate with other students, but copy/pasting code is forbidden.
Once you're finished with the functionality, try to make your app more appealing with css and other tricks.
Be creative 🎨

Good Luck



## report :

 1 - Structure of the my project:  
- Firstly, I created a function that fetches all of the data. Then, I used sort method to sort the birthady date.  
-  Secondly, I added an eventListener that listen for the edit button so I added variables that will show the values already.  
-  I created a form that will allow the user to edit the list  
  Adding eventListener to the submit button. Then get the input values from the form. 
-  After that, I created a function that will handle the delete button so I added a modal to show the confirm text and the buttons.  


2 - If you had more time, what area of your project would you improve?
 - If I had more time, I would work in the delete, confirm buttons and so on.
     
3 - Did you learn anything new while working on this project?
  - Yes, I learned how to set values inside of the form which we are going to edit.
    
4 - What was the most challenging part for you?
   - The most challenging part for me is to make sure that when we click the cancel button everything inside of the inputs should stay the same then the modal should disappear. I think, I still did not get them right though.  

5 - Would you like a new explanation about a specific topic?  
 I need a bit explanation of using async await. I do not really understand how it works.
- Any other comments?