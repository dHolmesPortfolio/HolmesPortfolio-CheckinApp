/*
Name: HolmesPortfolio checkin app
Description: portfolio app
Author: David Holmes
Copyright: 2026 David Holmes
Author URI: https://www.holmesportfolio.co.uk
*/
"use strict";

//tracks current mode
let trackMode = "start";
let visitors = [];
let currentdata = [];
// selectors
const youInfoH = document.querySelector(".your-info");
const CheckinTime = document.querySelector(".visitor-check-time");
const CheckOutTime = document.querySelector(".visitor-checkout-time");
const checkOutbutton = document.querySelector(".checkout-toggle");
const checkinButtons = document.querySelector(".hp-checkedin-buttons");
const closeView = document.querySelector(".hp-close-view");
const search = document.querySelector(".hp-check-out-search");
const vDetails = document.querySelector(".visitor");
const forcheckout = document.querySelector(".for-checkout");
const searchForm = document.querySelector(".checked-in-search");
const SubmitButton = document.querySelector(".hp-submit");
const allFields = document.querySelectorAll(".visitor input");
const form = document.querySelector(".visitor");
const searchField = document.querySelector(".search-field");
const thankYouM = document.querySelector(".Thanks");

// routes
// function for startView
function startView() {
  checkinButtons.classList.remove("hidden");
  search.classList.add("hidden");
  closeView.classList.add("hidden");
  vDetails.classList.add("hidden");
  thankYouM.classList.add("hidden");
  trackMode = "start";
}

//function for checkin
function checkIn() {
  allFields.forEach((input) => {
    if (
      input.type === "checkbox" ||
      input.hidden ||
      input.name === "checkinTime"
    )
      return;
    input.readOnly = false;
  });
  youInfoH.textContent = "Enter your details";
  form.classList.remove("visitor-checkout");
  SubmitButton.classList.remove("hidden");
  checkinButtons.classList.add("hidden");
  search.classList.add("hidden");
  forcheckout.classList.add("hidden");
  closeView.classList.remove("hidden");
  vDetails.classList.remove("hidden");
  CheckinTime.value = dateT();

  trackMode = "check in";
}

//function for search/checkout
function searchMode() {
  SubmitButton.classList.add("hidden");
  checkinButtons.classList.add("hidden");
  search.classList.remove("hidden");
  forcheckout.classList.add("hidden");
  closeView.classList.remove("hidden");
  vDetails.classList.add("hidden");
  trackMode = "check out";
}

//function for checkout
function checkOut(info) {
  youInfoH.textContent = "Your details";
  // call function to fill in the form
  fillform(info);

  allFields.forEach((input) => {
    if (input.type === "checkbox" || input.hidden) return;
    input.readOnly = true;
  });
  SubmitButton.classList.add("hidden");
  checkinButtons.classList.add("hidden");
  search.classList.add("hidden");
  forcheckout.classList.remove("hidden");
  closeView.classList.remove("hidden");
  vDetails.classList.remove("hidden");
  search.classList.add("visitor-fields-checkout");
  form.classList.add("visitor-checkout");
  trackMode = "check out";
}

// collects and stores data on submission (temp on demo)
form.addEventListener("submit", function (e) {
  // add to prevent default for submit
  e.preventDefault();

  const dataArr = [...new FormData(form)];
  const data = Object.fromEntries(dataArr);
  data.carreg = data.carreg.trim().toUpperCase();
  data.checkoutTime = "";
  visitors.push(data);
  thankYou(data.fullname, "in");
  form.reset();
});

function thankYou(n, o) {
  SubmitButton.classList.add("hidden");
  checkinButtons.classList.add("hidden");
  search.classList.add("hidden");
  forcheckout.classList.add("hidden");
  closeView.classList.remove("hidden");
  vDetails.classList.add("hidden");
  thankYouM.classList.remove("hidden");
  thankYouM.textContent = `Thank you ${n} for checking ${o} ✔️`;
  trackMode = "Checked in";
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
  form.reset();
  checkOut(checkoutDetails);
});

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

// check out Time

checkOutbutton.addEventListener("click", function (e) {
  e.preventDefault();
  const d = dateT();

  // adds check out date/time
  currentdata.checkoutTime = d;
  form.reset();
  // thankyou 'out' message
  thankYou(currentdata.fullname, "out");
});

closeView.addEventListener("click", startView);

// fill form used for checkout
function fillform(info) {
  if (!info) return;

  allFields.forEach((input) => {
    if (!input.name) return;

    input.value = info[input.name] ?? "";
    return;
  });
}

// get the date right now
function dateT() {
  const d = new Date();
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  const h = String(d.getHours()).padStart(2, "0");
  const m = String(d.getMinutes()).padStart(2, "0");
  return `${day}-${month}-${year} ${h}:${m}`;
}

//start the app
startView();
