class MovieModal {
  constructor() {
    this.createModal();
    this.bindEvents();
  }

  createModal() {
    const modal = document.createElement('div');
    modal.id = 'movie-modal';
    modal.className = 'movie-modal hidden';
    modal.innerHTML = `
      <div class="modal-overlay">
        <div class="modal-content">
          <button class="modal-close">&times;</button>
          <div class="modal-body">
            <div class="modal-poster">
              <img id="modal-image" src="" alt="">
            </div>
            <div class="modal-info">
              <h2 id="modal-title"></h2>
              <div class="modal-meta">
                <span id="modal-year"></span>
                <span id="modal-duration"></span>
                <span id="modal-genre"></span>
              </div>
              <div class="modal-rating">
                <div class="rating-stars-display" id="modal-rating-stars"></div>
                <span id="modal-rating-number"></span>
              </div>
              <div class="streaming-platforms" id="modal-streaming"></div>
              <p id="modal-description"></p>
              
              <div class="modal-details">
                <div class="detail-row">
                  <strong>Direção:</strong>
                  <span id="modal-director"></span>
                </div>
                <div class="detail-row">
                  <strong>Elenco:</strong>
                  <span id="modal-cast"></span>
                </div>
              </div>

              <div class="modal-actions">
                <button class="add-to-list-btn">+ Minha Lista</button>
                <div class="modal-rating-section">
                  <span>Sua avaliação:</span>
                  <div class="user-rating-stars" id="modal-user-rating"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
  }

  bindEvents() {
    const modal = document.getElementById('movie-modal');
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');

    closeBtn.addEventListener('click', () => this.closeModal());
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        this.closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        this.closeModal();
      }
    });
  }

  openModal(movieId) {
    const movie = getMovieById(movieId);
    if (!movie) return;

    this.populateModal(movie);
    
    const modal = document.getElementById('movie-modal');
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    // Animação de entrada
    setTimeout(() => {
      modal.classList.add('show');
    }, 10);
  }

  closeModal() {
    const modal = document.getElementById('movie-modal');
    modal.classList.remove('show');
    
    setTimeout(() => {
      modal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }, 300);
  }

  populateModal(movie) {
    document.getElementById('modal-image').src = movie.image;
    document.getElementById('modal-image').alt = movie.title;
    document.getElementById('modal-title').textContent = movie.title;
    document.getElementById('modal-year').textContent = movie.year;
    document.getElementById('modal-duration').textContent = movie.duration;
    document.getElementById('modal-genre').textContent = movie.genre;
    document.getElementById('modal-description').textContent = movie.description;
    document.getElementById('modal-director').textContent = movie.director;
    document.getElementById('modal-cast').textContent = movie.cast.join(', ');

    // Rating
    const averageRating = movie.userRating > 0 ? movie.userRating : movie.rating;
    document.getElementById('modal-rating-stars').innerHTML = this.generateStars(averageRating);
    document.getElementById('modal-rating-number').textContent = `${averageRating.toFixed(1)}/5`;

    // Streaming platforms
    const streamingContainer = document.getElementById('modal-streaming');
    streamingContainer.innerHTML = movie.streaming.map(platform => 
      `<span class="streaming-badge">${platform}</span>`
    ).join('');

    // User rating
    this.setupUserRating(movie.id);
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

  setupUserRating(movieId) {
    const userRatingContainer = document.getElementById('modal-user-rating');
    let stars = '';
    
    for (let i = 1; i <= 5; i++) {
      stars += `<span class="user-star" data-rating="${i}" data-movie-id="${movieId}">☆</span>`;
    }
    
    userRatingContainer.innerHTML = stars;

    // Bind events for user rating
    userRatingContainer.querySelectorAll('.user-star').forEach(star => {
      star.addEventListener('click', (e) => {
        const rating = parseInt(e.target.dataset.rating);
        updateUserRating(movieId, rating);
        this.updateUserStarDisplay(movieId, rating);
        
        // Show feedback
        const feedback = document.createElement('div');
        feedback.className = 'rating-feedback';
        feedback.textContent = `Avaliado com ${rating} estrela${rating > 1 ? 's' : ''}!`;
        userRatingContainer.appendChild(feedback);
        
        setTimeout(() => {
          feedback.remove();
        }, 2000);
      });

      star.addEventListener('mouseenter', (e) => {
        this.highlightUserStars(e.target);
      });

      star.addEventListener('mouseleave', () => {
        this.resetUserStars(movieId);
      });
    });
  }

  highlightUserStars(targetStar) {
    const rating = parseInt(targetStar.dataset.rating);
    const stars = targetStar.parentElement.querySelectorAll('.user-star');
    
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

  resetUserStars(movieId) {
    const stars = document.querySelectorAll(`#modal-user-rating .user-star`);
    stars.forEach(star => {
      star.textContent = '☆';
      star.style.color = '#666';
    });
  }

  updateUserStarDisplay(movieId, rating) {
    const stars = document.querySelectorAll(`#modal-user-rating .user-star`);
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
}

// Função global para abrir modal
function openMovieModal(movieId) {
  if (window.movieModal) {
    window.movieModal.openModal(movieId);
  }
}