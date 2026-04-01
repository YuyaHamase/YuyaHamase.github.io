# YuyaHamase.github.io
Recipe Sharing Platform--
  This is the website where users can look over and add recipes.

Features

Display recipes--
  Added recipes are displayed in the order that were added.
  
Delete a recipe--
  Users could delete a recipe by pressing delete button below picture of recipe.

Search by name--
  Users can look for a certain recipe by filtering by name.
  All they have to do is just entering a name in first input.

Search by ingredient--
  Users can look for a certain recipe by filtering by ingredient.
  All they have to do is just entering an ingredient in second input.

Search by category--
  Users can look for recipes by selecting one out of 6 categories; Japanese, Chinese, Western, Soup, Dessert, and Others.

Create account--
  Users can create account by pressing Create Account button on the top after using the command Node server.js.
  Clicking on the button makes a submission form where user fills username and password pops up.
  Username already stored at server.js can not be used for a new account.

Login/Log out--
  Users can login/log out by pressing Login/Log out button beside create account button.
  Same as creating account, clicking on login button makes submission form  pops up.
  If either username or password is incorrect compared to stored data, error message pops up.

Adding a recipe--
  *This functionality is restricted to only users who have account and logged in.
  Users can add a recipe by pressing Add a recipe button on the center.
  Clicking on the button triggers a large submission form pop up where users has to fill out
  title, category, ingredients, instruction, and image URL or upload image.
  If either of them is missing, error message pops up.

Ratng system--
   *This functionality is restricted to only users who have account and logged in.
   Refresh the page once logged in, and users could choose from 1 to 5 to rate each resipe.
   For default, it always shows the average of user rates.
  
Shopping list generator--
  The button named "Generate Shopping List" is placed at the bottom of the page.
  Once user clicks on that, submission form pops up.
  Inside the form, user is supposed to select one or more recipes which user is interested in making.
  Clicking green button reveals a result where all ingredients used in chosen recipes(deduplicated).

Nutrition calculator--
  The button named "Calculate Nutrition" is placed at the bottom of the page.
  Once user clicks on that, submission form pops up.
  Inside the form, user is supposed to select one or more recipes which user would like to see its nutrition.
  Clicking green button reveals roughly calculated result.
