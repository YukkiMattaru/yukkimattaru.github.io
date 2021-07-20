import ymaps from "ymaps";

import "./styles/reset.css";
import "./styles/index.scss";

import indexContent from "./contents/index.content.html";
import headerContent from "./contents/header.content.html";
import navContent from "./contents/nav.content.html";
import profileContent from "./contents/profile.content.html";
import mapContent from "./contents/map.content.html";
import timerContent from "./contents/timer.content.html";

document.body.innerHTML = indexContent;
document.querySelector(".header").innerHTML = headerContent;
document.querySelector(".nav").innerHTML = navContent;
let navigationElements = document.querySelectorAll(".nav-item");
navigationElements.forEach((el) => {
  el.addEventListener("click", (e) => handleNavigation(e, el.pathname));
});

function processTime(to, from) {
  let diff = to - from;
  let ms = Math.floor((diff % 1000) / 10);
  let s = Math.floor(diff / 1000) % 60;
  let m = Math.floor(diff / 1000 / 60);

  return `${("0" + m.toString()).slice(-2)}:${("0" + s.toString()).slice(
    -2
  )}:${("0" + ms.toString()).slice(-2)}`;
}

function setTimer(openDocumentTime) {
  setInterval(() => {
    let time = processTime(Date.now(), openDocumentTime);
    if (document.getElementById("timer-clock")) {
      document.getElementById("timer-clock").innerText = time;
    }
  }, 45);
}

setTimer(Date.now());

function loadMaps() {
  ymaps
    .load()
    .then((maps) => {
      const map = new maps.Map("yandex-map", {
        center: [55.75322, 37.622513],
        zoom: 6,
      });
    })
    .catch((error) => console.log("Failed to load Yandex Maps", error));
}

function handleNavigation(e, pathname) {
  e.preventDefault();
  if (pathname) {
    history.pushState({}, "", pathname);
    switchContent();
  }
}

function switchNavigation() {
  let navigationElements = document.querySelectorAll(".nav-item");
  navigationElements.forEach((el) => {
    if (el.pathname === document.location.pathname) {
      el.classList.add("nav-item_active");
    } else {
      el.classList.remove("nav-item_active");
    }
  });
}

switchNavigation(document.location.pathname);

function switchContent() {
  switchNavigation();
  if (document.location.pathname === "/") {
    document.querySelector(".page-content").innerHTML = profileContent;
  } else if (document.location.pathname === "/map") {
    document.querySelector(".page-content").innerHTML = mapContent;
    loadMaps();
  } else if (document.location.pathname === "/timer") {
    document.querySelector(".page-content").innerHTML = timerContent;
  } else {
    document.querySelector(
      ".page-content"
    ).innerHTML = `<div style="margin: 0 auto;">Page doesn't exist</div>`;
    return;
  }
}

window.addEventListener("popstate", () => {
  switchContent();
});

switchContent();
