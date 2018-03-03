
// JavaScript - quickly hide all console.log
// var console = {};
// console.log = function(){};

try {
    if (typeof(window.console) != "undefined") {
        window.console = {};
        window.console.log = function () {
        };
        window.console.info = function () {
        };
        window.console.warn = function () {
        };
        window.console.error = function () {
        };
    }

    if (typeof(alert) !== "undefined") {
        alert = function ()
        {

        }
    }

} catch (ex) {

}

// from datetime import datetime, date, time
// from datetime import timedelta
// from icalendar import Calendar, Event

// var m_names = ["January", "February", "March", 
// "April", "May", "June", "July", "August", "September", 
// "October", "November", "December"];
var m_names = ["Jan", "Feb", "Mar", 
"Apr", "May", "Jun", "Jul", "Aug", "Sep", 
"Oct", "Nov", "Dec"];

var d_names = ["Sunday","Monday", "Tuesday", "Wednesday", 
"Thursday", "Friday", "Saturday"];

// # set the ranges of dates

var startT1 = new Date("August 28, 2017 12:00:00");
var startT2 = new Date("August 30, 2017 12:00:00");
var finishT = new Date("December 20, 2017 12:00:00");

var date_range11;
var date_range12;
var date_range;
var sWeekdays;

var startC;
var endC;

function detectToday() {

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    } 

    if(mm<10) {
        mm = '0'+mm
    } 

    return {
        day: dd,
        month: mm,
        year: yyyy
    };

    // today = mm + '/' + dd + '/' + yyyy;
    // document.write(today);
}

function printSimpleDate(date) {

    var dd = date.getDate();
    var mm = date.getMonth()+1; //January is 0!
    var yyyy = date.getFullYear();

    var ret = "";

    if(dd<10) {
        dd = '0'+dd
    } 

    if(mm<10) {
        mm = '0'+mm
    } 

    ret = yyyy + '-' + mm + '-' + dd;
    return ret;
}

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date
//

function detectSemester(today) {

    var cur = today;
    var cyear = today.year;

    var springDateFrom = cyear + "-" + "01" + "-" + "01";
    var springDateTo = cyear + "-" + "06" + "-" + "30";

    var fallDateFrom = cyear + "-" + "07" + "-" + "01";
    var fallDateTo = cyear + "-" + "12" + "-" + "31";

    var dateCheck = "05/09/2017";

    // var d1 = dateFrom.split("/");
    // var d2 = dateTo.split("/");
    // var c = dateCheck.split("/");

    var springFrom = new Date(springDateFrom);
    var springTo   = new Date(springDateTo);
    var fallFrom = new Date(fallDateFrom);
    var fallTo   = new Date(fallDateTo);

    var check = new Date(today.year + "-" + today.month + "-" + today.day);

    var isSpring = false;
    var isFall = false;

    // spring check
    if (check >= springFrom && check <= springTo) {
        isSpring = true;
    } else {
        isFall = true;
    }
    // fall check
    // alert(check > fallFrom && check < fallTo);

    return {
        spring: isSpring,
        fall: isFall
    };

}

var todayIs = detectToday();

// https://stackoverflow.com/questions/222309/calculate-last-day-of-month-in-javascript
// https://stackoverflow.com/questions/542938/how-do-i-get-the-number-of-days-between-two-dates-in-javascript
//

function treatAsUTC(date) {
    var result = new Date(date);
    result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
    return result;
}

function daysBetween(startDate, endDate) {
    var millisecondsPerDay = 24 * 60 * 60 * 1000;
    return (treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay;
}

function daysSemester() {

    var startDate = document.getElementById("fdsDate").value;
    var endDate = document.getElementById("ldsDate").value;

    return daysBetween(startDate, endDate)+1;
}

function updateLastDay() {

    var endSDate = document.getElementById("ldsDate").value;

    var endCDate = new Date(endSDate).deductDays(6);

    console.log("endCDate: " + endCDate);

    // assign the value to html element
    document.getElementById("ldcDate").value = printSimpleDate(endCDate);
    // assign the value to global variable
    endC = endCDate;
}




function getStartDates() {

    var startDate = document.getElementById("fdsDate").value;

    var startDateDay = new Date(startDate);
    var startDateDayNum = new Date(startDate).getDay();

    var e = document.getElementById("ddWeekdays");
    var value = e.options[e.selectedIndex].value;
    var text = e.options[e.selectedIndex].text;

    // <option value="MoTu">MoTu</option>
    // <option value="MoWe">MoWe</option>
    // <option value="MoTh">MoTh</option>
    // <option value="MoFr">MoFr</option>
    // <option value="TuWe">TuWe</option>
    // <option value="TuTh">TuTh</option>
    // <option value="TuFr">TuFr</option>
    // <option value="WeTh">WeTh</option>
    // <option value="WeFr">WeFr</option>
    // <option value="ThFr">ThFr</option>

    // console.log("Selected value: " + value);
    // console.log("Selected text: " + text);

    console.log("startDateDayNum: " + startDateDayNum);

    var sday1;
    var sday2;

    switch (text) {
        case "MoTu":
            sday1 = 1;
            sday2 = 2;
            break;
        case "MoWe":
            sday1 = 1;
            sday2 = 3;
            break;
        case "MoTh":
            sday1 = 1;
            sday2 = 4;
            break;
        case "MoFr":
            sday1 = 1;
            sday2 = 5;
            break;
        case "TuWe":
            sday1 = 2;
            sday2 = 3;
            break;
        case "TuTh":
            sday1 = 2;
            sday2 = 4;
            break;
        case "TuFr":
            sday1 = 2;
            sday2 = 5;
            break;
        case "WeTh":
            sday1 = 3;
            sday2 = 4;
            break;
        case "WeFr":
            sday1 = 3;
            sday2 = 5;
            break;
        case "ThFr":
            sday1 = 4;
            sday2 = 5;
            break;
    }

    console.log("sday1: " + sday1);
    console.log("sday2: " + sday2);

    var sT1;
    var sT2;

    if (startDateDayNum == sday1) {
        console.log("case11 0");
        sT1 = startDateDay;
    } else if (startDateDayNum > sday1) {
        console.log("case12 " + (7-(startDateDayNum-sday1)));
        sT1 = startDateDay.addDays(7-(startDateDayNum-sday1));
    } else if (startDateDayNum < sday1) {
        console.log("case13");
        sT1 = startDateDay.addDays(sday1-startDateDayNum);
    }

    if (startDateDayNum == sday2) {
        console.log("case21 0");
        sT2 = startDateDay;
    } else if (startDateDayNum > sday2) {
        console.log("case22 " + (7-(startDateDayNum-sday2)));
        sT2 = startDateDay.addDays(7-(startDateDayNum-sday2));
    } else if (startDateDayNum < sday2) {
        console.log("case23");
        sT2 = startDateDay.addDays(sday2-startDateDayNum);
    }

    // var sT1 = startDateDay.addDays(sday1);
    // var sT2 = startDateDay.addDays(sday2);

    console.log("sT1: " + sT1);
    console.log("sT2: " + sT2);

    startT1 = sT1;
    startT2 = sT2;
    finishT = new Date(document.getElementById("ldsDate").value);
    console.log("finishT: " + finishT);

    if (sT1 <= sT2) {
        console.log("sT1 <= sT2");
        date_range11 = createDates(startT1, finishT);
        date_range12 = createDates(startT2, finishT);
        
    } else {
        console.log("sT1 > sT2");
        date_range11 = createDates(startT2, finishT);
        date_range12 = createDates(startT1, finishT);
        
    }

    startC = date_range11[0];
    document.getElementById("startc").innerText = printSimpleDate(startC);
    // endC   = date_range12[date_range12.length-1];
    document.getElementById("endc").innerText = printSimpleDate(endC);

    sWeekdays = createScheduleDates(startT1, startT2, finishT);

    createTable();

    console.log(startT1);
    console.log(getMinAndMax(startT1));
    console.log(startT2);
    console.log(getMinAndMax(startT2));

    // date_range11 = createDates(startT1, finishT);
    // date_range12 = createDates(startT2, finishT);

    return {
        startT1: sT1,
        startT2: sT2
    };

}



Date.prototype.addDays = function(days) {
    var dat = new Date(this.valueOf())
    dat.setDate(dat.getDate() + days);
    return dat;
}

Date.prototype.deductDays = function(days) {
    var dat = new Date(this.valueOf())
    dat.setDate(dat.getDate() - days);
    return dat;
}

function createDates(startDate, stopDate) {

    var dateArray = new Array();
    var currentDate = startDate;

    while (currentDate <= stopDate) {

        dateArray.push( new Date (currentDate) )
        currentDate = currentDate.addDays(7);

    }
    return dateArray;

}

function getMinAndMax(date) {

    var d;
    var weekdayNum;

    if (Object.prototype.toString.call(date) === "[object Date]" ) {
        d = date;
        weekdayNum = d.getDay();
    } else {
        d = new Date(date);
        weekdayNum = d.getDay();
    }
    
    // var weekdayNum = d.getDay();

    var wstart;
    var wend;

    if (weekdayNum < 5) {
        wend   = d.addDays((5-weekdayNum));
    } else if (weekdayNum == 5) {
        wend = d;
    }
    if (weekdayNum > 1) {
        wstart = d.addDays(-(weekdayNum-1));
    } else if (weekdayNum == 1) {
        wstart = d;
    }
    
    return {
        ws: wstart,
        we: wend
    };
    
}

function createScheduleDates(startDate1, startDate2, stopDate) {

    // if (sT1 <= sT2) {
    //     console.log("sT1 <= sT2");
    //     date_range11 = createDates(startT1, finishT);
    //     date_range12 = createDates(startT2, finishT);
    // } else {
    //     console.log("sT1 > sT2");
    //     date_range11 = createDates(startT2, finishT);
    //     date_range12 = createDates(startT1, finishT);
    // }

    var date_range1 = createDates(startDate1, stopDate);
    var date_range2 = createDates(startDate2, stopDate);

    // merge two arrays
    date_range = date_range1.concat(date_range2);

    // sort the array
    date_range.sort(function(a,b){return a.getTime() - b.getTime()});
    console.log(date_range)

    var weekdays = new Array();

    var weeknum = 1;
    var thisweek = true;
    // var newweek  = false;
    var wse;

    for (var i = 0; i < date_range.length; i++) {
        
        if (thisweek) {

            weekdays.push(["Week " + (weeknum), date_range[i]]);
            wse = getMinAndMax(date_range[i]);
            thisweek = false;

        } else {
            
            if (date_range[i] >= wse.ws && date_range[i] <= wse.we) {
                weekdays.push(["Week " + (weeknum), date_range[i]]);
            } else {
                weeknum += 1;
                weekdays.push(["Week " + (weeknum), date_range[i]]);
                wse = getMinAndMax(date_range[i]);
            }
        }
        // if next date belongs to the same week
        // (1) create min max dates for the same week
        //
        // if (!thisweek) {

            
        // }
        
        
    }

    console.log(weekdays)

    // create 2d array with week numbers

    // var dateArray = new Array();

    // var currentDate1 = startDate1;

    // while (currentDate1 <= stopDate) {

    //     dateArray.push( new Date (currentDate) )
    //     currentDate1 = currentDate1.addDays(7);
        
    // }
    // return dateArray;
    return weekdays;

}

// def createdates(start, finish):
//     date_range = [start]
//     base = start
//     delta = timedelta(days=7)
//     #print(base + delta)

//     while(finish>=base):

//         base += delta

//         if base <= finish:
//             #print(base)
//             date_range.append(base)

//     return date_range

function createDiv(responsetext)
{
    var _body = document.getElementsByTagName('body')[0];
    var _div = document.createElement('div');
    _div.innerHTML = responsetext;
    _body.appendChild(_div);
}




function holidays(f) {

    var hd = [];

    icalParser.parseIcal(f);
    // console.log(icalParser.icals[0].events); 
	  // console.log("ijp library");
    // console.log(icalParser.ical.events[0].dtstart);
    // console.log(icalParser.ical.events[0].dtend);
    // console.dir(icalParser.ical);
    
    for (i = 0; i < icalParser.ical.events.length; i++) { 
        // text += cars[i] + "<br>";
        hd.push(icalParser.ical.events[i]);
    }

    return hd;
}

function isHoliday(hd, curdate) {

    var da = [];

    // icalParser.parseIcal(f);
    // console.log(icalParser.icals[0].events); 
	  // console.log("ijp library");
    // console.log(icalParser.ical.events[0].dtstart);
    // console.log(icalParser.ical.events[0].dtend);
      // console.dir(icalParser.ical);
    
    for (i = 0; i < hd.length; i++) { 
        // text += cars[i] + "<br>";
        // if curdate.date() == component.get('dtstart').dt:
        //     days.append(component.get('summary').split(':')[1])
        // "20080102"

        // console.log("typeof: " + typeof hd[0].dtstart.value);
        // console.log("value: " + hd[0].dtstart.value);

        //console.log("dtsatrt is: " + hd[i].dtstart);

        if ( curdate == hd[i].dtstart.value) {
            da.push(hd[i].summary.value);
            //console.log("holiday is: " + hd[i].summary.value);
        }
    }

    return da;
}

// def isholiday(curdate):

//     g = open('../calendars/ics_2015_.ics', 'rb')
//     gcal = Calendar.from_ical(g.read())

//     days = []

//     for component in gcal.walk():
//         # print component.name
//         if component.name == "VEVENT":
//             # print component.get('summary')
//             # print component.get('dtstart').dt
//             # print component.get('dtend').dt
//             # print component.get('dtstamp')

//             # dti = datetime.strptime(component.get('dtstart').dt, "%y-%m-%d")
//             # print dti

//             # print type(component.get('dtstart').dt)
//             # <type 'datetime.date'>

//             if curdate.date() == component.get('dtstart').dt:
//                 days.append(component.get('summary').split(':')[1])


//     g.close()

//     return days


function dateToYMD(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();
    return '' + y + '' + (m<=9 ? '0' + m : m) + '' + (d <= 9 ? '0' + d : d);
}

function splitString(str) {
    
    var res = "";
    
    if (str.length>0) {
        res = str.split(":",2);
    }
    return res[1]
}

function holidayMerge(iarr) {

    var res = "";
    var arr = [];
    var str = "";

    if (iarr.length > 0) {
        for (i = 0; i < iarr.length; i++) { 

            str = splitString(iarr[i]);
            arr.push("Public Holiday: " + str);
            str = "";

        }

        res = arr.join(", ");
    }

    

    return res;
    
}

// console.log("txt: "+txt);
// console.log("str: "+str);

var hd = holidays(hdays);

function printDate(datesarray, index) {
    
    var arlen = datesarray.length;
    //console.log(arlen);

    var curdate;
    var curdateYYYYMMDD;

    var curr_date;
    var curr_month;
    var curr_day;
    var res = "";

    var da = [];

    

    // console.log("things.val: " + things.val);
    // console.log("things.val length: " + things.val.length);
    // console.log("da length: " + da.length);

    // console.log("[222] ics: " + document.getElementById('ics').value);

    if (Array.isArray(datesarray) && ((index >= 0 && index <= arlen - 1))) {

        curdate = datesarray[index];
        // console.log("curdate: "+curdate); // curdate: Mon Aug 28 2017 12:00:00 GMT+0900 (KST)
        // console.log("curdate in YMD: "+dateToYMD(curdate)); // 20170830

        curdateYYYYMMDD = dateToYMD(curdate);

        // console.log("hd length: " + hd.length);

        //console.log("things.val length: " + things.val.length); // OK
        da = isHoliday(hd, curdateYYYYMMDD);

        // console.log("da: " + da.length);

        curr_date = curdate.getDate();
        curr_month = curdate.getMonth();
        curr_day = curdate.getDay();

        // return d_names[curr_day] + ", " + curr_date
        // (m<=9 ? '0' + m : m)
        // res = m_names[curr_month] + ", " + curr_date;
        res = m_names[curr_month] + ", " + curr_date + " " + "<span style='color:red;'>"+(da.length>0 ? holidayMerge(da) : "") +"</span>";

        da = [];

    } else {
        res = "";
    }

    // console.log("res: " + res);

    return res;
}

function printArr2DVal(arr, row, col) {
    

    if (Array.isArray(arr) && (arr.length > 0 && row < arr.length) && (arr[0].length > 0 && col < arr[0].length)) {

        res = arr[row][col]

    } else {

        res = "";
    }

    // console.log("res: " + res);

    return res;
}

function printTDate(datesarray, index) {
    
    var arlen = datesarray.length;
    //console.log(arlen);

    var curdate;
    var curdateYYYYMMDD;

    var curr_date;
    var curr_month;
    var curr_day;
    var res = "";

    var da = [];

    

    // console.log("things.val: " + things.val);
    // console.log("things.val length: " + things.val.length);
    // console.log("da length: " + da.length);

    // console.log("[222] ics: " + document.getElementById('ics').value);

    if (Array.isArray(datesarray) && ((index >= 0 && index <= arlen - 1))) {

        curdate = datesarray[index];
        // console.log("curdate: "+curdate); // curdate: Mon Aug 28 2017 12:00:00 GMT+0900 (KST)
        // console.log("curdate in YMD: "+dateToYMD(curdate)); // 20170830

        curdateYYYYMMDD = dateToYMD(curdate);

        // console.log("hd length: " + hd.length);

        //console.log("things.val length: " + things.val.length); // OK
        da = isHoliday(hd, curdateYYYYMMDD);

        // console.log("da: " + da.length);

        curr_date = curdate.getDate();
        curr_month = curdate.getMonth();
        curr_day = curdate.getDay();

        // return d_names[curr_day] + ", " + curr_date
        // (m<=9 ? '0' + m : m)
        // res = m_names[curr_month] + ", " + curr_date;
        res = m_names[curr_month] + ", " + curr_date + " " + "<span style='color:red;'>"+(da.length>0 ? holidayMerge(da) : "") +"</span>";

        da = [];

    } else {
        res = "";
    }

    // console.log("res: " + res);

    return res;
}

//create JSON object from 2 dimensional Array
function arrToObject (arr){
	//assuming header
	var keys = arr[0];
	//vacate keys from main array
	var newArr = arr.slice(1, arr.length);

	var formatted = [],
    data = newArr,
    cols = keys,
    l = cols.length;
	for (var i=0; i<data.length; i++) {
			var d = data[i],
					o = {};
			for (var j=0; j<l; j++)
					o[cols[j]] = d[j];
			formatted.push(o);
	}
	return formatted;
}

function download(text, name, type) {
    var a = document.createElement("a");
    var file = new Blob([text], {type: type});
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.click();
}


function readTextFile(file, callback) {

    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

function createTable()
{
    var header = [["topic", "note"]];
    //
    var topics = [
                ["Introduction to Computers and the Internet", 
                "Readings: [<a href='#book-DDD11-5e'>book-DDD11-5e</a>], [<a href='#slides-DDD11-5e'>slides-DDD11-5e</a>, ch.1]"],

                ["Introduction to Computers and the Internet",
                "Readings: [<a href='#book-DDD11-5e'>book-DDD11-5e</a>],  [<a href='#slides-DDD11-5e'>slides-DDD11-5e</a>, ch.1]"], 

                ["HTML5. Tags, Linking, Images, Lists, Tables, Forms",
                "Readings: [<a href='#book-DDD11-5e'>book-DDD11-5e</a>],  [<a href='#slides-DDD11-5e'>slides-DDD11-5e</a>, ch.2]"],

                ["HTML5. Input types, Page elements",
                "<strong>HW1</strong>, Readings: [<a href='#book-DDD11-5e'>book-DDD11-5e</a>],  [<a href='#slides-DDD11-5e'>slides-DDD11-5e</a>, ch.2]"],

                ["HTML5. Cascading Style Sheets 1",
                "Readings: [<a href='#book-DDD11-5e'>book-DDD11-5e</a>]"],

                ["HTML5. Cascading Style Sheets 2",
                "Readings: [<a href='#book-DDD11-5e'>book-DDD11-5e</a>]"],

                ["JavaScript: Introduction to Scripting",
                "<strong>HW1</strong> Readings: [<a href='#book-DDD11-5e'>book-DDD11-5e</a>]"],

                ["JavaScript: Control Statements 1",
                "Readings: [<a href='#book-DDD11-5e'>book-DDD11-5e</a>]"],

                ["JavaScript: Control Statements 2",
                "Readings: [<a href='#book-DDD11-5e'>book-DDD11-5e</a>]"],

                ["JavaScript: Functions",
                "Readings: [<a href='#book-DDD11-5e'>book-DDD11-5e</a>]"],

                ["JavaScript: Arrays",
                "Readings: [<a href='#book-DDD11-5e'>book-DDD11-5e</a>]"],

                ["JavaScript: Objects",
                "<strong>HW2</strong>, Readings: [<a href='#book-DDD11-5e'>book-DDD11-5e</a>]"],

                ["JavaScript and Document Object Model (DOM): Objects and Collections",
                "Readings: [<a href='#book-DDD11-5e'>book-DDD11-5e</a>]"],

                ["JavaScript Event Handling",
                "Readings: [<a href='#book-DDD11-5e'>book-DDD11-5e</a>]"],

                ["HTML5. Introduction to Canvas",
                "Readings: [<a href='#book-DDD11-5e'>book-DDD11-5e</a>]"],

                ["XML 1",
                "<strong>Midterm Exam (ME)</strong>, Readings: [<a href='#book-DDD11-5e'>book-DDD11-5e</a>]"],

                ["XML 2",
                "Readings: [<a href='#book-DDD11-5e'>book-DDD11-5e</a>]"],

                ["Ajax-Enabled Rich Internet Applications 1",
                "Readings: [<a href='#book-DDD11-5e'>book-DDD11-5e</a>]"],

                ["Ajax-Enabled Rich Internet Applications 2",
                "Readings: [<a href='#book-DDD11-5e'>book-DDD11-5e</a>]"],

                ["Web Servers (Apache and IIS)",
                "<strong>HW3</strong>, Readings: [<a href='#book-DDD11-5e'>book-DDD11-5e</a>]"],

                ["Databases 1",
                "Readings: [<a href='#book-DDD11-5e'>book-DDD11-5e</a>]"],

                ["Databases 2",
                "Readings: [<a href='#book-DDD11-5e'>book-DDD11-5e</a>]"],

                ["PHP. Introduction, Arrays, Strings, Expressions",
                "Readings: [<a href='#book-DDD11-5e'>book-DDD11-5e</a>]"],

                ["PHP. Patterns, Forms, Dynamic Content",
                "Readings: [<a href='#book-DDD11-5e'>book-DDD11-5e</a>]"],

                ["PHP. Objects",
                "Readings: [<a href='#book-DDD11-5e'>book-DDD11-5e</a>]"],

                ["Web App Development with ASP.NET in C#. Introduction, Session, Case Studies",
                "<strong>HW4</strong>, Readings: [<a href='#book-DDD11-5e'>book-DDD11-5e</a>]"],

                ["Web App Development with ASP.NET in C#. Templates, Configuration, Ajax",
                "Readings: [<a href='#book-DDD11-5e'>book-DDD11-5e</a>]"],

                ["Web Services",
                "Readings: [<a href='#book-DDD11-5e'>book-DDD11-5e</a>]"],

                ["Content Management Systems 1",
                "Readings: [<a href='#book-DDD11-5e'>book-DDD11-5e</a>]"],

                ["Content Management Systems 2",
                "Readings: [<a href='#book-DDD11-5e'>book-DDD11-5e</a>]"],
                // 13 Jun
                ["Final Exam Review",
                ""],

                ["Final Exam",
                ""]
               ];

    // var str = JSON.stringify(topics);
    // console.log(str);
    // console.log (arrToObject(topics));
    // console.log (arrToObject(header.concat(topics)));
    var info = JSON.parse(JSON.stringify(arrToObject(header.concat(topics))));
    // console.log(info);
    // console.log(info[0].topic);
    // console.log(info[0].note);

    // download(JSON.stringify(info), 'topics.json', 'text/plain');
    // var jsonData;
    // readTextFile("topics.json", function(text){
    //     jsonData = JSON.parse(text);
    //     console.log("=====");
    //     // console.log(jsonData);
    //     console.log(jsonData[0].topic);
    // });

    // var file = new File(info, "hello world.txt", {type: "text/plain;charset=utf-8"});
    // FileSaver.saveAs(file);
    // var blob = new Blob(info, {type: "text/plain;charset=utf-8"});
    // FileSaver.saveAs(blob, "hello world.txt");


    document.getElementById("tabcontainer").innerHTML = "";
    
    var tablecontents = "";

    tablecontents = "<table class='tableblock frame-all grid-all' style='width: 99%;'>";
    tablecontents += "<colgroup>";
    tablecontents += "<col style='width: 14.2857%;'>";
    tablecontents += "<col style='width: 14.2857%;'>";
    tablecontents += "<col style='width: 42.8571%;'>";
    tablecontents += "<col style='width: 28.5715%;'>";
    tablecontents += "</colgroup>";
    tablecontents += "<tbody>";
    tablecontents += "<tr>";
    tablecontents += "<td class='tableblock halign-left valign-top'><p class='tableblock'>Week</p></td>";
    tablecontents += "<td class='tableblock halign-left valign-top'><p class='tableblock'>Date</p></td>";
    tablecontents += "<td class='tableblock halign-left valign-top'><p class='tableblock'>Topic</p></td>";
    tablecontents += "<td class='tableblock halign-left valign-top'><p class='tableblock'>Notes</p></td>";
    tablecontents += "</tr>";

    for (var i = 0; i < 32; i ++)
   {
        tablecontents += "<tr>";

        tablecontents += "<td class='tableblock halign-left valign-top'><p class='tableblock'>" + sWeekdays[i][0] + "</p></td>";

        tablecontents += "<td class='tableblock halign-left valign-top'><p class='tableblock'>" + printDate(date_range, i) + "</p></td>";

        tablecontents += "<td class='tableblock halign-left valign-top'><p class='tableblock'>" + printArr2DVal(topics, i, 0) + "</p></td>";

        tablecontents += "<td class='tableblock halign-left valign-top'><p class='tableblock'>" + printArr2DVal(topics, i, 1) + "</p></td>";

        tablecontents += "</tr>";
   }
   tablecontents += "</tbody>";
   tablecontents += "</table>";

   document.getElementById("tabcontainer").innerHTML = tablecontents;
}

function dw(s){document.write(s);}

// def printdate(date_range, index):

//     # \textcolor{declared-color}{text}

//     if index >= 0 and index <= (len(date_range)-1):
//         #return '{:%B %d}'.format(date_range[index])
//         #return '{:%B %d}'.format(date_range[index]) + '\n' + '{hol}'.format(hol='Public Holiday:' + ' '.join(isholiday(date_range[index])) if len(isholiday(date_range[index])) > 0 else "")
//         return '{:%B %d}'.format(date_range[index]) + '\n' + '{hol}'.format(hol=r'\textcolor{red}{Public Holiday:' + ' '.join(isholiday(date_range[index])) + '}' if len(isholiday(date_range[index])) > 0 else "")
//     else:
//         return ''


// date_range11 = createdates(startT1, finishT)
// date_range12 = createdates(startT2, finishT)

// var date_range11 = createDates(startT1, finishT);
// var date_range12 = createDates(startT2, finishT);

// console.log(date_range11);
// console.log(date_range11[1]); // 2017-09-04T03:00:00.000Z
// console.log(printDate(date_range11, 0)); // September, 4
// console.log(readSingleFile("ics_2015_.ics"));

// c11 = 0
// c12 = 0

// console.log("[2222] things.val: " + things.val);



//the passed value of object is assigned to variable
function setup(variable, v){
    //the value of variable (the object) has a property added named msg with a value of "hello world"
    variable.val = v;
}

function setValue(id, value) {
    var date = document.getElementById(id);
    date.innerHTML = value;

}

// console.log("before function myfile: " + myfile);
// readSingleFile("ics_2015_.ics", function(response)
// {
//     myfile = response;
//     // console.log("infunction myfile: " + myfile);
//     icalParser.parseIcal(myfile);
//     // console.log(icalParser.icals[0].events); 
// 	  // console.log("ijp library");
//     // console.log(icalParser.ical.events[0].dtstart);
//     // console.log(icalParser.ical.events[0].dtend);
// 	  // console.dir(icalParser.ical);
//     // console.log(icalParser.ical.events.length);
//     var re = holidays(myfile);
//     // window.allh = holidays(myfile);
//     setup(things, re);
//     // console.log("things.val length: " + things.val.length); // OK
//     // console.log("length: " + re.length);
//     // console.log("object: " + re[0]);
//     var da = isHoliday(things.val, "20171003");
//     console.log(""+da[0]);
//     console.log(""+da[1]);
// });
// console.log("allh: " + window.allh);
// console.log("last myfile: " + myfile);
