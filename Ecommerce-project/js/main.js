let carts= document.querySelectorAll('.add-cart');
let products=[
    {
        name: 'grey heels',
        tag: "p13",
        price:200,
        inCart:0
    },
    {
        name: 'pink heels',
        tag: "p12",
        price:700,
        inCart:0
    },
    {
        name: 'black heels',
        tag: "p11",
        price:250,
        inCart:0
    },
    {
        name: 'silver heels',
        tag: "p14",
        price:200,
        inCart:0
    },
    {
        name: 'WD watch',
        tag: "l5",
        price:250,
        inCart:0
    },
    {
        name: 'smart watch',
        tag: "smartwatch",
        price:200,
        inCart:0
    }
]
for (let i=0; i < carts.length; i++)
{
    
carts[i].addEventListener('click',()=>
{
    console.log("added to cart");
    cartNumbers(products[i]);
    totalCost(products[i]);
    
})
}
function onLoadCartNumbers()
{
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers){
    document.querySelector('.cart span').textContent= productNumbers;
    }

}
function cartNumbers(product)
{
    
   let productNumbers = localStorage.getItem('cartNumbers');
   productNumbers= parseInt(productNumbers);

   if(productNumbers)
   {
      localStorage.setItem('cartNumbers',productNumbers +1);
      document.querySelector('.cart span').textContent= productNumbers+1;
   }
   else{
    localStorage.setItem('cartNumbers',1);
    document.querySelector('.cart span').textContent= 1;

   }
   setItems(product);
   
}
function setItems(product)
{
    let cartItems= localStorage.getItem('productsInCart');
    cartItems= JSON.parse(cartItems);
  if(cartItems != null)
  {
      if(cartItems[product.tag]==undefined)
      {
          cartItems={
              ...cartItems,
              [product.tag]:product
          }
      }
      cartItems[product.tag].inCart+=1;
  }
  else{
    product.inCart=1
    cartItems=
   {
       [product.tag]:product
   }
  }
   
    localStorage.setItem('productsInCart',JSON.stringify(cartItems));
}
function  totalCost(product)
{
    let cartCost= localStorage.getItem('totalCost');
    console.log("my cart cost is",cartCost);
    if(cartCost != null)
    {
        cartCost= parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost+ product.price)
    }else{
        localStorage.setItem("totalCost", product.price);
    }

   
}

function displayCart()
{
    let cartItems= localStorage.getItem("productsInCart");
    cartItems= JSON.parse(cartItems);
   
    let productContainer= document.querySelector(".products");
    console.log(cartItems);
    if(cartItems && productContainer)
    {
        productContainer.innerHTML='';
        Object.values(cartItems).map(item =>
            {
                productContainer.innerHTML += `
                
                <div class="product">
                <i class="fas fa-times-circle icon"></i>
                <img src="./img/${item.tag}.jpg" height="100px" width="100px">
                <span style="padding-left:20px;">${item.name}</span>
                </div>

                <div class="price">${item.price}
                </div>
                
                <div class="quantity">
                </div>
                
                `
            });
    }
}
   onLoadCartNumbers()
   displayCart();
