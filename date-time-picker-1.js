var mondayOfWeek;
var currentWeek = [];

$(function () {
    $(".date-item__datepicker").datepicker({
        buttonText: "Pick a date",
        firstDay: 1,
        onSelect: function (date) {
            var d = new Date(date);
            var index = d.getDay();
            if (index === 0) {
                d.setDate(d.getDate() - 6);
            }
            else if (index === 1) {
                d.setDate(d.getDate());
            }
            else if (index !== 1 && index > 0) {
                d.setDate(d.getDate() - (index - 1));
            }
            mondayOfWeek = d;
            fillDates(mondayOfWeek);
            activateTimepicker();
        }

    });
});

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
            alert("Time FROM must be less the time TO");
            $(this.id).value="";
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
            alert("Time FROM must be less the time TO");

            $(this.id).value="";
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

