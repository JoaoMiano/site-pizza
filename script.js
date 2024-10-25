let c = (n) => document.querySelector(n);
let ca = (n) => document.querySelectorAll(n);

let modalQt = 1
let cart = []
let modalKey = 0;

pizzaJson.map((item, index) => {
    let pizzaItem = c(".models .pizza-item").cloneNode(true);
    //preenche o modelo

    pizzaItem.setAttribute('data-key', index) //adicionando o atributo data-key para podenos identificar as pizzas que foram clicadas

    pizzaItem.querySelector(".pizza-item--img img").src = item.img
    pizzaItem.querySelector(".pizza-item--price").innerHTML = `R$ ${item.price[2].toFixed(2)}`
    pizzaItem.querySelector(".pizza-item--name").innerHTML = item.name;
    pizzaItem.querySelector(".pizza-item--desc").innerHTML = item.description;

    //evento ao clique
    pizzaItem.querySelector("a").addEventListener("click", (e) => {
        e.preventDefault()
        modalQt = 1;
        let key = pizzaItem.getAttribute('data-key') //pego a pizza clicada
        modalKey = key
        c('.pizzaInfo--qt').innerHTML = modalQt

        c('.pizzaWindowArea').style.opacity = 0
        c('.pizzaWindowArea').style.display = 'flex'

        setTimeout(() => { //timout para aparecer a animação
            c('.pizzaWindowArea').style.opacity = 1
        }, 500)

        //preencher o modelo de acordo com a pizza clicada 
        c('.pizzaBig img').src = pizzaJson[key].img;
        c(".pizzaInfo h1").innerHTML = pizzaJson[key].name;
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price[2].toFixed(2)}`;

        //removendo o tamanho selecionado anteriormente e definindo como garnde
        c('.pizzaInfo--size.selected').classList.remove('selected');
        ca('.pizzaInfo--size').forEach((size, sizeIndex) => {
            if (sizeIndex == 2) {
                size.classList.add('selected')
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        })


    })
    //add na tela
    c(".pizza-area").append(pizzaItem)

})

//eventos
function closeModal() {
    c('.pizzaWindowArea').style.opacity = 0
    setTimeout(() => { //timout para aparecer a animação
        c('.pizzaWindowArea').style.display = 'none'

    }, 500)
}

//botão de cancelar mobile e pc
ca('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((button) => {
    button.addEventListener('click', closeModal)
})

//botões de aumentar e diminuir a quantidade
c('.pizzaInfo--qtmais').addEventListener('click', () => {
    modalQt++
    c('.pizzaInfo--qt').innerHTML = modalQt
})

c('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if (modalQt > 1) {
        modalQt--
        c('.pizzaInfo--qt').innerHTML = modalQt
    }

})

//alterar o tamanho
ca('.pizzaInfo--size').forEach((size, sizeIndex) => {
    size.addEventListener('click', (e) => {
        c('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected')

        //alterando o valor
        let priceIndex = c('.pizzaInfo--size.selected').getAttribute('data-key')
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[modalKey].price[priceIndex].toFixed(2)}`

    })
})

//add ao carrinho
c('.pizzaInfo--addButton').addEventListener('click', () => {
    let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'));
    let identifier = `${pizzaJson[modalKey].id}@${size}`

    let key = cart.findIndex(item => item.identifier == identifier)

    if (key > -1) {
        cart[key].qt += modalQt
        console.log(cart)

    } else {
        cart.push({
            id: pizzaJson[modalKey].id,
            identifier,
            pizza: modalKey,
            size,
            qt: modalQt,

        })
    }
    closeModal()
    updateCart()

})

//exibição do carrinho
function updateCart() {
    if (cart.length > 0) {
        c('aside').classList.add('show')

        c('.cart').innerHTML = ''

        let subtotal = 0
        let desconto = 0
        let total = 0 

        for (let i in cart) {
            let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id)
            let cartItem = c('.cart--item').cloneNode(true)
            let sizeName;

            subtotal += pizzaItem.price[cart[i].size] * cart[i].qt
            

            switch (cart[i].size) {
                case 0:
                    sizeName = '(P)'
                    break

                case 1:
                    sizeName = '(M)'
                    break

                case 2:
                    sizeName = '(G)'
                    break
            }

            let pizzaName = `${pizzaItem.name} ${sizeName}`

            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName
            cartItem.querySelector('img').src = pizzaItem.img
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt

            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                cart[i].qt++
                subtotal += (pizzaItem.price[cart[i].size] * cart[i].qt - pizzaItem.price[cart[i].size])
                
                updateCart()
            })

            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                if (cart[i].qt > 1) {
                    cart[i].qt--
                    subtotal = subtotal - pizzaItem.price[cart[i].size]
                    
                }else{
                    cart.splice(i, 1)
                }
                
                
                updateCart()
            })

            c('.cart').append(cartItem)
        }
        //calculo do desconto e total
        desconto = subtotal * 0.1
        total = subtotal - desconto

        c('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}` //pegando o ultimo span dentro do subtotal
        c('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`
        c('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`
        
        
    } else {
        c('aside').classList.remove('show')
    }

}//eventos cart

