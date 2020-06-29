function renderMovies(title,rating, id) {

  //declare empty variable to hold HTML that is being dynamically created
  return `
    <div class="card" style="width: 18rem; color: white; background-color: black">
      <div class="card-body">
      <h5 class="card-title">${title}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${rating}</h6>
      <button id="${id}" class="edit-movie" type="button" class="btn btn-secondary">Edit</button>
      </div>
    </div>
  `;



} //renderMovies()

renderMovies(); //intial call

function getMovies() {
  return fetch('/api/movies')
      .then(response => response.json());
}

function addMovie() {
  let movieTitle = $('#new-movie-title').val();
  let movieRating = $('#new-movie-rating').val();
  console.log(movieTitle);
  let newMovie = {
    title: movieTitle,
    rating: movieRating,
  };
  const url = '/api/movies';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newMovie),
  };
  fetch(url, options)
      .then()
      .catch(function() {
        console.log("Hey we couldn't add a movie or update the movies.")
      });
  renderMovies();
}

function editMovie(movieId) {

  console.log("Edit movie ran");
  let movieTitle = $('#edit-movie-title').val();
  let movieRating = $('#edit-movie-rating').val();
  let editMovie = {
    title: movieTitle,
    rating: movieRating,
    id: movieId
  };
  const url = `/api/movies/${movieId}`;
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(editMovie),
  };
  fetch(url, options)
      .then((title, rating, id) => {$('.container').html(renderMovies(title, rating, id))})
      .catch(function() {
        console.log("Hey we couldn't edit a movie or update them.");

      });
        renderMovies();
}

// EDIT MOVIES MODAL
getMovies().then((movies) => {
  let dynamicHTML = "";
  movies.forEach(({title, rating, id}) => {
    dynamicHTML += renderMovies(title, rating, id);
  });


    let movieId;
  $(".container").html(dynamicHTML);

  $(".edit-movie").on('click', function(){
    movieId = $(this).prop('id');
    $('#myModal').modal('toggle');
  });

  $("#save-changes").on('click', function() {
    editMovie(movieId);
  })
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});


//DYNAMICALLY CREATES HTML BASED ON WHAT IS IN db.json


//ADDS A MOVIE TO DATABASE ON CLICK


$('#myButton').on("click", function() {
  $('#myModal1').modal('toggle');

  $('#add-movie-btn').on('click',function () {
    addMovie();
  })
});