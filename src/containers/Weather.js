import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'


class Weather extends Component {
    constructor(){
        super();
        this.state = {
            searchQuery: '',
            toCityWeather: false,
            toHome: false
        };
        this.placeholderText = "Search for a city";
        this.handleSearch = this.handleSearch.bind(this);
        this.handleHomeClick = this.handleHomeClick.bind(this);
    }
    
    // Clear searchquery and navigate to home page 
    handleHomeClick(e) {
        this.setState({
            toHome: true,
            toCityWeather: false,
            searchQuery:'' 
        });
        this.search.value = '';
    }

    // Navigate to show the city weather
    handleSearch(e) {
        e.preventDefault();
        if(this.search.value.length > 0){
            this.setState({
                searchQuery: this.search.value,
                toCityWeather: true,
                toHome: false
            });
        }
    }

    render () {
        let cityComponent = '';
        if(this.state.toHome) {
            cityComponent = <Redirect to={`/`} push={true}/>;
        } else if(this.state.toCityWeather) {
            // Can be redirected directly using '/city/:cityname' 
            cityComponent = <Redirect to={`/city/${this.state.searchQuery}`} push={true}/>;
        }
        return (
            <div className="weatherApp">
                <div className="weatherAppHeader">
                    <div className="weatherAppLogo" onClick={this.handleHomeClick.bind(this)}><i>WEATHER</i></div>
                    <div className="searchForm">
                        <form onSubmit={this.handleSearch}>
                            <input
                                placeholder={this.placeholderText}
                                ref={input => this.search = input}
                            />
                            <button>SEARCH</button>
                        </form>
                    </div>
                </div>
                {cityComponent}
            </div>
        ); 
    }
}

export default Weather;