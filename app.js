const notificationBtn = document.querySelector(".notification-icon");
const notificationMenuBtn = document.querySelector("#notification-menu");
const profileBtn = document.querySelector(".profile-detail");
const profileMenuBtn = document.querySelector("#profile-menu");
const closeAlertBtn = document.querySelector(".alert-icon");
const closeMobileAlertBtn = document.querySelector(".alert-icon-mobile");
const upArrowBtn = document.querySelector(".up-arrow");
const downArrowBtn = document.querySelector(".down-arrow");
const accordionHeaders = document.getElementsByClassName("check-header");
const checkBorderFulls = document.getElementsByClassName("check-border-full");
const checkRotates = document.getElementsByClassName("check-rotate");
const checkTicks = document.getElementsByClassName("check-tick");
const progressBar = document.querySelector(".progress-bar");
const progressDetails = document.querySelector(".progress-details");

//////////////////////////// DROPDOWN MENU //////////////////////
const notificationDropdown = document.querySelector(".notification-dropdown");
const profileDropdown = document.querySelector(".profile-dropdown");
const alertSection = document.querySelector(".alert");
const allMenuItems = profileDropdown.querySelectorAll('[role = "menuitem"]');

//////////////////////////// ACCORDION //////////////////////
const container = document.querySelector(".container");
const accordionContainer = document.querySelector(".accordion-container");

//////////////////////////// ACCESSIBILITY //////////////////////
const isProfileMenuExpanded =
  profileMenuBtn.attributes["aria-expanded"].value === "true";
const isNotificationMenuExpanded =
  notificationMenuBtn.attributes["aria-expanded"].value === "true";

//////////////////////////// START OF ALL EVENT LISTENERS //////////////////////
document.addEventListener("click", (e) => {
  outsideNotificationDropdown(e);
  outsideProfileDropdown(e);
});
notificationBtn.addEventListener("click", ToggleNotificationDropdown);
profileBtn.addEventListener("click", ToggleProfileDropdown);
closeAlertBtn.addEventListener("click", ToggleAlert);
closeMobileAlertBtn.addEventListener("click", ToggleMobileAlert);
upArrowBtn.addEventListener("click", closeAccordionContainer);
downArrowBtn.addEventListener("click", openAccordionContainer);
profileDropdown.addEventListener("keyup", (e) => {
  let dp = "profileDropDownMenu";
  handleCloseDropdownOnEscape(e, dp);
});
notificationMenuBtn.addEventListener("keyup", (e) => {
  let dp = "notificationDropDownMenu";
  handleCloseDropdownOnEscape(e, dp);
});
//////////////////////////// END OF ALL EVENT LISTENERS //////////////////////

//////////////////////////// START OF LOOPS - ITERATIONS & MORE LISTENERS //////////////////////
for (let accordionHeader of accordionHeaders) {
  accordionHeader.addEventListener("click", () => {
    toggleAccordion(accordionHeader);
  });
}

for (let checkBorderFull of checkBorderFulls) {
  checkBorderFull.addEventListener("mouseenter", () => {
    removeDashedBorder(checkBorderFull);
  });
}

for (let checkBorderFull of checkBorderFulls) {
  checkBorderFull.addEventListener("mouseleave", () => {
    addDashedBorder(checkBorderFull);
  });
}

for (let checkBorderFull of checkBorderFulls) {
  checkBorderFull.addEventListener("click", () => {
    showCheckRotateTick(checkBorderFull);
  });
}

for (let checkTick of checkTicks) {
  checkTick.addEventListener("click", () => {
    removeCheckTick(checkTick);
  });
}

allMenuItems.forEach((item, itemIndex) => {
  item.addEventListener("keyup", (event) => {
    handleMenuItemArrowKeyPress(event, itemIndex);
  });
});
//////////////////////////// END OF LOOPS - ITERATIONS & MORE LISTENERS //////////////////////

//////////////////////////// START OF ALL EVENT FUNCTIONS ////////////////////////////////
// ===== Toggle Notification Dropdown ===== //
function ToggleNotificationDropdown() {
  if (notificationDropdown.classList.contains("show")) {
    notificationDropdown.classList.remove("show");
  } else {
    notificationDropdown.classList.add("show");
    setTimeout(() => {
      if (isNotificationMenuExpanded) {
        notificationMenuBtn.ariaExpanded = false;
        notificationMenuBtn.focus();
      } else {
        notificationMenuBtn.ariaExpanded = true;
      }
    }, 100);
  }
}

// ===== Toggle Profile Dropdown ===== //
function ToggleProfileDropdown() {
  if (profileDropdown.classList.contains("show")) {
    profileDropdown.classList.remove("show");
  } else {
    profileDropdown.classList.add("show");
    setTimeout(() => {
      if (isProfileMenuExpanded) {
        profileMenuBtn.ariaExpanded = false;
        profileMenuBtn.focus();
      } else {
        profileMenuBtn.ariaExpanded = true;
        allMenuItems.item(0).focus();
      }
    }, 100);
  }
}

// ===== KEYBOARD USERS: Close Dropdown OnEscape ===== //
function handleCloseDropdownOnEscape(e, dp) {
  if (dp === "profileDropDownMenu" && e.key === "Escape") {
    profileDropdown.classList.remove("show");
    profileMenuBtn.ariaExpanded = false;
    profileMenuBtn.focus();
  }
  if (dp === "notificationDropDownMenu" && e.key === "Escape") {
    notificationDropdown.classList.remove("show");
    notificationMenuBtn.ariaExpanded = false;
    notificationMenuBtn.focus();
  }
}

// ===== KEYBOARD USERS: MenuItem Navigation Using KeyBoard ===== //
function handleMenuItemArrowKeyPress(event, itemIndex) {
  const isLastMenuItem = itemIndex === allMenuItems.length - 1;
  const isFirstMenuItem = itemIndex === 0;
  const nextItem = allMenuItems.item(itemIndex + 1);
  const previousItem = allMenuItems.item(itemIndex - 1);

  if (event.key === "ArrowDown" || event.key === "ArrowRight") {
    if (isLastMenuItem) {
      allMenuItems.item(0).focus();
      return;
    }

    nextItem.focus();
  }

  if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
    if (isFirstMenuItem) {
      allMenuItems.item(allMenuItems.length - 1).focus();
      return;
    }

    previousItem.focus();
  }
}

// ===== Close Dropdown When Click Isn't Registered To Notification Dropdown ===== //
function outsideNotificationDropdown(e) {
  let notificationSvg = document.querySelector(".bell");

  if (
    e.target.parentElement === notificationBtn ||
    e.target === notificationSvg ||
    e.target === notificationBtn
  ) {
    return;
  }

  if (
    notificationDropdown.classList.contains("show") &&
    e.target !== notificationDropdown
  ) {
    notificationDropdown.classList.remove("show");
  }
}

// ===== Close Dropdown When Click Isn't Registered To Profile Dropdown ===== //
function outsideProfileDropdown(e) {
  let profileName = document.querySelector(".profile-name");
  let profileInitials = document.querySelector(".profile-initials");

  if (
    e.target.parentElement === profileBtn ||
    e.target === profileName ||
    e.target === profileInitials ||
    e.target === profileBtn
  ) {
    return;
  }

  if (
    profileDropdown.classList.contains("show") &&
    e.target !== profileDropdown
  ) {
    profileDropdown.classList.remove("show");
  }
}

// ===== Toggle Alert Dropdown ===== //
function ToggleAlert(e) {
  e.stopPropagation();

  if (alertSection.classList.contains("invisible")) {
    alertSection.classList.remove("invisible");
  } else {
    alertSection.classList.add("invisible");
    container.classList.add("slide-up");
  }
}

// ===== Toggle Alert Dropdown ===== //
function ToggleMobileAlert(e) {
  e.stopPropagation();

  if (alertSection.classList.contains("invisible")) {
    alertSection.classList.remove("invisible");
  } else {
    alertSection.classList.add("invisible");
    container.classList.add("slide-up");
  }
}

// ===== Close Accordion Container & Toggle Accordion ArrowButton ===== //
function closeAccordionContainer(e) {
  e.stopPropagation();

  if (!accordionContainer.classList.contains("accordion-container-none")) {
    accordionContainer.classList.add("accordion-container-none");
    upArrowBtn.classList.add("hide");
    downArrowBtn.classList.remove("hide");
  }
}

// ===== Open Accordion Container & Toggle Accordion ArrowButton ===== //
function openAccordionContainer(e) {
  e.stopPropagation();

  if (accordionContainer.classList.contains("accordion-container-none")) {
    accordionContainer.classList.remove("accordion-container-none");
    upArrowBtn.classList.remove("hide");
    downArrowBtn.classList.add("hide");
  }
}

// ===== Toggle Accordion Items ===== //
function toggleAccordion(accordionHeader) {
  let accordionContainer =
    accordionHeader.parentElement.parentElement.parentElement;

  if (accordionContainer.classList.contains("collapsed")) {
    for (let currentAccordionHeader of accordionHeaders) {
      let currentAccordionContainer =
        currentAccordionHeader.parentElement.parentElement.parentElement;

      if (!currentAccordionContainer.classList.contains("collapsed")) {
        currentAccordionContainer.classList.add("collapsed");
      }
    }

    accordionContainer.classList.remove("collapsed");
  }
}

// ===== Remove DashedBorders From SVG If Step isCompleted ===== //
function removeDashedBorder(checkBorderFull) {
  let checkCircle = checkBorderFull.querySelector("circle");
  checkCircle.removeAttribute("stroke-dasharray");
}

// ===== Add DashedBorders To SVG If Step isNotCompleted ===== //
function addDashedBorder(checkBorderFull) {
  let checkCircle = checkBorderFull.querySelector("circle");
  checkCircle.setAttribute("stroke-dasharray", "4 6");
}

// ===== All Actions When Step Is Completed ===== //
function showCheckRotateTick(checkBorderFull) {
  checkBorderFull.classList.add("hide");

  let checkRotate = checkBorderFull.nextElementSibling;

  let accordion =
    checkRotate.parentElement.parentElement.parentElement.parentElement;

  checkRotate.classList.add("check-rotate-active");

  setTimeout(() => {
    checkRotate.classList.remove("check-rotate-active");
    checkRotate.nextElementSibling.classList.add("check-tick-active");
    accordion.setAttribute("aria-checked", "true");

    for (let checkTick of checkTicks) {
      let currentAccordion =
        checkTick.parentElement.parentElement.parentElement.parentElement;

      if (!currentAccordion.classList.contains("collapsed")) {
        currentAccordion.classList.add("collapsed");
      }
    }
  }, 600);

  let section = 100 / checkTicks.length;
  let progressBarWidth = section;
  let activeAccordionCount = 1;

  for (let checkTick of checkTicks) {
    if (checkTick.classList.contains("check-tick-active")) {
      progressBarWidth += section;
      activeAccordionCount++;
    }
  }

  setTimeout(() => {
    progressDetails.innerText =
      activeAccordionCount + " / " + checkTicks.length + " completed";
    progressBar.removeAttribute("style");
    progressBar.setAttribute("style", "width:" + progressBarWidth + "%;");

    accordion.classList.add("collapsed");

    function criteria(element) {
      if (element !== null) {
        if (!element.hasAttribute("aria-checked")) {
          return true;
        }
      }
    }

    function checkNextSiblings(element, criteriaFn) {
      if (!element || !element.nextElementSibling) {
        return;
      }

      if (criteriaFn(element.nextElementSibling)) {
        return element.nextElementSibling;
      }

      return checkNextSiblings(element.nextElementSibling, criteriaFn);
    }

    function checkPreviousSiblings(element, criteriaFn) {
      if (!element || !element.previousElementSibling) {
        return;
      }

      if (criteriaFn(element.previousElementSibling)) {
        return element.previousElementSibling;
      }

      return checkPreviousSiblings(element.previousElementSibling, criteriaFn);
    }

    let nextSibling = checkNextSiblings(accordion, criteria);

    if (nextSibling) {
      nextSibling.classList.remove("collapsed");
    } else {
      let previousSibling = checkPreviousSiblings(accordion, criteria);

      previousSibling.classList.remove("collapsed");
    }
  }, 600);
}

// ===== All Actions When Step Is Not Completed ===== //
function removeCheckTick(checkTick) {
  checkTick.classList.remove("check-tick-active");

  let checkRotate = checkTick.previousElementSibling;

  let accordion =
    checkRotate.parentElement.parentElement.parentElement.parentElement;

  checkRotate.previousElementSibling.classList.remove("hide");

  accordion.removeAttribute("aria-checked");

  let section = 100 / checkTicks.length;
  let activeAccordionCount = 0;

  for (let checkTick of checkTicks) {
    if (checkTick.classList.contains("check-tick-active")) {
      activeAccordionCount++;
    }
  }

  let progressBarWidth = section * activeAccordionCount;

  progressDetails.innerText =
    activeAccordionCount + " / " + checkTicks.length + " completed";

  progressBar.removeAttribute("style");
  progressBar.setAttribute("style", "width:" + progressBarWidth + "%;");
}
////////////////////////////// END OF ALL EVENT FUNCTIONS ////////////////////////////////
