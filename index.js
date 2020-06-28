const express=require('express');
const path=require('path');
const port=8000;

const db=require('./config/mongoose'); 
const Contact=require('./models/contact');
const app=express();

app.set('view engine','ejs')
app.set('views', './views')
app.use(express.urlencoded());
app.use(express.static('assets'))

var contactList = [
    {
        name:"abcde",
        phone: "11111"
    },
    {
        name:"pqrst",
        phone: "12345"
    },
    {
        name:'wxyz',
        phone: "99999"
    }
];

app.get('/',function(req,res){

Contact.find({},function(err,Contact){
    if(err){
        console.log("error in fetching data ")
        return;
    }
    return res.render('home', {
        title : "contact list",
        contact_list : Contact
             });
});
});

app.post('/add-contact', function(req,res){
    
    Contact.create(req.body,
        function(err,newContact){
            if(err){
                console.err("there is some error");
                return;
            }
            console.log("*******", newContact)
            return res.redirect('back');
        });
    
});

app.get('/delete-contact/', function(req,res){
console.log(req.query);
    let id=req.query.id;
    Contact.findByIdAndDelete(id,function(err){
        if(err){
        console.log("there is an error on find this id")
        return;
    
        }
        return res.redirect('back');
    })


});
app.listen(port,function(err){
    if(err){
        console.log('there is an error ',err);
    }
    console.log('gotcha');
})