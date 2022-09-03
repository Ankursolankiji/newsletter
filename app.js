const express = require("express"); //Importing the express module/package
const app = express();
const https = require("https"); //importing http module
const bodyParser = require("body-parser"); //importing body-parser module
// const request = require("request");
const { response } = require("express");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public")); // to enable a static folder

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
  //to show sign up [on home route]
});

app.post("/", function (req, res) {
  //taking data from form  with body-parser
  const firstNames = req.body.firstName;
  const SecondNames = req.body.secondName;
  const emails = req.body.email;
  
  const data = {
    members: [
      {//declaring members as js object
        email_address: emails,
        status: "subscribed",
        merge_fields: {
          FNAME: firstNames,
          LNAME: SecondNames,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);//js object to json 
  //declaring vars for posting ours members
  const url = "https://us8.api.mailchimp.com/3.0/lists/2f5114433e";
  const options = {
    method: "POST",
    auth: "ankur:a961a24d2eeb6173fb9d3025b7a3ff78-us8",
  };
  
  const request = https.request(url, options, function (response) {
    if(response.statusCode === 200){
        res.sendfile(__dirname + "/success.html")
      //sending sucess on code 200
    }
    else{
        res.sendfile(__dirname + "/failure.html")
        //sending failure if something goes wrong
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  //sending the request dta to chipmunk
  request.write(jsonData);
  request.end();
});

//redirecting to the the / on failure
app.post("/failure",function(req,res){
  res.redirect("/")
})
app.listen(3000, function () {
  console.log("the server is on 3000 bitches"); //making local server 3000
});
// -us8
//
