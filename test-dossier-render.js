const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const chrome = spawn(chromePath, [
  '--headless',
  '--remote-debugging-port=9266',
  '--use-gl=angle',
  '--use-angle=swiftshader',
  '--window-size=1440,1200',
  '--no-sandbox'
]);

setTimeout(async () => {
  try {
    const list = await new Promise((resolve, reject) => {
      http.get('http://localhost:9266/json/list', res => {
        let d = ''; res.on('data', c => d += c); res.on('end', () => resolve(JSON.parse(d)));
      }).on('error', reject);
    });

    const page = list.find(p => p.type === 'page');
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    let msgId = 1;
    function send(method, params = {}) {
      return new Promise((resolve) => {
        const id = msgId++;
        const handler = (event) => {
          const msg = JSON.parse(event.data);
          if (msg.id === id) {
            ws.removeEventListener('message', handler);
            resolve(msg.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    ws.onopen = async () => {
      await send('Page.enable');
      await send('Runtime.enable');
      await send('Page.navigate', { url: 'http://localhost:3000' });
      
      await new Promise(r => setTimeout(r, 1500));
      
      const rect = await send('Runtime.evaluate', {
        expression: `
          new Promise((resolve) => {
            const el = document.getElementById('academic');
            if (el) {
              el.scrollIntoView({ block: 'start' });
              setTimeout(() => {
                const r = el.getBoundingClientRect();
                resolve({ x: r.x, y: r.y + window.scrollY, width: r.width, height: r.height });
              }, 1200);
            } else {
              resolve(null);
            }
          });
        `,
        awaitPromise: true,
        returnByValue: true
      });
      
      console.log('Academic rect:', rect);
      
      const academicShot = await send('Page.captureScreenshot', {
        format: 'png',
        clip: rect.result.value ? {
          x: 0,
          y: Math.max(0, rect.result.value.y - 40),
          width: 1440,
          height: Math.min(1300, rect.result.value.height + 80),
          scale: 1
        } : undefined
      });
      
      fs.writeFileSync('public/test_dossier_render.png', Buffer.from(academicShot.data, 'base64'));

      console.log('SAVED test_dossier_render.png');
      chrome.kill();
      process.exit(0);
    };
  } catch(e) {
    console.error(e);
    chrome.kill();
    process.exit(1);
  }
}, 1000);
