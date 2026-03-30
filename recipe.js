    const modal = document.getElementById("myModal");
    const modalCreate = document.getElementById("myCreateModal");
    const modalLogin = document.getElementById("myLoginModal");

    const openBtn = document.getElementById("openModalBtn");
     const openCreateBtn = document.getElementById("openModalCreateBtn");
    const openLoginBtn = document.getElementById("openModalLoginBtn");

    const closeBtn = document.getElementById("closeModalBtn");
    const closeCreateBtn = document.getElementById("closeModalCreateBtn");
    const closeLoginBtn = document.getElementById("closeModalLoginBtn");

    if (localStorage.getItem("currentUser")) {
    openLoginBtn.textContent = "Log out";
    }

    openLoginBtn.addEventListener("click", () => {
    // If the button says "Log out", handle the logout logic
    if (openLoginBtn.textContent === "Log out") {
        localStorage.removeItem("currentUser");
        openLoginBtn.textContent = "Login";
        alert("You have been logged out.");
    } else {
        modalLogin.style.display = "block";
    }
});
   
    // Open modal
    openBtn.addEventListener("click", () => {
        if (localStorage.getItem("currentUser")) {
        modal.style.display = "block";
    } else {
        // If not logged in, alert them and open the login modal instead
        alert("You must be logged in to add a recipe!");
        //modalLogin.style.display = "block";
    }
    });

    openCreateBtn.addEventListener("click", () => {
        modalCreate.style.display = "block";
    });

    // Close modal on X click
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    closeCreateBtn.addEventListener("click", () => {
        modalCreate.style.display = "none";
    });

    closeLoginBtn.addEventListener("click", () => {
        modalLogin.style.display = "none";
    });

    // Close modal when clicking outside content
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

//create account and store data in server.js

    const createAccountForm = document.getElementById("createAccountForm");
    const loginForm = document.getElementById("loginForm");

    createAccountForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            modalCreate.style.display = 'none';
            createAccountForm.reset();
        } else {
            alert(data.message); // This shows "Username already taken"
        }
    } catch (error) {
        alert("Server is offline. Make sure to start server.js!");
    }
    });

//login and verify data with server.js

    
    loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert(`Welcome back, ${data.user}!`);
            localStorage.setItem("currentUser", data.user); // Save the session locally
            openLoginBtn.textContent = "Log out";
            modalLogin.style.display = 'none';
            loginForm.reset();
        } else {
            alert(data.message); // Shows "User not found" or "Incorrect password"
        }
    } catch (error) {
        alert("Server is offline. Make sure to start server.js!");
    }
    });

// Load recipes from localStorage or initialize empty array
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    if(recipes.length === 0) {
    let sampleRecipes = [
        {
            title: "Ribeye Steak",
            category: "Western",
            ingredients: "Ribeye Steak, Salt, Pepper, Olive Oil Butter, Garlic, Rosemary",
            instructions: "1. Season steak with salt and pepper. 2. Heat olive oil in a pan. 3. Sear steak on both sides until desired doneness. 4. Add butter, garlic, and rosemary to pan and baste steak. 5. Let rest before serving.",
            URLs: "https://blog.thermoworks.com/wp-content/uploads/2017/06/ribeye_compound_butter_smoke_mk4-79-of-88.jpg",
            ratings: []
        },
        {
            title: "Spaghetti Carbonara",
            category: "Western",
            ingredients: "Spaghetti, Eggs, Pancetta, Parmesan Cheese, Black Pepper",
            instructions: "1. Cook spaghetti. 2. Fry pancetta. 3. Mix eggs and cheese. 4. Combine all with pepper.",
            URLs: "https://www.insidetherustickitchen.com/wp-content/uploads/2020/03/Spaghetti-alla-Carbonara-1200px-Inside-the-Rustic-Kitchen-3.jpg",
            ratings: []
        },
        {
            title: "Chicken Curry",
            category: "others",
            ingredients: "Chicken, Curry Powder, Coconut Milk, Onion, Garlic",
            instructions: "1. Sauté onion and garlic. 2. Add chicken and cook. 3. Stir in curry powder. 4. Pour coconut milk and simmer.",
            URLs: "https://cookingmadehealthy.com/wp-content/uploads/2019/01/Indian-Curry-Chicken-2.jpg",
            ratings: []
        },
        {
            title: "Chocolate Chip Cookies",
            category: "Dessert",
            ingredients: "Flour, Sugar, Butter, Eggs, Chocolate Chips",
            instructions: "1. Preheat oven to 350°F. 2. Mix all dry ingredients. 3. Cream butter and sugar. 4. Add eggs and mix. 5. Combine wet and dry ingredients. 6. Drop spoonfuls onto baking sheet. 7. Bake for 10-12 minutes.",
            URLs: "https://www.simplyrecipes.com/thmb/8xrCewn69NBaRk2M-S2IsKvCxJg=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2018__04__2017-06-13-ChocolateChipCookies-16b-794dd62f975047fb873d547b17ac2dcd.jpg",
            ratings: []
        },
        {
            title: "Tuna Sushi",
            category: "Japanese",
            ingredients: "Sushi Rice, Tuna, Soy Sauce, Wasabi",
            instructions: "1. Cook sushi rice. 2. Cut and put tuna on rice. 3. Serve with soy sauce and wasabi.",
            URLs: "https://www.makesushi.com/wp-content/uploads/2014/09/81J71OGAd-L._SL1500_.jpg",
            ratings: []

        },
        {
            title: "Salmon Sushi",
            category: "Japanese",
            ingredients: "Sushi Rice, Salmon, Soy Sauce, Wasabi",
            instructions: "1. Cook sushi rice. 2. Cut and put salmon on rice. 3. Serve with soy sauce and wasabi.",
            URLs: "https://popmenucloud.com/cdn-cgi/image/width=1920,height=1920,format=auto,fit=scale-down/ltskxvwr/91148c9f-7fcf-45a1-a182-574585a28fcd",
            ratings: []
        },
        {
            title: "Pumpkin Soup",
            category: "Soup",
            ingredients: "Pumpkin, Onion, Garlic, Vegetable Broth, Cream",
            instructions: "1. Sauté onion and garlic. 2. Add pumpkin and broth. 3. Simmer until pumpkin is soft. 4. Blend until smooth. 5. Stir in cream and heat through.",
            URLs: "https://www.foodandwine.com/thmb/dlynCQadJPOneK6FcTQPs1aXL-E=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Thai-Pumpkin-Soup-FT-RECIPE0822-2000-83b6bfa1708f41b5b1c455e0e917832a.jpg",
            ratings: []

        },
        {
            title: "Chinese Dumplings",
            category: "Chinese",
            ingredients: "Ground Pork, Cabbage, Ginger, Garlic, Dumpling Wrappers",
            instructions: "1. Mix pork, cabbage, ginger, and garlic. 2. Place a spoonful of filling in each wrapper. 3. Fold and seal. 4. Boil or pan-fry until cooked through.",
            URLs: "https://www.thespruceeats.com/thmb/VfZur0k0yrxxXRaS0KbDekj0tgE=/4494x3000/filters:no_upscale():max_bytes(150000):strip_icc()/chinese-pan-fried-dumplings-694499_hero-02-d410739aee4443b1a8f185a95df41f96.jpg",
            ratings: []
        }
    ];
    recipes.push(...sampleRecipes);
    localStorage.setItem('recipes', JSON.stringify(recipes));
} 

    const form = document.getElementById("submissionForm");
     // Handle form submission
    form.addEventListener("submit", async (event) => {
    event.preventDefault(); 
    
    const title = document.getElementById('title').value.trim();
    const ingredients = document.getElementById('ingredients').value.trim();
    const category = document.getElementById('category').value.trim();
    const instructions = document.getElementById('instructions').value.trim();
    const urlInput = document.getElementById('URL').value.trim();
    const fileInput = document.getElementById('imageFile').files[0];

    // 1. Determine which image source to use
    let finalImage = urlInput;

    // 2. If a file is uploaded, convert it to a Base64 string
    if (fileInput) {
        finalImage = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(fileInput);
        });
    }

    // 3. Validation (Ensure we have an image from one of the two sources)
    if (!title || !ingredients || !instructions || !category || !finalImage) {
        alert("Please fill in all fields and provide an image (URL or Upload).");
        return;
    }

    const recipe = { 
        title, 
        category, 
        ingredients, 
        instructions, 
        URLs: finalImage, // This now stores either the URL or the Base64 image data
        ratings: [] // Add this line to store user scores
    };
    
    recipes.push(recipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));

    // Clear form
    document.getElementById('submissionForm').reset();
    document.getElementById('myModal').style.display = 'none';

    alert("Recipe added successfully!");
    displayRecipes();
});
   
    // Display recipes
    function displayRecipes() {
        const searchTerm = document.getElementById('name_search').value.toLowerCase();
        const ingredientSearchTerm = document.getElementById('ingredient_search').value.toLowerCase();
        const categorySearchTerm = document.getElementById('category_search').value.toLowerCase();
        const recipeList = document.getElementById('recipe-list');
        recipeList.innerHTML = '';

        const filteredRecipes = recipes.filter(r =>
            r.title.toLowerCase().includes(searchTerm) &&
            r.ingredients.toLowerCase().includes(ingredientSearchTerm)&&
            r.category.toLowerCase().includes(categorySearchTerm)
        );

        if (filteredRecipes.length === 0) {
            recipeList.innerHTML = '<p>No recipes found.</p>';
            return;
        }

       filteredRecipes.forEach((r, index) => {
    // 1. Find the actual index in the master 'recipes' array 
    // (This fixes the bug where filtering causes the wrong recipe to be rated/deleted)
    const masterIndex = recipes.findIndex(original => original.title === r.title);

    // 2. Calculate Average Rating
    const ratings = r.ratings || [];
    const average = ratings.length 
        ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1) 
        : "N/A";

    const div = document.createElement('div');
    div.className = 'recipe';
    div.innerHTML = `
        <h3>${r.title}</h3>
        <p><strong>Category:</strong> ${r.category}</p>
        <p><strong>Ingredients:</strong> ${r.ingredients}</p>
        <p><strong>Instructions:</strong> ${r.instructions}</p>
    `;

    const img = document.createElement('img');
    img.src = r.URLs;
    img.alt = r.title;
    img.className = "recipe-img"; // Added a class for easier CSS
    div.appendChild(img);

    // 3. Display Average Rating below image
    const ratingDisplay = document.createElement('div');
    ratingDisplay.className = "rating-container";
    ratingDisplay.innerHTML = `<p>⭐ Average Rating: <strong>${average}</strong> (${ratings.length} reviews)</p>`;
    
    // 4. Show Rating UI only if logged in
    if (localStorage.getItem("currentUser")) {
        ratingDisplay.innerHTML += `
            <div class="rate-actions">
                <select id="score-${masterIndex}">
                    <option value="5">5 - Excellent</option>
                    <option value="4">4 - Very Good</option>
                    <option value="3">3 - Good</option>
                    <option value="2">2 - Fair</option>
                    <option value="1">1 - Poor</option>
                </select>
                <button onclick="rateRecipe(${masterIndex})">Rate</button>
            </div>
        `;
    } else {
        ratingDisplay.innerHTML += `<p><small>Log in to rate this recipe!</small></p>`;
    }

    div.appendChild(ratingDisplay);
    div.innerHTML += `<br><button class="delete-btn" onclick="deleteRecipe(${masterIndex})">Delete</button>`;
    recipeList.appendChild(div);
    });
    }

// Delete a recipe
    function deleteRecipe(index) {
        if (confirm("Do you really want to delete the recipe?")) {
            recipes.splice(index, 1);
            localStorage.setItem('recipes', JSON.stringify(recipes));
            displayRecipes();
        }
    }

    function rateRecipe(index) {
        const scoreSelector = document.getElementById(`score-${index}`);
        const score = parseInt(scoreSelector.value);

    // Ensure the ratings array exists
        if (!recipes[index].ratings) {
          recipes[index].ratings = [];
     }

     recipes[index].ratings.push(score);
    
    // Save to localStorage
     localStorage.setItem('recipes', JSON.stringify(recipes));
    
        alert("Thanks for rating!");
        displayRecipes(); // Refresh UI to show new average
}

    // Initial display
    displayRecipes();

// --- Logic for Shopping List ---
const selectionModal = document.getElementById("selectionModal");
const ingredientsModal = document.getElementById("ingredientsModal");
const openSelectionBtn = document.getElementById("openSelectionBtn");
const selectionForm = document.getElementById("selectionForm");
const checklistContainer = document.getElementById("checklist-container");
const uniqueIngredientsList = document.getElementById("unique-ingredients-list");

// Open selection modal and build checkboxes
openSelectionBtn.addEventListener("click", () => {
    checklistContainer.innerHTML = ''; 
    if (recipes.length === 0) {
        alert("No recipes found! Add some first.");
        return;
    }

    recipes.forEach((recipe, index) => {
        const div = document.createElement("div");
        div.style.marginBottom = "10px";
        div.innerHTML = `
            <input type="checkbox" id="recipe-${index}" name="recipeIndex" value="${index}">
            <label for="recipe-${index}" style="font-weight: normal; margin-left: 8px;">${recipe.title}</label>
        `;
        checklistContainer.appendChild(div);
    });
    selectionModal.style.display = "block";
});

// Handle the "Get Ingredients" logic
selectionForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const selected = document.querySelectorAll('input[name="recipeIndex"]:checked');
    
    if (selected.length === 0) {
        alert("Please select at least one recipe!");
        return;
    }

    let combinedIngredients = [];
    selected.forEach(box => {
        const index = box.value;
        // Split ingredients by comma and trim whitespace
        const items = recipes[index].ingredients.split(',').map(i => i.trim().toLowerCase());
        combinedIngredients = combinedIngredients.concat(items);
    });

    // Remove duplicates using a Set
    const uniqueList = [...new Set(combinedIngredients)];

    // Display results
    uniqueIngredientsList.innerHTML = '';
    uniqueList.forEach(item => {
        if (item) {
            const li = document.createElement("li");
            li.textContent = "☐ " + item;
            uniqueIngredientsList.appendChild(li);
        }
    });

    selectionModal.style.display = "none";
    ingredientsModal.style.display = "block";
});

// Standard close logic for the new modals
document.getElementById("closeSelectionBtn").onclick = () => selectionModal.style.display = "none";
document.getElementById("closeIngredientsBtn").onclick = () => ingredientsModal.style.display = "none";