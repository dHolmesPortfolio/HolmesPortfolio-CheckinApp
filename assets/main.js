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
// selectors
const youInfoH = document.querySelector(".your-info");
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

// change heading
function infoh(t) {
  youInfoH.textContent = t;
}

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

// group for startView
function startView() {
  checkinButtons.classList.remove("hidden");
  search.classList.add("hidden");
  closeView.classList.add("hidden");
  vDetails.classList.add("hidden");
  trackMode = "start";
}
//group for checkin
function checkIn() {
  infoh("Enter your details");
  form.classList.remove("visitor-checkout");
  SubmitButton.classList.remove("hidden");
  checkinButtons.classList.add("hidden");
  search.classList.add("hidden");
  forcheckout.classList.add("hidden");
  closeView.classList.remove("hidden");
  vDetails.classList.remove("hidden");
  trackMode = "check in";

  allFields.forEach((input) => {
    input.readOnly = false;
  });
}

//group for search
function searchMode() {
  SubmitButton.classList.add("hidden");
  checkinButtons.classList.add("hidden");
  search.classList.remove("hidden");
  forcheckout.classList.add("hidden");
  closeView.classList.remove("hidden");
  vDetails.classList.add("hidden");
  trackMode = "check out";
}

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const searched = visitors.find(
    (v) => v.carreg === searchField.value.trim().toUpperCase(),
  );

  const checkoutDetails = searched;
  // pass checkout the data as param
  checkOut(checkoutDetails);
});

//group for checkout
function checkOut(info) {
  infoh("Your details");
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

function fillform(info) {
  if (!info) return;

  allFields.forEach((input) => {
    if (!input.name) return;

    input.value = info[input.name] ?? "";
    return;
  });
}

form.addEventListener("submit", function (e) {
  // add to prevent default for submit
  e.preventDefault();

  const dataArr = [...new FormData(form)];
  const data = Object.fromEntries(dataArr);
  data.carreg = data.carreg.trim().toUpperCase();
  visitors.push(data);
});

startView();
