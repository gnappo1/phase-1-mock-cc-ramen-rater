// Global getter functions
const ramenMenu = () => document.getElementById("ramen-menu")
const ramenDetails = () => document.getElementById("ramen-detail")
const ramenDetailsImg = () => document.querySelector("#ramen-detail > img")
const ramenDetailsName = () => document.querySelector("#ramen-detail > h2")
const ramenDetailsRest = () => document.querySelector("#ramen-detail > h3")
const ramenDetailsRating = () => document.querySelector("#rating-display")
const ramenDetailsComment = () => document.querySelector("#comment-display")
const newRamenForm = () => document.querySelector("#new-ramen")

// callbacks
const handleClick = (ramen) => { 
    ramenDetailsImg().src = ramen.image
    ramenDetailsName().innerText = ramen.name
    ramenDetailsRest().innerText = ramen.restaurant
    ramenDetailsRating().innerText = ramen.rating
    ramenDetailsComment().innerText = ramen.comment
}

const displayRamenImage = (ramenObj) => { 
    const ramenImg = document.createElement("img")
    ramenImg.src = ramenObj.image
    ramenImg.alt = ramenObj.name
    ramenImg.addEventListener("click", () => handleClick(ramenObj))
    ramenMenu().appendChild(ramenImg)
}

const handleSubmit = (e) => { 
    e.preventDefault()
    const name = e.target.name.value
    const restaurant = e.target.restaurant.value
    const image = e.target.image.value
    const rating = e.target.rating.value
    const newComment = e.target.querySelector("#new-comment").value
    const newRamen = {name, restaurant, image, rating, comment: newComment}
    displayRamenImage(newRamen)
    e.target.reset()

    // Optimistic rendering
    
    fetch("http://localhost:3000/ramens", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newRamen)
    })
}

// fetching function

const fetchData = () => {
    fetch("http://localhost:3000/ramens")
    .then(resp => resp.json())
    .then(data => data.forEach(displayRamenImage))
}

// start logic
newRamenForm().addEventListener("submit", handleSubmit)
fetchData()