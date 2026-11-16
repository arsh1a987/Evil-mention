
const WORD = 'evil';   
const IMAGES = ['1.png', '2.png', '3.png'].map((f) => chrome.runtime.getURL(f));
const FLASH_MS = 600;
const ZOOM = [{ transform: 'scale(0.2)' }, { transform: 'scale(1.35)', offset: 0.15 }, { transform: 'scale(1.2)' }];
const SHAKE = [[0, 0], [-14, 8], [12, -10], [-10, -6], [14, 6], [-6, 10], [0, 0]].map(([x, y]) => ({
  transform: `translate(${x}px, ${y}px)`,
}));


const countWord = (text) => (text.match(new RegExp(`\\b${WORD}\\b`, 'gi')) || []).length;
console.assert(countWord(`a ${WORD}, ${WORD.toUpperCase()}! x${WORD}`) === 2, 'countWord self-check');

const img = document.createElement('img');
img.alt = '';
img.style.cssText =
  'position:absolute;inset:0;margin:auto;height:90%;max-width:90%;object-fit:contain;z-index:9999;pointer-events:none;display:none';

let lastCount = 0;
let hideTimer;
const sound = new Audio(chrome.runtime.getURL('boom.wav'));
const loudSound = new Audio(chrome.runtime.getURL('boom-loud.wav'));

let scary = false;
chrome.storage.local.get({ scary: false }, (s) => (scary = s.scary));
chrome.storage.onChanged.addListener((changes) => {
  if (changes.scary) scary = changes.scary.newValue;
});

function playSound() {
  const s = scary ? loudSound : sound;
  s.currentTime = 0;
  s.play().catch(() => {});
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
    if (scary) {
      img.animate(ZOOM, { duration: FLASH_MS, easing: 'ease-out' });
      player.querySelector('video')?.animate(SHAKE, { duration: 500 });
    }
    playSound();
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => (img.style.display = 'none'), FLASH_MS);
  }
  lastCount = count;
}).observe(document.documentElement, { childList: true, subtree: true, characterData: true });
