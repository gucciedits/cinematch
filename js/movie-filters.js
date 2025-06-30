class MovieFilters {
  constructor() {
    this.currentFilters = {
      genre: 'all',
      year: 'all',
      rating: 'all',
      search: ''
    };
    this.init();
  }

  init() {
    this.createFilterInterface();
    this.bindEvents();
    this.loadMovies();
  }

  createFilterInterface() {
    const filtersContainer = document.createElement('div');
    filtersContainer.className = 'filters-container';
    filtersContainer.innerHTML = `
      <div class="filters-wrapper">
        <div class="search-container">
          <input type="text" id="movie-search" placeholder="Buscar filmes..." class="search-input">
          <div class="search-icon">🔍</div>
        </div>
        
        <div class="filter-group">
          <label for="genre-filter">Gênero:</label>
          <select id="genre-filter" class="filter-select">
            <option value="all">Todos</option>
            <option value="ação">Ação</option>
            <option value="drama">Drama</option>
            <option value="comédia">Comédia</option>
            <option value="ficção científica">Ficção Científica</option>
            <option value="terror">Terror</option>
          </select>
        </div>

        <div class="filter-group">
          <label for="year-filter">Ano:</label>
          <select id="year-filter" class="filter-select">
            <option value="all">Todos</option>
            <option value="2020-2024">2020-2024</option>
            <option value="2010-2019">2010-2019</option>
            <option value="2000-2009">2000-2009</option>
            <option value="1990-1999">1990-1999</option>
            <option value="1980-1989">1980-1989</option>
            <option value="1970-1979">1970-1979</option>
          </select>
        </div>

        <div class="filter-group">
          <label for="rating-filter">Avaliação mínima:</label>
          <select id="rating-filter" class="filter-select">
            <option value="all">Todas</option>
            <option value="4.5">4.5+ estrelas</option>
            <option value="4.0">4.0+ estrelas</option>
            <option value="3.5">3.5+ estrelas</option>
            <option value="3.0">3.0+ estrelas</option>
          </select>
        </div>

        <button id="clear-filters" class="clear-filters-btn">Limpar Filtros</button>
      </div>
    `;

    // Inserir antes do grid de filmes
    const gridPage = document.querySelector('.grid-page');
    if (gridPage) {
      gridPage.insertBefore(filtersContainer, gridPage.firstChild);
    }
  }

  bindEvents() {
    // Busca em tempo real
    const searchInput = document.getElementById('movie-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.currentFilters.search = e.target.value;
        this.debounce(() => this.applyFilters(), 300)();
      });
    }

    // Filtros de seleção
    const genreFilter = document.getElementById('genre-filter');
    const yearFilter = document.getElementById('year-filter');
    const ratingFilter = document.getElementById('rating-filter');

    if (genreFilter) {
      genreFilter.addEventListener('change', (e) => {
        this.currentFilters.genre = e.target.value;
        this.applyFilters();
      });
    }

    if (yearFilter) {
      yearFilter.addEventListener('change', (e) => {
        this.currentFilters.year = e.target.value;
        this.applyFilters();
      });
    }

    if (ratingFilter) {
      ratingFilter.addEventListener('change', (e) => {
        this.currentFilters.rating = e.target.value;
        this.applyFilters();
      });
    }

    // Botão limpar filtros
    const clearBtn = document.getElementById('clear-filters');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        this.clearFilters();
      });
    }
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  applyFilters() {
    let movies = [];

    if (this.currentFilters.search) {
      movies = searchMovies(this.currentFilters.search);
    } else {
      movies = filterMovies(this.currentFilters);
    }

    this.displayMovies(movies);
    this.showFilterResults(movies.length);
  }

  loadMovies() {
    const movies = getAllMovies();
    this.displayMovies(movies);
  }

  displayMovies(movies) {
    // Limpar seções existentes
    const sections = document.querySelectorAll('.grid-page section');
    sections.forEach(section => section.remove());

    if (movies.length === 0) {
      this.showNoResults();
      return;
    }

    // Agrupar filmes por gênero
    const moviesByGenre = {};
    movies.forEach(movie => {
      const genre = movie.genre;
      if (!moviesByGenre[genre]) {
        moviesByGenre[genre] = [];
      }
      moviesByGenre[genre].push(movie);
    });

    // Criar seções para cada gênero
    const gridPage = document.querySelector('.grid-page');
    Object.entries(moviesByGenre).forEach(([genre, genreMovies]) => {
      const section = this.createGenreSection(genre, genreMovies);
      gridPage.appendChild(section);
    });

    // Reativar eventos de like/dislike
    this.bindMovieEvents();
  }

  createGenreSection(genre, movies) {
    const section = document.createElement('section');
    section.id = genre.toLowerCase().replace(/\s+/g, '-');
    
    section.innerHTML = `
      <h2>${genre}</h2>
      <div class="grid-container">
        ${movies.map(movie => this.createMovieCard(movie)).join('')}
      </div>
    `;

    return section;
  }

  createMovieCard(movie) {
    const averageRating = movie.userRating > 0 ? movie.userRating : movie.rating;
    const stars = this.generateStars(averageRating);
    
    return `
      <div class="card" data-movie-id="${movie.id}">
        <div class="movie-poster" onclick="openMovieModal(${movie.id})">
          <img src="${movie.image}" alt="${movie.title}">
          <div class="movie-overlay">
            <div class="movie-info">
              <h3>${movie.title}</h3>
              <p>${movie.year} • ${movie.genre}</p>
              <div class="rating-display">
                ${stars}
                <span class="rating-number">${averageRating.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="movie-actions">
          <div class="rating-stars" data-movie-id="${movie.id}">
            ${this.generateInteractiveStars(movie.id)}
          </div>
          <div class="likes">
            <button class="like" data-movie-id="${movie.id}">👍</button>
            <button class="dislike" data-movie-id="${movie.id}">👎</button>
          </div>
        </div>
      </div>
    `;
  }

  generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let stars = '';
    for (let i = 0; i < fullStars; i++) {
      stars += '<span class="star full">★</span>';
    }
    if (hasHalfStar) {
      stars += '<span class="star half">★</span>';
    }
    for (let i = 0; i < emptyStars; i++) {
      stars += '<span class="star empty">☆</span>';
    }
    
    return stars;
  }

  generateInteractiveStars(movieId) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      stars += `<span class="interactive-star" data-rating="${i}" data-movie-id="${movieId}">☆</span>`;
    }
    return stars;
  }

  bindMovieEvents() {
    // Eventos de like/dislike
    document.querySelectorAll('.like, .dislike').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const movieId = btn.dataset.movieId;
        const isLike = btn.classList.contains('like');
        this.handleLikeDislike(movieId, isLike);
      });
    });

    // Eventos de classificação por estrelas
    document.querySelectorAll('.interactive-star').forEach(star => {
      star.addEventListener('click', (e) => {
        const rating = parseInt(e.target.dataset.rating);
        const movieId = e.target.dataset.movieId;
        this.handleStarRating(movieId, rating);
      });

      star.addEventListener('mouseenter', (e) => {
        this.highlightStars(e.target);
      });

      star.addEventListener('mouseleave', (e) => {
        this.resetStars(e.target.dataset.movieId);
      });
    });
  }

  handleLikeDislike(movieId, isLike) {
    const message = isLike 
      ? 'Você curtiu! Recomendaremos filmes similares.' 
      : 'Você não gostou! Não recomendaremos similares.';
    
    this.showPopup(message);
    
    // Salvar preferência no localStorage
    const preferences = JSON.parse(localStorage.getItem('moviePreferences') || '{}');
    preferences[movieId] = isLike ? 'like' : 'dislike';
    localStorage.setItem('moviePreferences', JSON.stringify(preferences));
  }

  handleStarRating(movieId, rating) {
    updateUserRating(movieId, rating);
    this.showPopup(`Você avaliou este filme com ${rating} estrela${rating > 1 ? 's' : ''}!`);
    
    // Atualizar display da avaliação
    setTimeout(() => {
      this.applyFilters();
    }, 1000);
  }

  highlightStars(targetStar) {
    const rating = parseInt(targetStar.dataset.rating);
    const movieId = targetStar.dataset.movieId;
    const stars = document.querySelectorAll(`[data-movie-id="${movieId}"] .interactive-star`);
    
    stars.forEach((star, index) => {
      if (index < rating) {
        star.textContent = '★';
        star.style.color = '#f3a712';
      } else {
        star.textContent = '☆';
        star.style.color = '#666';
      }
    });
  }

  resetStars(movieId) {
    const stars = document.querySelectorAll(`[data-movie-id="${movieId}"] .interactive-star`);
    stars.forEach(star => {
      star.textContent = '☆';
      star.style.color = '#666';
    });
  }

  showPopup(message) {
    const popup = document.getElementById('popup');
    const popupText = document.getElementById('popup-text');
    
    if (popup && popupText) {
      popupText.textContent = message;
      popup.classList.remove('hidden');
      
      setTimeout(() => {
        popup.classList.add('hidden');
      }, 3000);
    }
  }

  showNoResults() {
    const gridPage = document.querySelector('.grid-page');
    const noResults = document.createElement('div');
    noResults.className = 'no-results';
    noResults.innerHTML = `
      <div class="no-results-content">
        <h3>Nenhum filme encontrado</h3>
        <p>Tente ajustar seus filtros ou buscar por outros termos.</p>
      </div>
    `;
    gridPage.appendChild(noResults);
  }

  showFilterResults(count) {
    let resultInfo = document.querySelector('.filter-results');
    if (!resultInfo) {
      resultInfo = document.createElement('div');
      resultInfo.className = 'filter-results';
      const filtersContainer = document.querySelector('.filters-container');
      filtersContainer.appendChild(resultInfo);
    }
    
    resultInfo.textContent = `${count} filme${count !== 1 ? 's' : ''} encontrado${count !== 1 ? 's' : ''}`;
  }

  clearFilters() {
    this.currentFilters = {
      genre: 'all',
      year: 'all',
      rating: 'all',
      search: ''
    };

    // Resetar inputs
    document.getElementById('movie-search').value = '';
    document.getElementById('genre-filter').value = 'all';
    document.getElementById('year-filter').value = 'all';
    document.getElementById('rating-filter').value = 'all';

    // Remover resultado dos filtros
    const resultInfo = document.querySelector('.filter-results');
    if (resultInfo) {
      resultInfo.remove();
    }

    this.loadMovies();
  }
}