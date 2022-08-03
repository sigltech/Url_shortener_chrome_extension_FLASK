const form = document.querySelector('#form');
const formSubmit = document.querySelector('#form-submit');
const shortenedUrl = document.querySelector('#shortened-url');
const inputEl = document.querySelector('#input-el');


// *********** GET REQUEST ***********

const fetchGetData = async (url) => {

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'application-type': 'application/json',
            'Access-Control-Request-Headers': 'Content-Type, Authorization'
        }
    }

    const response = await fetch(url, options);
    const data = await response.json();
    return data
}


// *********** render URLS on page ***********

const renderUrls = () => {
    // Get request
    const url = "http://127.0.0.1:5000";

    // use fetchGetData to get data from server
    fetchGetData(url)
    .then(data => {
        console.log(data);
        for(let i=0; i<data.length; i++){
            console.log(data[i]);
            shortenedUrl.innerHTML += 
            `
            <div class="url-container">
            <a key="${i}" href="${data[i].original_url}">
                ${data[i].shortened_url}
            </a>
            <button id='button${i}'>Click to copy</button>
            </div>
            `;
        }
    })
}
// *********** call renderUrls function ***********
renderUrls();

// *********** POST REQUEST ***********

const fetchPostData = async (url, data) => {
    // e.preventDefault();
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'application-type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const respData = await response.json();
    return respData
}

// *********** generate random URL ending with random number ***********

const randomNumber = () => {
    rand = Math.floor(Math.random() * 1000000)
    return rand;
}

// *********** submit form ***********

form.addEventListener('submit', (e) => {
    e.preventDefault();  

    // target original url input element
    const inputUrl = inputEl.value;

    // add random number to end of URL
    const shortUrl = `http://localhost:5500/${randomNumber()}`;
    
    if (inputUrl.startsWith('http://') || inputUrl.startsWith('https://')) {
        const data = {
            original_url: `${inputUrl}`,
            shortened_url: shortUrl
            }
        fetchPostData("http://127.0.0.1:5000", data) 
    } else {
        const data = {
            original_url: `https://${inputUrl}`,
            shortened_url: shortUrl
            }
        fetchPostData("http://127.0.0.1:5000", data)  
    }
    // use fetchPostData to POST data to server
      
})

// *********** Click to copy to clipboard button ***********
shortenedUrl.addEventListener('click', (e) => {
    navigator.clipboard.writeText(shortenedUrl.innerHTML);
})
