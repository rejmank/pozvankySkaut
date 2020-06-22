var express = require('express');
var router = express.Router();
var AWS = require("aws-sdk");
AWS.config.update({ region: "eu-west-1" });

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/", async (req, res) => {
  await sendAlert(req.body)
  res.render('succes')
});


const sendAlert = (user) => {
  var params = {
    Destination: {
      ToAddresses: [
        "j.rejman@protonmail.com",
        "chadima.ondrej@skaut.cz"
      ]
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: JSON.stringify(user)
        },
        Text: {
          Charset: "UTF-8",
          Data: `Účastník ${user.name} ${user.surname} se právě přihlásil na tábor`
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Přihlášení'
      }
    },
    Source: "rejmank1@gmail.com",
  };

  var sendPromise = new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail(params).promise();

  sendPromise.then(
    function (data) {
      console.log(data.MessageId);
    }).catch(
      function (err) {
        console.error(err, err.stack);
      });


}

module.exports = router;
