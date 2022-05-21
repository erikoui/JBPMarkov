const express = require("express");
const fs = require("fs");

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

let textData = fs.readFileSync('data.txt', 'utf8');
textData = textData.replace("?", "? ").replace("\n", " ").split(' ');
let chain = {};
for (let i = 0; i < textData.length; i++) {
    if (!(chain[textData[i]] != undefined)) {
        chain[textData[i]] = {};
    }

    if (chain[textData[i]][textData[i + 1]] != undefined) {
        chain[textData[i]][textData[i + 1]]++;
    } else {
        chain[textData[i]][textData[i + 1]] = 1;
    }
}
let uniqueWords = Object.keys(chain);

const markovChain = () => {
    let jordan = '';
    do {
        let r;
        do {
            r = getRandomInt(uniqueWords.length);
            jordan = uniqueWords[r];
        }
        while (jordan.charAt(0) !== jordan.charAt(0).toUpperCase());

        r = jordan;
        while (!jordan.endsWith('.')) {
            //generate probability array
            let a = Object.keys(chain[r]);
            let b = [];
            for (let i = 0; i < a.length; i++) {
                for (let j = 0; j < chain[r][a[i]]; j++) {
                    b.push(a[i]);
                }
            }
            r = b[getRandomInt(b.length)];
            jordan = jordan + " " + r;
        }
    }
    while (jordan.length < 50);

    return jordan;
}

// Server port to listen on
const PORT = process.env.PORT || 5000;

app = express();

// Homepage
app.get('/', (req, res) => {
    res.charset = 'utf8';
    res.end(markovChain());
});

// --------------- Start Server ----------------
app.listen(PORT, () => console.log(`Listening on ${PORT}`));