const fs = require('fs');
const path = require('path');
const express = require('express');
const accountRoutes = require('./routes/accounts.js');
const servicesRoutes = require('./routes/services.js');
const { accounts, users, writeJSON } = require('./data.js');
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true}));
app.use('/account', accountRoutes);
app.use('/services', servicesRoutes);
app.get('/', function(request, response){
 response.render('index', { title: 'Account Summary', accounts: accounts});
}); 

app.get('/profile', function(request, response){
    response.render('profile', { user: users[0]});
});

app.get('/transfer', function(request, response){
    response.render('transfer');
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