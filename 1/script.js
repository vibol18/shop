
let iconCart = document.querySelector('.iconCart');
let cart = document.querySelector('.cart');
let container = document.querySelector('.container');
let close = document.querySelector('.close');
iconCart.addEventListener('click', ()=>{
    if (cart.style.rtght == '-100%'){
        cart.style.right = '0';
        container.style.transform = 'translateX(0)';
    }else{
        cart.style.right = '-100%';
        container.style.transform = 'translatateX(0)';
    }
})
close.addEventListener('click', ()=>{
    cart.style.right = '-100%';
    container.style.transform = 'translateX(0)';
})
let product =null;
//get data from file 
fetch('product.json')
.then(response => response.json())
.then(data =>{
products = data;
addDataToHTML();
})
//show data in list html
function addDataToHTML(){
    //remove datas defual in html
    let listproductHTML = document.querySelector('.listproduct')
    listproductHTML.innerHTML = '';
    // add new data 
    if(products != null){
        products.array.array.forEach(product => {
            let newproduct = document.createElement('div');
            newproduct.classList.add('iteam')
            newproduct.innerHTML =`            <div class="iteam">
                <img src="${product.image}" alt="">
                <h2>${product.name}n</h2>
                <div class="price">${product.price}</div>
                <button onclick="addCart(${product.id})">Add to Card</button>`;
                listproductHTML.appendChild(newproduct);
        });
    }
}
let listCart = [];
function checkCart(){
    var cookieValue = document.cookie
    .split(';')
    .find(row => row.startsWith('listCart='));
    if(cookieValue){
        listCart = JSON.parse(cookieValue.split('=')[1]);
    }
}
checkCart();
function addCart ($idproduct){
    let productCopy = JSON.parse(JSON.stringify(product));
    //if this product is not in the card 
    if(listCart[$idproduct]){
        let dataproduct =productCopy.filter(
            product => product.id == $idproduct
        )[0];
        //add data product in cart
        listCart[$idproduct] = dataproduct;
        listCart[$idproduct].quanlity =1;
    }else{
     listCart[$idproduct].quanlity++;
    }
    let timesave ="expires=thu, 31 Dec 2025 23:59 UTC ";
    document.cookie = "listCart"+JSON.stringify(listCart)+";"+timesave+";path=/;";
   
}
 addCartToHTMl();
function addCartToHTMl(){
    //clear data
    let listproductHTML = document.querySelector('.listCart');
    listCart.innerHTML = '';
    let totalHTML = document.querySelector('.totalQuantity');

    if(listCart){
        listCart.forEach(product => {
        if(product){
            let newCart = document.createElement('div');
            newCart.classList.add('iteam');
            newCart.innerHTML=`<${product.image}>
                <div class="content">
                    <div class="name">
                        ${product.name}
                    </div>
                    <div class="price">
                        $${product.price}/1 product
                    </div>
                </div>
                <div class="quanlity">
                    <button>-</button>
                    <span class="value">${product.quanlity}</span>
                    <button>+</button>
                </div>`;
                listCartHTML.appendChild(newCart);
                totalQuanlity = totalQuanlity = product.quanlity;
        }
        })
    }
}
totalHTML.innerText = totalQuanlity;
