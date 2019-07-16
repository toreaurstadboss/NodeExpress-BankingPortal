const express = require('express');
const router = express.Router(); 
const { accounts, writeJSON } = require('../data');

router.get('/payment', function(request, response){
    response.render('payment', { accounts: accounts.credit });
});

router.post('/payment', function(request, response){
    accounts.credit.balance = accounts.credit.balance - request.body.amount;
    accounts.credit.available = parseInt(accounts.credit.available, 10) + parseInt(request.body.amount);
    writeJSON();
    response.render("payment", { message: "Payment successful" });
});

router.get('/transfer', function(request, response){
    response.render('transfer');
});

// router.get('/profile', function(request, response){
//     response.render('profile', { user: users[0]});
// });


router.post('/transfer', function(request, response){
    accounts[request.body.from].balance = 
     accounts[request.body.from].balance - request.body.amount;
     accounts[request.body.to].balance = 
     parseInt(accounts[request.body.to].balance) + parseInt(request.body.amount);
     writeJSON();
     response.render("transfer", { message: "Transfer Completed" });
});

module.exports = router
