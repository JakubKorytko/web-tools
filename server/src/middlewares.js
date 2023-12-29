const fs = require('fs');
const path = require('path');

const bodyParser = require('body-parser');
const multer = require('multer');

const { decode } = require('src/auth');

const isDemo = (req, res, next) => {
  if (JSON.parse(process.env.demo)) {
    res.status(403).send('Demo mode is enabled');
    return false;
  }
  next();
  return true;
};

const authorization = (req, res, next) => {
  const token = req.headers.authorization;
  const authData = decode(process.env.SECRET)(token);

  if (authData === false) {
    res.status(401).send('Not authorized or wrong token given');
    return false;
  }

  res.locals.auth = authData;
  next();
  return true;
};

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, `${__dirname}/../files`);
  },
  filename(req, file, cb) {
    if (fs.existsSync(path.join(`${__dirname}/../files`, file.originalname))) {
      cb(null, `${path.basename(file.originalname, path.extname(file.originalname))}(1)${path.extname(file.originalname)}`);
    } else {
      cb(null, file.originalname);
    }
  },
});

const upload = multer({ storage, limits: { fileSize: 209715200 } });

const jsonParser = bodyParser.json({ limit: '200mb' });

module.exports = {
  authorization, upload, jsonParser, isDemo,
};
