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
const thankYouM = document.querySelector(".Thanks");
// change heading

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

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const searched = visitors.find(
    (v) => v.carreg === searchField.value.trim().toUpperCase(),
  );

  const checkoutDetails = searched;
  if (!checkoutDetails) return; // pass checkout the data from the search as a param
  checkOut(checkoutDetails);
});

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

function thankYou(n) {
  SubmitButton.classList.add("hidden");
  checkinButtons.classList.add("hidden");
  search.classList.add("hidden");
  forcheckout.classList.add("hidden");
  closeView.classList.remove("hidden");
  vDetails.classList.add("hidden");
  thankYouM.classList.remove("hidden");
  thankYouM.textContent = `Thank you ${n} for checking in ✔️`;
  trackMode = "Checked in";
}

// fill form used for checkout
function fillform(info) {
  if (!info) return;

  allFields.forEach((input) => {
    if (!input.name) return;

    input.value = info[input.name] ?? "";
    return;
  });
}

// collects and stores data on submission (temp on demo)
form.addEventListener("submit", function (e) {
  // add to prevent default for submit
  e.preventDefault();

  const dataArr = [...new FormData(form)];
  const data = Object.fromEntries(dataArr);
  data.carreg = data.carreg.trim().toUpperCase();
  visitors.push(data);
  thankYou(data.fullname);
});

function date(d) {
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
}
startView();
