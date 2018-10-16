import React, { Component } from 'react';
import axios from 'axios';

class City extends Component {
    constructor (props) {
        super(props);
        this.state = {
            cityName: props.match.params.name,
            cityWeather: [],
            dataLoaded: false,
            error: false
        };
    }

    // Add OpenWeather API URL, API key from environment variable and icon url 
    APIURL = `http://api.openweathermap.org/data/2.5/forecast`;
    APIKEY = `${process.env.REACT_APP_WEATHER_API_KEY}`;
    ICONURL = `http://openweathermap.org/img/w/`;

    componentDidMount () {
        this.getCityWeather(this.state.cityName);
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.cityName !== nextProps.match.params.name)
            this.getCityWeather(nextProps.match.params.name);
    } 
    
    getCityWeather(cityName) {
        // Fetch weather data 
        axios.get(`${this.APIURL}?q=${cityName}&appid=${this.APIKEY}&units=imperial`)
        .then(({data})=>{
            this.setState({
                cityWeather: data,
                dataLoaded: true,
                error: false
            });
        })
        .catch(error => {
            this.setState({
                error: true
            });
        }) ;
    }

    getFormattedDay(dayText) {
        // Return formatted date: "Month day"
        const fullDate = dayText.split(" ")[0];
        const month = fullDate.split('-')[1];
        const day = fullDate.split('-')[2];
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        return months[month] + " " + day;
    }

    render () {  
        let weatherGrid = '',
            cityTitle = '',
            weatherGridHeader = '';
        if(this.state.error) {
            // handle error returned by API 
            weatherGrid = <div className="cityError"> Please enter valid city name.</div> 
        } else if (this.state.dataLoaded) {
            // Create grid header component
            cityTitle = <div className="cityTitle"><h4><i>{this.state.cityWeather.city.name}, {this.state.cityWeather.city.country}</i></h4></div>;
            weatherGridHeader = <div className="weatherGridContainer">
                <div className="weatherGrid gridHeader" key="gridHead">
                    <div className="gridItem">DAY</div>
                    <div className="gridItem">DESCRIPTION</div>
                    <div className="gridItem">HIGH/LOW</div>
                    <div className="gridItem">WIND SPEED</div>
                    <div className="gridItem">HUMIDITY</div>
                    <div className="gridItem"></div>
                </div>
            </div>
            let buyUmbrella = false,
            buyJacket = false;
            let dayToBuyStyle = {
                backgroundColor: 'coral',
                color: 'white',
                border: '1px solid #ddd',
                borderRadius: '3vh'
            };
            const filterTime = this.state.cityWeather.list[0].dt_txt.split(' ')[1];
            let filteredTimes = this.state.cityWeather.list.filter((weather, i) => weather.dt_txt.includes(filterTime));
            weatherGrid = filteredTimes.map((weather) => {
                // Look for a day to buy umbrella or jacket depeneding on rain or snow
                if(!buyUmbrella && weather.weather[0].description.includes('rain')){
                    buyUmbrella = true;
                    weather.dayToBuy = "Umbrella time!";
                    weather.lastColumnStyle = dayToBuyStyle;
                } else if(!buyJacket && weather.weather[0].description.includes('snow')){
                    buyJacket = true;
                    weather.dayToBuy = "Jacket time!";
                    weather.lastColumnStyle = dayToBuyStyle;
                } else {
                    weather.dayToBuy = "";
                    weather.lastColumnStyle = {};
                }
                return (
                <div className="weatherGrid" key={weather.dt}>
                    <div className="gridItem">
                        <span className="weatherDay">{this.getFormattedDay(weather.dt_txt)}</span>
                        <span className="weatherIcon">
                            <img src={this.ICONURL+weather.weather[0].icon+".png"} alt="WeatherIcon" height="35" width="35"/>
                        </span>
                    </div>
                    <div className="gridItem">{weather.weather[0].description}</div>
                    <div className="gridItem">{weather.main.temp_max + "/" + weather.main.temp_min}</div>
                    <div className="gridItem">{weather.wind.speed +" mph"}</div>
                    <div className="gridItem">{weather.main.humidity +"%"}</div>
                    <div className="gridItem" style={weather.lastColumnStyle}>{weather.dayToBuy}</div>
                </div>
            )})}
        return (
            <div>
                {cityTitle}
                {weatherGridHeader}
                {weatherGrid}
            </div>
        );
    }
}

export default City;