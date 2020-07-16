var express= require('express');

var path = require('path');

 var port=process.env.port || 8000;
 
 var db= require('./config/mongoose');

 var Contact= require('./model/contact');
 var app=express();

 app.set('view engine','ejs');

 app.set('views', path.join(__dirname,'views'));
 // Middlewire portion

 app.use(express.urlencoded());
 // Middlewire portion : To link the static files to style the html page

 app.use(express.static('assets'));

//   
 var contactList= [
     {
         name:"Pritam",
         Phone:"9883169066"
     },
     {
         name:"Deepu",
         Phone:"9883134373"
     }
 ];

 app.get('/',function(req,res){
    Contact.find({},function(err,contact){
        if(err){
           console.log('Error to fetch the contact');
           return; 
        }
        return res.render('home',{
            title : "Contact List",
            contact_list:contact
        });
    })
    
    //  console.log(req);
    //  res.send("<h1> We got you </h1>");
 });

 app.post('/contact-list',function(req,res){
    // contactList.push(req.body);
    Contact.create({
        name: req.body.name,
        Phone: req.body.Phone
    },function(err,createContact){
        if(err){
            console.log('There is error!');
            return;
        }
        console.log('Contact Succesfully updated in database',createContact);
        return res.redirect('back');
    });
    
 });

 app.get('/delete-contact',function(req,res){
     
    //  let phone = req.query.Phone;
    //  console.log(phone);
    //  let contactIndex = contactList.findIndex(contact => contact.Phone == phone);

    //  if(contactIndex != -1){
    //      contactList.splice(contactIndex,1);
         
    //  }

    let id=req.query.id;
    Contact.findByIdAndDelete(id,function(err){
    
        if(err){
        console.log('Error in deleting the contact');
        return;
        }
            
    return res.redirect('back');

    });
     
 });

 app.get('/practice',function(req,res){

    return res.render('practice',{
        title:"Play with EJS"
    });
    // res.send("<h1> This is not your home </h1>");
});




 app.listen(port,function(err){
    if(err){
        console.log("Error "+ err);
    }
    console.log("My Server is up and right in the port "+ port);
 });