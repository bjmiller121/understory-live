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
      console.log("Clicked");
      event.preventDefault();
    });
  }


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


  // Silly stuff for secret door.
  var $shh = document.querySelector('#shh');

  if ($shh != undefined) {
    $shh.addEventListener('click', (event) => {
      document.querySelector('body').classList.add('body-fade-out');

      window.setTimeout(function() {
        window.location.href = $shh.getAttribute('href');
      }, 2000);

      event.preventDefault();
    });
  }
});
