/**
 * DOM Utilities - Window management functions
 */

const WindowManager = {
  /**
   * Show a window element by ID
   * @param {number} divNumber - The window number to show
   */
  showDiv(divNumber) {
    const element = document.getElementById(`div${divNumber}`);
    if (element) {
      element.style.display = 'block';
    }
  },

  /**
   * Hide a window element by ID
   * @param {number} divNumber - The window number to hide
   */
  closeDiv(divNumber) {
    const element = document.getElementById(`div${divNumber}`);
    if (element) {
      element.style.display = 'none';
    }
  },

  /**
   * Show a taskbar button by ID
   * @param {number} divNumber - The button number to show
   */
  showButton(divNumber) {
    const element = document.getElementById(`button${divNumber}`);
    if (element) {
      element.style.display = 'block';
    }
  },

  /**
   * Hide a taskbar button by ID
   * @param {number} divNumber - The button number to hide
   */
  closeButton(divNumber) {
    const element = document.getElementById(`button${divNumber}`);
    if (element) {
      element.style.display = 'none';
    }
  }
};

// Make functions globally accessible for inline onclick handlers
// (These can be removed once onclick handlers are converted to event listeners)
window.showDiv = WindowManager.showDiv;
window.closeDiv = WindowManager.closeDiv;
window.showButton = WindowManager.showButton;
window.closeButton = WindowManager.closeButton;
