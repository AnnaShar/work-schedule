var mondayOfWeek;

$(function () {
    $(".date-item__datepicker").datepicker({
        buttonText: "Pick a date",
        firstDay: 1,
        onSelect: setWeek()
        })
    });


function setWeek(date){
    var monday = new Date(date);
    var day = monday.getDay();
    if (day === 0) {
        monday.setDate(monday.getDate() - 6);
    }
    else if (day === 1) {
        monday.setDate(monday.getDate());
    }
    else if (day !== 1 && day > 0) {
        monday.setDate(monday.getDate() - (day - 1));
    }
    mondayOfWeek = monday;
    fillDates(mondayOfWeek);
    activateTimepicker();
}

function activateTimepicker() {

    $(".time-item__timepicker--from").timepicker({
        hours: {starts: 8, ends: 21},
        minutes: {interval: 10},
        defaultTime: '',
        showPeriodLabels: false,
        showCloseButton: true,
        onSelect: function () {
            debugger;
            console.log($("#"+this.id).timepicker('getHour'));
            setMinTime("#"+getPairID(this.id),$("#"+this.id).timepicker('getHour'), $("#"+this.id).timepicker('getMinute')) ;
        }
    })

    $(function () {
        $(".time-item__timepicker--to").timepicker({
            hours: {starts: 8, ends: 21},
            defaultTime: '',
            minutes: {interval: 10},
            showPeriodLabels: false,
            showCloseButton: true,
            onSelect: function () {
                setMaxTime(getPairID("#"+this.id), $("#"+this.id).timepicker('getHour'), $("#"+this.id).timepicker('getMinute'));
            }
        })

    });
}

function getPairID(id) {
    var pairID = "timepicker_";
    var index = id[11] == 'i' ? 'i' : 'a';
    index += id[12];
    index += id[13] == '0' ? '1' : '0';
    pairID += index;
    return pairID;
    console.log(pairID);
}

function setMinTime(id, hour, minute) {
    debugger;
    $(id).timepicker('option', {
            minTime: {
            hour: hour,
            minute: minute
        }
    });
}

function setMaxTime(id, hour, minute) {
    $(id).timepicker('option', {
        maxTime: {
            hour: hour,
            minute: minute
        }
    });
}

function OnHourShowCallback(hour, lowBorder, highBorder) {
    if ((hour > highBorder) || (hour < lowBorder)) {
        return false; // not valid
    }
    return true; // valid
}


function fillDates(monday) {
    for (var i = 0; i < 5; i++) {
        var dateItem = document.getElementById("date" + i);
        var date = new Date(monday);
        date = date.addDays(i);
        var month = date.getMonth() + 1;
        dateItem.innerHTML = ' ' + date.getDate() + '.' + month + '.' + date.getUTCFullYear();
    }
}

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}