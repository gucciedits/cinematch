// Base de dados de filmes para demonstração
const moviesDatabase = {
  action: [
    {
      id: 1,
      title: "The Equalizer 3",
      year: 2023,
      genre: "Ação",
      rating: 4.2,
      userRating: 0,
      votes: 0,
      image: "https://walter-r2.trakt.tv/images/movies/000/742/254/posters/thumb/71e8cc1710.jpg.webp",
      description: "Robert McCall (Denzel Washington), ex‑militar e agente do DIA, vive tranquilo na Sicília. Quando amigos são ameaçados pela Camorra na costa de Amalfi, ele assume o papel de justiceiro para defendê-los, enfrentando o crime organizado com brutalidade tática.",
      director: "Antoine Fuqua",
      cast: ["Denzel Washington", "Dakota Fanning", "Eugenio Mastrandrea"],
      duration: "109 min",
      streaming: ["Apple TV", "Claro TV+", "Amazon Video", "Netflix"]
    },
    {
      id: 2,
      title: "John Wick",
      year: 2014,
      genre: "Ação",
      rating: 4.5,
      userRating: 0,
      votes: 0,
      image: "https://walter-r2.trakt.tv/images/movies/000/171/369/posters/thumb/a3938a03db.jpg.webp",
      description: "O ex-assassino John Wick sai da aposentadoria para rastrear os gângsteres que tiraram tudo dele.",
      director: "Chad Stahelski",
      cast: ["Keanu Reeves", "Michael Nyqvist", "Alfie Allen"],
      duration: "101 min",
      streaming: ["Netflix", "Amazon Video"]
    },
    {
      id: 3,
      title: "Mad Max: Fury Road",
      year: 2015,
      genre: "Ação",
      rating: 4.7,
      userRating: 0,
      votes: 0,
      image: "https://walter-r2.trakt.tv/images/movies/000/242/227/posters/thumb/7bdf3fc3d9.jpg.webp",
      description: "Em um mundo pós-apocalíptico, Max se une a Furiosa para escapar de um senhor da guerra tirano.",
      director: "George Miller",
      cast: ["Tom Hardy", "Charlize Theron", "Nicholas Hoult"],
      duration: "120 min",
      streaming: ["HBO Max", "Amazon Video"]
    },
    {
      id: 4,
      title: "Die Hard",
      year: 1988,
      genre: "Ação",
      rating: 4.3,
      userRating: 0,
      votes: 0,
      image: "https://walter-r2.trakt.tv/images/movies/000/004/267/posters/thumb/35ce5ed308.jpg.webp",
      description: "Um policial de Nova York luta contra terroristas em um arranha-céu de Los Angeles.",
      director: "John McTiernan",
      cast: ["Bruce Willis", "Alan Rickman", "Bonnie Bedelia"],
      duration: "132 min",
      streaming: ["Disney+", "Amazon Video"]
    },
    {
      id: 5,
      title: "Top Gun: Maverick",
      year: 2022,
      genre: "Ação",
      rating: 4.6,
      userRating: 0,
      votes: 0,
      image: "https://walter-r2.trakt.tv/images/movies/000/798/786/posters/thumb/54547d76c1.jpg.webp",
      description: "Depois de mais de 30 anos de serviço, Pete 'Maverick' Mitchell continua como um dos melhores pilotos da Marinha.",
      director: "Joseph Kosinski",
      cast: ["Tom Cruise", "Miles Teller", "Jennifer Connelly"],
      duration: "130 min",
      streaming: ["Paramount+", "Amazon Video"]
    },
    {
      id: 6,
      title: "Mission: Impossible",
      year: 1996,
      genre: "Ação",
      rating: 4.1,
      userRating: 0,
      votes: 0,
      image: "https://walter-r2.trakt.tv/images/movies/000/024/307/posters/thumb/36078d97bd.jpg.webp",
      description: "Ethan Hunt e sua equipe IMF enfrentam uma missão impossível para limpar seus nomes.",
      director: "Brian De Palma",
      cast: ["Tom Cruise", "Jon Voight", "Emmanuelle Béart"],
      duration: "110 min",
      streaming: ["Paramount+", "Netflix"]
    }
  ],
  drama: [
    {
      id: 7,
      title: "The Shawshank Redemption",
      year: 1994,
      genre: "Drama",
      rating: 4.9,
      userRating: 0,
      votes: 0,
      image: "https://walter-r2.trakt.tv/images/movies/000/000/911/posters/thumb/ed55ff8805.jpg.webp",
      description: "Dois homens presos se unem ao longo de vários anos, encontrando consolo e eventual redenção através de atos de decência comum.",
      director: "Frank Darabont",
      cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
      duration: "142 min",
      streaming: ["Netflix", "Amazon Video"]
    },
    {
      id: 8,
      title: "Forrest Gump",
      year: 1994,
      genre: "Drama",
      rating: 4.7,
      userRating: 0,
      votes: 0,
      image: "https://walter-r2.trakt.tv/images/movies/000/001/210/posters/thumb/8ed9565dea.jpg.webp",
      description: "A história de um homem com QI baixo que testemunha e influencia inadvertidamente vários eventos históricos.",
      director: "Robert Zemeckis",
      cast: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
      duration: "142 min",
      streaming: ["Netflix", "Paramount+"]
    },
    {
      id: 9,
      title: "The Godfather",
      year: 1972,
      genre: "Drama",
      rating: 4.8,
      userRating: 0,
      votes: 0,
      image: "https://walter-r2.trakt.tv/images/movies/000/000/167/posters/thumb/a18cea854f.jpg.webp",
      description: "O patriarca de uma dinastia do crime organizado transfere o controle de seu império clandestino para seu filho relutante.",
      director: "Francis Ford Coppola",
      cast: ["Marlon Brando", "Al Pacino", "James Caan"],
      duration: "175 min",
      streaming: ["Paramount+", "Amazon Video"]
    }
  ],
  comedy: [
    {
      id: 10,
      title: "The Grand Budapest Hotel",
      year: 2014,
      genre: "Comédia",
      rating: 4.4,
      userRating: 0,
      votes: 0,
      image: "https://walter-r2.trakt.tv/images/movies/000/272/068/posters/thumb/4409e1e4df.jpg.webp",
      description: "As aventuras de um lendário concierge de um famoso hotel europeu e seu protegido.",
      director: "Wes Anderson",
      cast: ["Ralph Fiennes", "F. Murray Abraham", "Mathieu Amalric"],
      duration: "99 min",
      streaming: ["Disney+", "Amazon Video"]
    },
    {
      id: 11,
      title: "Groundhog Day",
      year: 1993,
      genre: "Comédia",
      rating: 4.3,
      userRating: 0,
      votes: 0,
      image: "https://walter-r2.trakt.tv/images/movies/000/001/230/posters/thumb/c011089c11.jpg.webp",
      description: "Um meteorologista fica preso em um loop temporal, revivendo o mesmo dia repetidamente.",
      director: "Harold Ramis",
      cast: ["Bill Murray", "Andie MacDowell", "Chris Elliott"],
      duration: "101 min",
      streaming: ["Netflix", "Amazon Video"]
    }
  ],
  scifi: [
    {
      id: 12,
      title: "Dune: Part Two",
      year: 2024,
      genre: "Ficção Científica",
      rating: 4.6,
      userRating: 0,
      votes: 0,
      image: "https://walter-r2.trakt.tv/images/movies/000/997/581/posters/thumb/30abbb75ff.jpg.webp",
      description: "Paul Atreides se une aos Fremen em uma jornada de vingança contra os conspiradores que destruíram sua família.",
      director: "Denis Villeneuve",
      cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson"],
      duration: "166 min",
      streaming: ["HBO Max", "Amazon Video"]
    },
    {
      id: 13,
      title: "Blade Runner 2049",
      year: 2017,
      genre: "Ficção Científica",
      rating: 4.5,
      userRating: 0,
      votes: 0,
      image: "https://walter-r2.trakt.tv/images/movies/000/001/269/posters/thumb/f4c00be15b.jpg.webp",
      description: "Um jovem blade runner descobre um segredo que pode mergulhar a sociedade no caos.",
      director: "Denis Villeneuve",
      cast: ["Ryan Gosling", "Harrison Ford", "Ana de Armas"],
      duration: "164 min",
      streaming: ["Netflix", "Amazon Video"]
    }
  ],
  horror: [
    {
      id: 14,
      title: "Hereditary",
      year: 2018,
      genre: "Terror",
      rating: 4.2,
      userRating: 0,
      votes: 0,
      image: "https://walter-r2.trakt.tv/images/movies/000/285/153/posters/thumb/b362098258.jpg.webp",
      description: "Uma família é assombrada por uma tragédia que revela segredos perturbadores sobre sua linhagem.",
      director: "Ari Aster",
      cast: ["Toni Collette", "Alex Wolff", "Milly Shapiro"],
      duration: "127 min",
      streaming: ["Amazon Video", "Apple TV"]
    },
    {
      id: 15,
      title: "Get Out",
      year: 2017,
      genre: "Terror",
      rating: 4.3,
      userRating: 0,
      votes: 0,
      image: "https://walter-r2.trakt.tv/images/movies/000/151/984/posters/thumb/f6b3ea3d60.jpg.webp",
      description: "Um jovem afro-americano visita a família de sua namorada branca e descobre um segredo perturbador.",
      director: "Jordan Peele",
      cast: ["Daniel Kaluuya", "Allison Williams", "Bradley Whitford"],
      duration: "104 min",
      streaming: ["Netflix", "Amazon Video"]
    }
  ]
};

// Função para obter todos os filmes
function getAllMovies() {
  return Object.values(moviesDatabase).flat();
}

// Função para obter filmes por gênero
function getMoviesByGenre(genre) {
  return moviesDatabase[genre] || [];
}

// Função para buscar filmes
function searchMovies(query) {
  const allMovies = getAllMovies();
  return allMovies.filter(movie => 
    movie.title.toLowerCase().includes(query.toLowerCase()) ||
    movie.genre.toLowerCase().includes(query.toLowerCase()) ||
    movie.director.toLowerCase().includes(query.toLowerCase()) ||
    movie.cast.some(actor => actor.toLowerCase().includes(query.toLowerCase()))
  );
}

// Função para filtrar filmes
function filterMovies(filters) {
  let movies = getAllMovies();
  
  if (filters.genre && filters.genre !== 'all') {
    movies = movies.filter(movie => movie.genre.toLowerCase() === filters.genre.toLowerCase());
  }
  
  if (filters.year && filters.year !== 'all') {
    const yearRange = filters.year.split('-');
    if (yearRange.length === 2) {
      const startYear = parseInt(yearRange[0]);
      const endYear = parseInt(yearRange[1]);
      movies = movies.filter(movie => movie.year >= startYear && movie.year <= endYear);
    }
  }
  
  if (filters.rating && filters.rating !== 'all') {
    const minRating = parseFloat(filters.rating);
    movies = movies.filter(movie => movie.rating >= minRating);
  }
  
  return movies;
}

// Função para obter filme por ID
function getMovieById(id) {
  const allMovies = getAllMovies();
  return allMovies.find(movie => movie.id === parseInt(id));
}

// Função para atualizar avaliação do usuário
function updateUserRating(movieId, rating) {
  const allMovies = getAllMovies();
  const movie = allMovies.find(m => m.id === parseInt(movieId));
  if (movie) {
    movie.userRating = ((movie.userRating * movie.votes) + rating) / (movie.votes + 1);
    movie.votes += 1;
    
    // Salvar no localStorage
    localStorage.setItem('movieRatings', JSON.stringify({
      movieId: movieId,
      rating: movie.userRating,
      votes: movie.votes
    }));
  }
}