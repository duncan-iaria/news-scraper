import React, { Component } from 'react';
import './App.css';

//COMPONENTS
import Article from './Article';

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
				<h1>Articles</h1>
				{
					Object.keys( tempArticles ).map( key => <Article key={ key } details={ tempArticles[key] }/> )
				}			
			</div>
		);
	}
}

export default App;