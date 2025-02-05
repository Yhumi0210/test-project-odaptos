// Types
interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  image: string;
  description: string;
  tags: string[];
}

export default function ClearSearchAndTags({
  setSelectedTags,
  setSearchText,
  setFoundRecipes,
  recipes,
}: {
  setSelectedTags: (tags: string[]) => void;
  setSearchText: (text: string) => void;
  setFoundRecipes: (recipes: Recipe[]) => void;
  recipes: Recipe[];
}) {
  const clearFilters = () => {
    localStorage.removeItem('selectedTags');
    localStorage.removeItem('searchText');

    setSelectedTags([]);
    setSearchText('');
    setFoundRecipes(recipes);
  };

  return (
    <div className="clearSearchAndTags">
      <svg
        onClick={clearFilters}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="clearSearchAndTags__icon"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    </div>
  );
}
