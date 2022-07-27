
const API_KEY = "api_key=d6a2eaa89f6e447e46a5e5b448985ae0"
const BASE_URL = "https://api.themoviedb.org/3/"
const PATH = "movie/top_rated?"
const API_URL = BASE_URL + PATH + API_KEY
const IMG_URL = "https://image.tmdb.org/t/p/w500/"
//uri = `https://api.themoviedb.org/3/movie/top_rated?api_key=d6a2eaa89f6e447e46a5e5b448985ae0&languaje=es-ES&page=${page}`

const container = document.getElementById('container');

const genres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]


let page = 1;
const btnBefore = document.getElementById('before')
const btnNext = document.getElementById('next')

btnNext.addEventListener('click', () => {
    if(page < 1000){
        page += 1;
        loadMovies()
    }
    
});

btnBefore.addEventListener('click', () => {
    if(page > 1){
     page -= 1;
     loadMovies();
    }
});



 const loadMovies = async () => {
    try{
        const res = await fetch(API_URL)
        //console.log(res)

        if(res.status === 200){
        const data = await res.json()
         console.log(data)
           
         showMovies(data.results)

        } else if(res.status === 401) console.log('Wrong Key');
        if(res.status === 404) console.log('La pelicula no existe');

    } catch(error) {
       console.log(error)
    }
    }; loadMovies();


     const showMovies = (data) => {
        container.innerHTML = ''
        data.forEach(movie => {
            const {title, poster_path, vote_average, overview} = movie
           const movieEl = document.createElement('div'); 
           movieEl.classList.add('movie')
           movieEl.innerHTML = `
           <div class="movie card">
		   <div class="imgBx">
			<img src="${IMG_URL + poster_path}" alt="${title}">
		   </div>
		  <div class="content">
           <h2 class="title">${title}</h2>
		   <span class="${getcolor(vote_average)}">${vote_average}</span>
		   <p>${overview}</p>
		  </div>
		</div>
           `

           container.appendChild(movieEl);
        });
     };

     const getcolor = (vote) => {
           if(vote >= 8){
            return 'green'
           }else if(vote >= 5){
            return 'orange'
           }else{
            return 'red'
           }
     }

    