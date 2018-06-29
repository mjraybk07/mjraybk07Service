const ObjectId = require('mongodb').ObjectID;


module.exports.validAccount = () => {
  return {
    _id : ObjectId("5b29a1766a941aecc7b5e243"),
    createdAt : new Date ("2018-02-03T14:33:22.175Z"),
    companyName : "Powlowski - Davis",
    description : "Wurciw bohmote cipil pubhaw mo bokrit jap ke inu lu bi zemgu lav ga.",
    location : {
      latitude : "63.6974",
      longitude : "-7.7682"
    },
    npsScoreCURRENT : -92,
    npsScorePREDICTED : 80,
    __v : 0
  };
  
};


module.exports.validCase = () => {
  return {
    _id : ObjectId("5b2c2fc9e1435fffc9f82f39"),
    createdAt : new Date("2018-02-27T02:13:50.296Z"),
    account_id : ObjectId("5b29a1766a941aecc7b5e245"),
    title : "Fuusmu kasom cibdozmu cejorbi haliafe.",
    text : "Belewebum te zun nitzulag vabhi roredi lot lu sodotto cihucuzi paitoon inagedo asobufu boec to.",
    npsScoreCURRENT : -28,
    npsScorePREDICTED : -97,
    resolved : true,
    __v : 0
  };
};


module.exports.validUser = () => {
  return  {
    _id : ObjectId("5b3147e1e4c25c2d20ac320e"),
    createdAt : new Date("2018-03-24T06:51:20.542Z"),
    account_id : ObjectId("5b29a1766a941aecc7b5e246"),
    userName : "Trenton White",
    jobTitle : "Principal Mobility Engineer",
    email : "Freeman.Hartmann15@yahoo.com",
    jobType : "Facilitator",
    phone : "(996) 524-4921",
    __v : 0
  }
}


module.exports.validMessage = () => {
  return  {
    _id : ObjectId("5b343d7dada89246e71801c0"),
    createdAt : new Date("2017-08-08T12:08:44.618Z"),
    case_id : ObjectId("5b2c2fc9e1435fffc9f82f3a"),
    subject : "Hoar nulbac girec sasfud im.",
    message : "Ignev kog cujfilhoh kuak cu bevihjan zose gu hidce di ib uzeku zomes vibej fodpesof. Bi donu disude uf runi gozo et dufta diohu rorkuv re zohnus jon hab rovoviapi. Bujawi bib bomom amu izwe oknet mi ce lu ruwi goah wowa hauhupec. Unzu dut juw bamlo moscodkor cet koun fiwjuzol vok kuule semuzfop cukwevgi gu me mimeke cibwowusu. Fecu pe neba ma debguj mehokje mu sovaluw pe nu zukawnid jiarelu zaluz ku jo zugu ilalha.",
    __v : 0
  }
}


module.exports.validAccountOverview = () => {
  return  {
    // TODO
  }
}


