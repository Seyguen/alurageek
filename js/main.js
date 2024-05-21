import { serviceProducts } from "../js/productService.js";

const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");

function createElement(name, price, image, id){
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <div class="img-container">
            <img src="${image}" alt="${name}" class="image">
        </div>

        <div class="card-container--info">
            <p>${name}</p>
            <div class="card-container--info value">
                <p>$ ${price}</p>
                <button class="delete-button" data-id="${id}">
                    <img src="assets/icon_trash.svg" alt="Eliminar">
                </button>
            </div>
        </div>
    `;

    const  deleteButton = card.querySelector('.delete-button');
    deleteButton.addEventListener('click', () => deleteCard(card));

productContainer.appendChild(card);
return card;
}



const render = async () => {
    try {
        const listProduct = await serviceProducts.productList();

        listProduct.forEach(product => {
           productContainer.appendChild(
            createElement(product.name, product.price, product.image, product.id)
           );
        });    
    } catch (error) {
        console.log(error);
    }
};

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;

    serviceProducts.createProduct(name, price, image)
    .then((res) => console.log(res))
    .catch((err)=> console.log(err));
    
})

render();
