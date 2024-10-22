let c = (n) => document.querySelector(n);
let ca = (n) => document.querySelectorAll(n);

let modalQt = 1

pizzaJson.map((item, index)=>{
    let pizzaItem = c(".models .pizza-item").cloneNode(true);
    //preenche o modelo
    
    pizzaItem.setAttribute('data-key', index) //adicionando o atributo data-key para podenos identificar as pizzas que foram clicadas

    pizzaItem.querySelector(".pizza-item--img img").src = item.img
    pizzaItem.querySelector(".pizza-item--price").innerHTML = `R$ ${item.price[2].toFixed(2)}`
    pizzaItem.querySelector(".pizza-item--name").innerHTML = item.name;
    pizzaItem.querySelector(".pizza-item--desc").innerHTML = item.description;

    //evento ao clique
    pizzaItem.querySelector("a").addEventListener("click", (e)=>{
        e.preventDefault()
        modalQt = 1;
        let key = pizzaItem.getAttribute('data-key') //pego a pizza clicada
        
        c('.pizzaWindowArea').style.opacity = 0
        c('.pizzaWindowArea').style.display = 'flex'

        setTimeout(()=>{ //timout para aparecer a animação
            c('.pizzaWindowArea').style.opacity = 1
        }, 500)

        //preencher o modelo de acordo com a pizza clicada 
        c('.pizzaBig img').src = pizzaJson[key].img;
        c(".pizzaInfo h1").innerHTML = pizzaJson[key].name;
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        c('.pizzaInfo--actualPrice').innerHTML =`R$ ${pizzaJson[key].price[2].toFixed(2) }`;

        //removendo o tamanho selecionado anteriormente e definindo como garnde
        c('.pizzaInfo--size.selected').classList.remove('selected'); 
        ca('.pizzaInfo--size').forEach((size, sizeIndex)=>{
            if (sizeIndex == 2){
                size.classList.add('selected')
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        })
               


})
    //add na tela
    c(".pizza-area").append(pizzaItem)

})

//eventos
 function closeModal(){
    c('.pizzaWindowArea').style.opacity = 0
    setTimeout(()=>{ //timout para aparecer a animação
        c('.pizzaWindowArea').style.display = 'none'
          
    }, 500)
 }

 ca('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((button)=>{
    button.addEventListener('click', closeModal)
 })