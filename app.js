const express = require('express')
const app = express()
const port = 3000
const {MongoClient} = require('mongodb');
const pug = require('pug');
const path = require("path");
const { time } = require('console');
var {profileSchema} = require('./model');
var {projectSchema} = require('./model');
var {serviceSchema} = require('./model');
var {expSchema} = require('./model');
var {footerSchema} = require('./model');
var {newsSchema} = require('./model');
var {progressbarSchema} = require('./model');
var {testischema} = require('./model');
var fs = require('fs');
var multer = require('multer');
var mongoose = require('mongoose')


app.use(express.urlencoded());

// For serving static files
app.use(express.static('public'))

// Set the template engine as pug
app.set('view engine', 'pug')

// Set the views directory
app.set('views',path.join(__dirname, 'views'))


// DEFINING VARIABLES

let db_profile_set
let db_skill_set 
let db_service_set 
let db_exp_set
let db_testi_set
let db_footer
let db_news_set
let db_project_set
let db_p_img
let file_name

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads')
	},
	filename: (req, file, cb) => {
    file_name = file.fieldname + '-' + Date.now()
    console.log(file_name)
		cb(null, file_name)
	}
});

var upload = multer({ storage: storage });


async function fetchdata(client){

  profileSchema.find({}, (err, items) => {
    if (err) {
      console.log(err);
    }
    else {
       db_profile_set = items
       console.log(db_profile_set[0].name)

    }
  });

  progressbarSchema.find({}, (err, items) => {
    if (err) {
      console.log(err);
    }
    else {
      db_skill_set = items
    }
  });

  serviceSchema.find({}, (err, items) => {
    if (err) {
      console.log(err);
    }
    else {
      db_service_set = items
    }
  });

  expSchema.find({}, (err, items) => {
    if (err) {
      console.log(err);
    }
    else {
      db_exp_set = items
    }
  });

  testischema.find({}, (err, items) => {
    if (err) {
      console.log(err);
    }
    else {
      db_testi_set = items
    }
  });

  projectSchema.find({}, (err, items) => {
    if (err) {
      console.log(err);
    }
    else {
      db_project_set = items
    }
  });

  newsSchema.find({}, (err, items) => {
    if (err) {
      console.log(err);
    }
    else {
      db_news_set = items
    }
  });

  footerSchema.find({}, (err, items) => {
    if (err) {
      console.log(err);
    }
    else {
      db_footer = items
    }
  });


}






async function main(){
  const uri = "mongodb+srv://mohitchaudhary08:minda999@portfolio-cluster.jbtrq.mongodb.net/portfolio?retryWrites=true&w=majority";
  mongoose.connect(uri,
    { useNewUrlParser: true, useUnifiedTopology: true }, err => {
      console.log('connected')
      fetchdata()
    });
}

main().catch(console.error);

// RENDARING MAIN PAGE

app.get('/', (req, res) => {

  
  let params = {
  // profile 
  profile_set:db_profile_set[0],
  p_images:db_p_img,
  skill_set:db_skill_set,
  service_set:db_service_set,
  exp_set:db_exp_set,
  testi_set:db_testi_set,
  footer_set:db_footer[0],
  news_set:db_news_set[0],
  project_set:db_project_set,
  }
  res.render('index',params)

  })


// RENDARING ADMIN PAGE

app.get('/admin', (req, res) => {
  let params1 = {
    profile_set:db_profile_set[0]
  }
  res.render('admin',params1)
  })


// UPDATE DATABASE HANDLER---------------------


app.post("/updatesite", (req, res) => {
  console.log("updating database")
  main().catch(console.error);
  setTimeout(() => {
    res.redirect('admin')
  }, 5000);
})


// PROFILE IMAGE CHANGE HANDLER--------------------------

app.post("/uploadpimg",upload.single('image'), (req, res,next) => {
  a = req.body.input
    console.log(a)
    let bufff = new Buffer.from(fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)).buffer);
    let imgdata = bufff.toString('base64');
    var conditions1 = {name:db_profile_set[0].name} 
    var update1 = { $set: {
      img: {
        data: imgdata,
        contentType: 'image/png'
      }
      }}
    var options = { multi: true };

    profileSchema.updateOne(conditions1, update1, options, callback1, {upsert: true} );
    function callback1 (err, numAffected) {
      console.log(numAffected)
      const path = 'uploads/'+ file_name
      try {
        fs.unlinkSync(path)
        main().catch(console.error);
        //file removed
        setTimeout(() => {
          res.redirect('admin')
        }, 8000);
      } catch(err) {
        console.error(err)
      }
    }
})









app.post('/updateprofile', (req, res) => {
  upname = req.body.name || db_profile_set[0].name
  uptext = req.body.text || db_profile_set[0].typed_text
  upheading = req.body.heading || db_profile_set[0].heading
  upheadingpara = req.body.headingpara || db_profile_set[0].heading_para
  console.log(upname)
  console.log(uptext)
  console.log(upheading)
  console.log(upheadingpara)

  var conditions = {name:db_profile_set[0].name}
  var obj = { $set:{
    name:upname,
    typed_text:uptext,
    heading:upheading,
    heading_para:upheadingpara}
  }
  var options = { multi: true };
  
  profileSchema.updateOne(conditions, obj, options, callback, {upsert: true} );
  function callback (err, numAffected) {
    console.log("profile updated")
    console.log(numAffected)

  }
  // if (a == "yes") {
  //   console.log("processing")
  //   setTimeout(() => {
  //     main().catch(console.error);
  //   }, 8000);
    
  //   console.log('database updated')
  // } else {
  //   console.log("failed to preceed")
  // }

  res.redirect('admin')
  
  

  })
app.post('/contact', (req, res) => {
  Name = req.body.name
  email = req.body.email
  subject = req.body.subject
  msg = req.body.message
  console.log(Name)
  console.log(email)
  console.log(subject)
  console.log(msg)
  res.send('success')
  })

  app.post('/uploadproject',upload.single('pro_img'), (req, res, next) => {

  //   var conditions = {project_heading:"insta post scraper"} 
  //   var update = { $set: {
  //     img: {
  //       data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
  //       contentType: 'image/png'
  //     }
  //     }}
  //   var options = { multi: true };
  
  //   imageSchema.updateOne(conditions, update, options, callback, {upsert: true} );
  
  // function callback (err, numAffected) {
  //   console.log(numAffected)
  //   console.log("failed")
  //   const path = 'uploads/'+ file_name
  //   try {
  //     fs.unlinkSync(path)
  //     //file removed
  //   } catch(err) {
  //     console.error(err)
  //   }
  //   // numAffected is the number of updated documents
  // }
  
    var obj = {
      project_heading:"insta post scraper",
      project_para :"this scraping tool can scrape all your post images in just one click",
      github_link :"www.google.com",
      category :"scraping tool",
      img: {
        data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
        contentType: 'image/png'
      }
      } 

      projectSchema.create(obj, (err, item) => {
        if (err) {
          console.log(err);
        }
        else {
          console.log("image inserted")
          const path = 'uploads/'+ file_name
          try {
                
                fs.unlinkSync(path)
                //file removed
              } catch(err) {
                console.error(err)
              } 
        }
        });

      a = req.body.input
    if (a == "yes") {
      console.log("processing")
      main().catch(console.error);
      console.log('database updated')
    } else {
      console.log("failed to preceed")
    }
  
    res.redirect('admin')
    
    
  
    })



app.post('/uploadtesti',upload.single('testi_img'), (req, res, next) => {

  //   var conditions = {project_heading:"insta post scraper"} 
  //   var update = { $set: {
  //     img: {
  //       data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
  //       contentType: 'image/png'
  //     }
  //     }}
  //   var options = { multi: true };
  
  //   imageSchema.updateOne(conditions, update, options, callback, {upsert: true} );
  
  // function callback (err, numAffected) {
  //   console.log(numAffected)
  //   console.log("failed")
  //   const path = 'uploads/'+ file_name
  //   try {
  //     fs.unlinkSync(path)
  //     //file removed
  //   } catch(err) {
  //     console.error(err)
  //   }
  //   // numAffected is the number of updated documents
  // }
  
    var obj = {
      testi_heading:"bilal siddque",
      testi_para:"best website developer i know!",
      work:"shopkeeper",
      img: {
        data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
        contentType: 'image/png'
      }
      } 
      testischema.create(obj, (err, item) => {
        if (err) {
          console.log(err);
        }
        else {
          console.log("image inserted")
          const path = 'uploads/'+ file_name
          try {
                
                fs.unlinkSync(path)
                //file removed
              } catch(err) {
                console.error(err)
              } 
        }
        });

      a = req.body.input
    if (a == "yes") {
      console.log("processing")
      main().catch(console.error);
      console.log('database updated')
    } else {
      console.log("failed to preceed")
    }
  
    res.redirect('admin')
    
    
  
    })





app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })


