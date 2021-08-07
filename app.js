const jokes = document.querySelector('#jokes');
const button = document.querySelector('#jokeButton');
const delJoke = document.querySelector('#clearJokes');

const getDadJoke = async () => {
    try {
        const config = { headers: { Accept: 'application/json' } }
        const res = await axios.get('https://icanhazdadjoke.com/', config);
        return res.data.joke;
    }
    catch {
        return ("Failed to fetch Joke :(");
    }
}

const appendJoke = async () => {
    const joke = await getDadJoke();
    const newJoke = document.createElement('li');
    newJoke.append(joke);
    jokes.append(newJoke);
}

function delJokes() {
    const jokes = document.querySelectorAll('li');
    for(let joke of jokes) {
        joke.remove();
    }
}

button.addEventListener('click', appendJoke);
delJoke.addEventListener('click', delJokes);

const form = document.querySelector('form');
form.addEventListener('submit', async function(e) {
    e.preventDefault();
    resetShows();
    const searchTerm = form.elements.query.value;
    const config = { params: { q: searchTerm } }
    const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);
    addImages(res.data);
    form.elements.query.value = '';
})

const addImages = (serieses) => {
    for(let series of serieses) {
        if(series.show.image) {
            const div = document.createElement('div');
            const img = document.createElement('img');
            img.src = series.show.image.medium;
            div.append(img);
            const name = document.createElement('h4');
            name.textContent = series.show.name;
            name.style.color = "white";
            const desc = document.createElement('p');
            for(let genre of series.show.genres) {
                const genreText = document.createElement('p');
                genreText.textContent = genre;
                desc.append(genreText);
            }
            div.append(name, desc);
            div.style.marginBottom = '20px';
            div.classList.add('content', 'shows');
            div.style.display = "inline";
            div.style.textAlign = "center"
            document.querySelector('#tvshows').append(div);
        }
    }
}

function resetShows() {
    const serieses = document.querySelectorAll('.shows');
    for(series of serieses) {
        series.remove();
    }
}

const clearShows = document.querySelector('#clearShows');
clearShows.addEventListener('click', resetShows);