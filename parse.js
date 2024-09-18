const fs = require('node:fs');

let m = [];
for (let i = 1; i <= 4; i++) {
    const s = JSON.parse(fs.readFileSync(`message_${i}.json`, 'utf8'));
    m = m.concat(s.messages)
}

m = m.reverse()

const start = 1694926800; // sun sep 17 2023
const day = 86400;

const counts = [{
    t: start,
    c: 0
}];
for (message of m) {
    if (message.timestamp_ms / 1000 > start + day * counts.length) {
        counts.push({ t: (start + day * counts.length) * 1000, c: 0 })
    }
    counts[counts.length - 1].c++;
}

fs.writeFileSync('data.json', JSON.stringify(counts))
console.log(Math.max(...counts.map(c => c.c)));