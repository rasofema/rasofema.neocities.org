/**
 * Start Menu Module
 * Handles the Windows 98 style start menu functionality
 */

const StartMenu = (() => {
  const BUTTON_ACTIVE_IMAGE = 'url(/assets/win98/startclick.png)';
  const BUTTON_INACTIVE_IMAGE = '';

  /**
   * Toggle the start menu visibility
   */
  function toggleMenu() {
    const dropup = document.getElementById('startDropup');
    const startButton = document.querySelector('.start');
    
    if (!dropup || !startButton) return;

    const isShowing = dropup.classList.toggle('show');
    
    // Update button appearance
    startButton.style.backgroundImage = isShowing ? BUTTON_ACTIVE_IMAGE : BUTTON_INACTIVE_IMAGE;
    startButton.setAttribute('aria-expanded', isShowing.toString());
  }

  /**
   * Close the menu when clicking outside
   * @param {MouseEvent} e - The click event
   */
  function handleOutsideClick(e) {
    // Don't close if clicking the start button itself
    if (e.target.closest('.start')) return;

    // Close all dropup menus
    document.querySelectorAll('.dropup-content').forEach(menu => {
      menu.classList.remove('show');
    });

    // Reset start button appearance
    const startButton = document.querySelector('.start');
    if (startButton) {
      startButton.style.backgroundImage = BUTTON_INACTIVE_IMAGE;
      startButton.setAttribute('aria-expanded', 'false');
    }
  }

  /**
   * Initialize the start menu
   */
  function initialize() {
    const startButton = document.getElementById('startButton');
    if (startButton) {
      startButton.addEventListener('click', toggleMenu);
    }

    // Close menu when clicking outside
    document.addEventListener('click', handleOutsideClick);
  }

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }

  return {
    initialize,
    toggleMenu
  };
})();

// Make toggleMenu globally accessible for compatibility
window.startFunction = StartMenu.toggleMenu;
