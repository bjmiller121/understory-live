document.addEventListener('DOMContentLoaded', function() {
  /**
   * Dark Mode handling for toggle and cookies on page load.
   */
  var $darkModeLink = document.querySelector('.dark-mode-toggle');

  if ($darkModeLink != undefined) {
    if (Cookies.get('dark-mode') == 'on') {
      toggleDarkMode();
    }

    $darkModeLink.addEventListener("click", (event) => toggleDarkMode(true));
  }

  /**
   * Toggle classes and cookies for dark Mode
   * @param  {Boolean} clicked TRUE if the event triggering the toggle is a user's click
   */
  function toggleDarkMode(clicked) {
    $darkModeLink.children.item(0).classList.toggle('bi-lightbulb-off-fill');
    $darkModeLink.children.item(0).classList.toggle('bi-lightbulb-fill');

    document.querySelector('body').classList.toggle('dark-mode');

    if (clicked) {
      if (Cookies.get('dark-mode') == 'on') {
        Cookies.set('dark-mode', 'off');
      } else {
        Cookies.set('dark-mode', 'on');
      }
      event.preventDefault();
    }
  }


  /**
   * Main Menu interactions
   */
  var $mainMenuToggle = document.querySelector('.main-menu__toggle'),
      $mainMenuList = document.querySelector('.main-menu__list');

  if ($mainMenuToggle != undefined) {
    $mainMenuToggle.addEventListener('click', function(e) {
      $mainMenuList.classList.toggle('is-expanded');
      event.preventDefault();
    });
  }

  document.querySelectorAll('.main-menu li.is-parent > a').forEach((item) => {
    item.addEventListener('click', (event) => {
      if (window.innerWidth < 1024) {
        toggleHeight(event.target.nextElementSibling, event.target);
        event.preventDefault();
      }
    });
  });


  /**
   * Handle clicking left/right arrows to navigate Page Nav
   */
  var $pageNav = document.querySelector('.page-nav');

  if ($pageNav != undefined) {
    var $linkLeft = document.querySelector('.page-nav__link-left'),
        $linkRight = document.querySelector('.page-nav__link-right'),
        $linkParent = document.querySelector('.page-nav__link-parent');

    document.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          if ($linkLeft != undefined) {
            $linkLeft.click();
          }
          break;
        case 'ArrowRight':
          if ($linkRight != undefined) {
            $linkRight.click();
          }
          break;
        case 'ArrowUp':
          if ($linkParent != undefined) {
            $linkParent.click();
          }
          break;
      }
    });
  }

  // Handle expandable list interactions
  document.querySelectorAll('.expandable dt').forEach((item) => {
    item.addEventListener('click', (event) => {
      toggleHeight(event.target.nextElementSibling, event.target);
    });
  });

  
  // Silly stuff for secret door.
  var $shh = document.querySelector('#shh');

  if ($shh != undefined) {
    $shh.addEventListener('click', (event) => {
      document.querySelector('body').classList.add('body-fade-out');

      setTimeout(function() {
        window.location.href = $shh.getAttribute('href');
      }, 2000);

      event.preventDefault();
    });
  }
});


// Utilities

/**
 * Toggle the height of a block-level element.
 * @param  {DOM element} element The element to be toggled
 * @param  {DOM element} trigger (Optional) The element being clicked to trigger toggle
 */
function toggleHeight(element, trigger) {
  let duration = parseFloat(window.getComputedStyle(element).transitionDuration) * 1000;

  // Show element if its currently hidden
  if (window.getComputedStyle(element).display === 'none') {
    // Make element visible
    element.style.display = 'block';

    // Temporarily set height to auto to grab height, then set back to 0 to allow transition
    element.style.height = 'auto';
    let height = element.offsetHeight;
    element.style.height = 0;

    // Set back to the height so CSS transitions from 0 to height.
    setTimeout(function () {
      element.style.height = height + 'px';
    }, 0);

    // Manage classes
    element.classList.add('is-expanded');
    if (trigger !== undefined) {
      trigger.classList.add('is-expanded');
    }

    // Remove fixed height after transition
    setTimeout( () => {
      element.style.removeProperty('height');
    }, duration);

  // Hide element when it's displayed
  } else {
    // Set a fixed height to allow transition and then set to 0
    element.style.height = element.offsetHeight + 'px';
    setTimeout(function () {
      element.style.height = 0;
    }, 0);

    // Manage classes
    element.classList.remove('is-expanded');
    if (trigger !== undefined) {
      trigger.classList.remove('is-expanded');
    }

    // Hide element and remove 0 height after transition.
    setTimeout( () => {
      element.style.removeProperty('display');
      element.style.removeProperty('height');
    }, duration);

  }
}
