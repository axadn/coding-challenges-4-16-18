import React from "react";

export default class Clock extends React.Component{
    constructor(props){
        super(props);
        this.state = {hours: 0, minutes: 0, seconds: 0};
        this.updateTime = this.updateTime.bind(this);
    }
    render(){
        return <div>
                {this.formatTime(this.state)}
            </div>
    }
    componentDidMount(){
        this.updateTime();
        this.intervalHandle = setInterval(this.updateTime, 1000);
    }
    componentWillUnmount(){
        clearInterval(this.intervalHandle);
    }
    updateTime(){
        const now = new Date();
        this.setState({
            hours: now.getHours(),
            minutes: now.getMinutes(),
            seconds: now.getSeconds()
        });
    }
    formatTime({hours, minutes, seconds}){
        const ampm = hours >= 12 && hours ? "PM" : "AM";
        hours = hours % 12;
        if(hours == 0) hours = 12;
        return `${this.padNumber(hours)}: ${this.padNumber(minutes)} : ${this.padNumber(seconds)} ${ampm}`;
    }

    padNumber(num){
        return `${num < 10 ? "0": ""}${num}`;
    }
}
