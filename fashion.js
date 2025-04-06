const container = document.querySelector(".container");
const counterProducts = document.querySelector(".counterProducts");

function getCards() {
  fetch(`https://fakestoreapi.com/products`)
    .then((res) => res.json())
    .then((data) => {
      let section;
      data.forEach((product, index) => {
        if (index % 4 === 0) {
          section = document.createElement("section");
          const newContainer = document.createElement("div");
          newContainer.className = "container";
          section.appendChild(newContainer);
          document.querySelector("main").appendChild(section);
        }

        const card = document.createElement("div");
        card.className = "card";

        const holder = document.createElement("div");
        holder.className = "holder";

        const imgBox = document.createElement("div");
        imgBox.className = "imgBox";

        const img = document.createElement("img");
        img.src = product.image;
        img.alt = product.title;
        img.style.width = "45%";
        imgBox.appendChild(img);

        const title = document.createElement("p");
        title.id = "name";
        title.textContent = product.title;

        const price = document.createElement("span");
        price.className = "price";
        price.textContent = `$${product.price}`;

        const button = document.createElement("button");
        button.id = "add-to-card";
        button.textContent = "Sebete At";

        button.addEventListener("click", () => {
          storedProducts(product);
          addToCart();
        });

        card.appendChild(imgBox);
        card.appendChild(holder);
        holder.appendChild(title);
        holder.appendChild(price);
        holder.appendChild(button);

        section.querySelector(".container").appendChild(card);
      });
    });
}

window.onload = () => {
  if (document.querySelector(".container")) {
    getCards();
  }
  addToCart();
  if (document.querySelector(".containerAddedProducts")) {
    displayAddedcarts();
  }
  if (window.location.pathname.includes("categories.html")) {
    gotFromLocal();
  }
};

function storedProducts(product) {
  let storedProducts = JSON.parse(localStorage.getItem("basket")) || [];

  storedProducts.push(product);

  localStorage.setItem("basket", JSON.stringify(storedProducts));
  console.log("Product added to the basket");
}

function addToCart() {
  let currentBasket = JSON.parse(localStorage.getItem("basket")) || [];
  let count = 0;
  count = currentBasket.length;

  counterProducts.textContent = count;
}

// elave hamisini silmek uchun button

const addedProducts = document.querySelector(".containerAddedProducts");
const section = document.querySelector(".section");

const button2 = document.createElement("button");
button2.id = "add-to-card";
button2.textContent = "Hamisini Sil";
button2.addEventListener("click", () => {
  localStorage.removeItem("basket");
  addedProducts.innerHTML = "";
  addToCart();
});
section.appendChild(button2);

function displayAddedcarts() {
  addedProducts.innerHTML = "";

  let addedOneProducts = JSON.parse(localStorage.getItem("basket")) || [];

  addedOneProducts.forEach((added, index) => {
    const card = document.createElement("div");
    card.className = "card";

    const holder = document.createElement("div");
    holder.className = "holder";

    const imgBox = document.createElement("div");
    imgBox.className = "imgBox";

    const img = document.createElement("img");
    img.src = added.image;
    img.alt = added.title;
    img.style.width = "45%";

    const title = document.createElement("p");
    title.id = "name";
    title.textContent = added.title;

    const price = document.createElement("span");
    price.className = "price";
    price.textContent = `$${added.price}`;

    const button = document.createElement("button");
    button.id = "add-to-card";
    button.textContent = "Sil";
    button.addEventListener("click", () => {
      deleteProducts(index);
    });

    imgBox.appendChild(img);
    holder.appendChild(title);
    holder.appendChild(price);
    holder.appendChild(button);

    card.appendChild(imgBox);
    card.appendChild(holder);

    addedProducts.appendChild(card);
  });
}

function deleteProducts(index) {
  let basket = JSON.parse(localStorage.getItem("basket")) || [];
  basket.splice(index, 1);
  localStorage.setItem("basket", JSON.stringify(basket));
  addToCart();
  displayAddedcarts();
}

function deleteAllProducts() {
  localStorage.removeItem("basket");
}

// function getItemsAxios() {
//   axios.get(`https://northwind.vercel.app/api/categories`).then((res) => {
//     localStorage.setItem = res.data;
//     console.log("Stored categories:", res.data);
//   });
// }

document.addEventListener("DOMContentLoaded", () => {
  getItemsFetch();
});
