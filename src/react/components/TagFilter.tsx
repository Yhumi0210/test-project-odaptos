// React
import { useState, useEffect } from 'react';

// Components
import TagComponent from './common/TagComponent.tsx';

export default function TagFilter({
  availableTags,
  selectedTags,
  onTagSelect,
}: {
  availableTags: string[];
  selectedTags: string[];
  onTagSelect: (selectedTags: string[]) => void;
}) {
  const [showTags, setShowTags] = useState<boolean>(false);
  const [localSelectedTags, setLocalSelectedTags] =
    useState<string[]>(selectedTags);

  useEffect(() => {
    setLocalSelectedTags(selectedTags); //
  }, [selectedTags]);

  const handleTagClick = (tag: string) => {
    let updatedTags;
    if (localSelectedTags.includes(tag)) {
      updatedTags = localSelectedTags.filter((t) => t !== tag);
    } else {
      updatedTags = [...localSelectedTags, tag];
    }
    setLocalSelectedTags(updatedTags);
    onTagSelect(updatedTags);
    localStorage.setItem('selectedTags', JSON.stringify(updatedTags));
  };

  return (
    <section className="searchTag">
      <div
        className="searchTag__container"
        onClick={() => setShowTags(!showTags)}
      >
        <p className="searchTag__container__placeholder">Recherche par tag</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`size-6 searchTag__container__icon ${showTags ? 'rotated' : ''}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>
      {/* Tags list */}
      {showTags && (
        <ul className="searchTag__list">
          {availableTags.map((tag) => (
            <li
              key={tag}
              className={`searchTag__list__item ${
                selectedTags.includes(tag) ? 'selected' : ''
              }`}
              onClick={() => {
                handleTagClick(tag);
                setShowTags(false);
              }}
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
      {/* Tags selectionnés */}
      <div className="searchTag__selected">
        {selectedTags.length > 0 &&
          selectedTags.map((tag) => (
            <TagComponent
              key={tag}
              onClick={() => handleTagClick(tag)}
              tag={tag}
            />
          ))}
      </div>
    </section>
  );
}
