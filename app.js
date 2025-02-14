let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let products = [
    {
        "id": 1,
        "name":"  Chanel Perfection Lumière Velvet Foundation",
        "price": 4500,
        "image": "image/1.jpg"
    },
    {
        "id": 2,
        "name":" Chanel Rouge Allure Lipstick",
        "price": 3500,
        "image": "image/2.jpg"
    },
    {
        "id": 3,
        "name":" Chanel Ombre Première Longwear Cream Eyeshadow",
        "price": 3500,
        "image": "image/3.jpg"
    },
    {
        "id": 4,
        "name":" Chanel Le Volume Revolution Mascara",
        "price": 3200,
        "image": "image/4.jpg"
    },
    {
        "id": 5,
        "name":" Chanel Sublimage La Crème",
        "price": 32000,
        "image": "image/5.jpg"
    },
    {
        "id": 6,
        "name":" Chanel Hydra Beauty Micro Serum",
        "price": 10000,
        "image": "image/6.jpg"
    },
    {
        "id": 7,
        "name":" Chanel Les Beiges Healthy Glow Luminous Color",
        "price": 4800,
        "image": "image/7.jpg"
    },
    {
        "id": 8,
        "name":" Chanel Le Vernis Longwear Nail Colour",
        "price": 2500,
        "image": "image/8.jpg"
    },
    {
        "id": 9,
        "name":" Chanel No. 5 Eau de Parfum",
        "price": 10000,
        "image": "image/9.jpg"
    },
    {
        "id": 10,
        "name":" Chanel Chance Eau de Parfum",
        "price": 9000,
        "image": "image/10.jpg"
    },
    {
        "id": 11,
        "name":" Chanel Le Lift Firming Anti-Wrinkle Serum",
        "price": 15000,
        "image": "image/11.jpg"
    },
    {
        "id": 12,
        "name":" Chanel Le Crayon Lèvres Lip Liner",
        "price": 2500,
        "image": "image/12.jpg"
    }
];
let cart = [];

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})

const addDataToHTML = () => {
    // remove datas default from HTML
    listProductHTML.innerHTML = ''; // Clear the previous content
    // add new datas
    if(products.length > 0) // if has data
    {
        products.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.dataset.id = product.id;
            newProduct.classList.add('item');
            newProduct.innerHTML = 
            `<img src="${product.image}" alt="">
            <h2>${product.name}</h2>
            <div class="price">$${product.price}</div>
            <button class="addCart">Add To Cart</button>`;
            listProductHTML.appendChild(newProduct);
        });
    }
}
listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('addCart')){
        let id_product = positionClick.parentElement.dataset.id;
        addToCart(id_product);
    }
})

const addToCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
    if(cart.length <= 0){
        cart = [{
            product_id: product_id,
            quantity: 1
        }];
    }else if(positionThisProductInCart < 0){
        cart.push({
            product_id: product_id,
            quantity: 1
        });
    }else{
        cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
    addCartToMemory();
}

const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}

const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if(cart.length > 0){
        cart.forEach(item => {
            totalQuantity = totalQuantity +  item.quantity;
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;

            let positionProduct = products.findIndex((value) => value.id == item.product_id);
            let info = products[positionProduct];
            listCartHTML.appendChild(newItem);
            newItem.innerHTML = `
            <div class="image">
                    <img src="${info.image}">
                </div>
                <div class="name">
                ${info.name}
                </div>
                <div class="totalPrice">$${info.price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${item.quantity}</span>
                    <span class="plus">></span>
                </div>
            `;
        })
    }
    iconCartSpan.innerText = totalQuantity;
}

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if(positionClick.classList.contains('plus')){
            type = 'plus';
        }
        changeQuantityCart(product_id, type);
    }
})

const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if(positionItemInCart >= 0){
        let info = cart[positionItemInCart];
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
                break;
        
            default:
                let changeQuantity = cart[positionItemInCart].quantity - 1;
                if (changeQuantity > 0) {
                    cart[positionItemInCart].quantity = changeQuantity;
                }else{
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToHTML();
    addCartToMemory();
}

const initApp = () => {
    addDataToHTML();

    // get data cart from memory
    if(localStorage.getItem('cart')){
        cart = JSON.parse(localStorage.getItem('cart'));
        addCartToHTML();
    }
}



document.querySelector('.icon-cart').addEventListener('click', function() {
    document.querySelector('.cartTab').style.display = 'block';  // Show cart
});

document.querySelector('.close').addEventListener('click', function() {
    document.querySelector('.cartTab').style.display = 'none';  // Close cart
});

// If you need more functionality (like dynamic product list, etc.), add it here

initApp();
