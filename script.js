
const searchbar = document.getElementById('searchbar')
searchbar.addEventListener('input', inputOnSearchbar)
searchbar.addEventListener('blur', function(e){
    searchbar.value = ''
    inputOnSearchbar(e)
})

const form = document.getElementById('form1')

const submitInput = document.getElementById("input")

//ubacaj
const submitBtn = document.getElementById("submit-btn")
submitBtn.addEventListener("click", submit)

const container = document.getElementById('container')

// izbacaj
const ul = document.getElementById("list")

ul.addEventListener("click", clickOnUl)
fetchItems()

const infoElementi = alert('trenutno nema elemenata','primary')
showIfChildren(ul)



//localStorage.clear()

//declarations of functions

function showIfChildren(el){
    let tempParent = el.parentNode

    if(el.children.length === 0){
        tempParent.insertBefore(infoElementi,el)
        el.innerHTML = ''
        el.style.display = 'none'
    }
    else{
        
        try{
            tempParent.removeChild(infoElementi)
        }catch(err){
            
        }

        el.style.display = 'inherit'
    }
}

function submit(e) {
    e.preventDefault()
    
    if(submitInput.value != ''){
        let itemText = submitInput.value
        

        ul.innerHTML += `
        <div class="el-container">
            <li class="element">${itemText}</li>
            <button type="button" class="btn btn-danger ls-btn"id="delete-button"><i class="far fa-times-circle" id="icon-delete"></i></button>                    
        </div>
        `
        submitInput.value = ''

        updateLocalStorage()
        showIfChildren(ul)

    }
    else{
        let alert1 = alert('pisi nesto majmunu', 'danger', 'alert')

        if(container.children.namedItem('alert') === null){
            container.insertBefore(alert1,form)
            setTimeout(() => {
                
                container.removeChild(alert1);
            }, 1500);
        }
    }
    
}

function alert(message, type, id){
    let newAlert = document.createElement('div')
    newAlert.className=`alert alert-${type} mt-2 ls-alert`
    newAlert.setAttribute('id',id)
    newAlert.textContent=`${message}`
    return newAlert
}

function clickOnUl(e){
    deleteItem(e)  
    updateLocalStorage()
    editText(e)
    
    showIfChildren(ul)
}

function deleteItem(e){
    deleteBtnArray = document.querySelectorAll('#delete-button')
    let indexForDeleting = -1
    for(let i = 0;i < deleteBtnArray.length;i++){
        if(deleteBtnArray[i] === e.target){
            indexForDeleting = i
            break
        }
    }
    if(indexForDeleting != -1){
        let item = ul.children[indexForDeleting]
        ul.removeChild(item)
        return
    }

    deleteIconArray = document.querySelectorAll('#icon-delete')
    for(let i = 0;i < deleteIconArray.length;i++){
        if(deleteIconArray[i] === e.target){
            indexForDeleting = i
            break
        }
    }

    if(indexForDeleting != -1){
        let item = ul.children[indexForDeleting]
        ul.removeChild(item)
    }

    
}
function editText(e){

    let editIconArray = document.querySelectorAll('.element')
    let indexForDeleting = -1
    for(let i = 0;i < editIconArray.length;i++){
        if(editIconArray[i] === e.target){
            indexForDeleting = i
            break
        }
    }

    if(indexForDeleting != -1){
        let item = ul.children[indexForDeleting]

        const tempInput = document.createElement('input')
        tempInput.type = 'text'
        tempInput.placeholder = 'Insert Edit'
        tempInput.className = 'temporary-input'


        ul.children[indexForDeleting].children[0].style.display = 'none'
        ul.children[indexForDeleting].insertBefore(tempInput, item.children[1])

        tempInput.focus()
        
        tempInput.addEventListener('blur', function(e){
            item.children[0].style.display = 'inherit'
            item.removeChild(tempInput)

                       
        })

        tempInput.addEventListener('keydown', function(e){
            if(e.key === 'Enter' && tempInput.value != ''){
                item.children[0].textContent = tempInput.value
                item.children[0].style.display = 'inherit'
                try{
                    item.removeChild(tempInput)
                }catch(err){
                    
                }
                updateLocalStorage()
                
                
            }
        })
        
    }
    

}

function inputOnSearchbar(e){
    
    
    for(let i = 0;i<ul.children.length;i++){        
        if(!(ul.children[i].children[0].textContent.toUpperCase().includes(searchbar.value.toUpperCase()))){
            ul.children[i].style.display = 'none'
            
        }
        else{
            ul.children[i].style.display = 'flex'
        }
    }
    
}

function updateLocalStorage(){
    localStorage.clear()
    
    localStorage.setItem('inner-html',ul.innerHTML)
}
function fetchItems(){
    ul.innerHTML = localStorage.getItem('inner-html')
}

