var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var router = express.Router();
var dotenv = require('dotenv');
dotenv.config();

var faunadb = require('faunadb');
var q = faunadb.query;
var adminClient = new faunadb.Client({ secret: process.env.FAUNA_KEY });

// Express.router
router.param('tokenId', function (req, res, next, tokenId) {
  console.log('Id validations on ' + tokenId);
  if (parseInt(0) < parseInt(tokenId) <= parseInt(4)) {
    console.log("Verified successfully");
    next();
  } else {
    console.log("Someone is being naughty 🔥");
    res.send("Someone is being naughty 🔥")
  }
});

router.get('/metadata/:tokenId', function (req, res) {
  //console.log(req.params.tokenId)
  adminClient.query(
    q.Get(q.Ref(q.Collection('Metadata'), String(req.params.tokenId)))
  )
    .then((ret) => res.json(ret.data))
    .catch((err) => console.error('Error: %s', err))
});

app.use('/', router);
app.listen(port);