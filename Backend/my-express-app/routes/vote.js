const express = require('express');
const router = express.Router();

const { v4: uuidv4 } = require('uuid');
const { validate } = require('uuid');
const fs = require('fs');

const pollFilePath = './data/polls.json';

var pollIndex = -1;
var voteIndex = -1;

function findIndex(token){
    const pollData = JSON.parse(fs.readFileSync(pollFilePath));
    for (let i = 0; i < pollData.length; i++) {
        const poll = pollData[i];
        for (let j = 0; j < poll.votes.length; j++) {
            const vote = poll.votes[j];
            if (vote.editCode === token) {
                pollIndex = i;
                voteIndex = j;
                break;
            }
        }
    }
}

// POST /vote/lack endpoint to create a new vote
router.post('/lack/:token', (req, res) => {
    const { owner, choice } = req.body;
    const { token } = req.params;
    const editCode = uuidv4();
    const time = Date.now();
    const date = new Date(time);

    // Lese die polls.json Datei ein
    const pollData = JSON.parse(fs.readFileSync(pollFilePath));

    // Überprüfe ob alle benötigten Felder im Request Body vorhanden sind
    if (owner.name == null || !Array.isArray(choice)) {
        return res.status(405).json({ code: 405, message: "Invalid input" });
    }
    for (let i = 0; i < choice.length; i++) {
        const c = choice[i];
        if (c == null || c.id == null || c.worst == null) {
            return res.status(405).json({ code: 405, message: "Invalid input" });
        }
    }

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
            pollData[pollIndex].votes.push({
                owner,
                choice,
                date,
                editCode
            });

            // Schreibe die votes.json Datei zurück
            fs.writeFileSync(pollFilePath, JSON.stringify(pollData));

            // Sende eine Erfolgsmeldung zurück
            res.status(200).json({
                edit: {
                link: `localhost:49712/pollack/vote/${editCode}`,
                value: editCode
                }
            });
        }
    }
});

// GET /vote/lack/:token endpoint to get the poll details and the vote
router.get('/lack/:token', (req, res) => {
    const { token } = req.params;

    // Lese die polls.json Datei ein
    const pollData = JSON.parse(fs.readFileSync(pollFilePath));

    if (!validate(token)) {
        return res.status(405).json({ code: 405, message: "Invalid input." });    
    }

    // Finde den Index des entsprechenden editCode in dem Votes Array
    pollIndex = -1;
    voteIndex = -1;
    findIndex(token);

    // Überprüfe ob Vote mit übergebenen editCode vorhanden ist
    if (pollIndex === -1) {
        return res.status(404).json({
            code: 404,
            message: "Poll not found."
        }); 
    }else{
        // Überprüfe ob die Deadline erreicht wurde
        const deadline = new Date(pollData[pollIndex].setting.deadline);
        if(deadline < Date.now()){
            return res.status(410).json({ 
                code: 410, 
                message: "Poll is gone." 
            });
        }else{
            const poll = {
                poll:{
                    body:{
                        title: pollData[pollIndex].title,
                        description: pollData[pollIndex].description,
                        options: pollData[pollIndex].options,
                        setting: pollData[pollIndex].setting,
                        fixed: pollData[pollIndex].fixed,
                    },
                    share: {
                        link: `localhost:49712/pollack/vote/${pollData[pollIndex].shareCode}`,
                        value: pollData[pollIndex].shareCode
                    }
                },
                vote: {
                    owner: pollData[pollIndex].votes[voteIndex].owner,
                    choice: pollData[pollIndex].votes[voteIndex].choice,
                },
                time: pollData[pollIndex].votes[voteIndex].date
            }
    
            res.status(200).json(poll);
        }
    }
});

// PUT /vote/lack/:token endpoint to update the vote
router.put('/lack/:token', (req, res) => {
    const { owner, choice } = req.body;
    const { token } = req.params;

    // Lese die polls.json Datei ein
    const pollData = JSON.parse(fs.readFileSync(pollFilePath));

    // Finde den Index des entsprechenden editCode in dem Votes Array
    pollIndex = -1;
    voteIndex = -1;
    findIndex(token);

    // Überprüfe ob Vote mit übergebenen editCode vorhanden ist
    if (pollIndex === -1) {
        return res.status(404).json({
            code: 404,
            message: "Poll not found."
        }); 
    }else{
        // Aktualisieren des Eintrags mit den Eigenschaften im Request Body
        const updatedVote = {
            ...pollData[pollIndex].votes[voteIndex],
            owner: owner,
            choice: choice,
        };
        
        // Zurückschreiben des aktualisierten Eintrags in die Datei
        pollData[pollIndex].votes[voteIndex] = updatedVote;
        fs.writeFileSync(pollFilePath, JSON.stringify(pollData));
        
        return res.status(200).json({ code: 200, message: "i. O." });
    }    
});

// DELETE /poll/lack/:token endpoint to delete the poll
router.delete('/lack/:token', (req, res) => {
    const { token } = req.params;

    if (!validate(token)) {
        return res.status(400).json({ code: 400, message: "Invalid poll edit token." });    
    }else{
        // Lese die polls.json Datei ein
        const pollData = JSON.parse(fs.readFileSync(pollFilePath));

        // Finde den Index des entsprechenden editCode in dem Array
        pollIndex = -1;
        voteIndex = -1;
        findIndex(token);

        if (pollIndex === -1) {
            return res.status(404).json({ code: 404, message: "Poll not found" });
        }else{
            // Remove the vote from the votes array
            pollData[pollIndex].votes.splice(voteIndex, 1);
            
            // Zurückschreiben des aktualisierten Eintrags in die Datei
            fs.writeFileSync(pollFilePath, JSON.stringify(pollData));
            
            return res.status(200).json({ code: 200, message: "i. O." });    
        }
    }
});

module.exports = router;
