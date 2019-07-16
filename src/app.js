const fs = require('fs');
const path = require('path');
const express = require('express');
const { accounts, users, writeJSON } = require('./data.js');
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true}));

app.get('/', function(request, response){
 response.render('index', { title: 'Account Summary', accounts: accounts});
}); 
app.get('/checking', function(request, response){
    response.render('account', { account: accounts.savings});
}); 
 app.get('/savings', function(request, response){
    response.render('account', { account: accounts.savings});
});
app.get('/credit', function(request, response){
    response.render('account', { account: accounts.savings});
});

app.get('/profile', function(request, response){
    response.render('profile', { user: users[0]});
});

app.get('/transfer', function(request, response){
    response.render('transfer');
});

app.get('/payment', function(request, response){
    response.render('payment', { accounts: accounts.credit });
});

app.post('/payment', function(request, response){
    accounts.credit.balance = accounts.credit.balance - request.body.amount;
    accounts.credit.available = parseInt(accounts.credit.available, 10) + parseInt(request.body.amount);
    writeJSON();
    response.render("payment", { message: "Payment successful" });
});

app.post('/transfer', function(request, response){
    accounts[request.body.from].balance = 
     accounts[request.body.from].balance - request.body.amount;
     accounts[request.body.to].balance = 
     parseInt(accounts[request.body.to].balance) + parseInt(request.body.amount);
     writeJSON();
     response.render("transfer", { message: "Transfer Completed" });
});

app.listen(3000, () => console.log("PS Project Running on port 3000!"));