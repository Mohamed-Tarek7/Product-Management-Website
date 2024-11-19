var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productDescription");
var productSearch = document.getElementById("productSearch");
var tableBody = document.getElementById("tableBody");
var addButton = document.getElementById("addBtn");
var toUpdateIndex;
var productContainer = [];

if (localStorage.getItem("products") !== null){
    productContainer = JSON.parse(localStorage.getItem("products"));
    displayProducts();
}

function addProduct(){
    var product = {
        name: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        description: productDescription.value,
    };

    if (validateInput(product)){
        if (addButton.innerHTML == "Add Product".trim())
            productContainer.push(product);
        else
            applyUpdatedProduct(toUpdateIndex);

        localStorage.setItem("products", JSON.stringify(productContainer));
        displayProducts();
        inputClear();
    }
}

function deleteProduct(index){
    productContainer.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(productContainer));
    displayProducts();
}

function updateProduct(index){
    addButton.innerHTML = "Update Product".trim();
    productName.value = productContainer[index].name;
    productPrice.value = productContainer[index].price;
    productCategory.value = productContainer[index].category;
    productDescription.value = productContainer[index].description;
    toUpdateIndex = index;
}

function applyUpdatedProduct(index){
    productContainer[index].name = productName.value;
    productContainer[index].price = productPrice.value;
    productContainer[index].category = productCategory.value;
    productContainer[index].description = productDescription.value;
    addButton.innerHTML = "Add Product".trim();
}

function displayProducts(){
    var cartona = "";

    for (var i = 0; i < productContainer.length; ++i){
        cartona += 
        `<tr> 
        <td> ${i + 1} </td> 
        <td> ${productContainer[i].name} </td> 
        <td> ${productContainer[i].price} </td> 
        <td> ${productContainer[i].category} </td> 
        <td> ${productContainer[i].description} </td> 
        <td> <button type="submit" class="tableButtons shadow btn btn-outline-dark bg-light rounded-5 my-2 ms-2 fw-medium text-dark" onclick="deleteProduct(${i});">Delete</button> </td> 
        <td> <button type="submit" class="tableButtons shadow btn btn-outline-dark bg-light rounded-5 my-2 ms-2 fw-medium text-dark" onclick="updateProduct(${i});">Update</button> </td> 
        </tr>`;
    }
    
    tableBody.innerHTML = cartona;
}

function clearProducts(){
    productContainer = [];
    localStorage.setItem("products", JSON.stringify(productContainer));
    displayProducts();
    productSearch.value = "";
}

function searchProducts(){
    var productContainerSearch = [];
    var searchFor = productSearch.value;

    for (var i = 0; i < productContainer.length; ++i){
        if (productContainer[i].name.toUpperCase().includes(searchFor.toUpperCase()) === true)
            productContainerSearch.push(productContainer[i]);
    }

    var productContainerTemporary = productContainer;
    productContainer = productContainerSearch;
    displayProducts();
    productContainer = productContainerTemporary;
}

function validateInput(product){
    var nameRegex = /^[a-zA-Z]+[a-zA-Z0-9\s]*$/g;
    var priceRegex = /^[0-9]{1,5}$/g;
    var categoryRegex = /^[a-zA-Z]+[a-zA-Z\s]*$/g;
    var descriptionRegex = /^[a-zA-Z]+[a-zA-Z0-9\s]*$/g;
    var allValid = true;

    product.name = product.name.replace(/ +/g, ' ');
    product.name = product.name.trim();
    product.category = product.category.replace(/ +/g, ' ');
    product.category = product.category.trim();
    product.description = product.description.replace(/ +/g, ' ');
    product.description = product.description.trim();

    if (!nameRegex.test(product.name.replaceAll(/\s/g, ''))){
        alert("Product name should start with a letter and should not include any special characters.");
        allValid = false;
    } else if (!priceRegex.test(product.price)){
        alert("Product price should only include one to five digits with no spaces.");
        allValid = false;
    } else if (!categoryRegex.test(product.category.replaceAll(/\s/g, ''))){
        alert("Product category should include only letters.");
        allValid = false;
    } else if (!descriptionRegex.test(product.description.replaceAll(/\s/g, ''))){
        alert("Product description should start with a letter and should not include any special characters.");
        allValid = false;
    }

    return allValid;
}

function inputClear(){
    productName.value = "";
    productPrice.value = "";
    productCategory.value = "";
    productDescription.value = "";
}