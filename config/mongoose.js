
// Requires the libary to connect to database
const mongoose= require('mongoose');

// To connect with the database
mongoose.connect('mongodb://localhost/contacts_list_db');

// To check wether connection is being made
const db= mongoose.connection;
// If error
db.on('error',console.error.bind(console,'error connecting to db'));
// If succesfull
db.once('open',function(){
    console.log('Succesfully connected to the database');
});