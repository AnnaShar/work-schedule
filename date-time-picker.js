var mondayOfWeek;

$( function() {
    $(".date-item__datepicker").datepicker({
        buttonText: "Pick a date",
        firstDay: 1,
        onSelect: function (date) {
            var d = new Date(date);
            var index = d.getDay();
            if (index == 0) {
                d.setDate(d.getDate() - 6);
            }
            else if (index == 1) {
                d.setDate(d.getDate());
            }
            else if (index != 1 && index > 0) {
                d.setDate(d.getDate() - (index - 1));
            }
            mondayOfWeek = d;
            fillDates(mondayOfWeek);
            activateTimepicker();
        }

    });
});

function activateTimepicker(){
    $ (function() {
        $(".time-item__timepicker--from").timepicker({
            hours: { starts: 8, ends: 21 },
            minutes: { interval: 10 },
            showPeriodLabels: false,
            onClose: function(){
                console.log($(this.id).timepicker('getHour'));
            //setMinTime(getPairID(this.id),$(this.id).timepicker('getHour'), $(this.id).timepicker('getMinute')) ;
            }
        })

    });

    $ (function() {
        $(".time-item__timepicker--to").timepicker({
            hours: { starts: 8, ends: 21 },
            minutes: { interval: 10 },
            showPeriodLabels: false,
            onClose: function(){
                setMaxTime(getPairID(this.id),$(this.id).timepicker('getHour'), $(this.id).timepicker('getMinute')) ;
            }
        })

    });
}

function getPairID(id){
    var pairID = "timepicker_";
    var index = id[11]=='i'?'i':'a';
    index+=id[12];
    index+=id[13]=='0'?'1':'0';
    pairID+=index;
    console.log(pairID);
}

function setMinTime(id, hour, minute){
    $(id).timepicker('option',{
        mintime: { hour:hour,
                    minute:minute}
    });
}

function setMaxTime(id, hour, minute){
    $(id).timepicker('option',{
        maxtime: { hour:hour,
            minute:minute}
    });
}

function OnHourShowCallback(hour, lowBorder, highBorder) {
    if ((hour > highBorder) || (hour < lowBorder)) {
        return false; // not valid
    }
    return true; // valid
}


function fillDates(monday){
    for (var i=0; i<5; i++){
        var dateItem = document.getElementById("date"+i);
        var date = new Date(monday);
        date = date.addDays(i);
        var month = date.getMonth()+1;
        dateItem.innerHTML = ' '+date.getDate()+'.'+month+'.'+date.getUTCFullYear();
    }
}

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
