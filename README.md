# Calendar.js

## Description

Calendar.js - javascript library, which helps you in creating calendars on your web pages. You just need to write a line of code to create calendar.

It's quick start guide for Calendar.js. Here you can read short documentation about library.

1. [Description](#description)
1. [Code Examples](#code-examples)
1. [Motivation](#motivation)
1. [Installation](#installation)
1. [API Reference](#api-reference)
   - [Enabling](#enabling)
   - [Methods](#methods)
   - [Events](#events)
1. [Contributing](#contributing)
1. [License](#license)


## Code Examples

You can create calendar and enable buttons for changing months easily and fast, just write this code:

```javascript
var calendar = new Calendar("#calendar", 9, 2016);  // creating calendar with september of 2016 in block with id="calendar"
    
var btn0 = document.querySelector('.button0'); // it's first button
var btn1 = document.querySelector('.button1'); // it's second button

btn0.onclick = function () {
  calendar.prevMonth(); // change month to the previous by pressing the button
};
    
btn1.onclick = function () {
  calendar.nextMonth(); // change month to the next by pressing the button
};
```

## Motivation

Idea of Calendar.js borned in April of 2017. I've been making a website, and I needed to realize calendar on this website. So, then i thought that I can make javascript library, which will help in creating calendars. I really hope that my lib can help people. Creating of this library started in the same month. Now this project is in active development.

## Installation
Download this library and put it in you directory, then connect it in HTML file:

```html
<script src="calendar.js"></script>
```

## API Reference

## Enabling

### new Calendar (cssSelector, month, year, daysArr, monthsArr)

creates and displays calendar for `month` of `year` in element which selector equals `cssSelector`

__arguments__: 
- cssSelector - string - css selector of block in which will append calendar
- month - number - the number of the month which will be displayed in the calendar
- year - number - the number of the year which will be displayed in the calendar
- daysNames (optional) - array - an array with the names of the days of the week
- monthNames (optional) - array - an array with the names of the months of the year

__example__:

```javascript
var calendar = new Calendar("#calendar", 6, 2017);
```

## Methods

### nextMonth()

displays next month and returns it

__returning value__: 
- month - number

__example__:

```javascript
var cal = new Calendar('#cal', 5, 2013);
cal.nextMonth(); // 6
```

### prevMonth()

displays previous month and returns it

__returning value__: 
- month - number

__example__:

```javascript
var cal = new Calendar('#cal', 8, 2007);
cal.prevMonth(); // 7
```

### setMonth(month)

sets month, returns and displays it

__arguments__: 
- month - number

__returning value__: 
- month - number


__example__:

```javascript
var cal = new Calendar('#cal', 3, 2010);
cal.setMonth(10); // 10
```

### getMonth()

returns current month

__returning value__: 
- month - number

__example__:

```javascript
var cal = new Calendar('#cal', 1, 2014);
cal.getMonth(); // 1
```

### getMonthName()

returns name of current month

__returning value__: 
- month name - string

__example__:

```javascript
var cal = new Calendar('#cal', 7, 2020);
cal.getMonthName(); // July
```

### nextYear()

displays next year and returns it

__returning value__: 
- year - number

__example__:

```javascript
var cal = new Calendar('#cal', 3, 1968);
cal.nextYear(); // 1969
```

### prevYear()

displays previous year and returns it

__returning value__: 
- year - number

__example__:

```javascript
var cal = new Calendar('#cal', 8, 1975);
cal.prevYear(); // 1974
```

### setYear(year)

sets year, returns and displays it

__arguments__: 
- year - number

__returning value__: 
- year - number

__example__:

```javascript
var cal = new Calendar('#cal', 2, 2017);
cal.setYear(2003); // 2003
```

### getYear()

returns current year

__returning value__: 
- year - number

__example__:

```javascript
var cal = new Calendar('#cal', 6, 2012);
cal.getYear(); // 2012
```

## Events

### ondateclick(func, classArr)

calls function when client clicks on dateElement in calendar and adds classes from classArr to dateElement

function gets arguments: day, month, year

__arguments__: 
- func (day, month, year) - function
- classArr - array

__func arguments__:
- day - number
- month - number
- year - number

__example__:

```javascript
var cal = new Calendar('#cal', 6, 2012);
cal.ondateclick(function (day, month, year) {
  console.log("It's " + day + "." + month + "." + year);
}, ['date--active']);
```

### Stylization

You can make styles for your calendar. It's easy, because calendar has simple structure:

```html
<div id="calendar">  <!-- it's calendar's wrapper block -->
  <table>
    <tr>
      <th></th>  <!-- here is 7 <th> elements with names of the days of the week -->
    </tr>
    <tr>  <!-- here is one of <tr> elements with days -->
      <td></td>  <!-- and here one of 7 <td> elements with numbers of days, which located in <tr> element -->
    </tr> 
  </table>
</div>
```

### Example

Part of HTML-code:

```html
<section class="calendar-wrapper">
  <div class="calendar-header">
    <span class="button0"><</span>
    <span class="month-name"></span>
    <span class="button1">></span>
  </div>
  <div id="calendar"></div>
</section>
```

Part of CSS-code:

```css
.calendar-wrapper * {
  box-sizing: border-box;
}

.calendar-wrapper {
  text-align: center;
  width: 245px;
}

.calendar-header {
  background-color: rgb(93, 179, 127);
  color: white;
  padding: 15px;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
}
        
#calendar table {
  border-collapse: collapse;
  background-color: white;
}

#calendar tr:nth-child(1) {
  background-color: rgb(93, 179, 127);
}

#calendar th {
  padding: 2px;
  font-weight: normal;
  color: white;
  font-size: 14px;
  margin-bottom: 5px;
  width: 35px;
}

#calendar td {
  width: 35px;
  height: 35px;
  border-radius: 50%;
}

.date--active {
  background-color: rgb(93, 179, 127);
  color: white;
}
```

Part of JS-code:

```javascript
var calendar = new Calendar("#calendar", 9, 2016);
    
var div = document.querySelector('.month-name');
var btn0 = document.querySelector('.button0');
var btn1 = document.querySelector('.button1');

setInterval(function () {
  div.innerHTML = calendar.getMonthName() + ' ' + calendar.getYear();
}, 4);

btn0.onclick = function () {
  calendar.prevMonth();
};
    
btn1.onclick = function () {
  calendar.nextMonth();
};
    
calendar.ondateclick(function (day, month, year) {
  console.log("It's " + day + "." + month + "." + year);
}, ['date--active']);
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT License

Copyright (c) 2017 Nikita Ermishin
