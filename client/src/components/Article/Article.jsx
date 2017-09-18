import React from 'react';
import './Article.css';

class Article extends React.Component
{
    render()
    {
        //article object passed in
        const details = this.props.details;
        let tempImg = null;
        
        if( details.image )
        {
            tempImg = <img className="article-img" src={ details.image }/>
        }

        return(
            <div className="article">
                {/* renders the image if it exists, otherwise renders nothing */}
                <div className="article-img-container">
                    { tempImg }
                </div>

                {/* article link w/text */}
                <div className="article-link-container">
                    <a href={ details.link }>
                        { details.title }
                    </a>
                    <button>Delete</button>
                </div>
            </div>
        )
    }
}

//=========================
// EXPORT
//=========================
export default Article;