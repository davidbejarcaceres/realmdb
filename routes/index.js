var express = require('express');
var router = express.Router();
const Realm = require('realm');
const realm1 = new Realm;
var bodyParser = require("body-parser");

// Defines the person schema for Realm Data Base
const PersonSchema = {
  name: 'Person',
      properties: {
        name:     'string',
        apellido: 'string'
  }
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET ALL USERS. */
router.get('/api/users', function(req, res, next) {
  // Connects with Realm Data Base Table Person
  Realm.open({schema: [PersonSchema]})
  .then(realm => {
    const realm1 = this.realm; //vincula es el objeto con la variable real
    });

  const personas = realm1.objects('Person');
  res.json(personas);
});

/* GET one USER by name. */
router.get('/api/users/:nombre?', function(req, res, next) {
  // Connects with Realm Data Base Table Person
  Realm.open({schema: [PersonSchema]})
  .then(realm => {
    const realm1 = this.realm; //vincula es el objeto con la variable real
  });

  // Search in the Data base
  var query = (`name == "${req.params.nombre}"`);
  user_result = realm1.objects('Person').filtered(query);

  if (user_result.length > 0 ){
    res.json(user_result);
  }else{
    res.status(404).send(`No person found with user name ${req.params.nombre}`);
  }
});

/* POST new USERS. */
router.post('/api/users',function(req, res){
  var body_parsed = req.body;
  // Access to the Database
  Realm.open({schema: [PersonSchema]})
  .then(realm => {
    const realm1 = this.realm; // links with global realm object
    });
  
    // Adds all the users received by JSON
    body_parsed.forEach(element => {
    realm1.write(() => {
      const usaurio = realm1.create('Person', {
        name: element.name,
        apellido: element.apellido,
      });
    });
  });
  //console.log(body_parsed);
  res.json(body_parsed);
});







/* GET JSON API test. */
router.get('/api/test', function(req, res, next) {

  console.log("API de prueba iniciando... \n");

  Realm.open({schema: [PersonSchema]})
  .then(realm => {
    // Create Realm objects and write to local storage
    console.log("\nCreado el esquema...\n");

    const realm1 = this.realm; //vincula es el objeto con la variable real
      //myCar.miles += 20; // Update a property value
    });

    // realm1.write(() => {
    //   const usaurio1 = realm1.create('Person', {
    //     name: 'Ford',
    //     apellido: 'Focus',
    //   });
    // });

    console.log("\nFirst user created...\n");
    console.log("...");

  // Query Realm for all cars with a high mileage
  const personas = realm1.objects('Person');
  res.json(personas); //Response woth all the persons in the DB
});



module.exports = router;
