import React, { useState } from 'react';
import cookingData from './recipes.yaml';

import './recipes.css';

export function ImageModal(props) {
    if (props.isModalVisible) {
        return <section className="image-modal-background" onClick={() => props.setIsModalVisible(false)}>
            <section className="image-modal-container">
                <span className="close">&times;</span>
                <img id="image-modal" src={"/images/recipes/" + props.recipe.imageUrl} onClick={() => {}}/>
                <strong>{props.recipe.name}</strong>
            </section>
        </section>;
    } else {
        return null;
    }
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
                return <div className="recipe-item">
                        <img className="recipe-image" src={"/images/recipes/" + item.imageUrl} onClick={() => onPhotoClicked(item)}/>
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