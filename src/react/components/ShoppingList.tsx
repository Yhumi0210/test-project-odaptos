// React
import { useContext } from 'react';

// Context
import { AppContext } from '../context/AppContext.tsx';

// Dépendances
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function ShoppingList() {
  const app = useContext(AppContext);
  if (!app) {
    throw new Error('ShoppingList must be used within an AppProvider');
  }
  const { shoppingList, removeFromShoppingList } = app;

  // Fonction pour exporter la liste en PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Liste de Courses', 10, 10);

    // 📌 Définir un en-tête coloré
    doc.setFillColor(255, 85, 93); // Rouge clair
    doc.rect(0, 0, 210, 30, 'F'); // Rectangle plein
    doc.setTextColor(234, 234, 234); // Texte blanc
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Liste de Courses', 15, 20);

    // 🎨 Rétablir les couleurs et la police
    doc.setTextColor(38, 40, 43); // Noir
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');

    // 📦 Si la liste est vide
    if (shoppingList.length === 0) {
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(14);
      doc.text('Votre liste de courses est vide.', 15, 50);
    } else {
      const data = shoppingList.map((ingredient) => ['O', ingredient.name]);

      autoTable(doc, {
        head: [['X', 'Ingrédient']],
        body: data,
        startY: 40,
        theme: 'striped',
        styles: { fontSize: 12, cellPadding: 5 },
        headStyles: {
          fillColor: [255, 85, 93],
          textColor: 255,
          fontStyle: 'bold',
        },
        alternateRowStyles: { fillColor: [234, 234, 234] },
      });
    }

    doc.save('Liste-de-courses.pdf');
  };

  return (
    <div>
      <h2>Liste de courses :</h2>
      {shoppingList.length === 0 ? (
        <p>Aucun ingrédient dans la liste de courses.</p>
      ) : (
        <ul>
          {shoppingList.map((ingredient) => (
            <li key={ingredient.id}>
              {ingredient.name}
              <button onClick={() => removeFromShoppingList(ingredient.id)}>
                ❌
              </button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={exportToPDF}>Exporter ma liste en PDF</button>
    </div>
  );
}
