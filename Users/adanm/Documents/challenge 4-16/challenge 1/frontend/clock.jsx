import React from "react";

export default class Clock extends React.Component{
    constructor(props){
        super(props);
        this.state = {hours: 0, minutes: 0, seconds: 0,
            alarm: {hours: 0, minutes: 0},
            alerted: false
        };
        this.handleTick = this.handleTick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    render(){
        return <div className="clock">
                {this.formatTime(this.state)}
                <label hrmlFor="alarm-input">
                Alarm
                    <input id="alarm-input" type='time' onChange={this.handleInputChange}/>
                </label>
            </div>
    }
    componentDidMount(){
        this.updateTime();
        this.intervalHandle = setInterval(this.handleTick, 1000);
    }
    componentWillUnmount(){
        clearInterval(this.intervalHandle);
    }
    checkAlarm(){
        if(this.state.hours === this.state.alarm.hours &&
            this.state.minutes === this.state.alarm.minutes &&
            !this.state.alerted){
                this.triggerAlarm();
            }
    }
    triggerAlarm(){
        alert("its time");
        this.setState(Object.assign({}, {alerted: true}));
    }
    handleInputChange(e){
        const values = e.target.value.split(":");
        const  hours = parseInt(values[0]);
        const minutes = parseInt(values[1]);
        this.setState(
            Object.assign({}, this.state, {alarm:{hours, minutes}, alerted: false})
        )
    }
    updateTime(){
        const now = new Date();
        if(now.getHours() != this.state.hours){
            this.setState(Object.assign({}, {alerted: false}));
        }
        this.setState(
            Object.assign({},this.state,
            {
            hours: now.getHours(),
            minutes: now.getMinutes(),
            seconds: now.getSeconds()}
        ));
    }
    handleTick(){
        this.updateTime();
        this.checkAlarm();
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
