'use strict';

// Selectors
const navbarLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');
const filterBtns = document.querySelectorAll('[data-filter-btn]');
const filterItems = document.querySelectorAll('[data-filter-item]');
const selectBtn = document.querySelector('[data-select]');
const selectList = document.querySelector('.select-list');
const selectValue = document.querySelector('[data-selecct-value]');
const selectItems = document.querySelectorAll('[data-select-item]');
const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');

// -- Navigation --

const handleNavClick = (clickedNavLink) => {
  // Remove 'active' class from all nav links and pages
  navbarLinks.forEach((navLink) => {
    navLink.classList.remove('active');
  });
  pages.forEach((page) => {
    page.classList.remove('active');
  });

  // Add 'active' class to the clicked nav link and corresponding page
  clickedNavLink.classList.add('active');
  const targetPage = document.querySelector(`[data-page="${clickedNavLink.textContent.toLowerCase()}"]`);
  targetPage.classList.add('active');
};

navbarLinks.forEach((navLink) => {
  navLink.addEventListener('click', () => {
    handleNavClick(navLink);
  });
});

// -- Portfolio Filtering --

const filterProjects = (category) => {
  filterItems.forEach((item) => {
    const itemCategory = item.dataset.category;
    if (category === 'all' || itemCategory === category) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
};

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    // Remove 'active' class from all filter buttons
    filterBtns.forEach((filterBtn) => {
      filterBtn.classList.remove('active');
    });

    // Add 'active' class to the clicked filter button
    btn.classList.add('active');
    const category = btn.textContent.toLowerCase();
    filterProjects(category);
  });
});

// -- Select Box for Mobile (Portfolio) --

selectBtn.addEventListener('click', () => {
  selectList.classList.toggle('active');
});

selectItems.forEach((item) => {
  item.addEventListener('click', () => {
    const selectedValue = item.textContent;
    selectValue.textContent = selectedValue;
    selectList.classList.remove('active');
    filterProjects(selectedValue.toLowerCase());
  });
});

// -- Contact Form Validation --

const validateForm = () => {
  let isValid = true;
  formInputs.forEach((input) => {
    if (!input.value.trim()) {
      isValid = false;
    }
  });
  formBtn.disabled = !isValid;
};

formInputs.forEach((input) => {
  input.addEventListener('input', validateForm);
});

// Initial validation check
validateForm();
