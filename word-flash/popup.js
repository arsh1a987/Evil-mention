const box = document.getElementById('scary');
chrome.storage.local.get({ scary: false }, (s) => (box.checked = s.scary));
box.onchange = () => chrome.storage.local.set({ scary: box.checked });
