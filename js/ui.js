window.SignalMuseumUI = (() => {
  function createUI(sceneController) {
    const list = document.getElementById('list');
    const titleEl = document.getElementById('title');
    const bodyEl = document.getElementById('body');
    const tagsEl = document.getElementById('tags');
    const canvas = document.getElementById('screen');
    const playBtn = document.getElementById('playBtn');
    const captureBtn = document.getElementById('captureBtn');
    const shuffleBtn = document.getElementById('shuffleBtn');

    let current = 0;
    let autoplay = false;

    function renderList() {
      list.innerHTML = '';
      sceneController.exhibits.forEach((item, i) => {
        const div = document.createElement('div');
        div.className = 'item' + (i === current ? ' active' : '');
        div.innerHTML = `<div class="meta">${item.year}</div><strong>${item.name}</strong>`;
        div.onclick = () => {
          current = i;
          renderList();
          syncText();
        };
        list.appendChild(div);
      });
    }

    function syncText() {
      const item = sceneController.exhibits[current];
      titleEl.textContent = item.name;
      bodyEl.textContent = item.desc;
      tagsEl.innerHTML = item.tags.map((t) => `<span class="tag">${t}</span>`).join('');
    }

    playBtn.onclick = () => {
      autoplay = !autoplay;
      playBtn.textContent = autoplay ? '停止巡馆' : '自动巡馆';
      sceneController.runtime.setAutoplay(autoplay);
    };

    captureBtn.onclick = () => {
      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = `signal-museum-${current + 1}.png`;
      a.click();
    };

    shuffleBtn.onclick = () => {
      current = (Math.random() * sceneController.exhibits.length) | 0;
      renderList();
      syncText();
    };

    renderList();
    syncText();

    return {
      getCurrentIndex: () => current,
      autoAdvance() {
        current = (current + 1) % sceneController.exhibits.length;
        renderList();
        syncText();
      }
    };
  }

  return { createUI };
})();
