const fs      = require('fs');
const request = require('request');

function run(fileName) {
    fs.readFile(fileName, 'utf8', (error, url) => {
        if (error) {
            throw error;
        }

        console.log(url);

        request(url, {json: true}, (error, response, body) => {
            if (error) {
                throw error;
            }
            console.log(body.films[0]);
            request(body.films[0], {json: true}, (error, response, body) => {
                if (error) {
                    throw error;
                }
                console.log(body.characters[1]);

                request(body.characters[1], {json: true}, (error, response, body) => {
                    if (error) {
                        throw error;
                    }
                    console.log(body.name, body.height);
                });
            });
        });
    });
    console.log('I`m here');
}

run('url.txt');