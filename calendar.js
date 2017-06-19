function Calendar (cssSelector, month, year, daysArr, monthsArr) {
    this._checkArgumentsError(cssSelector, month, year);

    this._elem = document.querySelector(cssSelector);

    this._checkElementError(this._elem);

    this._month = month;
    this._year = year;

    this._daysNames = daysArr || ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    this._monthsNames = monthsArr || ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this._main();
}

Calendar.prototype._main = function() {
    var elem = this._elem;
    elem.innerHTML = null;

    this._mon = this.getMonth() - 1; //months in JS starts from 0
    this._date = new Date(this.getYear(), this._mon);

    this._table = document.createElement('table');
    this._tr = document.createElement('tr');

    this._addHeader();

    this._tr = document.createElement('tr');

    this._addFirstDays();
    this._addDay();
    this._addLastDays();

    elem.appendChild(this._table);
};

Calendar.prototype._checkArgumentsError = function(cssSelector, month, year) {
    if (cssSelector === undefined || month === undefined || year === undefined) {
        throw new Error('Incorrect value for arguments');
    }

    if (typeof cssSelector !== 'string') {
        throw new Error('Incorrect value for cssSelector, use string ');
    }

    this._checkMonthError(month);

    this._checkYearError(year);
};

Calendar.prototype._checkElementError = function(elem) {
    if (elem === null) {
        throw new Error('No element with such cssSelector');
    }
};

Calendar.prototype._addHeader = function() {
    for (var i = 0; i !== this._daysNames.length; i++) {
        var th = document.createElement('th');
        th.textContent = this._daysNames[i];
        this._tr.appendChild(th);
    }
    this._table.appendChild(this._tr);
};

Calendar.prototype._addFirstDays = function() {
    for (var i = 0; i < this._getDay(this._date); i++) {
        var td = document.createElement('td');
        this._tr.appendChild(td);
    }
};

Calendar.prototype._addDay = function() {
    while (this._date.getMonth() === this._mon) {
        var td = document.createElement('td');
        td.textContent = this._date.getDate();
        this._tr.appendChild(td);

        if (this._getDay(this._date) % 7 === 6) {
            this._table.appendChild(this._tr);
            this._tr = document.createElement('tr');
        }

        this._date.setDate(this._date.getDate() + 1);
    }
};

Calendar.prototype._addLastDays = function() {
    if (this._getDay(this._date) === 0) {
        return;
    }
    for (var i = this._getDay(this._date); i < 7; i++) {
        var td = document.createElement('td');
        this._tr.appendChild(td);

    }
    this._table.appendChild(this._tr);
};

Calendar.prototype._getDay = function(date) {
    var day = date.getDay();
    if (day === 0) day = 7;
    return day - 1;
};

Calendar.prototype._checkMonthError = function(month) {
    if (typeof month !== 'number' || month < 1 || month > 12) {
        throw new Error('Incorrect value for month, use number bigger than 0 and less than 13');
    }
};

Calendar.prototype.nextMonth = function() {
    if (this._month !== 12) {
        this._month++;
    }
    else {
        this._year++;
        this._month = 1;
    }

    this._render();
    return this.getMonth();
};

Calendar.prototype.prevMonth = function() {
    if (this._month !== 1) {
        this._month--;
    }
    else {
        this._year--;
        this._month = 12;
    }

    this._render();
    return this.getMonth();
};

Calendar.prototype.setMonth = function(value) {
    this._checkMonthError(value);

    this._month = value;
    this._render();
    return this.getMonth();
};

Calendar.prototype.getMonth = function() {
    return this._month;
};

Calendar.prototype.getMonthName = function() {
    return this._monthsNames[this._month - 1];
};

Calendar.prototype._checkYearError = function(year) {
    if (typeof year !== 'number') {
        throw new Error('Incorrect value for year, use number');
    }
};

Calendar.prototype.nextYear = function() {
    this._year++;
    this._render();
    return this.getYear();
};

Calendar.prototype.prevYear = function() {
    this._year--;
    this._render();
    return this.getYear();
};

Calendar.prototype.setYear = function(value) {
    this._checkYearError(value);

    this._year = value;
    this._render();
    return this.getYear();
};

Calendar.prototype.getYear = function() {
    return this._year;
};

Calendar.prototype.ondateclick = function(func, cssClassArray) {
    if (typeof func !== 'function' || typeof cssClassArray !== 'object') {
        throw new Error('Incorrect value for event');
    }

    this._callback = func;
    this._cssClassArray = cssClassArray;
    var elements = this._elem.querySelectorAll('td');
    var self = this;

    elements.forEach(function(element) {
        if (!element.innerHTML.trim()) {
            return;
        }

        element.onclick = function() {
            self._clickFunc(elements, element);
        };
    });
};

Calendar.prototype._clickFunc = function(elements, element) {
    //clean classes
    this._cleanElementsClasses(elements);

    //preparing arguments
    var day = +element.textContent;
    var month = this.getMonth();
    var year = this.getYear();

    //add classes
    this._addElementClasses(element);

    //callback
    this._callback(day, month, year);
};

Calendar.prototype._cleanElementsClasses = function(elements) {
    for (var i = 0; i !== elements.length; i++) { // i - element
        for (var j = 0; j !== this._cssClassArray.length; j++) { // j - class
            elements[i].classList.remove(this._cssClassArray[j]); //removing class
        }
    }
};

Calendar.prototype._addElementClasses = function(element) {
    for (var i = 0; i !== this._cssClassArray.length; i++) {
        element.classList.add(this._cssClassArray[i]);
    }
};

Calendar.prototype._render = function() {
    this._main();
    this.ondateclick(this._callback, this._cssClassArray);
};
