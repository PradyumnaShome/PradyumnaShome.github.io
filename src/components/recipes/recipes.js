import React, { useState } from 'react';
import cookingData from './recipes.yaml';

import './recipes.css';

export function ImageModal(props) {
    const closeModal = () => props.setIsModalVisible(false);
    const handleKeyDown = (e) => {
        if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            closeModal();
        }
    };

    if (!props.isModalVisible || !props.recipe) {
        return null;
    }

    return <section
        className="image-modal-background"
        role="button"
        tabIndex={0}
        onClick={closeModal}
        onKeyDown={handleKeyDown}
        aria-label="Close recipe image modal"
    >
        <section
            className="image-modal-container"
            role="dialog"
            aria-modal="true"
            aria-label={props.recipe.name}
            onClick={(e) => e.stopPropagation()}
        >
            <button type="button" className="close" aria-label="Close modal" onClick={closeModal}>
                &times;
            </button>
            <img id="image-modal" src={"/images/recipes/" + props.recipe.imageUrl} alt={props.recipe.name} />
            <strong>{props.recipe.name}</strong>
        </section>
    </section>;
}

export default function Recipes() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalRecipe, setModalRecipe] = useState(null);

    if (cookingData.recipes.length === 0) {
        return null;
    }

    let onPhotoClicked = (item) => {
        setIsModalVisible(true);
        setModalRecipe(item);
    }

    return <section>
        <h3 className="subheading">Recipes</h3>
        <section className="recipe-grid">
            {cookingData.recipes.map((item, idx) => {
                return <div className="recipe-item" key={item.name ?? idx}>
                        <button
                            type="button"
                            className="recipe-image-button"
                            onClick={() => onPhotoClicked(item)}
                            aria-label={`Open photo of ${item.name}`}
                        >
                            <img className="recipe-image" src={"/images/recipes/" + item.imageUrl} alt={item.name} />
                        </button>
                        <div className="recipe-metadata">
                            <strong className="recipe-name">
                                <a href= {item.recipeUrl} target="_blank" rel="noreferrer noopener">
                                    {item.name}</a>
                            </strong>
                        </div>
                </div>
            })}
        </section>
        <ImageModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} recipe={modalRecipe}/>
    </section>
}
