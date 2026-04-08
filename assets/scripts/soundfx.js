
/**
 * Sound Effects Module, originally by JavaScript Kit (www.javascriptkit.com)
 * Modernized audio playback for UI interactions
 */

// Audio MIME types mapping
const AUDIO_TYPES = {
  mp3: 'audio/mpeg',
  mp4: 'audio/mp4',
  ogg: 'audio/ogg',
  wav: 'audio/wav'
};

/**
 * Create a sound bite that can be played on demand
 * @param {...string} sources - One or more audio file URLs (with fallbacks)
 * @returns {Object} Object with playclip method
 */
function createSoundBite(...sources) {
  const audio = document.createElement('audio');
  
  // Check for HTML5 audio support
  if (!audio.canPlayType) {
    console.warn('HTML5 audio not supported');
    return {
      playclip() {
        console.warn('Cannot play audio: browser does not support HTML5 audio');
      }
    };
  }

  // Add all source elements for fallback support
  sources.forEach(src => {
    const source = document.createElement('source');
    source.setAttribute('src', src);
    
    // Extract file extension and set MIME type
    const extension = src.match(/\.(\w+)$/i)?.[1];
    if (extension && AUDIO_TYPES[extension]) {
      source.setAttribute('type', AUDIO_TYPES[extension]);
    }
    
    audio.appendChild(source);
  });

  // Load the audio
  audio.load();

  /**
   * Play the audio clip from the beginning
   */
  function playclip() {
    audio.pause();
    audio.currentTime = 0;
    audio.play().catch(err => {
      // Silently fail if autoplay is blocked
      console.debug('Audio play prevented:', err.message);
    });
  }

  return { playclip };
}

// Initialize sound effects when DOM is ready
function initializeSoundEffects() {
  // Create sound instances
  const mouseoverSound = createSoundBite(
    'https://file.garden/ZRW0B_KULjLI59Tb/neonavigation/2oij6w.ogg',
    'https://file.garden/ZRW0B_KULjLI59Tb/neonavigation/4z8m97.mp3'
  );

  const clickSound = createSoundBite(
    'https://file.garden/ZRW0B_KULjLI59Tb/neonavigation/974xu0.ogg',
    'https://file.garden/ZRW0B_KULjLI59Tb/neonavigation/xnxjdv.mp3'
  );

  // Attach sound effects to all buttons
  document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mouseover', () => mouseoverSound.playclip());
    button.addEventListener('click', () => clickSound.playclip());
  });
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeSoundEffects);
} else {
  initializeSoundEffects();
}

// Export for potential external use
window.createsoundbite = createSoundBite;