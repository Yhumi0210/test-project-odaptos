// React
import { useState, useEffect } from 'react';

export default function SearchBar({
  onSearch,
  initialSearchText,
}: {
  onSearch: (text: string) => void;
  initialSearchText: string;
}) {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>(
    () => localStorage.getItem('searchText') || ''
  );
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const handleAnimationEnd = () => {
    setIsAnimating(false);
    setSearchOpen(!searchOpen);
  };

  useEffect(() => {
    setSearchText(initialSearchText);
  }, [initialSearchText]);

  useEffect(() => {
    if (searchText.length > 0) {
      onSearch(searchText);
    }
    localStorage.setItem('searchText', searchText);
  }, [searchText]);

  return (
    <div
      className={`search ${searchOpen ? 'is-search-open' : isAnimating ? 'is-search-closed' : ''}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6 search__icon"
        onClick={() => {
          setShowSearch(!showSearch);
          handleAnimationEnd();
        }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
      {showSearch && (
        <>
          <input
            type="text"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              onSearch(e.target.value);
            }}
            placeholder="Recette ou ingrédient"
            className="search__input"
          />
        </>
      )}
    </div>
  );
}
