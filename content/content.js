(function () {
  'use strict';

  const SKIP_BUTTON_ID = 'video-skip-ext-btn';
  const t = (key) => chrome.i18n.getMessage(key);
  const isYouTube = () =>
    /youtube\.com|youtu\.be/i.test(window.location.hostname);

  function getYouTubeRoot() {
    const player = document.querySelector('#movie_player');
    if (player?.shadowRoot) return player.shadowRoot;
    return document;
  }

  function queryYouTube(selector) {
    const root = getYouTubeRoot();
    return root.querySelector(selector);
  }

  function skipToEnd(video) {
    if (!video || video.readyState < 2 || !Number.isFinite(video.duration)) return false;
    video.currentTime = video.duration;
    return true;
  }

  function getVisibleVideos() {
    const roots = [document];
    const player = document.querySelector('#movie_player');
    if (player?.shadowRoot) roots.push(player.shadowRoot);
    const videos = roots.flatMap((r) => Array.from(r.querySelectorAll('video')));
    return videos.filter((v) => {
      const rect = v.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    });
  }

  function getPrimaryVideo() {
    const videos = getVisibleVideos();
    if (videos.length === 0) return null;
    if (videos.length === 1) return videos[0];
    const playing = videos.find((v) => !v.paused);
    return playing || videos[0];
  }

  function createYouTubeSkipButton() {
    const root = getYouTubeRoot();
    if (root.querySelector('#' + SKIP_BUTTON_ID)) return;
    const playBtn = root.querySelector(
      '.ytp-left-controls button.ytp-play-button'
    );
    if (!playBtn) return;

    const label = t('skipToEnd');
    const btn = document.createElement('button');
    btn.id = SKIP_BUTTON_ID;
    btn.className = 'ytp-button';
    btn.setAttribute('aria-label', label);
    btn.title = label;
    btn.type = 'button';
    btn.textContent = label;
    btn.style.cssText = `
      padding: 0 8px;
      font-size: 12px;
      font-family: "Roboto","Arial",sans-serif;
      font-weight: 500;
      color: #fff;
      background: transparent;
      border: none;
      cursor: pointer;
      margin-left: 2px;
      min-width: fit-content;
    `;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const v = getPrimaryVideo();
      if (v) skipToEnd(v);
    });

    playBtn.insertAdjacentElement('afterend', btn);
  }

  function createFloatingSkipButton() {
    if (document.getElementById(SKIP_BUTTON_ID)) return;

    const btn = document.createElement('button');
    btn.id = SKIP_BUTTON_ID;
    btn.textContent = t('skipToEnd');
    btn.type = 'button';
    btn.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 2147483647;
      padding: 10px 16px;
      font-size: 14px;
      font-family: system-ui, sans-serif;
      font-weight: 600;
      color: #fff;
      background: rgba(0, 0, 0, 0.75);
      border: none;
      border-radius: 8px;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      transition: background 0.2s;
    `;
    btn.addEventListener('mouseenter', () => {
      btn.style.background = 'rgba(0, 0, 0, 0.9)';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.background = 'rgba(0, 0, 0, 0.75)';
    });
    btn.addEventListener('click', () => {
      const v = getPrimaryVideo();
      if (v) skipToEnd(v);
    });

    document.body.appendChild(btn);
  }

  function createSkipButton() {
    if (isYouTube()) {
      createYouTubeSkipButton();
    } else {
      createFloatingSkipButton();
    }
  }

  function removeSkipButton() {
    const root = isYouTube() ? getYouTubeRoot() : document;
    const btn = root.querySelector('#' + SKIP_BUTTON_ID);
    if (btn) btn.remove();
  }

  function updateButtonVisibility() {
    if (isYouTube()) {
      const playBtn = queryYouTube(
        '.ytp-left-controls button.ytp-play-button'
      );
      if (playBtn) {
        createSkipButton();
      } else {
        removeSkipButton();
      }
    }
  }

  function init() {
    const observer = new MutationObserver(() => {
      const player = document.querySelector('#movie_player');
      if (player?.shadowRoot && !player.shadowRoot.dataset.videoSkipObserved) {
        player.shadowRoot.dataset.videoSkipObserved = '1';
        observer.observe(player.shadowRoot, {
          childList: true,
          subtree: true,
        });
      }
      updateButtonVisibility();
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    updateButtonVisibility();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
    if (msg.action === 'skipToEnd') {
      const video = getPrimaryVideo();
      const ok = video ? skipToEnd(video) : false;
      sendResponse({ success: ok });
    }
    return true;
  });
})();
