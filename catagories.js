function getItemsFetch() {
    fetch("https://northwind.vercel.app/api/categories")
        .then((res) => res.json())
        .then((data) => {
            localStorage.setItem("categories", JSON.stringify(data));
            console.log("Data saved to localStorage:", data);
            gotFromLocal(); 
        })
        .catch((err) => console.error("Fetch error:", err));
}


function gotFromLocal() {
    const data = JSON.parse(localStorage.getItem("categories"));
    const container = document.querySelector("#output");
    container.innerHTML = ""; 

    data.forEach((item) => {
        const forEachOne = document.createElement("div");
        forEachOne.className = "oneTime";

        const header = document.createElement("h3");
        header.className = "title";
        header.innerHTML = `<span style="font-weight:500;">Name:</span> ${item.name}`;

        const description = document.createElement("p");
        description.className = "cards";
        description.textContent =`Description: ${item.description}`;

        const btn = document.createElement("button");
        btn.className = "btn";
        btn.textContent = "Sil";

        const id = item.id;

   
        btn.addEventListener("click", () => {
            deleteItems(id);
        });

        forEachOne.appendChild(header);
        forEachOne.appendChild(description);
        forEachOne.appendChild(btn);
        container.appendChild(forEachOne);
    });
}

const deleteItems = (id) => {
    fetch(`https://northwind.vercel.app/api/categories/${id}`, {
        method: "DELETE",
    })
    .then((res) => res.json())
    .then(() => {
        let categories = JSON.parse(localStorage.getItem("categories")) || [];
        categories = categories.filter((category) => category.id !== id);
        localStorage.setItem("categories", JSON.stringify(categories));
        gotFromLocal();
    })
    .catch((err) => console.log("Delete error:", err));
};


document.getElementById("btn").addEventListener("click", () => {
    const inp = document.getElementById("inp");
    const inp2 = document.getElementById("inp2");

    if (inp.value.trim() === "" || inp2.value.trim() === "") {
        alert("Please fill in both fields to add a category."); 
        return;
    }


    const newCategory = {
        name: inp.value,
        description: inp2.value
    };


    fetch(`https://northwind.vercel.app/api/categories`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(newCategory)
    })
    .then(res => res.json())
    .then((data) => {
        console.log("Posted:", data);

        let categories = JSON.parse(localStorage.getItem("categories")) || [];
        categories.push(newCategory); // Add the new category
        localStorage.setItem("categories", JSON.stringify(categories));

        gotFromLocal();

        inp.value = ""; 
        inp2.value = "";
    })
    .catch((err) => console.error("Error:", err));
});

window.onload = () => {
    getItemsFetch();
    gotFromLocal();
}