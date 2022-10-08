const $search = document.getElementById("search"),
$main = document.querySelector(".grid"),
$fragment = document.createDocumentFragment()

$search.addEventListener("keypress", e=>{
    if(e.key === "Enter"){
        e.preventDefault();
        cleanImages()
        const buscado = $search.value
        let buscadoRe = buscado.replace(/\s/g, '+')
        getImages(buscadoRe)
    }
})

function getImages(buscadoRe,buscado){
    const url = `https://pixabay.com/api/?key=30420976-3858ae9f49458b75707b58c85&q=${buscadoRe}&image_type=photo&lang=es&pretty=true`
    console.log(url)
    fetch(url)
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(json => {
        console.log(json)
        // $fetch.innerHTML = json
        json.hits.forEach(ele => {
            const $div = document.createElement("div"),
            $h3 = document.createElement("h3"),
            $img = document.createElement("img"),
            $imgUser = document.createElement("img"),
            $divUser = document.createElement("div")
            $img.setAttribute("src", `${ele.largeImageURL}`)
            $img.setAttribute("alt", `Imagen de ${buscado}`)
            $img.setAttribute("title", `Imagen de ${buscado}`)
            $img.classList.add("imgMain")

            $imgUser.setAttribute("src", `${ele.userImageURL}`)
            $imgUser.setAttribute("alt", `Imagen de ${ele.user}`)
            $imgUser.setAttribute("title", `Imagen de ${ele.user}`)
            $imgUser.setAttribute("width", "24")
            $imgUser.setAttribute("heigth", "24")

            $div.classList.add("item")
            $divUser.classList.add("userContent")
            let random = Math.floor(Math.random()*3)
            if(random === 1) $div.classList.add("small")
            if(random === 2) $div.classList.add("medium")
            if(random === 3) $div.classList.add("large")

            $h3.innerText = ele.user
            $h3.classList.add("subtext")

            $divUser.appendChild($imgUser)
            $divUser.appendChild($h3)
            $div.appendChild($img)
            $div.appendChild($divUser)
            $fragment.appendChild($div)
        });

        $main.appendChild($fragment)
    })
    .catch(err =>{
        let message = err.statusText ||'ocurrió un error'
        $main.innerHTML = `Error ${err.status}: ${message}`
    })
}

document.addEventListener("DOMContentLoaded", e=>{
    getImages("universe", "universe")
})


function cleanImages(){
    $main.innerHTML = ""
}

