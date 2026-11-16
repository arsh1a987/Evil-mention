# Evil Mention

A browser extension for YouTube. Whenever the captions contain the word "evil", an image flashes over the video and a boom sound plays.

## Install

Works in Chrome, Edge, Brave and other Chromium browsers.

1. On this page, click **Code → Download ZIP**, then unzip it.
2. Open `chrome://extensions` (in Edge: `edge://extensions`).
3. Turn on **Developer mode** (top right).
4. Click **Load unpacked** and pick the `word-flash` folder inside the unzipped folder (the one that contains `manifest.json`).
5. Refresh any YouTube tabs that were already open.

## Use

1. Open a YouTube video.
2. Turn captions on with the **CC** button on the player. The extension reads the captions, so it does nothing while they are off.
3. When "evil" appears in the captions, the image and sound go off.

## Extra scary mode

Click the extension's icon in the toolbar and tick **Extra scary mode**. The image then lunges at you, the video shakes, and the boom is much louder (turn your volume down first if you are on headphones). It is off by default.

## Troubleshooting

- **Nothing happens:** check captions are on, and refresh the tab after installing or reloading the extension.
- **"Manifest file is missing":** you picked the outer folder. Pick the `word-flash` folder inside it.
- **Only whole words count:** "devil" and "evilly" do not trigger it.

## Change the word, images or sound

Edit the first lines of `word-flash/content.js`, or replace `1.png`, `2.png`, `3.png` and `boom.wav` in the `word-flash` folder. Then click the reload arrow on the extension's card and refresh YouTube.
