var express = require('express');
var router = express.Router();
const path = require('path');
var Web3 = require('web3');
var eth1 = new Web3(process.env.eth1url);
//var eth2 = new Web3(process.env.eth2url);
var Accounts = require('web3-eth-accounts');
var accounts1 = new Accounts(process.env.eth1url);
//var accounts2 = new Accounts(process.env.eth2url);
var oof = 'i messed up or you messed up dont crash my site smh '

router.get('/', function(req, res) {
  res.sendFile( path.resolve('./views/index.html') );
});


router.get('/api/v1/gasprices', function(req, res, next) {
  eth1.eth.getGasPrice().then(result => { 
    res.jsonp({gasprices:result})
  });
});
//router.get('/api/v2/gasprices', function(req, res, next) {
//  eth2.eth.getGasPrice().then(result => { 
//    res.jsonp({gasprices:result})
//  });
//});


router.get('/api/v1/version', function(req, res, next) {
  res.jsonp({web3version:web3.version})
});
//router.get('/api/v2/version', function(req, res, next) {
//  res.jsonp({web3version:web3.version})
//});


router.get('/api/v1/checkbal', function(req, res, next) {
  eth1.eth.getBalance(req.query.wallet).then(result => { 
    res.jsonp({balance:result})
  });
});
//router.get('/api/v2/checkbal', function(req, res, next) {
//  eth2.eth.getBalance(req.query.wallet).then(result => { 
//    res.jsonp({balance:result})
//  });
//});


router.get('/api/v1/ibantoadress', function(req, res) {
  res.jsonp({adress:eth1.eth.Iban.toAddress(req.query.Iban)})
});
//router.get('/api/v2/ibantoadress', function(req, res) {
//  res.jsonp({adress:eth2.eth.Iban.toAddress(req.query.Iban)})
//});


router.get('/api/v1/adresstoiban', function(req, res) {
  res.jsonp({iban:eth1.eth.Iban.toIban(req.query.adress)})
});
//router.get('/api/v2/adresstoiban', function(req, res) {
//  res.jsonp({iban:eth2.eth.Iban.toIban(req.query.adress)})
//});



router.get('/api/v1/getblock', function(req, res, next) {
  eth1.eth.getBlock(req.query.blockid).then(result => { 
    res.jsonp({result})
  }).catch(err => {res.jsonp({oof})});
});
//router.get('/api/v2/getblock', function(req, res, next) {
//  eth2.eth.getBlock(req.query.blockid).then(result => { 
//    res.jsonp({result})
//  }).catch(err => {res.jsonp({oof})});
//});

router.get('/api/v1/transactioninfo', function(req, res, next) {
  web3.eth.getTransaction(req.query.hash).then(result => { 
    res.jsonp({result})
  }).catch(err => {res.jsonp({oof})});
});
//router.get('/api/v2/transactioninfo', function(req, res, next) {
//  web3.eth.getTransaction(req.query.hash).then(result => { 
//    res.jsonp({result})
//  }).catch(err => {res.jsonp({oof})});
//});

router.get('/api/v1/createacc', function(req, res, next) {
  var acc = eth1.eth.accounts.create()
  res.jsonp({acc})
});
//router.get('/api/v2/createacc', function(req, res, next) {
//  var acc = eth2.eth.accounts.create()
//  res.jsonp({acc})
//});

module.exports = router;