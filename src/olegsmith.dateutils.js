/*global olegsmith*/
// Simulates PHP's date function
//http://jacwright.com/projects/javascript/date_format
Date.prototype.format = function (format) {
    var returnStr = '';
    var replace = Date.replaceChars;
    for (var i = 0; i < format.length; i++) {
        var curChar = format.charAt(i);
        if (replace[curChar]) {
            returnStr += replace[curChar].call(this);
        } else {
            returnStr += curChar;
        }
    }
    return returnStr;
};
Date.replaceChars = {
    // Day
    d:function () {
        return (this.getDate() < 10 ? '0' : '') + this.getDate();
    },
    D:function () {
        return olegsmith.Language.shortDays[this.getDay()];
    },
    j:function () {
        return this.getDate();
    },
    l:function () {
        return olegsmith.Language.longDays[this.getDay()];
    },
    b:function () {
        return olegsmith.Language.shortDays[this.getDay()];
    },
    N:function () {
        return this.getDay() + 1;
    },
    S:function () {
        return (this.getDate() % 10 == 1 && this.getDate() !== 11 ? 'st' : (this.getDate() % 10 == 2 && this.getDate() !== 12 ? 'nd' : (this.getDate() % 10 === 3 && this.getDate() !== 13 ? 'rd' : 'th')));
    },
    w:function () {
        return this.getDay();
    },
    z:function () {
        return "Not Yet Supported";
    },
    // Week
    W:function () {
        var onejan = new Date(this.getFullYear(), 0, 1);
        return "week " + Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
    },
    // Month
    F:function () {
        return olegsmith.Language.longMonths[this.getMonth()];
    },
    f:function () {
        return olegsmith.Language.longMonths2[this.getMonth()];
    },
    m:function () {
        return (this.getMonth() < 9 ? '0' : '') + (this.getMonth() + 1);
    },
    M:function () {
        return olegsmith.Language.shortMonths[this.getMonth()];
    },
    n:function () {
        return this.getMonth() + 1;
    },
    t:function () {
        return "Not Yet Supported";
    },
    // Year
    L:function () {
        return (((this.getFullYear() % 4 == 0) && (this.getFullYear() % 100 != 0)) || (this.getFullYear() % 400 == 0)) ? '1' : '0';
    },
    o:function () {
        return "Not Supported";
    },
    Y:function () {
        return this.getFullYear();
    },
    y:function () {
        var qwe = '' + this.getFullYear();
        return qwe.substr(qwe.length - 2, 2);
    },
    // Time
    a:function () {
        return this.getHours() < 12 ? 'am' : 'pm';
    },
    A:function () {
        return this.getHours() < 12 ? 'AM' : 'PM';
    },
    B:function () {
        return "Not Yet Supported";
    },
    g:function () {
        return this.getHours() % 12 || 12;
    },
    G:function () {
        return this.getHours();
    },
    h:function () {
        return ((this.getHours() % 12 || 12) < 10 ? '0' : '') + (this.getHours() % 12 || 12);
    },
    H:function () {
        return (this.getHours() < 10 ? '0' : '') + this.getHours();
    },
    i:function () {
        return (this.getMinutes() < 10 ? '0' : '') + this.getMinutes();
    },
    s:function () {
        return (this.getSeconds() < 10 ? '0' : '') + this.getSeconds();
    },
    // Timezone
    e:function () {
        return "Not Yet Supported";
    },
    I:function () {
        return "Not Supported";
    },
    O:function () {
        return (-this.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(this.getTimezoneOffset() / 60) < 10 ? '0' : '') + (Math.abs(this.getTimezoneOffset() / 60)) + '00';
    },
    P:function () {
        return (-this.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(this.getTimezoneOffset() / 60) < 10 ? '0' : '') + (Math.abs(this.getTimezoneOffset() / 60)) + ':' + (Math.abs(this.getTimezoneOffset() % 60) < 10 ? '0' : '') + (Math.abs(this.getTimezoneOffset() % 60));
    },
    T:function () {
        var m = this.getMonth();
        this.setMonth(0);
        var result = this.toTimeString().replace(/^.+ \(?([^\)]+)\)?$/, '$1');
        this.setMonth(m);
        return result;
    },
    Z:function () {
        return -this.getTimezoneOffset() * 60;
    },
    // Full Date/Time
    c:function () {
        return this.format("Y-m-d") + "T" + this.format("H:i:sP");
    },
    r:function () {
        return this.toString();
    },
    U:function () {
        return this.getTime() / 1000;
    }
};


Date.prototype.setISO8601 = function (string) {
    var regexp = "([0-9]{4})(-([0-9]{2})(-([0-9]{2})" +
        "(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(\.([0-9]+))?)?" +
        "(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?";
    var d = string.match(new RegExp(regexp));

    var offset = 0;
    var date = new Date(d[1], 0, 1);

    if (d[3]) {
        date.setMonth(d[3] - 1);
    }
    if (d[5]) {
        date.setDate(d[5]);
    }
    if (d[7]) {
        date.setHours(d[7]);
    }
    if (d[8]) {
        date.setMinutes(d[8]);
    }
    if (d[10]) {
        date.setSeconds(d[10]);
    }
    if (d[12]) {
        date.setMilliseconds(Number("0." + d[12]) * 1000);
    }
    if (d[14]) {
        offset = (Number(d[16]) * 60) + Number(d[17]);
        offset *= ((d[15] === '-') ? 1 : -1);
    }

    offset -= date.getTimezoneOffset();
    var time = (Number(date) + (offset * 60 * 1000));
    this.setTime(Number(time));
}


//http://spudly.shuoink.com/2008/07/04/dateadd-datesubtract-datetruncate/
Date.prototype.add = function (unit, value) {

    unit = unit.replace(/s$/).toLowerCase();

    switch (unit) {
        case "year":
            this.setYear(this.getYear() + value);
            break;
        case "month":
            this.setMonth(this.getMonth() + value);
            break;
        case "week":
            this.setTime(this.getTime() + value * 604800000);
            break;
        case "day":
            this.setTime(this.getTime() + value * 86400000);
            break;
        case "hour":
            this.setTime(this.getTime() + value * 3600000);
            break;
        case "minute":
            this.setTime(this.getTime() + value * 60000);
            break;
        case "second":
            this.setTime(this.getTime() + value * 1000);
            break;
        case "nanosecond":
        // Fall Through
        default:
            this.setTime(this.getTime() + value);
            break;
    }

    return this;
};

Date.prototype.subtract = function (/**String*/unit, /**Number*/value) {

    unit = unit.replace(/s$/).toLowerCase();

    switch (unit) {
        case "year":
            this.setYear(this.getYear() - value);
            break;
        case "month":
            this.setMonth(this.getMonth() - value);
            break;
        case "week":
            this.setTime(this.getTime() - value * 604800000);
            break;
        case "day":
            this.setTime(this.getTime() - value * 86400000);
            break;
        case "hour":
            this.setTime(this.getTime() - value * 3600000);
            break;
        case "minute":
            this.setTime(this.getTime() - value * 60000);
            break;
        case "second":
            this.setTime(this.getTime() - value * 1000);
            break;
        case "nanosecond":
            break;
        // Fall Through
        default:
            this.setTime(this.getTime() - value);
            break;
    }
};

Date.prototype.truncate = function (/**String*/unit, /**String*/to) {

    unit = unit.replace(/s$/).toLowerCase();

    switch (unit) {
        case "year":
            this.setMonth(0, 1);
            this.setHours(0, 0, 0, 0);
            break;
        case "month":
            this.setDate(1);
            this.setHours(0, 0, 0, 0);
            break;
        case "week":
            this.subtract("day", this.getDay());
            break;
        case "day":
            this.setMinutes(0, 0, 0, 0);
            break;
        case "hour":
            this.setMinutes(0, 0, 0);
            break;
        case "minute":
            this.setSeconds(0, 0);
            break;
        case "second":
            this.setMilliseconds(0);
            break;
        default:
            break;
    }

    return this;
};