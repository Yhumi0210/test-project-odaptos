// React
import { useState, useContext } from 'react';

// Context
import { AppContext } from '../context/AppContext.tsx';

export default function Fridge() {
  const [ingredientName, setIngredientName] = useState<string>('');
  const app = useContext(AppContext);
  if (!app) {
    throw new Error('Fridge must be used within an AppProvider');
  }
  const { fridge, addIngredient, removeIngredient } = app;

  const handleAddIngredient = () => {
    if (ingredientName.trim() === '') {
      alert('Veuillez remplir le champ');
      return;
    }
    addIngredient(ingredientName);
    setIngredientName('');
  };

  return (
    <>
      <h2>Voyons ce qu'on a dans le frigo :</h2>
      <input
        onChange={(e) => setIngredientName(e.target.value)}
        value={ingredientName}
        type="text"
        placeholder="Nom de l'ingrédient"
      />
      <button onClick={handleAddIngredient}>Ajouter</button>
      <h3>Liste des ingrédients :</h3>
      <ul>
        {fridge.map((ingredient) => (
          <li key={ingredient.id}>
            {ingredient.name}
            <button onClick={() => removeIngredient(ingredient.id)}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
