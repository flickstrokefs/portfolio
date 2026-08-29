const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const chrome = spawn(chromePath, [
  '--headless',
  '--remote-debugging-port=9299',
  '--use-gl=angle',
  '--use-angle=swiftshader',
  '--window-size=1440,1400',
  '--no-sandbox'
]);

setTimeout(async () => {
  try {
    const list = await new Promise((resolve, reject) => {
      http.get('http://localhost:9299/json/list', res => {
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
      await send('Page.navigate', { url: 'http://localhost:3000/#skills' });
      
      await new Promise(r => setTimeout(r, 2200));

      await send('Runtime.evaluate', {
        expression: `
          const el = document.getElementById('skills');
          if (el) {
            el.scrollIntoView({ behavior: 'instant', block: 'start' });
            el.style.opacity = '1';
            el.style.transform = 'none';
          }
        `
      });

      await new Promise(r => setTimeout(r, 800));

      const shot = await send('Page.captureScreenshot', {
        format: 'png'
      });
      fs.writeFileSync('public/test_toolbox_view4.png', Buffer.from(shot.data, 'base64'));

      console.log('SAVED test_toolbox_view4.png');
      chrome.kill();
      process.exit(0);
    };
  } catch(e) {
    console.error(e);
    chrome.kill();
    process.exit(1);
  }
}, 1800);
