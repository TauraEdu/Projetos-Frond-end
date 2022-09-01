import React from 'react';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
// import FoodRecipes from './pages/FoodRecipes';
// import DrinkRecipes from './pages/DrinkRecipes';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
// import Favorites from './pages/Favorites';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeDetails from './pages/RecipeDetails';
import Provider from './Provider/RecipesProvider';
import RecipeInProgress from './pages/RecipeInProgress';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route path="/foods/:id/in-progress" component={ RecipeInProgress } />
        <Route path="/foods/:id" component={ RecipeDetails } />
        <Route
          path="/drinks/:id/in-progress"
          component={ RecipeInProgress }
        />
        <Route path="/drinks/:id" component={ RecipeDetails } />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </Provider>
  );
}
// /foods/{id-da-receita}/in-progress
// "/drinks/{id-da-receita}/in-progress": não possui header
export default App;
