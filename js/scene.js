window.SignalMuseumScene = (() => {
  function createScene(canvas, exhibits) {
    const ctx = canvas.getContext('2d');

    const drawHandlers = [
      function drawDialUp(w, h, t) {
        ctx.fillStyle = '#08090c'; ctx.fillRect(0, 0, w, h);
        for (let i = 0; i < 64; i++) {
          const x = i / 64 * w;
          const amp = 40 + Math.sin(t * 0.004 + i * 0.45) * 28 + Math.sin(t * 0.013 + i) * 18;
          const y = h / 2 + Math.sin(i * 0.6 + t * 0.01) * amp;
          ctx.strokeStyle = `rgba(245,180,90,${0.2 + i / 90})`;
          ctx.beginPath();
          ctx.moveTo(x, h / 2 - amp);
          ctx.lineTo(x, h / 2 + amp);
          ctx.stroke();
          ctx.fillStyle = 'rgba(245,180,90,.55)';
          ctx.fillRect(x - 1, y, 2, 2);
        }
      },
      function drawCrt(w, h, t) {
        const g = ctx.createLinearGradient(0, 0, 0, h);
        g.addColorStop(0, '#03161a');
        g.addColorStop(1, '#0c2730');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
        for (let y = 0; y < h; y += 4) {
          ctx.fillStyle = `rgba(255,255,255,${0.02 + Math.sin(y * 0.05 + t * 0.01) * 0.01})`;
          ctx.fillRect(0, y, w, 1);
        }
        const lineY = (t * 0.18) % h;
        ctx.fillStyle = 'rgba(119,231,255,.25)';
        ctx.fillRect(0, lineY, w, 10);
        ctx.fillStyle = 'rgba(119,231,255,.9)';
        ctx.font = 'bold 56px monospace';
        ctx.fillText('NO SIGNAL', w * 0.28 + Math.sin(t * 0.003) * 8, h * 0.56);
      },
      function drawTape(w, h, t) {
        ctx.fillStyle = '#0d0a11'; ctx.fillRect(0, 0, w, h);
        const bars = 44;
        for (let i = 0; i < bars; i++) {
          const v = (Math.sin(t * 0.006 + i * 0.55) + Math.sin(t * 0.012 + i * 0.13)) * 0.5;
          const height = (0.2 + Math.abs(v) * 0.8) * h * 0.65;
          const x = 70 + i * ((w - 140) / bars);
          const hue = i > bars * 0.72 ? 18 : 330 - i * 2;
          ctx.fillStyle = `hsla(${hue}, 95%, 68%, .88)`;
          ctx.fillRect(x, h - 46 - height, 12, height);
        }
      },
      function drawRadar(w, h, t) {
        ctx.fillStyle = '#05090d'; ctx.fillRect(0, 0, w, h);
        const cx = w / 2;
        const cy = h / 2;
        ctx.strokeStyle = 'rgba(119,231,255,.2)';
        for (let r = 50; r < 150; r += 30) { ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke(); }
        for (let a = 0; a < Math.PI * 2; a += Math.PI / 6) { ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a) * 160, cy + Math.sin(a) * 160); ctx.stroke(); }
        const sweep = t * 0.002;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 180);
        grad.addColorStop(0, 'rgba(119,231,255,.25)');
        grad.addColorStop(1, 'rgba(119,231,255,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, 180, sweep - 0.22, sweep + 0.08);
        ctx.closePath();
        ctx.fill();
        for (let i = 0; i < 7; i++) {
          const a = i * 0.9 + 0.7;
          const r = 40 + ((i * 53 + t * 0.04) % 110);
          ctx.fillStyle = 'rgba(119,231,255,.88)';
          ctx.beginPath();
          ctx.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 3 + (i % 3), 0, Math.PI * 2);
          ctx.fill();
        }
      },
      function drawMonitor(w, h, t) {
        ctx.fillStyle = '#050806'; ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = 'rgba(120,255,180,.18)';
        for (let y = 24; y < h; y += 24) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
        for (let x = 24; x < w; x += 24) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'rgba(120,255,180,.92)';
        ctx.beginPath();
        let started = false;
        for (let x = 0; x < w; x += 6) {
          const wave = Math.sin(x * 0.016 + t * 0.01) * 12;
          const spike = ((x + t * 0.45) % 220 > 106 && (x + t * 0.45) % 220 < 126)
            ? -70 + Math.abs(((x + t * 0.45) % 220) - 116) * 8
            : 0;
          const y = h * 0.55 + wave + spike;
          if (!started) { ctx.moveTo(x, y); started = true; }
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    ];

    function render(index, t) {
      drawHandlers[index](canvas.width, canvas.height, t);
    }

    function start(getCurrentIndex, onAutoAdvance) {
      let lastSwitch = 0;
      let autoplay = false;

      function setAutoplay(value) {
        autoplay = value;
      }

      function loop(t) {
        render(getCurrentIndex(), t);
        if (autoplay && t - lastSwitch > 4800) {
          onAutoAdvance();
          lastSwitch = t;
        }
        requestAnimationFrame(loop);
      }

      requestAnimationFrame(loop);
      return { setAutoplay };
    }

    return { start, exhibits };
  }

  return { createScene };
})();
