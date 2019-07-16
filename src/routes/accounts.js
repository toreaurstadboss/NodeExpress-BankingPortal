const express = require('express');
const router = express.Router(); 
const {accounts } = require('../data');

router.get('/checking', function(request, response){
    response.render('account', { account: accounts.savings});
}); 
router.get('/savings', function(request, response){
    response.render('account', { account: accounts.savings});
});
router.get('/credit', function(request, response){
    response.render('account', { account: accounts.savings});
});

module.exports = router;

