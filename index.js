<html>
<body>
<textarea id="userInput" rows="50" cols="150"></textarea>
<button onclick="generate()" type="button">Random!</button>
</body>
<script src="https://unpkg.com/js-markov/dist/markov.js"></script>
<script>
const inspiration = "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fg2reader.com%2Ffeed%2Ffolder%2F5bbcbaecd6498ccd2a047ea63d279b9b%2F%3Ff%3D112549";
const length = 300;

var markov = new Markov();

function generate() {
    userInput.value = markov.generateRandom(length);
}

TrainMarkov(markov).then(_ => {
    generate();
});

function cleanString(str) {
    return str.replace(/<style[^>]*>.*<\/style>/gm, '')
        .replace(/<[^>]+>/gm, '')
        .replace(/([\r\n]+ +)+/gm, '');
}

async function TrainMarkov(markov) {
    let result = await fetch(inspiration)
    json = await result.json();
    for (const item of json.items) {
        markov.addStates(cleanString(item.description));
    }
    markov.train();
}

</script>
</html>
