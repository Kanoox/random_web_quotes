const http = require('http');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/addquote', (req, res) => {
    const newQuote = req.body;

    fs.readFile('quotes.json', (err, data) => {
        if (err) throw err;

        let quotes = JSON.parse(data);
        quotes.citations.push(newQuote);

        fs.writeFile('quotes.json', JSON.stringify(quotes, null, 2), (err) => {
            if (err) throw err;
            res.send('Quote added successfully');
        });
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});