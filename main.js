// Generates a new random id
// Used when creating a new item
let genId = () => {
    return "" + Math.floor(Math.random() * 1000000000)
}

// The current screen viewed by the user
// Certain button presses changes this variable
// It is used in the render function to determine what to display to the user
let currentView = "items-for-sale"

// Corresponds to the id of the item in the item details view
let detailItemId = undefined

// Stores all the items that all for sale. 
// The key of the map is the item id
let itemsForSale = new Map()
let itemsInCart = new Map()
let myPurchasesMap = new Map()

// Some hard coded data
itemsForSale.set("xyz", {
    itemId: "xyz",
    imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Panton_Stuhl.jpg/255px-Panton_Stuhl.jpg",
    title: "Panton Chair Verner Panton 1999",
    description: ["Material:  dyed-through polypropylene. " + "100% recyclable. " + "Matt finish. " + "Suited for outdoor use. " +
        "Note:  special additives retard the fading of colours due to UV radiation. However, if the chair is exposed to sunlight for prolonged periods, the colour may change over time. We recommend limited exposure to sunlight."],
    price: 394.99
})
//Random chair from target
itemsForSale.set("blueChair", {
    itemId: "blueChair",
    imageURL: "https://target.scene7.com/is/image/Target/GUEST_d3548692-797f-46bf-b203-1167fa55d29b?wid=325&hei=325&qlt=80&fmt=webp",
    title: "Minuta Pleated Back Armless Accent Chair - Opalhouse",
    description: ["Armless accent chair creates a comfortable and stylish seating experience. " +
        "Great for modern workspaces, study or home office space. " +
        "Upholstered design with cushioned seat and back for a comfortable seating experience. " +
        "Plush velvet upholstery and tapered angled legs create mid-century appeal. " +
        "Sturdy hardwood frame offers durable, lasting use. "],
    price: 129.99
})
//Random chair from target
itemsForSale.set("greyChair", {
    itemId: "greyChair",
    imageURL: "https://target.scene7.com/is/image/Target/GUEST_7e89c9b9-ccd1-4da5-986c-7e7d88a9363c?wid=325&hei=325&qlt=80&fmt=webp",
    title: "Glenn Mid-Century Modern Accent Chair - Project 62",
    description: ["Upholstered accent chair adds chic, everyday appeal to your indoor space. " +
        "Great for living room, study or family room. " +
        "Clean and unfettered look and angled legs create mid-century appeal. " +
        "Upholstered design with curved backrest and cushioned seat and arms for added comfort. " +
        "Sturdy hardwood frame offers durable, lasting use. "],
    price: 179.99
})



// Returns a DOM node for displaying an item
let itemForSaleToElem = item => {


    // For debugging purposes
    console.log("creating DOM node for", item)

    let boxDescItem = document.createElement("div")
    boxDescItem.setAttribute("class", "boxDescription")

    //Title of the Item
    let title = document.createElement("h1")
    title.innerText = item.title
    title.style.justifyContent = "center"

    //Price of the Item
    let priceDesc = document.createElement("div")
    priceDesc.innerText = "$" + item.price
    priceDesc.style.fontSize = "30px"



    // This DOM node will contain the image of the item
    let imageElem = document.createElement("img")
    imageElem.setAttribute("src", item.imageURL)
    imageElem.setAttribute("class", "short-image")

    // Clicking this button will show the details page for the item
    let detailsButton = document.createElement("button")
    detailsButton.innerText = "Get item details"
    detailsButton.style.backgroundColor = "#f0c14b"
    detailsButton.style.borderRadius = "5px"
    detailsButton.addEventListener("click", () => {
        currentView = "item-detail"
        detailItemId = item.itemId
        render()
    })


    detailsButton.style.marginTop = "100px"

    let container = document.createElement("div")

    let deleteItemsBtn = document.createElement("button")
    deleteItemsBtn.innerText = "Delete Item"
    deleteItemsBtn.setAttribute("style", "margin:0 10px;");

    deleteItemsBtn.addEventListener("click", () => {
        itemsForSale.delete(item.itemId)
        render()
    })
    boxDescItem.append(title, priceDesc, detailsButton, deleteItemsBtn)
    container.appendChild(imageElem)
    container.appendChild(boxDescItem)
    //container.appendChild(detailsButton)

    container.setAttribute("class", "item-for-sale")

    return container
}

// Returns a DOM node for displaying an item in the cart
let itemForSaleToCart = item => {
    // For debugging purposes
    console.log("creating DOM node for", item)

    let container = document.createElement("div")
    container.style.maxWidth = "1000px"

    //Iamge of the item in the cart
    let img = document.createElement("img")
    img.setAttribute("src", item.imageURL)
    img.setAttribute("class", "short-imageCart")
    img.style.padding = "20"

    //Box containing informations about the item
    let boxTitleDescription = document.createElement("div")
    boxTitleDescription.style.display = "grid"

    //Title of the item
    let titleCartItem = document.createElement("h2")
    titleCartItem.innerText = item.title

    //Description label
    let labelDesc = document.createElement("div")
    labelDesc.style.fontWeight = "bold"
    labelDesc.style.alignSelf = "end"
    labelDesc.style.textDecoration = "underline"
    labelDesc.innerText = "Description"

    //Item description
    let itemCartdescription = document.createElement("p")
    itemCartdescription.style.maxWidth = "615px"
    itemCartdescription.innerText = item.description

    boxTitleDescription.append(titleCartItem, labelDesc, itemCartdescription)
    boxTitleDescription.style.width = "600px"

    let priceItemCart = document.createElement("div")
    priceItemCart.innerHTML = "Price: $" + item.price
    priceItemCart.setAttribute("class", "cartPrice")

    let deleteItemsBtn = document.createElement("button")
    deleteItemsBtn.innerText = "Delete Item"
    deleteItemsBtn.setAttribute("style", "margin:20px;");

    deleteItemsBtn.style.height = "30px"
    deleteItemsBtn.style.width = "165px"

    deleteItemsBtn.addEventListener("click", () => {
        itemsInCart.delete(item.itemId)
        console.log("succes")
        render()
    })

    //Box containing price and delete button
    let boxPriceBtn = document.createElement("div")
    boxPriceBtn.style.display = "grid"
    boxPriceBtn.style.minWidth
   


    boxPriceBtn.append(priceItemCart, deleteItemsBtn)

    container.append(img, boxTitleDescription, boxPriceBtn)
    container.setAttribute("class", "item-for-sale")

    return container
}

//Returns a DOM Node for purchased Items
let myPurchasesElements = item => {
    // For debugging purposes
    console.log("creating DOM node for", item)

    let container = document.createElement("div")
    container.style.maxWidth = "1000px"

    //Image of the item
    let img = document.createElement("img")
    img.setAttribute("src", item.imageURL)
    img.setAttribute("class", "short-imageCart")
    img.style.padding = "20"

    let boxTitleDescription = document.createElement("div")
    boxTitleDescription.style.alignSelf = "center"

    let titleCartItem = document.createElement("h2")
    titleCartItem.innerText = item.title


    boxTitleDescription.append(titleCartItem)

    let priceItemCart = document.createElement("div")
    priceItemCart.innerHTML = "Price: $" + item.price
    priceItemCart.setAttribute("class", "cartPrice")

    let boxPriceBtn = document.createElement("div")
    boxPriceBtn.style.alignSelf = "flex-end"
    boxPriceBtn.style.width = "200px"


    boxPriceBtn.append(priceItemCart)

    container.append(img, boxTitleDescription, boxPriceBtn)
    container.style.justifyContent = "space-between"
    container.setAttribute("class", "item-for-sale")

    return container
}


// Returns a DOM node for displaying all items
let allItemsView = () => {
    console.log("all items view")
    // itemIds will contain an array that contains all the item ids
    let itemIds = Array.from(itemsForSale.keys())
    let container = document.createElement("div")
    // Iterate through all the item ids one by one
    for (let i = 0; i < itemIds.length; i++) {
        let id = itemIds[i]
        let item = itemsForSale.get(id)
        console.log("item", item)
        // itemForSaleToElem returns a DOM node representing the element
        let itemElem = itemForSaleToElem(item)
        container.appendChild(itemElem)
    }
    /*if want Items side by side*/
    //container.style.display="flex"
    return container
}

// When the user clicks the "add item" button
let addItemView = () => {
    // For debugging purposes
    console.log("add item view")

    let addLabel = document.createElement("h2")
    addLabel.innerText = "Add new items"

    let imageLabel = document.createElement("p")
    imageLabel.innerText = "Image url:"

    let descriptionLabel = document.createElement("p")
    descriptionLabel.innerText = "Description:"

    let titleLabel = document.createElement("p")
    titleLabel.innerText = "Title:"

    let priceLabel = document.createElement("p")
    priceLabel.innerText = "Price:"



    //Title input box
    let titleBox = document.createElement("input")
    titleBox.setAttribute("type", "text")

    // Image URL input box
    let imageBox = document.createElement("input")
    imageBox.setAttribute("type", "text")

    // Description  input box
    let descriptionBox = document.createElement("textarea")
    descriptionBox.setAttribute("type", "text")
    descriptionBox.setAttribute("rows", "10")
    descriptionBox.setAttribute("cols", "50")




    // Price input box
    let priceBox = document.createElement("input")
    priceBox.setAttribute("type", "number")

    //Format description array to display list
    //descriptionBox.value

    // Submit button. It adds an item to the itemsForSale map
    let submitButton = document.createElement("button")
    submitButton.innerText = "Add item"
    submitButton.addEventListener("click", () => {
        let newItemId = genId()
        let newItem = {
            itemId: newItemId,
            imageURL: imageBox.value,
            title: titleBox.value,
            description: descriptionBox.value,
            price: priceBox.value
        }
        itemsForSale.set(newItemId, newItem)
        currentView = "items-for-sale"
        render()
    })


    let container = document.createElement("div")
    let space = document.createElement("div")
    container.append(addLabel, document.createElement("hr"))
    container.appendChild(imageLabel)
    container.appendChild(imageBox)

    container.appendChild(titleLabel)
    container.appendChild(titleBox)

    container.appendChild(priceLabel)
    container.appendChild(priceBox)

    container.appendChild(descriptionLabel)
    container.appendChild(descriptionBox)

    container.appendChild(space)
    space.append(submitButton)


    return container
}

//When the users wants to modify the details of an item
let modifyDetails = () => {

    let modifyLabel = document.createElement("h2")
    modifyLabel.innerText = "Modify the details of this Item"


    let descriptionLabel = document.createElement("p")
    descriptionLabel.innerText = "Description:"

    let titleLabel = document.createElement("p")
    titleLabel.innerText = "Title:"

    let priceLabel = document.createElement("p")
    priceLabel.innerText = "Price:"



    //Title input box
    let titleBox = document.createElement("input")
    titleBox.setAttribute("type", "text")


    // Description  input box
    let descriptionBox = document.createElement("textarea")
    descriptionBox.setAttribute("rows", "10")
    descriptionBox.setAttribute("cols", "50")



    // Price input box
    let priceBox = document.createElement("input")
    priceBox.setAttribute("type", "number")

    //Format description array to display list
    //descriptionBox.value

    // Submit button. It adds an item to the itemsForSale map
    let submitButton = document.createElement("button")
    submitButton.innerText = "Submit"
    submitButton.addEventListener("click", () => {

        if (titleBox.value !== "") {
            itemsForSale.get(detailItemId).title = titleBox.value
        }
        if (descriptionBox.value !== "") {
            itemsForSale.get(detailItemId).description = descriptionBox.value
        }
        if (priceBox.value !== "") {
            itemsForSale.get(detailItemId).price = priceBox.value
        }




        currentView = "item-detail"
        render()
    })


    let container = document.createElement("div")
    let space = document.createElement("div")

    container.append(modifyLabel, document.createElement('hr'))
    container.appendChild(titleLabel)
    container.appendChild(titleBox)

    container.appendChild(priceLabel)
    container.appendChild(priceBox)

    container.appendChild(descriptionLabel)
    container.appendChild(descriptionBox)

    container.appendChild(space)
    space.append(submitButton)


    return container
}

//See all items in cart 
let allItemsInCart = () => {
    console.log("Cart view")
    // itemIds will contain an array that contains all the item ids
    let boxCart = document.createElement("div")


    let itemIds = Array.from(itemsInCart.keys())
    let container = document.createElement("div")
    let labelShoppingCart = document.createElement("div")
    labelShoppingCart.innerText = "Shopping Cart"
    labelShoppingCart.setAttribute("class", "shoppingCartLabel")

    labelShoppingCart.append(document.createElement("hr"))

    container.style.display = 'flex'
    container.style.justifyContent = 'center'
    container.style.padding = "20px"
    container.appendChild(labelShoppingCart)

    let box = document.createElement("div")
    box.style.display = "grid"
    box.style.gridRowGap = "10px"

    // Iterate through all the item ids one by one
    for (let i = 0; i < itemIds.length; i++) {
        let id = itemIds[i]
        let item = itemsInCart.get(id)
        console.log("item", item)
        // itemForSaleToElem returns a DOM node representing the element
        let itemElem = itemForSaleToCart(item)
        box.appendChild(itemElem)
        container.appendChild(box)
    }
    /*if want Items side by side*/
    //container.style.display="flex"

    let totalLabel = document.createElement("div")
    totalLabel.style.fontSize = "18px"
    totalLabel.style.fontWeight = "bold"


    let total = 0
    for (let i = 0; i < itemsInCart.size; i++) {
        total += parseFloat(itemsInCart.get(Array.from(itemsInCart.keys())[i]).price)
    }


    totalLabel.innerText = "Total: $" + total.toFixed(2)
    box.appendChild(totalLabel)

    let boxTotal = document.createElement("div")
    boxTotal.setAttribute("class", "box-total")

    let btnPurchase = document.createElement("button")
    btnPurchase.innerText = "Purchase"
    btnPurchase.style.backgroundColor = "#f0c14b"
    btnPurchase.style.borderRadius = "5px"
    btnPurchase.style.width = "100%"
    btnPurchase.style.height = "30px"
    btnPurchase.style.margin = "10 0px"


    btnPurchase.addEventListener("click", () => {
        myPurchasesMap = new Map(itemsInCart)
        itemsInCart.clear()
        render()
    })

    let txtTotal = document.createElement("h2")
    txtTotal.innerText = "Total (" + itemsInCart.size + " items) :  "
    let totalTag = document.createElement("div")
    totalTag.style.fontSize = "16px"
    totalTag.style.fontWeight = "bold"
    totalTag.innerText = "$" + total.toFixed(2)

    boxTotal.append(txtTotal, totalTag, btnPurchase)

    if (itemsInCart.size === 0) {
        let emptyCart = document.createElement("div")
        emptyCart.style.display = "flex"
        emptyCart.style.backgroundColor = "white"
        emptyCart.style.alignItems = "center"
        emptyCart.style.justifyContent = "center"

        let imgEmptyCart = document.createElement("img")
        imgEmptyCart.style.height = "300px"
        imgEmptyCart.style.width = "400px"
        imgEmptyCart.src = "https://m.media-amazon.com/images/G/15/cart/empty/kettle-desaturated._CB424694027_.svg"
        let txtEmpty = document.createElement("h2")


        txtEmpty.innerText = "Your shopping cart is empty!"

        emptyCart.append(imgEmptyCart, txtEmpty)
        return emptyCart
    } else

        boxCart.append(labelShoppingCart, container)
    container.append(boxTotal)
    return boxCart
}

// When you ask for the details for an item, this is what gets displayed
let itemDetailView = () => {
    console.log("item detail view")
    let contents = document.createElement("div")

    contents.style.display = "flex"
    contents.style.margin = "50px"


    let descriptionBox = document.createElement("div")
    descriptionBox.setAttribute("class", 'descriptionBox')
    let title = document.createElement("h1")
    let price = document.createElement("h3")
    let description = document.createElement("div")


    descriptionBox.style.margin = "50px"
    title.innerText = itemsForSale.get(detailItemId).title
    price.innerText = "Price: $" + itemsForSale.get(detailItemId).price
    let about = document.createElement("h4")
    about.innerText = 'About this item'
    about.style.textDecoration = 'underline'


    let listDescription = document.createElement("li")
    listDescription.innerHTML = itemsForSale.get(detailItemId).description
    listDescription.style.maxWidth = "600px"
    description.appendChild(listDescription)


    let imageElem = document.createElement("img")
    imageElem.setAttribute("src", itemsForSale.get(detailItemId).imageURL)
    imageElem.setAttribute("class", "big-image")

    let cartIcon = document.createElement("i")
    let addToCartBtn = document.createElement("button")
    cartIcon.setAttribute("class", "fas fa-cart-plus")
    addToCartBtn.innerText = "Add to cart  "
    addToCartBtn.append(cartIcon)
    addToCartBtn.setAttribute("class", "add-toCart")


    let modifyBtn = document.createElement("button")
    modifyBtn.innerText = "Modify Details"
    modifyBtn.addEventListener("click", () => {
        currentView = "modifyDetails"
        render()
    })

    addToCartBtn.addEventListener("click", () => {
        let newItemId = itemsForSale.get(detailItemId).itemId
        let newItem = {

            itemId: itemsForSale.get(detailItemId).itemId,
            imageURL: itemsForSale.get(detailItemId).imageURL,
            title: itemsForSale.get(detailItemId).title,
            description: itemsForSale.get(detailItemId).description,
            price: itemsForSale.get(detailItemId).price
        }
        itemsInCart.set(newItemId, newItem)
        render()


    })

    descriptionBox.append(title, price, about, description, addToCartBtn, modifyBtn)
    contents.append(imageElem, descriptionBox)


    return contents
}

//See all purchases
let seeMyPurchases = () => {


    let boxCart = document.createElement("div")


    let itemIds = Array.from(myPurchasesMap.keys())
    let container = document.createElement("div")
    let labelShoppingCart = document.createElement("div")
    labelShoppingCart.innerText = "My Purchases"
    labelShoppingCart.setAttribute("class", "shoppingCartLabel")

    labelShoppingCart.append(document.createElement("hr"))

    container.style.display = 'flex'
    container.style.justifyContent = 'center'

    container.style.padding = "20px"
    container.appendChild(labelShoppingCart)

    let box = document.createElement("div")
    box.style.display = "grid"
    box.style.gridRowGap = "10px"


    let boxTotal = document.createElement("div")
    boxTotal.setAttribute("class", "box-total")

    // Iterate through all the item ids one by one
    for (let i = 0; i < itemIds.length; i++) {
        let id = itemIds[i]
        let item = myPurchasesMap.get(id)
        console.log("item", item)
        // itemForSaleToElem returns a DOM node representing the element
        let itemElem = myPurchasesElements(item)
        box.appendChild(itemElem)
        container.appendChild(box)
    }
    /*if want Items side by side*/
    //container.style.display="flex"

    let totalLabel = document.createElement("div")
    totalLabel.style.fontSize = "18px"
    totalLabel.style.fontWeight = "bold"


    let total = 0
    for (let i = 0; i < myPurchasesMap.size; i++) {
        total += parseFloat(myPurchasesMap.get(Array.from(myPurchasesMap.keys())[i]).price)
    }


    totalLabel.innerText = "Total: $" + total.toFixed(2)
    box.appendChild(totalLabel)

    let txtTotal = document.createElement("h2")
    txtTotal.innerText = "Total (" + myPurchasesMap.size + " items) :  "
    let totalTag = document.createElement("div")
    totalTag.style.fontSize = "16px"
    totalTag.style.fontWeight = "bold"
    totalTag.innerText = "$" + total.toFixed(2)
    let date = document.createElement("h3")
    let dateDMY = new Date()
    date.innerText = "Purchase made on: " + dateDMY.getDate() + "/" + dateDMY.getMonth() + "/2020"
    boxTotal.append(date, txtTotal, totalTag)

    boxCart.append(labelShoppingCart, container)
    let noPurchases = document.createElement("h1")
    noPurchases.innerText = "No Purchases made!"
    if (total === 0)
        container.append(noPurchases)
    else {
        container.append(boxTotal)
    }
    return boxCart

}

// The navigation buttons on top
let navigationButtons = () => {
    let topLeftButtonsCont = document.createElement("div")
    let searchBoxCont = document.createElement("div")

    let boxLogo = document.createElement("div")
    boxLogo.style.display = "flex"
    boxLogo.style.alignContent = "center"
    let listIcon = document.createElement("i")
    listIcon.setAttribute("class", "fas fa-bars")
    listIcon.setAttribute("color", "white")
    listIcon.style.fontSize = "22px"
    listIcon.style.alignSelf = "center"
    listIcon.style.margin = "10px"
    boxLogo.append(listIcon)

    let amazonLogo = document.createElement("img")
    amazonLogo.src = "https://bloximages.chicago2.vip.townnews.com/kenoshanews.com/content/tncms/assets/v3/editorial/0/56/05663cea-77e2-5e21-8a79-53e9a96e9acc/5f1f3d4695a1a.image.jpg"
    amazonLogo.setAttribute("height", "48px")
    amazonLogo.setAttribute("width", "100px")
    boxLogo.append(amazonLogo)
    amazonLogo.addEventListener("click", () => {
        currentView = "items-for-sale"
        render()
    })

    let homeButton = document.createElement("button")
    homeButton.innerText = "Home"
    homeButton.style.border = "none"
    homeButton.addEventListener("click", () => {
        currentView = "items-for-sale"
        console.log("new view", currentView)
        render()
    })

    let addItemButton = document.createElement("button")
    addItemButton.innerText = "Add item"
    addItemButton.style.border = "none"
    addItemButton.addEventListener("click", () => {
        currentView = "add-item"
        console.log("new view", currentView)
        render()

    })
    homeButton.setAttribute("class", "buttonTop")
    addItemButton.setAttribute("class", "buttonTop")

    let cartButton = document.createElement("button")
    cartButton.innerText = "My cart: " + itemsInCart.size
    cartButton.setAttribute("class", "buttonTop cartButton btnGroup")
    cartButton.style.backgroundColor = "#111"

    cartButton.addEventListener("click", () => {
        currentView = "items-in-cart"

        render()
    })

    let groupButton = document.createElement("div")
    groupButton.setAttribute("class", "btnGroup")

    let btnHello = document.createElement("button")
    let txt = document.createElement("div")
    txt.style.fontSize = "10px"
    let txt2 = document.createElement("div")
    txt2.style.fontSize = "15px"
    txt.innerHTML = "Hello, Sign in "
    txt2.innerHTML = " Account & Lists"
    txt2.style.fontWeight = "bold"
    btnHello.append(txt, txt2)
    btnHello.setAttribute("class", "buttonTop helloButton")
    btnHello.style.backgroundColor = "#111"


    let btnReturn = document.createElement("button")
    let txtReturn = document.createElement("div")
    txtReturn.style.fontSize = "10px"
    let txtOrder = document.createElement("div")
    txtOrder.style.fontSize = "15px"
    txtReturn.innerHTML = "Returns & "
    txtOrder.innerHTML = " Orders"
    txtOrder.style.fontWeight = "bold"

    btnReturn.append(txtReturn, txtOrder)
    btnReturn.setAttribute("class", "buttonTop returnButton btnGroup")
    btnReturn.style.backgroundColor = "#111"
    btnReturn.style.border = "none"
    btnHello.style.border = "none"
    cartButton.style.border = "none"





    let cartIcon = document.createElement('i')
    cartIcon.style.fontSize = "17px"
    cartIcon.setAttribute("class", "fas fa-shopping-cart")
    cartButton.append(cartIcon)




    let searchBox = document.createElement("input")
    searchBox.setAttribute("type", "text")


    let btnSearch = document.createElement("button")
    btnSearch.style.backgroundColor = "#f0c14b"

    let searchIcon = document.createElement('i')
    searchIcon.style.fontSize = "20px"
    searchIcon.setAttribute("class", "fas fa-search")
    btnSearch.append(searchIcon)
    btnSearch.style.alignSelf = "center"
    btnSearch.setAttribute("class", "btnSearch")
    btnSearch.style.borderRadius = " 0 5px 5px 0"

    let myPurchasesBtn = document.createElement("button")
    myPurchasesBtn.style.border = "none"
    myPurchasesBtn.innerText = "My Purchases"
    myPurchasesBtn.setAttribute("class", "buttonTop")
    myPurchasesBtn.addEventListener("click", () => {
        currentView = "myPurchases"
        render()
    })

    searchBox.setAttribute("class", "inputSearch")
    searchBox.append(btnSearch)
    searchBoxCont.style.display = "flex"
    searchBoxCont.style.alignSelf = "center"
    searchBoxCont.style.marginRight = "300px"
    searchBoxCont.append(searchBox, btnSearch)

    let txtDeals = document.createElement("div")
    txtDeals.innerText = "Shop deals before they're gone"
    txtDeals.setAttribute("class", "buttonTop")
    txtDeals.style.fontWeight = "bold"
    txtDeals.style.fontSize = "20px"
    txtDeals.style.color = "white"


    let topElements = document.createElement("div")
    topElements.style.width = "100%"
    topElements.style.backgroundColor = "#111"
    topElements.style.display = "flex"
    topElements.style.justifyContent = "space-between"

    let btnTopRight = document.createElement("div")
    btnTopRight.append(btnHello, btnReturn, cartButton)
    topElements.append(boxLogo, searchBoxCont, btnTopRight)

    let bottomElements = document.createElement("div")
    bottomElements.style.width = "100%"
    bottomElements.style.backgroundColor = "#232f3e"
    bottomElements.style.display = "flex"
    bottomElements.style.justifyContent = "space-between"


    let btnBottomCont = document.createElement("div")
    btnBottomCont.append(homeButton, addItemButton, myPurchasesBtn)
    bottomElements.append(btnBottomCont, txtDeals)


    let containerBottom = document.createElement("div")

    containerBottom.style.width = "100%"


    let containerTop = document.createElement("div")

    containerTop.style.width = "100%"
    containerTop.append(topLeftButtonsCont)

    let boxContainers = document.createElement("div")
    boxContainers.append(topElements, bottomElements)
    return boxContainers
}


// Rerenders the page
let render = () => {
    // Will contain a reference 
    let toRender = undefined
    // For debugging purposes
    console.log("rendering view", currentView)
    if (currentView === "items-for-sale") {
        toRender = allItemsView()
    } else if (currentView === "item-detail") {
        toRender = itemDetailView()
    } else if (currentView === "add-item") {
        toRender = addItemView()
    } else if (currentView === "items-in-cart") {
        toRender = allItemsInCart()
    } else if (currentView === "myPurchases") {
        toRender = seeMyPurchases()
    } else if (currentView === "modifyDetails") {
        toRender = modifyDetails()
    } else {
        // woops
        alert("unhandled currentView " + currentView)
    }
    let nav = navigationButtons()
    // Removes all children from the body
    document.body.innerHTML = ""
    document.body.appendChild(nav)
    document.body.appendChild(toRender)
}

// Initial render
render()