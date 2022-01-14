# REACT Calendar App :calendar:

![Task Manager UI](https://github.com/DKrawczyk/react-calendar/blob/main/assets/preview.png?raw=true)

Thanks for visiting my ***React Calendar app***. This project is based on React library. It is called by me as *"Meeting helper"* :slightly_smiling_face:. This project was made with keeping in mind about [MVP](https://www.biznesowerewolucje.com/mvp-minimum-viable-product-praktycznie/) rule. That is why we can't see meetings in days at the current month. This would be the future functionality.


# Installation :floppy_disk:

This project uses [node](https://nodejs.org/en/) and [npm](https://www.npmjs.com/). To run this project you should first install all dependencies. Install it by command:

      npm i


To start your workspace, you should enter:

      npm start


If your workspace is already running, start your local **JSON Server** by:

      json-server --watch ./database/data.json --port 3005


>
>***Attention!**  
> If the API is supposed to work, **JSON-server** must be always running. Sometimes, after using the command above, you should refresh your website.*
>


Your **API** is ready at this address:

    http://localhost:3005/meetings


# Technologies and solutions :toolbox:

- In this project it was the first time I used the command:

      npx create-react-app@3
    
This package is so much helpful!


- As we said before, local **API** is made by **JSON Server**

- **HTML** structure is named by **BEM methodology**

- I used *reset.css* file

- In every rendered component, I used a special key to make better optimization for React. We could use also the **uuid** package.

- This application is divided into **15 components**. Unfortunately, I didn't use *hooks*. Why? More information is below in the *Conclusions for future projects* tab.

- In the base Calendar component inside construcotr we can see parametr:

      this.lang = 'pl';

 In the src folder, we can find **DaysNamingLanguage**. Here we can set a language for months and days. **This is a future solution for more languages**.

- As you can see, we have a *helpers folder*. This folder includes files, which are solutions for future projects. We are using separate methods to make our work easier. For example:

          export function getNameRegex() {
              return /^[\w'\-,.][^0-9_!¡?÷?¿\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
          }

We can use this **regex** a lot of times and our code would be still legible.

- Our validation inputs are ***fully automatic and flexible***. The way we wrote them allows us to use this method in our future projects. 

      this.fields = [
            {type:"text", name:"firstName", placeholder:"First name", className:"input__field", id:"clicked", validationRules:{isRequired: true, regex: getNameRegex()}},
            {type:"text", name:"lastName", placeholder:"Last Name", className:"input__field", id:"clicked", validationRules:{isRequired: true, regex: getNameRegex()}},
            {type:"text", name:"email", placeholder:"Email", className:"input__field", id:"clicked", validationRules:{isRequired: true, regex: getEmailRegex()}},
            {type:"date", name:"date", placeholder:"Date", className:"input__field", id:"clicked", validationRules:{isRequired: true, regex: getDateRegex()}},
            {type:"time", name:"time", placeholder:"Time", className:"input__field", id:"clicked", validationRules:{isRequired: true, regex: getTimeRegex()}},
        ]

      ...

      if (field.validationRules.isRequired) {
                if (validation.isEmpty(value)) {
                    errors[field.name].push("Field cannot be empty");
                }
                else {
                    if (field.validationRules.regex) {
                        if(!validation.checkDataCorrectness(field.validationRules.regex, value)) {
                            errors[field.name].push("Incorrect format");
                        }
                    }
                }
            }
            errorsCount += errors[field.name].length;
        });    

This validation is ready for development!

- We are using **FETCH** to upload new meetings.

- I had a problem with leap year. Didn't know how to check, how many days are in the current month at the current year. It was a big problem. That's why I made another helper. Called *'date helper'*:

      export function getDaysInMonth(currYear, currMonth) {
          return new Date(currYear, currMonth +1, 0).getDate();
      }

This function return number of days in the current month and current year. It is basing on the current month and year, which we set in the general state:

          this.state = {
              currentDay: new Date().getDate(),
              currentYear: new Date().getFullYear(),
              currentMonth: new Date().getMonth(),
              ...
          }

*(That is why we should use hooks :))*
Because of this solution, **we don't have to make a lot of unnecessary conditional statements**, like this:


    if(currentMonth === 0 || currentMonth === 2 || currentMonth === 4 || currentMonth === 6 || currentMonth === 7 || currentMonth === 9 || currentMonth === 11) {
          currentDay = 31;
    }
    else if(currentMonth === 3 || currentMonth === 5 || currentMonth === 8 || currentMonth === 10) {
          currentDay = 30;
    }
    else if (currentMonth === 1) {
        if ((0 == currentYear % 4) && (0 != currentYear % 100) || (0 == currentYear % 400)) {
             currentDay=29;
        } else {
             currentDay=28;
        }
    }


- At the beginning, the **new Date()** instance was really hard to figure out. This project helped me to understand how does it work and expand my knowledge. Now I know how to set the month, year and check the current day!

- We used *array methods* to remove 0 from the start of the month and the day. Example below:

          setCorrectMonth(date){
              if(date.charAt(5) === '0') {
                  return date.slice(0,5) + date.slice(6, date.length);
              }
              return date;
          }

          setCorrectDay(date) {
              if(date.charAt(7) === '0') {
                  return date.slice(0,7) + date.slice(8, date.length);
              }
              else if(!(date.charAt(7) === '1' || date.charAt(7) === '2' || date.charAt(7) === '3') && date.charAt(8) === '0') {
                  return date.slice(0,8) + date.slice(9, date.length);
              }
              return date;
          }

Because of that, we will be able to automatically sign days, at every month, where we have set meetings.

- I made simply filtered request to **API**. We can enter values and **API** will return the entered suggestions saved in our *database*. 

          loadFilteredData(name, value) {
              return this._fetch(`?${name}_like=${value}`);
          }

          ...

          renderFilteredData(name, value) {
              return this.api.loadFilteredData(name, value)
                  .then(data => console.log(data))
                  .catch(err => console.log(err))
          }


# Conclusions for future projects :brain:

Next time I will use functions from external files in my work environment.

Because of this project, I was able to see the *usefulness of hooks*. In Calendar Left and Right Section I had to write code in this way:

    function addDataFunction(data) {
        const {newMeeting} = props;
        newMeeting(data);
    }
    
    function meetingListFunction() {
        const {showMeetingList} = props;
        return showMeetingList;
    }

It was neccessary to pass values and props. Then I learned about hooks. We could make **Context** and a lot of this code won't be needed. 

I plan to correct this.

I will add the display of meetings next to days of the month.


# Special thanks 🙏
Special thanks to my [Mentor - devmentor.pl](https://devmentor.pl/) for providing me with the task and code review.
