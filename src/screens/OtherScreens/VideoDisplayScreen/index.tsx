import React, { useRef, useState, useCallback, useEffect } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import Orientation from 'react-native-orientation-locker';
import { Colors } from '../../../constants';

const buildVideoHTML = (uri: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body {
      width: 100%; height: 100%;
      background: #000;
      overflow: hidden;
      display: flex; align-items: center; justify-content: center;
    }
    video {
      width: 100%; height: 100%;
      object-fit: contain;
      display: block;
    }
    #controls {
      position: fixed;
      bottom: 0; left: 0; right: 0;
      background: linear-gradient(transparent, rgba(0,0,0,0.85));
      padding: 20px 14px 12px;
      transition: opacity 0.3s ease;
    }
    #controls.hidden { opacity: 0; pointer-events: none; }
    #progress-wrap {
      width: 100%;
      height: 4px;
      background: rgba(255,255,255,0.25);
      border-radius: 4px;
      cursor: pointer;
      margin-bottom: 10px;
      position: relative;
    }
    #progress-fill {
      height: 100%;
      background: #6C63FF;
      border-radius: 4px;
      width: 0%;
      pointer-events: none;
      position: relative;
    }
    #progress-thumb {
      position: absolute;
      top: 50%; right: -6px;
      transform: translateY(-50%);
      width: 12px; height: 12px;
      border-radius: 50%;
      background: #6C63FF;
      transition: opacity 0.2s;
      pointer-events: none;
    }
    #bottom-row {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    button {
      background: none; border: none; cursor: pointer;
      padding: 4px; display: flex; align-items: center; justify-content: center;
      outline: none;
      -webkit-tap-highlight-color: transparent;
    }
    button svg { display: block; }
    #time {
      color: rgba(255,255,255,0.85);
      font-family: -apple-system, sans-serif;
      font-size: 12px;
      font-weight: 500;
      white-space: nowrap;
      margin-left: 2px;
    }
    #vol-wrap { display: flex; align-items: center; gap: 6px; }
    #vol-slider {
      -webkit-appearance: none;
      width: 60px; height: 4px;
      background: rgba(255,255,255,0.3);
      border-radius: 4px;
      outline: none;
    }
    #vol-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 12px; height: 12px;
      border-radius: 50%;
      background: #fff;
      cursor: pointer;
    }
    #spacer { flex: 1; }
    #center-play {
      position: fixed;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      width: 60px; height: 60px;
      border-radius: 50%;
      background: rgba(108, 99, 255, 0.9);
      display: flex; align-items: center; justify-content: center;
      transition: opacity 0.25s, transform 0.25s;
      pointer-events: none;
    }
    #center-play.hide {
      opacity: 0; transform: translate(-50%, -50%) scale(0.7);
    }
    #spinner {
      position: fixed;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      width: 36px; height: 36px;
      border: 3px solid rgba(255,255,255,0.2);
      border-top-color: #6C63FF;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      display: none;
    }
    #spinner.show { display: block; }
    @keyframes spin { to { transform: translate(-50%,-50%) rotate(360deg); } }
  </style>
</head>
<body>
  <video id="v" playsinline preload="metadata" src="${uri}"></video>
  <div id="spinner" class="show"></div>
  <div id="center-play">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
      <polygon points="5,3 19,12 5,21"/>
    </svg>
  </div>
  <div id="controls">
    <div id="progress-wrap">
      <div id="progress-fill">
        <div id="progress-thumb"></div>
      </div>
    </div>
    <div id="bottom-row">
      <button id="playBtn" onclick="togglePlay()">
        <svg id="iconPlay" width="20" height="20" viewBox="0 0 24 24" fill="white" style="display:block">
          <polygon points="5,3 19,12 5,21"/>
        </svg>
        <svg id="iconPause" width="20" height="20" viewBox="0 0 24 24" fill="white" style="display:none">
          <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
        </svg>
      </button>
      <div id="vol-wrap">
        <button onclick="toggleMute()">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <path d="M3 9v6h4l5 5V4L7 9H3z"/>
            <path d="M16.5 12A4.5 4.5 0 0014 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
          </svg>
        </button>
        <input id="vol-slider" type="range" min="0" max="1" step="0.05" value="1" oninput="setVolume(this.value)">
      </div>
      <span id="time">0:00 / 0:00</span>
      <div id="spacer"></div>
      <button onclick="seek(-10)" title="Rewind 10s">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
          <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
          <text x="8.5" y="14.5" font-size="5" fill="white" font-family="sans-serif" font-weight="bold">10</text>
        </svg>
      </button>
      <button onclick="seek(10)" title="Forward 10s">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
          <path d="M12 5V1l5 5-5 5V7c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h2c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8z"/>
          <text x="8.5" y="14.5" font-size="5" fill="white" font-family="sans-serif" font-weight="bold">10</text>
        </svg>
      </button>
      <button id="fsBtn" onclick="notifyFullscreen()">
        <svg id="fsEnter" width="18" height="18" viewBox="0 0 24 24" fill="white" style="display:block">
          <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
        </svg>
        <svg id="fsExit" width="18" height="18" viewBox="0 0 24 24" fill="white" style="display:none">
          <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
        </svg>
      </button>
    </div>
  </div>
  <script>
    const v = document.getElementById('v');
    const progressFill = document.getElementById('progress-fill');
    const progressWrap = document.getElementById('progress-wrap');
    const timeEl = document.getElementById('time');
    const iconPlay = document.getElementById('iconPlay');
    const iconPause = document.getElementById('iconPause');
    const centerPlay = document.getElementById('center-play');
    const spinner = document.getElementById('spinner');
    const controls = document.getElementById('controls');
    const fsEnter = document.getElementById('fsEnter');
    const fsExit = document.getElementById('fsExit');

    let hideTimer = null;
    let muted = false;

    v.addEventListener('canplay', () => spinner.classList.remove('show'));
    v.addEventListener('waiting', () => spinner.classList.add('show'));
    v.addEventListener('playing', () => spinner.classList.remove('show'));

    function togglePlay() { v.paused ? v.play() : v.pause(); }

    v.addEventListener('play', () => {
      iconPlay.style.display = 'none';
      iconPause.style.display = 'block';
      flashCenter(false);
      scheduleHide();
    });
    v.addEventListener('pause', () => {
      iconPlay.style.display = 'block';
      iconPause.style.display = 'none';
      flashCenter(true);
      showControls();
    });

    function flashCenter(showPlay) {
      centerPlay.innerHTML = showPlay
        ? '<svg width="22" height="22" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21"/></svg>'
        : '<svg width="22" height="22" viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
      centerPlay.classList.remove('hide');
      setTimeout(() => centerPlay.classList.add('hide'), 700);
    }

    v.addEventListener('timeupdate', () => {
      if (!v.duration) return;
      const pct = (v.currentTime / v.duration) * 100;
      progressFill.style.width = pct + '%';
      timeEl.textContent = fmt(v.currentTime) + ' / ' + fmt(v.duration);
    });

    progressWrap.addEventListener('click', e => {
      const rect = progressWrap.getBoundingClientRect();
      v.currentTime = ((e.clientX - rect.left) / rect.width) * v.duration;
    });

    function seek(delta) {
      v.currentTime = Math.max(0, Math.min(v.duration, v.currentTime + delta));
    }

    function setVolume(val) {
      v.volume = parseFloat(val);
      v.muted = (val == 0);
      muted = v.muted;
    }
    function toggleMute() {
      muted = !muted;
      v.muted = muted;
      document.getElementById('vol-slider').value = muted ? 0 : v.volume;
    }

    function notifyFullscreen() {
      const isFullscreen = fsEnter.style.display !== 'none';
      fsEnter.style.display = isFullscreen ? 'none' : 'block';
      fsExit.style.display = isFullscreen ? 'block' : 'none';
      window.ReactNativeWebView && window.ReactNativeWebView.postMessage(
        JSON.stringify({ type: 'fullscreen', value: isFullscreen })
      );
    }

    function showControls() {
      controls.classList.remove('hidden');
      clearTimeout(hideTimer);
    }
    function scheduleHide() {
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => { if (!v.paused) controls.classList.add('hidden'); }, 3000);
    }
    document.body.addEventListener('touchstart', () => {
      showControls();
      if (!v.paused) scheduleHide();
    });

    v.addEventListener('click', togglePlay);

    function fmt(s) {
      const m = Math.floor(s / 60);
      const sec = Math.floor(s % 60).toString().padStart(2, '0');
      return m + ':' + sec;
    }
  </script>
</body>
</html>
`;

const VideoDisplayScreen = () => {
  const webviewRef = useRef<any>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const videoUri = 'https://www.w3schools.com/html/mov_bbb.mp4';

  useEffect(() => {
    return () => Orientation.lockToPortrait();
  }, []);
  const enterFullscreen = useCallback(() => {
    setIsFullscreen(true);
    StatusBar.setHidden(true);
    Orientation.lockToLandscape();
  }, []);

  const exitFullscreen = useCallback(() => {
    setIsFullscreen(false);
    StatusBar.setHidden(false);
    Orientation.lockToPortrait();
  }, []);

  const handleMessage = useCallback(
    (event: any) => {
      try {
        const data = JSON.parse(event.nativeEvent.data);
        if (data.type === 'fullscreen') {
          data.value ? enterFullscreen() : exitFullscreen();
        }
      } catch {}
    },
    [enterFullscreen, exitFullscreen],
  );

  return (
    <SafeAreaView
      style={[styles.modalSafe, isFullscreen && styles.modalSafeFullscreen]}
      edges={isFullscreen ? [] : ['top', 'bottom']}
    >
      <StatusBar backgroundColor={'black'} translucent />
      <WebView
        ref={webviewRef}
        source={{ html: buildVideoHTML(videoUri) }}
        style={styles.webview}
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
        allowsFullscreenVideo={false}
        javaScriptEnabled
        onMessage={handleMessage}
        scrollEnabled={false}
        bounces={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalSafe: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  modalSafeFullscreen: {
    backgroundColor: '#000',
  },
  webview: {
    flex: 1,
    backgroundColor: '#000',
  },
});

export default VideoDisplayScreen;
