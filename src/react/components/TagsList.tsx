// @ts-expect-error TS6133: React is declared but its value is never read. I need to use it for Jest
// React & React-Router-DOM
import React from 'react';

// Hooks & Effects
import { useState } from 'react';

// Components
import CreateTag from './reusable/CreateTag.tsx';

export default function TagsList({
  availableTags,
  selectedTags,
  onTagSelect,
}: {
  availableTags: string[];
  selectedTags: string[];
  onTagSelect: (selectedTags: string[]) => void;
}) {
  const [tagsList, setTagsList] = useState(false);

  const clickOnTag = (tag: string) => {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    onTagSelect(updatedTags);
    localStorage.setItem('selectedTags', JSON.stringify(updatedTags));
  };

  return (
    <section className="searchTag">
      <div className="searchTag__container" onClick={() => setTagsList(!tagsList)}>
        <p className="searchTag__container__placeholder">Recherche par tag</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`size-6 searchTag__container__icon ${tagsList ? 'rotated' : ''}`}
          data-testid="tag-list-icon"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </div>

      {/* Liste des tags */}
      {tagsList && (
        <ul className="searchTag__list is-taglist-open">
          {availableTags.map((tag) => (
            <li
              key={tag}
              className={`searchTag__list__item ${selectedTags.includes(tag) ? 'selected' : ''}`}
              onClick={() => {
                clickOnTag(tag);
                setTagsList(false);
              }}
            >
              {tag}
            </li>
          ))}
        </ul>
      )}

      {/* Tags sélectionnés */}
      {selectedTags.length > 0 && (
        <div className="searchTag__selected">
          {selectedTags.map((tag) => (
            <CreateTag key={tag} onClick={() => clickOnTag(tag)} tag={tag} />
          ))}
        </div>
      )}
    </section>
  );
}
