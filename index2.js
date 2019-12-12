const fs      = require('fs');
const requestPromise = require('request-promise');

function readFilePromisified(fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, 'utf8', (error, content) => {
            if (error) {
                return reject(error);
            }
            resolve(content);
        });
    });
};

function run(fileName) {
    readFilePromisified(fileName).then(url => {
        return requestPromise(url, {json: true});
    }).then(body => {
        return requestPromise(body.films[0], {json: true});
    }).then(body => {
        return requestPromise(body.characters[1], {json: true});
    }).then(body => {
        console.log(body.name, body.height);
    }).catch(error => {
        console.log('Error:', error);
    });
}

run('url.txt');