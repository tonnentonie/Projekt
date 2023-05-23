const express = require('express');
const router = express.Router();

const fs = require('fs');
const signVerify = require('../JWT-token/signVerify');

const userFilePath = './data/users.json';

// POST /user endpoint to make a new User
router.post('/', (req, res) => {
    // Get data from the request body
    const { name, password } = req.body;

    console.log("POST User lock" + req.body);


    // Check if all required fields are present in the request body
    if (!name || !password) {
        return res.status(405).json({ code: 405, message: "Invalid input" });
    }

    // Read the existing users from the file
    const users = JSON.parse(fs.readFileSync(userFilePath));
    let apiKey = "123";

    
    for (let index = 0; index < users.length; index++) {
        const element = users[index];
        if (element.name === name) {
            return res.status(406).json({ code: 406, message: "user already exists" });
        }

    }

    apiKey = signVerify.sign(req.body);    


    // Add the new user object
    users.push({
        name,
        password,
    });


    // Write the updated user and votes back to the files
    fs.writeFileSync(userFilePath, JSON.stringify(users));

    // Send response
    res.status(200).json(apiKey);
});

router.post('/key', (req, res) => {

    // Get data from the request body
    const { name, password } = req.body;

    console.log("POST User Key" + req.body);


    // Check if all required fields are present in the request body
    if (!name || !password) {
        return res.status(405).json({ code: 405, message: "Invalid input" });
    }


    // Read the existing users from the file
    const users = JSON.parse(fs.readFileSync(userFilePath));
    let apiKey = "";



    for (let index = 0; index < users.length; index++) {
        const element = users[index];
        if (element.name === name && element.password === password) {
            apiKey = signVerify.sign(req.body);            
        }else{
            return res.status(406).json({ code: 406, message: "User and/or password wrong" });
        }

    }

    //console.log(signVerify.verifyTest(apiKey,res));

    // Send response
    res.status(200).json(apiKey);


});

// GET /user/:name endpoint to get the User
router.get('/:name', signVerify.verify, (req, res) => {


    // Get name from the URL parameters
    const name = req.params.name;

    // Lese die users.json Datei ein
    const users = JSON.parse(fs.readFileSync(userFilePath));

    // Finde den Index des entsprechenden Users in dem Array
    const usersIndex = users.findIndex((users) => users.name === name);

    if (usersIndex === -1) {
        return res.status(404).json({
            code: 404,
            message: "User not found."
        });
    } else {

        const user =
        {

            name: users[usersIndex].name,
            lock: true

        };

        // Sende das Objekt als JSON
        return res.status(200).json(user);

    }
});


// DELETE /user/:name endpoint to delete the user
//Only when logged in
router.delete('/:name', signVerify.verify, (req, res) => {


    // Get data from the request body
    const name = req.params.name;


    // Lese die polls.json Datei ein
    const users = JSON.parse(fs.readFileSync(userFilePath));

    // Finde den Index des entsprechenden adminCode in dem Array
    const usersIndex = users.findIndex((users) => users.name === name);

    if (usersIndex === -1) {
        return res.status(404).json({ code: 404, message: "User not found" });
    } else {



        // Remove the poll from the polls array
        users.splice(usersIndex, 1);

        // Zurückschreiben des aktualisierten Eintrags in die Datei
        fs.writeFileSync(userFilePath, JSON.stringify(users));

        return res.status(200).json({ code: 200, message: "Delete successful" });
    }

});

module.exports = router;
