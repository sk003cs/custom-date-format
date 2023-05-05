# React Custom Date Format

## Features
- All the Moment.js format can be used

## Install
```sh
npm i custom-date-format
yarn add custom-date-format
```
## How to use?
```sh
import CustomDateFormat from 'custom-date-format';

<CustomDateFormat {...{
    value: new Date() [OR] timestamp, 
    format: "YYYY/MM/DD", 
    onChange: () => {}
}}>
```

![Custom Format](https://raw.githubusercontent.com/sk003cs/custom-date-format/main/assets/1.png "Custom Format")
<!-- ![Custom Format](/assets/2.png?raw=true "Custom Format") -->
![Custom Format](https://raw.githubusercontent.com/sk003cs/custom-date-format/main/assets/3.png "Date picker")