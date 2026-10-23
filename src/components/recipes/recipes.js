import React, { useEffect, useRef, useState } from 'react';
import cookingData from './recipes.yaml';
import ResponsiveImage from '../ResponsiveImage';
import './recipes.css';

export function ImageModal({ isModalVisible, setIsModalVisible, recipe }) {
    const dialog = useRef(null);
    const close = useRef(null);
    useEffect(() => {
        if (!isModalVisible || !recipe) return undefined;
        const previousFocus = document.activeElement;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        close.current?.focus();
        const onKeyDown = event => {
            if (event.key === 'Escape') {
                event.preventDefault();
                setIsModalVisible(false);
            }
            if (event.key === 'Tab') {
                const controls = [...dialog.current.querySelectorAll('button, a[href]')];
                const first = controls[0];
                const last = controls[controls.length - 1];
                if (event.shiftKey && (document.activeElement === first || !dialog.current.contains(document.activeElement))) {
                    event.preventDefault(); last.focus();
                } else if (!event.shiftKey && (document.activeElement === last || !dialog.current.contains(document.activeElement))) {
                    event.preventDefault(); first.focus();
                }
            }
        };
        const containFocus = event => {
            if (!dialog.current.contains(event.target)) close.current?.focus();
        };
        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('focusin', containFocus);
        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.removeEventListener('focusin', containFocus);
            document.body.style.overflow = previousOverflow;
            previousFocus?.focus();
        };
    }, [isModalVisible, recipe, setIsModalVisible]);
    if (!isModalVisible || !recipe) return null;
    return <div className="image-modal-background" onClick={event => {
        if (event.target === event.currentTarget) setIsModalVisible(false);
    }}>
        <section ref={dialog} className="image-modal-container" role="dialog" aria-modal="true" aria-labelledby="recipe-photo-title">
            <button ref={close} type="button" className="recipe-modal-close" aria-label="Close photo" onClick={() => setIsModalVisible(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
            </button>
            <ResponsiveImage imageKey={'/images/recipes/' + recipe.imageUrl} alt={recipe.name} id="image-modal" loading="eager" sizes="(max-width: 750px) 90vw, 80vw" maxWidth={1600} />
            <h3 id="recipe-photo-title">{recipe.name}</h3>
            <a className="recipe-original" href={'/images/recipes/' + recipe.imageUrl} target="_blank" rel="noreferrer">Open original photo</a>
        </section>
    </div>;
}

function validRecipeUrl(value) {
    try { return ['http:', 'https:'].includes(new URL(value).protocol); } catch { return false; }
}

export default function Recipes() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalRecipe, setModalRecipe] = useState(null);
    if (cookingData.recipes.length === 0) return null;
    const categories = cookingData.categories.map(category => ({
        ...category,
        recipes: cookingData.recipes.filter(recipe => recipe.category === category.id),
    })).filter(category => category.recipes.length > 0);
    if (categories.reduce((count, category) => count + category.recipes.length, 0) !== cookingData.recipes.length) {
        throw new Error('Every cooking photo must belong to one listed category');
    }
    return <section className="cooking-collection" aria-label="Cooking collection">
        <p className="cooking-intro">Things I’ve cooked and baked, from breakfast to something sweet.</p>
        <nav className="cooking-categories" aria-label="Browse cooking categories">
            <ul>{categories.map(category => <li key={category.id}>
                <a href={'#' + category.id}>{category.name}</a>
            </li>)}</ul>
        </nav>
        {categories.map((category, groupIndex) => <section className="recipe-category" id={category.id} key={category.id} aria-labelledby={category.id + '-title'}>
            <h2 id={category.id + '-title'}>{category.name}</h2>
            <ul className="recipe-grid">
                {category.recipes.map((item, idx) => <li className="recipe-item" key={item.imageUrl}>
                <button type="button" className="recipe-image-button" onClick={() => { setModalRecipe(item); setIsModalVisible(true); }} aria-label={`Open photo of ${item.name}`} aria-haspopup="dialog">
                    <ResponsiveImage className="recipe-image" imageKey={'/images/recipes/' + item.imageUrl} alt={item.name} sizes="(max-width: 360px) calc(100vw - 32px), (max-width: 480px) calc(100vw - 80px), (max-width: 736px) calc(70vw - 64px), (max-width: 750px) calc(70vw - 96px), (max-width: 980px) calc(21.333333vw - 32px), (max-width: 1280px) calc(21.333333vw - 42.666667px), calc(21.333333vw - 53.333333px)" maxWidth={1080} loading={groupIndex === 0 && idx < 3 ? 'eager' : 'lazy'} fetchPriority={groupIndex === 0 && idx < 3 ? 'high' : undefined} />
                </button>
                <div className="recipe-metadata">
                    <strong className="recipe-name">{item.name}</strong>
                    {validRecipeUrl(item.recipeUrl) && <a className="recipe-source" href={item.recipeUrl} target="_blank" rel="noreferrer noopener" aria-label={`Recipe for ${item.name} (opens in a new tab)`}>Recipe</a>}
                </div>
                </li>)}
            </ul>
        </section>)}
        <ImageModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} recipe={modalRecipe} />
    </section>;
}
