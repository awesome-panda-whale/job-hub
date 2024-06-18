const fs = require('fs');
const path = require('path');
const db = require('./mock_database.json');

describe("post /applications/submitForm", () => {
    it('writes a valid marketList to the JSON file', () => {
        const marketList = [{ location: 'here', cards: 11 }, { location: 'there', cards: 0 }];
        const result = db.sync(marketList);
        expect(result).not.toBeInstanceOf(Error);
        const table = JSON.parse(fs.readFileSync(testJsonFile));
        expect(table).toEqual(marketList);
    });
})