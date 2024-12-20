const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));  
});

app.get('/quotes', (req, res) => {
  fs.readFile('quotes.json', (err, data) => {
      if (err) {
          res.status(500).send('Error reading the JSON file');
          return;
      }
      res.json(JSON.parse(data));
  });
});

app.post('/addquote', (req, res) => {
    const newQuote = req.body;

    fs.readFile('quotes.json', (err, data) => {
        if (err) throw err;

        let quotes = JSON.parse(data);

        // Vérifiez que quotes.citations existe et est un tableau
        if (!quotes.citations) {
            quotes.citations = [];
        }
        // Vérifiez si la citation existe déjà
        const quoteExists = quotes.citations.some(quote => 
          quote.texte === newQuote.texte && quote.auteur === newQuote.auteur
        );

        if (quoteExists) {
            return res.status(400).json({ message: 'Quote already exists' });
        }
        
        //console.log(quotes.citations);
        quotes.citations.push(newQuote);
        console.log(quotes.citations.length);
        fs.writeFile('quotes.json', JSON.stringify(quotes, null, 2), (err) => {
            if (err) throw err;
              res.json({ message: 'Quote added successfully' });
        });
    });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});