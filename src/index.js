// Define global variables for later use
const ramenMenuDiv = document.getElementById("ramen-menu")
const detailImg = document.querySelector("#ramen-detail > .detail-image")
const detailName = document.querySelector("#ramen-detail > .name")
const detailRestaurant = document.querySelector("#ramen-detail > .restaurant")
const detailsRating = document.getElementById("rating-display")
const detailsComment = document.getElementById("comment-display")
const ramenForm = document.getElementById("new-ramen")


// Callbacks

const handleClick = (ramen, event) => { 
    detailImg.src = ramen.image
    detailName.innerText = ramen.name
    detailRestaurant.innerText = ramen.restaurant
    detailsRating.innerText = ramen.rating
    detailsComment.innerText = ramen.comment
}

const displayRamen = (ramenObj) => { 
    // create img tag
    const ramenImg = document.createElement("img")
    // set img src
    ramenImg.src = ramenObj.image
    // set an alt attribute - OPTIONAL
    ramenImg.alt = ramenObj.name
    // set a class - OPTIONAL
    ramenImg.classList.add("image-slider")
    // when invoking a callback with a specific argument, wrap the function invocation within an anonymous function
    ramenImg.addEventListener("click", (event) => handleClick(ramenObj, event))
    // append img to div
    ramenMenuDiv.appendChild(ramenImg)
}

const handleSubmit = (event) => {
    event.preventDefault()
    const name = event.target.name.value
    const restaurant = event.target.restaurant.value
    const image = event.target.image.value
    const rating = event.target.rating.value
    const comment = document.getElementById("new-comment").value
    const newRamen = {name, restaurant, image, rating, comment}
    debugger
    event.target.reset()
    displayRamen(newRamen)
}

// Fetch function

const fetchData = () => { 
    fetch("http://localhost:3000/ramens")
    .then(response => response.json())
    .then(ramens => ramens.forEach(displayRamen)) // foreach automatically passes the current ramen we iterate over to the callback
    .catch(error => alert(error))
}

// Start the logic
ramenForm.addEventListener("submit", handleSubmit)
fetchData()
