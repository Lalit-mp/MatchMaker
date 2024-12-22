// form handling

const submitButton = document.querySelector('input[type="submit"]');
const loginPage = document.querySelector(".login");
const selectGenderPage = document.querySelector(".select-gender");
const mainAppPage = document.querySelector(".main-page");
console.log(submitButton);
submitButton.addEventListener("click", (e) => {
  const inputTypes = document.querySelectorAll("input");
  for (const element of inputTypes) {
    if (element.value === "") {
      // let elementName = element.name;
      console.log(element);
      alert("Please fill all form fields ");
      break;
    } else {
      selectGenderPage.classList.add("show");
      loginPage.classList.add("hide");
      selectProfiles();
    }
  }
  e.preventDefault();   
});

function selectProfiles() {
  const genderButtons = document.querySelector(".gender-list");
    genderButtons.addEventListener("click", (e) => {
      if (e.target.textContent === "Men") {
        datafetch(maleUser);
        showMainScreen();
        selectGenderPage.classList.remove("show");
        mainAppPage.classList.add("show");
        console.log("runned block 1");
        let genderName = maleUser;
        return genderName;
        
      } else if (e.target.textContent === "Women") {
        console.log("runned block 2");
        datafetch(femaleUser);
        showMainScreen();
        selectGenderPage.classList.remove("show");
        mainAppPage.classList.add("show");
        let genderName = femaleUser;
        return genderName;
      } else if (e.target.textContent === "All") {
        console.log("runned block 3x  ");
        datafetch(allUser);
        showMainScreen();
        selectGenderPage.classList.remove("show");
        mainAppPage.classList.add("show");
        let genderName = allUser;
        console.log(genderName);
        
        return genderName;
      }
    });
  }
  // let genderName = allUser;
  // return genderName;
const allText = document.querySelector(".text");
const photo = document.querySelector(".profile> img");
const buttons = document.querySelector(".buttons");
const profileCard = document.querySelector("profile-holder");

const allUser = "https://randomuser.me/api/";
const maleUser = "https://randomuser.me/api/?gender=male"
const femaleUser = "https://randomuser.me/api/?gender=female";

const returnGender = selectProfiles()
console.log(returnGender);

function showMainScreen() {
  loginPage.classList.add("hide");
}



buttons.addEventListener("click", (e) => {
    console.log(e.target);
    if (e.target === buttons.children[0]) {
      buttons.children[0].style.color = "blue";
      datafetch(returnGender);
      console.log(returnGender);
      
    } else if (e.target === buttons.children[1]) {
      console.log("heart");
      
      datafetch(returnGender);
      buttons.children[1].style.color = "red";
    } else if (e.target === buttons.children[2]) {
      console.log("Dislike");
      buttons.children[2].style.color = "grey";
      datafetch(returnGender);
    }
  });




// const URL = "https://randomuser.me/api/";
function datafetch(URL){
const prodata = fetch(URL);
prodata.then((data)=>{
  return data.json();
}).then((data)=>{
  const mydata = {
    userName : data.results[0].name.title +
    " " +
    data.results[0].name.first +
    " " +
    data.results[0].name.last,
    userDob : data.results[0].dob.date.slice(0, 10),
    city : data.results[0].location.city + " | " + data.results[0].location.country,
    profilePhoto : data.results[0].picture.large,
    age : "Age: " + data.results[0].dob.age + " | "
  }
  console.log("Age: " + data.results[0].dob.age + " | " + mydata.userDob);
  return mydata;
}).then((data)=>{
  photo.removeAttribute("scr");
      photo.setAttribute("src", data.profilePhoto);
  allText.children[0].textContent = data.userName;
  allText.children[1].textContent = data.age + data.userDob;
  allText.children[2].textContent = data.city;
})
}
// datafetch(URL)
// datafetch(URL)
// datafetch(URL)