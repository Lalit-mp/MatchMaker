
// ------------All DOM ITEMS-----------------------------

const submitButton = document.querySelector("form");
const loginPage = document.querySelector(".login");
const selectGenderPage = document.querySelector(".select-gender");
const mainAppPage = document.querySelector(".main-page");

const allUser = "https://randomuser.me/api/";
const maleUser = "https://randomuser.me/api/?gender=male"
const femaleUser = "https://randomuser.me/api/?gender=female";

const allText = document.querySelector(".text");
const photo = document.querySelector(".profile> img");
const buttons = document.querySelector(".buttons");
const profileCard = document.querySelector(".profile-holder");
const loading = document.querySelector(".loader");
console.log(loading);


function startloading(){
    loading.style.display= "block";
    setTimeout(()=>{
        loading.style.display= "none";
    },5000)
}
function endloading(){
    loading.style.display= "none";
}

// console.log(submitButton);
// ----------------------Form submit button--------------------------
submitButton.addEventListener("submit",(event)=>{
    console.log("form submited");
    selectGenderPage.classList.add("show");
      loginPage.classList.add("hide");
      selectProfiles();
    event.preventDefault();
})
// ---------------------------Choose Gender-----------------------------

function selectProfiles() {
    const genderButtons = document.querySelector(".gender-list");
  genderButtons.addEventListener("click", (e) => {
    if (e.target.textContent === "Men") {
      console.log("men clicked");
      datafetch(maleUser);
      lastScreen(maleUser);
      selectedGender(maleUser);
    } else if (e.target.textContent === "Women") {
        console.log("women clicked");
        lastScreen(femaleUser);
        datafetch(femaleUser);
        selectedGender(femaleUser);
    } else if (e.target.textContent === "All") {
        console.log("all clicked");
        lastScreen(allUser);
        datafetch(allUser);
        selectedGender(allUser);
    }
});

}

// ----------------------------Last Page------------------------

function lastScreen(link) {
    selectGenderPage.classList.remove("show");
    selectGenderPage.classList.add("hide");
      loginPage.classList.add("hide");
      mainAppPage.classList.add("show");
      datafetch(link).then((data)=>{
            creatingDOM(data);
        });
}
// const URL = "https://randomuser.me/api/";

// ---------------Api call------------------------

async function datafetch(link){
    startloading();
    const fetchData = await fetch(link);
    const json = await fetchData.json();
    endloading();
      return json;

}

function selectedGender(link) {
buttons.addEventListener("click", (e) => {
    // console.log(e.target);
    if (e.target === buttons.children[0]) {
        
        profileCard.classList.toggle("card-in")
      buttons.children[0].classList.add("blue");
      profileCard.classList.add("swipe-left");
      console.log("like");
      datafetch(link).then((data)=>{
        creatingDOM(data);
    }) } else if (e.target === buttons.children[1]) {
        profileCard.classList.toggle("card-in")
      console.log("heart");
      buttons.children[1].classList.add("red");
      profileCard.classList.add("swipe-up");
      datafetch(link).then((data)=>{
        creatingDOM(data);
    }) } else if (e.target === buttons.children[2]) {
        profileCard.classList.toggle("card-in")
      console.log("Dislike");
      buttons.children[2].classList.add("grey");
      profileCard.classList.add("swipe-right");
      datafetch(link).then((data)=>{
        creatingDOM(data);
    })
    }
    endloading();
});
}
    

// datafetch(allUser).then((data)=>{
//     creatingDOM(data);
// });

// ------------Filter data from Api and assigning to dom-----------------------

function creatingDOM(data){
   
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
    
        photo.removeAttribute("scr");
        photo.setAttribute("src", mydata.profilePhoto);
    allText.children[0].textContent = mydata.userName;
    allText.children[1].textContent = mydata.age + mydata.userDob;
    allText.children[2].textContent = mydata.city;

// ----------Resetting buttons color------------------------

    buttons.children[0].classList.remove("blue");
    buttons.children[1].classList.remove("red");
    buttons.children[2].classList.remove("grey");

    // --------------removing animation from the profile card---------------

    if(profileCard.classList.contains("swipe-left")){
        profileCard.classList.remove("swipe-left")
        profileCard.classList.toggle("card-in")
    } else if(profileCard.classList.contains("swipe-up")){
        profileCard.classList.remove("swipe-up")
        profileCard.classList.toggle("card-in")
    }else if(profileCard.classList.contains("swipe-right")){
        profileCard.classList.remove("swipe-right")
        profileCard.classList.toggle("card-in")
    }
    

};