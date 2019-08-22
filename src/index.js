// It might be a good idea to add event listener to make sure this file 
// only runs after the DOM has finshed loading. 

const quotesURL = "http://localhost:3000/quotes?_embed=likes"
const postURL = "http://localhost:3000/likes"
const postQuotes = "http://localhost:3000/quotes"
const jsonify = res => res.json()

const fetchQuotes = () => {
  fetch(quotesURL)
    .then(jsonify)
    .then(resp => renderAllQuotes(resp))
}

const renderQuote = quote => {

  const ul = document.querySelector("#quote-list")
  const li = document.createElement('li')
  li.className = "quote-card"

  const blockquote = document.createElement("blockquote")
  blockquote.className = "blockquote"
  const p = document.createElement('p')
  p.className = "mb-0"
  const footer = document.createElement("footer")
  footer.className = "blockquote-footer"
  const br = document.createElement("br")
  const button = document.createElement("button")
  button.className = "btn-success"
  const btn2 = document.createElement('button')
  btn2.className = "btn-danger"
  const span = document.createElement("span")

  p.innerText = quote.quote
  footer.innerText = quote.author
  button.innerText = `Likes: `
  span.innerText = quote.likes.length
  button.id = `like-${quote.id}`

  btn2.innerText = "Delete"

  ul.append(li)
  blockquote.append(p, footer, br, button, btn2)
  li.append(blockquote)
  button.append(span)

  button.addEventListener("click", (e) => {
    id = parseInt(e.target.id.split("-")[1]);
    updateLikes(id)
    e.target.firstElementChild.innerText = parseInt(e.target.firstElementChild.innerText) + 1
  })
}

let updateLikes = qi => {
  fetch(postURL, {
    method: "POST",
    header: {
      "Content-Type": "application.json"
    },
    body: JSON.stringify({
      quoteId: qi
    })
  })
}
const renderAllQuotes = quotes => {
  quotes.forEach(quote => {
    renderQuote(quote)
  })
}

const captureData = () => {
  const quoteForm = document.querySelector("#new-quote-form")
  const newQuote = document.querySelector("#new-quote")
  const author = document.querySelector("#author")

  quoteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    postNewQuotes();
  })

  const postNewQuotes = () => {
    fetch(postQuotes, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "author": author.value,
        "quote": newQuote.value,
        "likes": []
      })
    }).then(jsonify)
      .then(resp => renderQuote(resp))
  }
}

document.addEventListener("DOMContentLoaded", fetchQuotes(), captureData())