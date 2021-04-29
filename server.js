const express = require('express');
const cluster = require('cluster');
const os = require('os');

const PORT = 3000;

const app = express();

function delay(duration) {
  const startTime = Date.now();

  while (Date.now() - startTime < duration) {
    //   Event loop is blocked...
  }
}

app.get('/', (req, res) => {
  res.send(`
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Node Performance</title>
    <style>
      body {
        background-color: #000000;
      }
      .wrapper {
        display: flex;
        justify-content: center;
      }
      .main {
        color: limegreen;
      }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <main>
        <h1 class="main">Performance Example</h1>
        <h2 class="main">Process ID: ${process.pid}</h2>
      </main>
    </div>
  </body>
</html>
  `);
});

app.get('/timer', (req, res) => {
  // functions that block your server
  // JSON.stringify({}) => "{}"
  // JSON.parse("{}") => {}
  //   [5,3,4,52,2].sort()
  // delay response
  delay(9000);
  res.send(`
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Node Performance</title>
    <style>
      body {
        background-color: #000000;
      }
      .wrapper {
        display: flex;
        justify-content: center;
      }
      .main {
        color: limegreen;
      }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <main>
        <h1 class="main">Wow, that was a long delay!</h1>
        <h1 class="main">This was a good example of server blocking.</h1>
        <h2 class="main">Process ID: ${process.pid}</h2>
      </main>
    </div>
  </body>
</html>
  `);
});

if (cluster.isMaster) {
  console.log('Master has been started...');

  const NUM_WORKERS = os.cpus().length;
  for (let i = 0; i < NUM_WORKERS; i++) {
    cluster.fork();
  }
} else {
  console.log('Worker process started.');
  app.listen(PORT, () => {
    console.log(`🦄 Flying high on port ${PORT}`);
  });
}
