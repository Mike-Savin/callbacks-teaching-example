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

async function runAsync(fileName) {
    const url = await readFilePromisified(fileName);
    const body1 = await requestPromise(url, {json: true});
    const body2 = await requestPromise(body1.films[0], {json: true});
    const body3 = await requestPromise(body2.characters[1], {json: true});
    
    console.log(body3.name, body3.height);
    return 1;
}

runAsync('url.txt').then(res => {
    console.log(res);
}).catch(error => {
    console.log(error);
});
console.log('Starting...');