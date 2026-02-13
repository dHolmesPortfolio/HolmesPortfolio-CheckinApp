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

// selectors
const youInfoH = document.querySelector(".your-info");
const checkinButtons = document.querySelector(".hp-checkedin-buttons");
const closeView = document.querySelector(".hp-close-view");
const search = document.querySelector(".hp-check-out-search");
const vDetails = document.querySelector(".visitor");
const forcheckout = document.querySelector(".for-checkout");
const searchButton = document.querySelector(".checked-in-search-button");
const SubmitButton = document.querySelector(".hp-submit");
const allFields = document.querySelectorAll(".visitor input");
const form = document.querySelector(".visitor");

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
    checkOut();
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
//group for checkout
function checkOut() {
  infoh("Your details");
  SubmitButton.classList.add("hidden");
  checkinButtons.classList.add("hidden");
  search.classList.remove("hidden");
  forcheckout.classList.remove("hidden");
  closeView.classList.remove("hidden");
  vDetails.classList.add("hidden");
  trackMode = "check out";

  allFields.forEach((input) => {
    input.readOnly = true;
  });
}

searchButton.addEventListener("click", function (e) {
  // do last (loads form with data. must disable form)
});

SubmitButton.addEventListener("click", function (e) {
  // add to prevent default for submit
  e.preventDefault();
  const data = [...new FormData(form)];
  console.log(data);
});

startView();
