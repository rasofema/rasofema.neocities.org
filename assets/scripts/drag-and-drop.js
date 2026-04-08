/**
 * Drag and Drop Module
 * Modernized version of the window dragging functionality
 */

const DragAndDrop = (() => {
  let dragState = {
    isDragging: false,
    targetElement: null,
    offsetX: 0,
    offsetY: 0,
    startX: 0,
    startY: 0
  };

  /**
   * Initialize dragging on an element
   * @param {MouseEvent} e - The mousedown event
   */
  function handleMouseDown(e) {
    // Don't drag if clicking on form elements or interactive elements
    const interactiveElements = ['textarea', 'input', 'button', 'a', 'select'];
    if (interactiveElements.includes(e.target.tagName.toLowerCase())) {
      return;
    }
    
    const target = e.target.closest('#drag');
    
    if (!target) return;

    dragState.isDragging = true;
    dragState.targetElement = target;

    // Initialize position if not set
    const currentLeft = parseInt(target.style.left) || 0;
    const currentTop = parseInt(target.style.top) || 0;

    dragState.offsetX = currentLeft;
    dragState.offsetY = currentTop;
    dragState.startX = e.clientX;
    dragState.startY = e.clientY;

    e.preventDefault();
  }

  /**
   * Handle mouse movement during drag
   * @param {MouseEvent} e - The mousemove event
   */
  function handleMouseMove(e) {
    if (!dragState.isDragging || !dragState.targetElement) return;

    const deltaX = e.clientX - dragState.startX;
    const deltaY = e.clientY - dragState.startY;

    dragState.targetElement.style.left = `${dragState.offsetX + deltaX}px`;
    dragState.targetElement.style.top = `${dragState.offsetY + deltaY}px`;

    e.preventDefault();
  }

  /**
   * Stop dragging
   */
  function handleMouseUp() {
    dragState.isDragging = false;
    dragState.targetElement = null;
  }

  /**
   * Initialize event listeners
   */
  function initialize() {
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }

  return {
    initialize
  };
})();
