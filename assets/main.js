/*
Name: HolmesPortfolio checkin app
Description: portfolio app
Author: David Holmes
Copyright: 2026 David Holmes
Author URI: https://www.holmesportfolio.co.uk
*/
"use strict";

// selectors
const youInfoH = document.querySelector(".your-info");
const CheckinTime = document.querySelector(".visitor-check-time");
const checkinButtons = document.querySelector(".hp-checkedin-buttons");
const closeView = document.querySelector(".hp-close-view");
const search = document.querySelector(".hp-check-out-search");
const vDetails = document.querySelector(".visitor");
const checkoutButtons = document.querySelector(".for-checkout");
const searchForm = document.querySelector(".checked-in-search");
const SubmitButton = document.querySelector(".hp-submit");
const allFields = document.querySelectorAll(".visitor input");
const form = document.querySelector(".visitor");
const searchField = document.querySelector(".search-field");
const thankYouM = document.querySelector(".Thanks");

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
    if (
      input.type === "checkbox" ||
      input.hidden ||
      input.name === "checkinTime"
    )
      return;
    input.readOnly = false;
  });
  youInfoH.textContent = "Enter your details";
  SubmitButton.classList.remove("hidden");
  checkinButtons.classList.add("hidden");
  closeView.classList.remove("hidden");
  vDetails.classList.remove("hidden");
  checkoutButtons.classList.add("hidden");
  CheckinTime.value = dateT();
  trackMode = "check in";
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
    if (input.type === "checkbox" || input.hidden) return;
    input.readOnly = true;
  });
  search.classList.add("hidden");
  checkoutButtons.classList.remove("hidden");
  vDetails.classList.remove("hidden");
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
  form.reset();
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
