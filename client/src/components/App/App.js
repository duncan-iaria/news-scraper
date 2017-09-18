import React, { Component } from 'react';
import './App.css';

//COMPONENTS
import ArticleContainer from '../ArticleContainer/ArticleContainer';

class App extends Component 
{
	  
	state = { articles: [] }
	
	componentDidMount() 
	{
		//get the articles from the api
		fetch( '/api/v1/nytimes' ).then( res => res.json() ).then( articles => this.setState( { articles } ) );
	}

	render() 
	{
		const tempArticles = this.state.articles;

		return (
			<div className="App">
				<ArticleContainer articles={ tempArticles } />
			</div>
		);
	}
}

export default App;