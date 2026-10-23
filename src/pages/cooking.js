import React from 'react';
import Seo from '../components/Seo'
import Layout from '../components/layout'
import Header from '../components/header/header'
import Recipes from '../components/recipes/recipes'

export default function Cooking() {
        return (
            <Layout className="cooking-page">
                <Seo title="Cooking | Pradyumna Shome" description="Food photographs and recipe links from Pradyumna Shome’s kitchen." path="/cooking/" collection />

                <Header compact />

                <main id="main" className="cooking-content">
                    <section id="intro" className="main special">
                        <div className="spotlight">
                            <div className="content">
                                <header className="major">
                                    <h1>Cooking</h1>
                                </header>
                                <Recipes/>
                            </div>
                        </div>
                    </section>
                </main>
            </Layout>
        )
}