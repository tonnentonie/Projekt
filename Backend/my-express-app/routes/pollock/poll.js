const e = require('express');
const express = require('express');
const router = express.Router();

const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { validate } = require('uuid');
const signVerify = require('../../JWT-token/signVerify');


const pollFilePath = './data/polls.json';

// POST /poll/lock endpoint to create a new poll
router.post('/lock', signVerify.verify, (req, res) => {
    // Get data from the request body
    console.log("POST Poll lock");
    const { title, description, options, setting, fixed, owner, users, visibility } = req.body;

    // Check if all required fields are present in the request body
    if (!title || !options || !setting || !fixed || !owner || !users || !visibility) {
        return res.status(405).json({ code: 405, message: "Invalid input" });
    }
    const votes = [];
    // Generate shareCode and adminCode using uuidv4
    const shareCode = uuidv4();
    const adminCode = uuidv4();

    // Read the existing polls from the file
    const polls = JSON.parse(fs.readFileSync(pollFilePath));

    // Add the new poll object
    polls.push({
        title,
        description,
        options,
        setting,
        fixed,
        votes,
        shareCode,
        adminCode,
        owner,
        users,
        visibility,
    });


    // Write the updated polls and votes back to the files
    fs.writeFileSync(pollFilePath, JSON.stringify(polls));

    // Create response object
    const response = {
        admin: {
            link: `https://localhost:3000/poll/${adminCode}`,
            value: adminCode
        },
        share: {
            link: `https://localhost:3000/poll/${shareCode}`,
            value: shareCode
        }
    };

    // Send response
    res.status(200).json(response);
});

// GET /poll/lock/:token endpoint to get the poll details
router.get('/lock/:token', signVerify.verify, (req, res) => {
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
    } else {
        // Überprüfe ob die Deadline erreicht wurde
        const deadline = new Date(pollData[pollIndex].setting.deadline);
        if (deadline < Date.now()) {
            return res.status(410).json({ code: 410, message: "Poll is gone." });
        } else {
            // Erstelle ein neues Objekt mit den Daten des Polls

            //Fehlende Funktionalität:
            //const participants = pollData[pollIndex]
            //const voted = pollData[pollIndex].votes

            const response =

            {
                poll: {
                    body: {
                        title: pollData[pollIndex].title,
                        description: pollData[pollIndex].description,
                        options: pollData[pollIndex].options,
                        setting: pollData[pollIndex].setting,
                        fixed: pollData[pollIndex].fixed,

                    },
                    security: {
                        owner: pollData[pollIndex].owner,
                        users: pollData[pollIndex].users,
                        visibility: pollData[pollIndex].visibility,
                    },
                    share: {
                        link: `https://localhost:3000/poll/${pollData[pollIndex].shareCode}`,
                        value: pollData[pollIndex].shareCode
                    },
                    participants: pollData[pollIndex].participants,
                    options: {
                        voted: pollData[pollIndex].votes,
                        worst: pollData[pollIndex].worst,
                    }
                }

            };

            // Sende das Objekt als JSON
            return res.status(200).json(response);
        }
    }
});

// PUT /poll/lock/:token endpoint to update the poll
router.put('/lock/:token', signVerify.verify, (req, res) => {
    // Get data from the request body
    const { title, description, options, setting, fixed, owner, users, visibility } = req.body;
    const token = req.params.token;

    // Check if all required fields are present in the request body
    if (!title || !options || !setting || !fixed || !owner || !users || !visibility) {
        return res.status(405).json({ code: 405, message: "Invalid input" });
    }

    // Lese die polls.json Datei ein
    const pollData = JSON.parse(fs.readFileSync(pollFilePath));

    // Finde den Index des entsprechenden adminCode in dem Array
    const pollIndex = pollData.findIndex((poll) => poll.adminCode === token);

    if (pollIndex === -1) {
        return res.status(404).json({ code: 404, message: "Poll not found" });
    } else {
        // Aktualisieren des Eintrags mit den Eigenschaften im Request Body
        const updatedPoll = {
            ...pollData[pollIndex],
            title: title,
            description: description,
            options: options,
            setting: setting,
            fixed: fixed,
            owner: owner,
            users: users,
            visibility: visibility,
        };

        // Zurückschreiben des aktualisierten Eintrags in die Datei
        pollData[pollIndex] = updatedPoll;
        fs.writeFileSync(pollFilePath, JSON.stringify(pollData));

        return res.status(200).json({ code: 200, message: "i. O." });
    }
});

// DELETE /poll/lock/:token endpoint to delete the poll
router.delete('/lock/:token', signVerify.verify, (req, res) => {
    // Get data from the request body
    const token = req.params.token;

    if (!validate(token)) {
        return res.status(400).json({ code: 400, message: "Invalid poll admin token." });
    } else {
        // Lese die polls.json Datei ein
        const pollData = JSON.parse(fs.readFileSync(pollFilePath));

        // Finde den Index des entsprechenden adminCode in dem Array
        const pollIndex = pollData.findIndex((poll) => poll.adminCode === token);

        if (pollIndex === -1) {
            return res.status(404).json({ code: 404, message: "Poll not found" });
        } else {
            // Remove the poll from the polls array
            pollData.splice(pollIndex, 1);

            // Zurückschreiben des aktualisierten Eintrags in die Datei
            fs.writeFileSync(pollFilePath, JSON.stringify(pollData));

            return res.status(200).json({ code: 200, message: "i. O." });
        }
    }
});

module.exports = router;
