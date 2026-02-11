/*
Name: HolmesPortfolio checkin app
Description: portfolio app
Author: David Holmes
Copyright: 2026 David Holmes
Author URI: https://www.holmesportfolio.co.uk
*/
"use strict";

const checkinButtons = document.querySelector(".hp-checkedin-buttons");
const closeView = document.querySelector(".hp-close-view");
const search = document.querySelector(".hp-check-out-search");
const vDetails = document.querySelector(".visitor");

checkinButtons.addEventListener("click", function (e) {
  //return if nothing pressed
  const checkBtns = e.target.closest("button");
  if (!checkBtns) return;

  if (checkBtns.classList.contains("hp-check-in")) {
    checkinButtons.classList.add("hidden");
    search.classList.add("hidden");
    closeView.classList.remove("hidden");
    vDetails.classList.remove("hidden");
    console.log("check in");
  }

  if (checkBtns.classList.contains("hp-check-out")) {
    checkinButtons.classList.add("hidden");
    search.classList.remove("hidden");
    closeView.classList.remove("hidden");
    vDetails.classList.add("hidden");
    console.log("check out");
  }
});

closeView.addEventListener("click", function () {
  checkinButtons.classList.remove("hidden");
  search.classList.add("hidden");
  closeView.classList.add("hidden");
  vDetails.classList.add("hidden");

  console.log("check in");
});
