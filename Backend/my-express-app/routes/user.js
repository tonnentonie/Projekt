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


    for (let index = 0; index < users.pollock.length; index++) {
        const element = users.pollock[index];
        if (element.name === name) {
            return res.status(406).json({ code: 406, message: "user already exists" });
        }

    }

    apiKey = signVerify.sign(req.body);


    // Add the new user object
    users.pollock.push({
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
    //console.log("test1" + req.body);


    // Read the existing users from the file
    const users = JSON.parse(fs.readFileSync(userFilePath));
    let apiKey = "";

    let bool = true;

    for (let index = 0; index < users.pollock.length && bool; index++) {
        const element = users.pollock[index];
        //console.log(element.name + " test " + element.password);
        if (element.name === name && element.password === password) {
            apiKey = signVerify.sign(req.body);
            return res.status(200).json(apiKey);
            bool = false;
        } 

    }

    //console.log(signVerify.verifyTest(apiKey,res));

    // Send response
    return res.status(406).json({ code: 406, message: "User and/or password wrong" });

});

// GET /user/:name endpoint to get the User
router.get('/:name', signVerify.verify, (req, res) => {


    // Get name from the URL parameters
    const name = req.params.name;

    // Lese die users.json Datei ein
    const users = JSON.parse(fs.readFileSync(userFilePath));

    // Finde den Index des entsprechenden Users in dem Array
    const usersIndex = users.pollock.findIndex((users) => users.name === name);

    if (usersIndex === -1) {
        return res.status(404).json({
            code: 404,
            message: "User not found."
        });
    } else {

        const user =
        {

            name: users.pollock[usersIndex].name,
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
    const usersIndex = users.pollock.findIndex((users) => users.name === name);

    if (usersIndex === -1) {
        return res.status(404).json({ code: 404, message: "User not found" });
    } else {



        // Remove the user from the pollock users array
        users.pollock.splice(usersIndex, 1);

        // Zurückschreiben des aktualisierten Eintrags in die Datei
        fs.writeFileSync(userFilePath, JSON.stringify(users));

        return res.status(200).json({ code: 200, message: "Delete successful" });
    }

});

module.exports = router;
