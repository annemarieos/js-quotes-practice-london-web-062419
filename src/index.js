// It might be a good idea to add event listener to make sure this file 
// only runs after the DOM has finshed loading. 

const quotesURL = "http://localhost:3000/quotes?_embed=likes"
const postURL = "http://localhost:3000/likes"
const jsonify = res => res.json()

const fetchQuotes = () => {
  fetch(quotesURL)
  .then(jsonify)
  .then(renderAllQuotes)
}

const renderAllQuotes = allQuotes => {
  allQuotes.map(saying => renderQuoteCard(saying))
}

const renderQuote = saying => {
  const quotesContainer = document.querySelector("new-quote-form")
  saying
}

const renderQuoteCard = saying => {

  const ul = document.querySelector('ul')
  const li = document.createElement('li');
  li.className = "quote-card";

  const blockquote = document.createElement('blockquote')
  blockquote.className = "blockquote"

  const p  = document.createElement('p')
  p.className =  "mb-0"

  const footer = document.createElement("footer");
  footer.className = "blockquote-footer";

  const br = document.createElement('br');

  const btn1 = document.createElement("button");
  btn1.className = "btn-success";
  btn1.id = saying.id

  const span = document.createElement('span')

  const btn2 = document.createElement("button");
  btn2.className = "btn-danger";

  p.innerText = saying.quote;
  footer.innerText = saying.author;
  btn1.innerText = `${saying.likes.length} Like(s)`
  btn2.innerText = "Delete"

  btn1.addEventListener("click", e => {
    e.target.innerText = `${parseInt(e.target.innerText[0]) + 1} Like(s)`
    postData(parseInt(btn1.id))
  });

  btn2.addEventListener("click", e => {
    deleteQuote(saying.id, li)
    .then(() => li.remove())
    .catch(error => console.error(error))
  })

  li.append(blockquote)
  blockquote.append(p, footer, br, btn1, span, btn2)
  ul.append(li)
};

function deleteQuote(quoteId) {
  return fetch(`${postURL}/${quoteId}`, {method: "DELETE"}) 
    .then(jsonify)
  }

function postData(quoteId) {
  return fetch(postURL, {
    method: "POST", 
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      quoteId: quoteId
    })
  })
}

function init() {
  fetchQuotes()
}

init()