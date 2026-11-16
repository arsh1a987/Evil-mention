
const WORD = 'evil';   
const IMAGES = ['1.png', '2.png', '3.png'].map((f) => chrome.runtime.getURL(f));
const FLASH_MS = 600;


const countWord = (text) => (text.match(new RegExp(`\\b${WORD}\\b`, 'gi')) || []).length;
console.assert(countWord(`a ${WORD}, ${WORD.toUpperCase()}! x${WORD}`) === 2, 'countWord self-check');

const img = document.createElement('img');
img.alt = '';
img.style.cssText =
  'position:absolute;inset:0;margin:auto;height:90%;max-width:90%;object-fit:contain;z-index:9999;pointer-events:none;display:none';

let lastCount = 0;
let hideTimer;
const sound = new Audio(chrome.runtime.getURL('boom.wav'));

function playSound() {
  sound.currentTime = 0;
  sound.play().catch(() => {});
}

new MutationObserver((_, observer) => {
  if (!chrome.runtime?.id) return observer.disconnect();
  const player = document.querySelector('#movie_player');
  if (!player) return;
  const captions = [...player.querySelectorAll('.ytp-caption-segment')].map((s) => s.textContent).join(' ');
  const count = countWord(captions);
 
  if (count > lastCount) {
    if (img.parentNode !== player) player.appendChild(img);
    img.src = IMAGES[Math.floor(Math.random() * IMAGES.length)];
    img.style.display = 'block';
    playSound();
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => (img.style.display = 'none'), FLASH_MS);
  }
  lastCount = count;
}).observe(document.documentElement, { childList: true, subtree: true, characterData: true });
