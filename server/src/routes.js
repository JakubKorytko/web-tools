const path = require('path');

const express = require('express');

const { encode, decode } = require('src/auth');
const Database = require('src/database/database');

const db = new Database();

const {
  authorization, upload, jsonParser, isDemo,
} = require('./middlewares');

const router = express.Router();

router.get('/', authorization, (req, res) => {
  res.send('WebTools API');
});

router.post('/login', jsonParser, (req, res) => {
  res.send({ token: encode(process.env.SECRET)(req.body.username, req.body.password) });
});

router.post('/auth', jsonParser, (req, res) => {
  const decoded = decode(process.env.SECRET)(req.headers.authorization);
  if (decoded === false) res.send({ res: false });
  else res.send({ res: decoded.name });
});

router.post('/get', authorization, jsonParser, async (req, res) => {
  const y = await db.getData(req.body.table);
  res.send(y);
});

router.post('/del', isDemo, authorization, jsonParser, async (req, res) => {
  await db.remove(req.body.table, req.body.id);
  res.send('deleted');
});

router.post('/add', isDemo, authorization, jsonParser, async (req, res) => {
  const { link } = req.body;
  const y = await db.getData('links');
  let src = null;
  y.forEach((x) => {
    if (x.link === link) {
      src = x.src;
    }
  });
  if (src != null) {
    res.send('exists');
  } else {
    src = req.body.src;
    await db.insert('links', src, link);
    res.send('added');
  }
});

router.post('/addFile', isDemo, authorization, upload.single('file'), async (req, res) => {
  await db.insert('files', req.file.path, req.body.link);
  res.send('ok');
});

router.get('/file/*', async (req, res) => {
  const link = req.url.split('/')[2];
  const y = await db.getData('files');
  let src = '/';
  y.forEach((x) => {
    if (x.link === link) {
      src = x.src;
    }
  });
  if (src === '/') {
    res.redirect(src);
  } else {
    res.download(path.join(__dirname, src));
  }
});

router.get('/short/*', async (req, res) => {
  const link = req.url.split('/')[2];
  const y = await db.getData('links');
  let src = '/';
  y.forEach((x) => {
    if (x.link === link) {
      src = x.src;
    }
  });
  res.redirect(src);
});

module.exports = router;
