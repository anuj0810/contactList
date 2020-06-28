const mongoose=require('mongoose');//require the library

mongoose.connect('mongodb://localhost/contactListdb');//connect to databse

const db=mongoose.connection;  //acquire the coonection to check if it is successfull

db.on('error', console.error.bind(console,"error connecting to db"));//error

db.once('open',function(){//up and running then print the msg
    console.log('Successfully connected to the database')
})
