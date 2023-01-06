function showError(message) {
    var err = document.querySelector("#error-msg");
    err.classList.remove("hidden");
    err.innerHTML = message;
}

 function loadUniversityInfo() 
 {
    
    var tempInputUni = document.getElementById("inputUni").value;
    console.log(tempInputUni)
    var url = `http://universities.hipolabs.com/search?country=${tempInputUni}`;
    var xhr = new XMLHttpRequest();

    xhr.onload = function() {
        var universityContainer = document.getElementById("university-container")
        universityContainer.innerHTML = "";
        try {
            var response = JSON.parse(this.responseText);
            if(Object.keys(response).length !== 0)
            {
                var searchResultTitle = document.createElement("h3");
                searchResultTitle.innerHTML = `About ${Object.keys(response).length} results`;
                universityContainer.appendChild(searchResultTitle);

                response.forEach(element => {
                    console.log(element.name);
                    var eachUniversity = document.createElement("div");
                    eachUniversity.classList.add("eachUniversity")

                    var eachUniversityInner = document.createElement("p");
                    var universityLink = document.createElement('a');
                    universityLink.setAttribute('href',element.web_pages[0]);
                    universityLink.innerHTML = element.web_pages[0];
                    eachUniversityInner.innerHTML = element.name;

                    eachUniversity.appendChild(eachUniversityInner);
                    eachUniversity.appendChild(universityLink)
                    universityContainer.appendChild(eachUniversity);
                });
            }
            else
            {
                showError("No universities Found!");
            }
            
        } catch(e) {
            showError("Unable to load University Info");
        }
    };

    xhr.open("GET", url);
    xhr.send();
 }


 var btnLoad = document.querySelector("#btn-load");
 btnLoad.addEventListener("click", loadUniversityInfo);
