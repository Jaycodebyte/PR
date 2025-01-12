'use strict';



/**
 * Add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * MOBILE NAVBAR TOGGLER
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");

const toggleNav = () => {
  navbar.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNav);



/**
 * HEADER ANIMATION
 * When scrolled donw to 100px header will be active
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});




/**
 * SLIDER
 */

const slider = document.querySelector("[data-slider]");
const sliderContainer = document.querySelector("[data-slider-container]");
const sliderPrevBtn = document.querySelector("[data-slider-prev]");
const sliderNextBtn = document.querySelector("[data-slider-next]");

let totalSliderVisibleItems = Number(getComputedStyle(slider).getPropertyValue("--slider-items"));
let totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;

let currentSlidePos = 0;

const moveSliderItem = function () {
  sliderContainer.style.transform = `translateX(-${sliderContainer.children[currentSlidePos].offsetLeft}px)`;
}

/**
 * NEXT SLIDE
 */

const slideNext = function () {
  const slideEnd = currentSlidePos >= totalSlidableItems;

  if (slideEnd) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  moveSliderItem();
}

sliderNextBtn.addEventListener("click", slideNext);

/**
 * PREVIOUS SLIDE
 */

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = totalSlidableItems;
  } else {
    currentSlidePos--;
  }

  moveSliderItem();
}

sliderPrevBtn.addEventListener("click", slidePrev);

/**
 * RESPONSIVE
 */
window.addEventListener("resize", function () {
  totalSliderVisibleItems = Number(getComputedStyle(slider).getPropertyValue("--slider-items"));
  totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;

  moveSliderItem();
});

// **************************************************
// Notes Functionality
document.addEventListener("DOMContentLoaded", () => {
  const notesModal = document.getElementById("notes-modal");
  const notesOption = document.getElementById("notes-option");
  const closeModal = document.getElementById("close-modal");
  const saveNoteButton = document.getElementById("save-note");
  const noteText = document.getElementById("note-text");
  const notesList = document.getElementById("notes-list");

  // Show Notes Modal
  notesOption.addEventListener("click", () => {
    notesModal.classList.remove("hidden");
    notesModal.classList.add("visible");
  });

  // Close Notes Modal
  closeModal.addEventListener("click", () => {
    notesModal.classList.remove("visible");
    notesModal.classList.add("hidden");
  });

  // Load Notes from Local Storage
  const loadNotes = () => {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notesList.innerHTML = "";
    notes.forEach((note, index) => {
      const li = document.createElement("li");
      li.textContent = note;

      // Add Delete Button
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => {
        deleteNote(index);
      });

      li.appendChild(deleteBtn);
      notesList.appendChild(li);
    });
  };

  // Save Note
  saveNoteButton.addEventListener("click", () => {
    const note = noteText.value.trim();
    if (note) {
      const notes = JSON.parse(localStorage.getItem("notes")) || [];
      notes.push(note);
      localStorage.setItem("notes", JSON.stringify(notes));
      noteText.value = ""; // Clear textarea
      loadNotes(); // Refresh notes list
    }
  });

  // Delete Note
  const deleteNote = (index) => {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    loadNotes();
  };

  // Initialize
  loadNotes();
});
// ****************************************
document.addEventListener("DOMContentLoaded", () => {
  const notesModal = document.getElementById("notes-modal");
  const notesOption = document.getElementById("notes-option");
  const closeModal = document.getElementById("close-modal");
  const saveNoteButton = document.getElementById("save-note");
  const noteText = document.getElementById("note-text");
  const notesList = document.getElementById("notes-list");

  // Show Notes Modal
  notesOption.addEventListener("click", (event) => {
    event.preventDefault();
    notesModal.classList.remove("hidden");
    notesModal.classList.add("visible");
  });

  // Close Notes Modal
  closeModal.addEventListener("click", () => {
    notesModal.classList.remove("visible");
    notesModal.classList.add("hidden");
  });

  // Load Notes from Local Storage
  const loadNotes = () => {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notesList.innerHTML = "";
    notes.forEach((note, index) => {
      const li = document.createElement("li");
      li.textContent = note;

      // Add Delete Button
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => {
        deleteNote(index);
      });

      li.appendChild(deleteBtn);
      notesList.appendChild(li);
    });
  };

  // Save Note
  saveNoteButton.addEventListener("click", () => {
    const note = noteText.value.trim();
    if (note) {
      const notes = JSON.parse(localStorage.getItem("notes")) || [];
      notes.push(note);
      localStorage.setItem("notes", JSON.stringify(notes));
      noteText.value = ""; // Clear textarea
      loadNotes(); // Refresh notes list
    }
  });

  // Delete Note
  const deleteNote = (index) => {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    loadNotes();
  };

  // Initialize
  loadNotes();
});
// *****************************
document.addEventListener('DOMContentLoaded', function () {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const body = document.body;

  // Check for saved theme in localStorage
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    themeIcon.name = 'moon'; // Change to moon icon for dark mode
  } else {
    body.classList.remove('dark-mode');
    themeIcon.name = 'sunny-outline'; // Change to sun icon for light mode
  }

  // Toggle theme on button click
  themeToggleBtn.addEventListener('click', function () {
    body.classList.toggle('dark-mode');
    
    // Save theme preference in localStorage
    if (body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
      themeIcon.name = 'moon'; // Change to moon icon for dark mode
    } else {
      localStorage.setItem('theme', 'light');
      themeIcon.name = 'sunny-outline'; // Change to sun icon for light mode
    }
  });
});
