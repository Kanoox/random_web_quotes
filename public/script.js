function getcitation(){
    const my_quotes = document.getElementById("quotes");
    
    fetch('/quotes')
        .then(response => response.json())
        .then(data => {
            my_quotes.textContent = get_random_quote(data.citations);
            console.log(my_quotes.textContent);
        })
        .catch(error => console.error('Error fetching the JSON:', error));
}

function get_random_quote(quotes){
    // Vérification du tableau
    if (!Array.isArray(quotes) || quotes.length === 0) {
        return 'No quotes available';
    }

    // Générer un index aléatoire
    var i = Math.floor(Math.random() * quotes.length)
    var auteur = quotes[i].auteur;
    var texte = quotes[i].texte;

    var random_quote = texte + " - " + auteur;


    return random_quote;
}

function addcitation(){
    const new_quote = {
        texte: prompt("Entrez la citation"),
        auteur: prompt("Entrez l'auteur")
    };
    
    fetch('/addquote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(new_quote),
    })
        .catch(error => console.error('Error fetching the JSON:', error));
}