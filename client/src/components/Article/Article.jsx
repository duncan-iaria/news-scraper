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
            tempImg = <img src={ details.image }/>
        }

        return(
            <div className="article">
                {/* renders the image if it exists, otherwise renders nothing */}
                { tempImg }

                {/* article link w/text */}
                <a href={ details.link }>
                    <h1>{ details.title }</h1>
                </a>
                <button>Delete</button>
            </div>
        )
    }
}

//=========================
// EXPORT
//=========================
export default Article;