/*
Name: HolmesPortfolio checkin app
Description: portfolio app
Author: David Holmes
Copyright: 2026 David Holmes
Author URI: https://www.holmesportfolio.co.uk
*/
"use strict";

// selectors
//fields ~
const titlefield = document.querySelector(".title-field");
const namefield = document.querySelector(".name-field");
const mobilefield = document.querySelector(".mobile-field");
// use carreginput
//use searchField

//error messages ~
const titleError = document.querySelector(".titleError");
const fullnameError = document.querySelector(".fullnameError");
const mobileError = document.querySelector(".mobileError");
const carregError = document.querySelector(".carregError");
const findError = document.querySelector(".findError");
//multi uses ~
const form = document.querySelector(".visitor");
const checkinButtons = document.querySelector(".hp-checkedin-buttons");
const vDetails = document.querySelector(".visitor");
const allFields = document.querySelectorAll(".visitor input");
const thankYouM = document.querySelector(".Thanks");
//check in ~
const youInfoH = document.querySelector(".your-info");
const CheckinTime = document.querySelector(".visitor-check-time");
const SubmitButton = document.querySelector(".hp-submit");
const carreginput = document.querySelector(".carreg");
const carInfo = document.querySelector(".car-info");
const holidayInfo = document.querySelector(".holiday-info");
//close view ~
const closeView = document.querySelector(".hp-close-view");
//check out ~
const search = document.querySelector(".hp-check-out-search");
const checkoutButtons = document.querySelector(".for-checkout");
const searchForm = document.querySelector(".checked-in-search");
const searchField = document.querySelector(".search-field");

//tracks current mode and data
let trackMode = "start";
let visitors = [];
let currentdata = "";

// get the date right now
function dateT() {
  const d = new Date();
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  const h = String(d.getHours()).padStart(2, "0");
  const m = String(d.getMinutes()).padStart(2, "0");
  return `Date:${day}-${month}-${year} At time:${h}:${m}`;
}

// the thankyou function two paths
function thankYou(n, o) {
  SubmitButton.classList.add("hidden");
  checkinButtons.classList.add("hidden");
  search.classList.add("hidden");
  checkoutButtons.classList.add("hidden");
  closeView.classList.remove("hidden");
  vDetails.classList.add("hidden");
  thankYouM.classList.remove("hidden");
  thankYouM.textContent = `Thank you ${n} for checking ${o} ✔️`;
  trackMode = "Checked in";
}

// routes
// function for startView
function startView() {
  SubmitButton.classList.add("hidden");
  checkinButtons.classList.remove("hidden");
  search.classList.add("hidden");
  closeView.classList.add("hidden");
  vDetails.classList.add("hidden");
  thankYouM.classList.add("hidden");
  checkoutButtons.classList.add("hidden");
  trackMode = "start";
}

// work out starting route
checkinButtons.addEventListener("click", function (e) {
  const checkBtns = e.target.closest("button");
  //return if nothing pressed
  if (!checkBtns) return;

  if (checkBtns.classList.contains("hp-check-in")) {
    checkIn();
  }
  if (checkBtns.classList.contains("hp-check-out")) {
    searchMode();
  }
});

closeView.addEventListener("click", startView);

// ~~~~~~~~~~~~~~~ part of check in ~~~~~~~~~~~~~~~
//function for checkin
function checkIn() {
  allFields.forEach((input) => {
    if (input.hidden || input.name === "checkinTime") return;
    input.readOnly = false;
  });
  youInfoH.textContent = "Enter your details";
  SubmitButton.classList.remove("hidden");
  checkinButtons.classList.add("hidden");
  closeView.classList.remove("hidden");
  vDetails.classList.remove("hidden");
  checkoutButtons.classList.add("hidden");
  CheckinTime.value = dateT();
  getHolidays();
  trackMode = "check in";
}
// Bank holiday details fetch actions start ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

async function getHolidays() {
  try {
    const res = await fetch("https://www.gov.uk/bank-holidays.json");
    const data = await res.json();

    //
    const events = data["england-and-wales"].events;

    //work out today
    const today = new Date().toISOString().split("T")[0];
    const nearestHoliday = events.find(
      (e) => e.date === today || e.date > today,
    );
    holidayInfo.textContent = `The nearest holiday is ${nearestHoliday.title}`;
  } catch (err) {
    console.log(err);
    holidayInfo.textContent = `Could not load with error ${err}`;
  }
}

// Bank holiday details fetch actions End ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// car reg details fetch actions start ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
carreginput.addEventListener("input", async function (e) {
  const carreg = carreginput.value.trim().toUpperCase();

  if (carreg.length >= 7 && carreg.length <= 8) {
    const details = await vehicleDetails(carreg);
    carInfo.textContent =
      `Colour: ${details.colour}\n` +
      `Make: ${details.make}\n` +
      `Data type: ${details.TestData}`;
  } else carInfo.textContent = "";
  return;
});

// getting vehicle details fake api for Demo
function vehicleDetails(plate) {
  return Promise.resolve({
    registration: plate,
    colour: "Blue",
    make: "Ford",
    TestData: "Not real data",
  });
}
// car reg details fetch actions end ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// collects and stores data on submission (temp on demo)
form.addEventListener("submit", function (e) {
  // add to prevent default for submit
  e.preventDefault();

  //error message start

  if (titlefield.validity.valid) {
    titleError.hidden = true;
    titleError.textContent = "";
  } else {
    titleError.hidden = false;
    titleError.textContent = "Enter a title, it can be up to 6 characters";
  }

  if (namefield.validity.valid) {
    fullnameError.hidden = true;
    fullnameError.textContent = "";
  } else {
    fullnameError.hidden = false;
    fullnameError.textContent = "Enter a full name";
  }

  if (mobilefield.validity.valid) {
    mobileError.hidden = true;
    mobileError.textContent = "";
  } else {
    mobileError.hidden = false;
    mobileError.textContent =
      "Enter a valid UK mobile number, starting with 07";
  }

  if (carreginput.validity.valid) {
    carregError.hidden = true;
    carregError.textContent = "";
  } else {
    carregError.hidden = false;
    carregError.textContent = "Enter a vehicle registration number";
  }
  if (
    !carreginput.validity.valid ||
    !titlefield.validity.valid ||
    !namefield.validity.valid ||
    !mobilefield.validity.valid
  ) {
    return;
  }

  // error message end

  const dataArr = [...new FormData(form)];
  const data = Object.fromEntries(dataArr);
  data.carreg = data.carreg.trim().toUpperCase();
  data.checkoutTime = "";
  visitors.push(data);
  thankYou(data.fullname, "in");
  form.reset();
});
// ~~~~~~~~~~~~~~~ part of check in end ~~~~~~~~~~~~~~~

// ~~~~~~~~~~~~~~~ part of check out ~~~~~~~~~~~~~~~
//function for search/checkout
function searchMode() {
  checkinButtons.classList.add("hidden");
  search.classList.remove("hidden");
  closeView.classList.remove("hidden");
  trackMode = "check out";
}

//function for checkout
function checkOut(info) {
  youInfoH.textContent = "Your details";
  // call function to fill in the form
  fillform(info);

  allFields.forEach((input) => {
    if (input.hidden) return;
    input.readOnly = true;
  });
  search.classList.add("hidden");
  checkoutButtons.classList.remove("hidden");
  vDetails.classList.remove("hidden");
  holidayInfo.textContent = "";
  carInfo.textContent = "";
  trackMode = "check out";
}

// search submission actions
searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const searched = visitors.find(
    (v) => v.carreg === searchField.value.trim().toUpperCase(),
  );

  const checkoutDetails = searched;
  // stop search if already checkedout
  if (!checkoutDetails || checkoutDetails.checkoutTime) return;
  // pass checkout the data from the search as a param
  currentdata = checkoutDetails;
  searchField.value = "";
  checkOut(checkoutDetails);
});

// fill form used for checkout
function fillform(info) {
  if (!info) return;

  allFields.forEach((input) => {
    if (!input.name) return;

    input.value = info[input.name] ?? "";
    return;
  });
}

// check out Time
checkoutButtons.addEventListener("click", function (e) {
  const btn = e.target.closest(".checkout-toggle");
  if (!btn) return;
  e.preventDefault();
  const d = dateT();

  // adds check out date/time
  currentdata.checkoutTime = d;
  form.reset();
  // thankyou 'out' message
  thankYou(currentdata.fullname, "out");
});
//~~~~~~~~~~~~~~ part of check end ~~~~~~~~~~~~~~~

//start the app
startView();
