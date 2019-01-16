var mondayOfWeek;
var currentWeek = [];

$(function () {
    $(".date-item__datepicker").datepicker({
        buttonText: "Pick a date",
        firstDay: 1,
        onSelect: function(date) {
            setWeek(date)
        }
    });
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

function activateTimepicker() {

    $(".time-item__timepicker--from").mdtimepicker({
        readOnly: true,
        format: 'hh:mm',
        hourPadding: false,
        theme:'purple'
    }).on('timechanged', function(e){
        var fromTime1 = e.value;
        var toTime = $("#"+getPairID(this.id))[0].defaultValue;
        if (!isTimeValid(fromTime1, toTime)){
            $("#"+this.id)[0].defaultValue=0;
            alert("Time FROM must be less the time TO");

        }
    });

    $(".time-item__timepicker--to").mdtimepicker({
        readOnly: true,
        format: 'hh:mm',
        hourPadding: false
    }).on('timechanged', function(e){
        var fromTime = $("#"+getPairID(this.id))[0].defaultValue;
        var toTime = e.value;
        if (!isTimeValid(fromTime, toTime)){
            $("#"+this.id).value="";
            alert("Time FROM must be less the time TO");
        }
    });
}


function isTimeValid(fromTime,toTime ){
    console.log(fromTime);
    if( fromTime==="" || toTime==="")
        return true;
        if (fromTime >= toTime)
            return false;

    return true;
}


function getPairID(id) {
    var pairID = "timepicker_";
    var index = id[11] === 'i' ? 'i' : 'a';
    index += id[12];
    index += id[13] === '0' ? '1' : '0';
    pairID += index;
    console.log(pairID);

    return pairID;
}

