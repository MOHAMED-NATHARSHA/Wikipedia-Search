console.log('script loaded');
let mainContainerEl = document.getElementById('mainContainer');
let inputEl = document.getElementById('searchInput');
let searchBtnEl= document.getElementById('searchBtn');
let outputEl = document.getElementById('output');



function displayResults(results) {
    outputEl.textContent = ""; // Clear previous results
    for(let result of results){ 
        
        let title = result.title;
        let snipper = result.snippet;
        let pageId = result.pageid;
        let pageUrl = `https://en.wikipedia.org/?curid=${pageId}`;
        console.log('title:', title);
        console.log('snipper:', snipper);
        console.log('pageId:', pageId);
        
        let searchContainer = document.createElement('div');
        searchContainer.classList.add('output-container');
        outputEl.appendChild(searchContainer);
        
        let titleEl = document.createElement('a');
    
        titleEl.textContent = title;
        titleEl.setAttribute('href', pageUrl);
        titleEl.setAttribute('target', '_blank');
        searchContainer.appendChild(titleEl);
        searchContainer.appendChild(document.createElement('br'));

        let urlEl = document.createElement('a');
        urlEl.textContent = pageUrl;
        urlEl.setAttribute('href', pageUrl);
        urlEl.setAttribute('target', '_blank');
        searchContainer.appendChild(urlEl);
        searchContainer.appendChild(document.createElement('br'));
        let snippetEl = document.createElement('p');
        snippetEl.innerHTML = snipper;
        searchContainer.appendChild(snippetEl);
        searchContainer.appendChild(document.createElement('br'));



    }

} 

function search() {
    let InputValue =  inputEl.value;
    inputEl.textContent = ""; // Clear previous input

    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    let searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${InputValue}&format=json&origin=*&srlimit=10`
    console.log('searchUrl:', searchUrl);
    fetch(searchUrl,options)
    
    .then(function(response) {
        // Check if the response is ok (status code 200)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(function(data) {
        let results = data.query.search;
       displayResults(results);

    })
}

function searchfunction(event){
    let InputValue =  inputEl.value;
    
    if (event.type === "click" && InputValue === "") {
        alert("Please enter a search term");
        return;
        
    }
    if (event.type === "keydown" && event.key === "Enter") {
        // If the Enter key is pressed
        search();

    }
    if (event.type === "click" && InputValue !== "") {
        // If the search button is clicked and input is not empty
        search();
    }
    
}           


inputEl.addEventListener('keydown', searchfunction);
searchBtnEl.addEventListener('click', searchfunction);