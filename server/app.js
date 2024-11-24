// DOMO C
require('dotenv').config();
// end
// Part 1 for Mongo
const path = require('path');
const express = require('express');
const compression = require('compression');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressHandlebars = require('express-handlebars');
const helmet = require('helmet');
// DOMO B
const session = require('express-session');
// end
// DOMO C
const RedisStore = require('connect-redis').default;
const redis = require('redis');
// end

const router = require('./router.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const dbURI = process.env.MONGODB_URI || 'mongodb+srv://femerson7:tommy12345@cluster0.3ztct.mongodb.net/';
mongoose.connect(dbURI).catch((err) => {
  if (err) {
    console.log('Could not connect to database');
    throw err;
  }
});

// DOMO C
const redisClient = redis.createClient({
  url: process.env.REDISCLOUD_URL,
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

redisClient.connect().then(() => {
  const app = express();

  app.use(helmet());
  app.use('/assets', express.static(path.resolve(`${__dirname}/../hosted/`)));
  app.use(favicon(`${__dirname}/../hosted/img/favicon.png`));
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // DOMO B
  app.use(session({
    key: 'sessionid',
    // DOMO C
    store: new RedisStore({
      client: redisClient,
    }),
    // end
    secret: 'Domo Arigato',
    resave: false,
    saveUninitialized: false,
  }));
  // end

  app.engine('handlebars', expressHandlebars.engine({ defaultLayout: '' }));
  app.set('view engine', 'handlebars');
  app.set('views', `${__dirname}/../views`);

  router(app);

  app.listen(port, (err) => {
    if (err) { throw err; }
    console.log(`Listening on port ${port}`);
  });
});
// end
