import fec from './fonction.js'
import {couleurs} from './fonction.js'



const section = document.querySelector('section')

function reduit(titre = '') {
    if (titre.length>23){
        return titre.slice(0,23)+'...'
    }
    return titre
}

// ajouter le comment a la page
function makeCom(name,cmt,pos = false) {
    const div = document.createElement('div')
    const color = couleurs()
    name = reduit(name)
    div.innerHTML = '<h2><span style="color:'+color+';">@</span>'+name+'</h2><p>'+cmt+'</p>'
    if (pos){
        pos = section.querySelector('div')
        section.insertBefore(div,pos)
    }
    else{
        section.appendChild(div)
    }
    
}

let page = 1
let url = 'https://jsonplaceholder.typicode.com/comments?_limit=5'
// metttre a jour l'url
function url_main(url,page) {
    const name = new URL(url)
    name.searchParams.set('_page',page)
    return name.toString()
}
url = url_main(url,page)
const load = document.querySelector('.load')
const h = document.querySelector('header')
const ob = new IntersectionObserver(el => {
    for(let i of el){
        if (i.isIntersecting){
            fec(url)
                .then(r => {
                    if(r){
                        for(let i of r)
                        {makeCom(i.email,i.body)}
                        page++
                        url = url_main(url,page)
                    }
                    else{
                        load.style.display = 'none'
                        ob.unobserve(load)
                    }
                }
            )
        }

    }
})

ob.observe(load)


const form = document.querySelector('form')
form.addEventListener('submit', e =>{e.preventDefault()} )
form.querySelector('button').onclick = ()=>{
    const forms = new FormData(form)
    const pseuso = forms.get('pseudo')
    const cmt = forms.get('commentaire')
    if (pseuso){
        if (cmt){
            makeCom(pseuso,cmt,true)
            form.reset()
        }
    }

}
const pl_art = document.querySelector('article button')
const article = document.querySelector('article')

function makeArt(titre,body) {
    const div = document.createElement('div')
    div.setAttribute('class',"arts")
    article.insertBefore(div,pl_art)
    div.innerHTML = '<h1>'+titre+'</h1>\n<p>'+body+'</p>'
}

let url1 = 'https://jsonplaceholder.typicode.com/posts?_limit=3'
let page1 = 1
url1 = url_main(url1,page1)
pl_art.onclick = ()=>{
    fec(url1)
    .then(r => {
        if(r){
            for(let i of r){makeArt(i.title,i.body)}
            url1 = url_main(url1,page1)
        }
    })
}

