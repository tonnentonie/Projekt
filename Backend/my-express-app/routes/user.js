const express = require('express');
const router = express.Router();

const fs = require('fs');
const { validate } = require('uuid');

const userFilePath = './data/users.json';

// POST /user endpoint
router.post('/', (req, res) => {
    // Get data from the request body
    const { name, password } = req.body;

    // Check if all required fields are present in the request body
    if (!name || !password) {
        return res.status(405).json({ code: 405, message: "Invalid input" });
    }

    // Read the existing users from the file
    const users = JSON.parse(fs.readFileSync(userFilePath));
    const apiKey = "123"

    // Add the new user object
    users.push({
        name,
        password,
    });


    // Write the updated user and votes back to the files
    fs.writeFileSync(userFilePath, JSON.stringify(users));

    // Create response object
    const response = {
        apiKey
    };

    // Send response
    res.status(200).json(response);
});

router.post('/user/key', (req, res) => {

    return router.post('/user');


});

// GET /poll/lack/:token endpoint to get the poll details
router.get('/lack/:token', (req, res) => {
    // Get token from the URL parameters
    const token = req.params.token;

    // Lese die polls.json Datei ein
    const pollData = JSON.parse(fs.readFileSync(pollFilePath));

    // Finde den Index des entsprechenden shareCode in dem Array
    const pollIndex = pollData.findIndex((poll) => poll.shareCode === token);

    if (pollIndex === -1) {
        return res.status(404).json({
          code: 404,
          message: "Poll not found."
        });
    }else{
        // Überprüfe ob die Deadline erreicht wurde
        const deadline = new Date(pollData[pollIndex].setting.deadline);
        if(deadline < Date.now()){
            return res.status(410).json({ code: 410, message: "Poll is gone." });
        }else{
            // Erstelle ein neues Objekt mit den Daten des Polls

            //Fehlende Funktionalität:
            //const participants = pollData[pollIndex]
            //const voted = pollData[pollIndex].votes

            const poll = 
            {
                body:{
                    title: pollData[pollIndex].title,
                    description: pollData[pollIndex].description,
                    options: pollData[pollIndex].options,
                    setting: pollData[pollIndex].setting,
                    fixed: pollData[pollIndex].fixed,
                    share: {
                        link: `https://localhost:3000/poll/${pollData[pollIndex].shareCode}`,
                        value: pollData[pollIndex].shareCode
                        }
            },
                participants: [],
                options: []
            };

            // Sende das Objekt als JSON
            return res.status(200).json(poll);
        }
    }
});

// PUT /poll/lack/:token endpoint to update the poll
router.put('/lack/:token', (req, res) => {
    // Get data from the request body
    const { title, description, options, setting, fixed } = req.body;
    const token = req.params.token;

    // Check if all required fields are present in the request body
    if (!title || !options || !setting || !fixed) {
        return res.status(405).json({ code: 405, message: "Invalid input" });
    }

    // Lese die polls.json Datei ein
    const pollData = JSON.parse(fs.readFileSync(pollFilePath));

    // Finde den Index des entsprechenden adminCode in dem Array
    const pollIndex = pollData.findIndex((poll) => poll.adminCode === token);

    if (pollIndex === -1) {
        return res.status(404).json({ code: 404, message: "Poll not found" });
    }else{
        // Aktualisieren des Eintrags mit den Eigenschaften im Request Body
        const updatedPoll = {
            ...pollData[pollIndex],
            title: title,
            description: description,
            options: options,
            setting: setting,
            fixed: fixed
        };
        
        // Zurückschreiben des aktualisierten Eintrags in die Datei
        pollData[pollIndex] = updatedPoll;
        fs.writeFileSync(pollFilePath, JSON.stringify(pollData));
        
        return res.status(200).json({ code: 200, message: "i. O." });    
    }
});

// DELETE /poll/lack/:token endpoint to delete the poll
router.delete('/lack/:token', (req, res) => {
    // Get data from the request body
    const token = req.params.token;

    if (!validate(token)) {
        return res.status(400).json({ code: 400, message: "Invalid poll admin token." });    
    }else{
        // Lese die polls.json Datei ein
        const pollData = JSON.parse(fs.readFileSync(pollFilePath));

        // Finde den Index des entsprechenden adminCode in dem Array
        const pollIndex = pollData.findIndex((poll) => poll.adminCode === token);

        if (pollIndex === -1) {
            return res.status(404).json({ code: 404, message: "Poll not found" });
        }else{
            // Remove the poll from the polls array
            pollData.splice(pollIndex, 1);
            
            // Zurückschreiben des aktualisierten Eintrags in die Datei
            fs.writeFileSync(pollFilePath, JSON.stringify(pollData));
            
            return res.status(200).json({ code: 200, message: "i. O." });    
        }
    }
});

module.exports = router;
