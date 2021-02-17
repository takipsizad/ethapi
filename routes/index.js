var express = require('express');
var router = express.Router();
const path = require('path');
var Web3 = require('web3');
var web3 = new Web3(process.env.wsurl);
var Accounts = require('web3-eth-accounts');
var accounts = new Accounts(process.env.wsurl);
var oof = 'i messed up or you messed up dont crash my site smh '

router.get('/', function(req, res) {
  res.sendFile( path.resolve('./views/index.html') );
});
router.get('/api/gasprices', function(req, res, next) {
  web3.eth.getGasPrice().then(result => { 
    res.jsonp({gasprices:result})
  });
});
router.get('/api/version', function(req, res, next) {
  res.jsonp({web3version:web3.version})
});
router.get('/api/checkbal', function(req, res, next) {
  web3.eth.getBalance(req.query.wallet).then(result => { 
    res.jsonp({balance:result})
  });
});
router.get('/api/ibantoadress', function(req, res) {
  res.jsonp({adress:web3.eth.Iban.toAddress(req.query.Iban)})
});
router.get('/api/adresstoiban', function(req, res) {
  res.jsonp({iban:web3.eth.Iban.toIban(req.query.adress)})
});
router.get('/api/getblock', function(req, res, next) {
  web3.eth.getBlock(req.query.blockid).then(result => { 
    res.jsonp({result})
  }).catch(err => {res.jsonp({oof})});
});

router.get('/api/transactioninfo', function(req, res, next) {
  web3.eth.getTransaction(req.query.hash).then(result => { 
    res.jsonp({result})
  }).catch(err => {res.jsonp({oof})});
});

router.get('/api/createacc', function(req, res, next) {
  var acc = web3.eth.accounts.create()
  res.jsonp({acc})
});
module.exports = router;