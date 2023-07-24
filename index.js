const main = document.querySelector(".main")
const add = document.querySelector('img')
const submit = document.querySelector("button")
const all = document.querySelector('.inputs')
const fetchss = document.querySelector('.fetchCon')
const inputTitle = document.querySelector('.tilte')
const inputBody = document.querySelector('.body')
const error = document.querySelector(".error")
const adderror = document.querySelector(".adderror")
const dlerror = document.querySelector(".dlerror")
const added = document.querySelector(".added")

// get datas in the server
fetch("http://localhost:3000/posts")
.then(data => data.json())
.then(datas => {

    let pTag =  document.createElement("p")
    pTag.innerText = "Notes to be added"
    adderror.append(pTag)
    setTimeout(() => {
        adderror.remove(pTag)
    }, 1000);


        datas.map((lists) => {

        let box = document.createElement("div")
        box.setAttribute("class", "card")

        let h1 = document.createElement("h2")
        let h3 = document.createElement("h4")

        let edit = document.createElement('button')
        edit.setAttribute("class","editbtn")
        edit.setAttribute("id", lists.id)
        edit.innerHTML = "Edit"

        let dlte = document.createElement('button')
        dlte.setAttribute("id", lists.id)
        dlte.setAttribute("class","deletebtn")
        dlte.innerHTML = "Delete"

        let date = document.createElement("p")
        date.setAttribute("class","dates")
        date.innerText = new Date().toLocaleString()
        date.style.color = "black"

        h1.innerText = lists.title
        h3.innerText = lists.body

        box.append(h1)
        box.append(h3)
        box.append(dlte)
        box.append(edit)
        box.append(date)
        fetchss.append(box)

        dlte.addEventListener("click", (e) => {
            let deletetarget = e.target.id;
            fetch("http://localhost:3000/posts/"+deletetarget, {
            method: 'DELETE',
            headers: { 
                'Content-type': 'application/json; charset=UTF-8',
            },
            // window.location.reload
        })
            let dlvalid = document.createElement("p")
            dlvalid.innerText = "Your Note to be Deleted !"
            dlerror.append(dlvalid)
            setTimeout(() => {
                dlerror.remove()
            },1000);

            window.location.reload()

    })

    edit.addEventListener("click",(e)=>{
        submit.innerText = "update"
        let targetID = e.target.id
        fetch(`http://localhost:3000/posts/?id=${targetID}`)
        .then(datad => datad.json())
        .then(datass => {
                all.classList.add("active")

                inputTitle.value = datass[0].title
                inputBody.value = datass[0].body

        })
        submit.addEventListener("click",(e)=>{

            if(e.target.innerText == "update"){
                window.location.reload()
                fetch("http://localhost:3000/posts/"+targetID,{
                    method:"PUT",
                    body: JSON.stringify({
                        "title":inputTitle.value,
                        "body":inputBody.value,

                    }),
                    headers:{'content-type':'application/json'},

                })
            }
    })

    })
})




add.addEventListener("click", () => {
    all.classList.add("active")
    if(all.classList.add = "activa"){
        add.style.display = "none"
        main.style.display = "none"
    }
    else{
        add.style.display = "block"
        main.style.display = "none"
    }
})


submit.addEventListener("click", () => {
    if(submit.innerText == "submit"){
        if(inputTitle.value == "" || inputBody.value == ""){
            let valid = document.createElement("h3")
            valid.innerText = "Please Add Name And Title"
            error.append(valid)
    }
        else{
            // added.classList.add("active")
            post()
            window.location.reload()
    }
    }

})


function post(){
    fetch('http://localhost:3000/posts', {

    method: 'POST',
    body: JSON.stringify({

        title: inputTitle.value,
        body: inputBody.value,
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    }
})
all.classList.remove("active")
}
})