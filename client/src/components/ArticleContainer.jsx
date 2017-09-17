import React from 'react';

//COMPONENTS
import Article from './Article';

class ArticleContainer extends React.Component
{
    render()
    {
        const articles = this.props.articles;

        return(
            <div className="article-container">
                <h1>Articles</h1>
                {
                    Object.keys( articles ).map( key => <Article key={ key } details={ articles[key] }/> )
                }	
            </div>
        )
    }
}

//=========================
// EXPORTS
//=========================
export default ArticleContainer