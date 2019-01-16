var mondayOfWeek;
var currentWeek = [];

$(function () {
    $(".date-item__datepicker").datepicker({
        buttonText: "Pick a date",
        firstDay: 1,
        onSelect: function(date) {
            setWeek(date);
        }
    });
});

function activateTimepicker() {

    // $(".div-mdtimepicker").mdtimepicker({
    //     readOnly: true,
    //     format: 'hh:mm',
    //     hourPadding: false,
    //     theme:'purple'
    // }).on('timechanged', function(e){
    //     updateTimeArray(this.id, e.value);
    // });

    $(".time-item__timepicker--from").mdtimepicker({
        readOnly: true,
        format: 'hh:mm',
        hourPadding: false,
        theme:'purple'
    }).on('timechanged', function(e){
        var fromTime1 = e.value;
        var toTime = $("#"+getPairID(this.id))[0].defaultValue;
        if (!isTimeValid(fromTime1, toTime)){
            $("#"+this.id).val("");
            //$("#"+this.id).attr("data-time", "");
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
            $("#"+this.id).val("");
            //$("#"+this.id).attr("data-time", "");
            alert("Time FROM must be less the time TO");
        }
    });
}

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
function initializeCurrentWeek(dayOfWeek){
    var day = {"day":dayOfWeek};
    currentWeek.push(day);
}

function fillDates(monday) {
    for (var i = 0; i < 5; i++) {
        var dateItem = document.getElementById("date" + i);
        var date = new Date(monday);
        date = date.addDays(i);
        var month = date.getMonth() + 1;
        dateItem.innerHTML = ' ' + date.getDate() + '.' + month + '.' + date.getUTCFullYear();
        initializeCurrentWeek(i);
    }
}

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
function updateTimeArray (id, time){
    var isTimeFrom = id[13] === '0';
    var indexDay = id[12];
    var fromTime, toTime;
    if (isTimeFrom){
        fromTime = time;
        var pairID=getPairID(id);
        toTime = currentWeek[indexDay][pairID];
        if (isTimeValid(fromTime,toTime)){
            currentWeek[indexDay][id]=time;
            updateHours(indexDay, id, getPairID(id));
        }
    }
    else{
        toTime = time;
        var pairID=getPairID(id);
        fromTime = currentWeek[indexDay][pairID];
        if (isTimeValid(fromTime,toTime)){
            currentWeek[indexDay][id]=time;
            updateHours(indexDay,getPairID(id), id);
        }
    }
}
function updateHours(day, idFrom, idTo){
    var fromTime = currentWeek[day][idFrom];
    var toTime = currentWeek[day][idTo];
    if (fromTime!==undefined && toTime!==undefined){
        var hours = subTimes(fromTime, toTime);
        $("#"+getHoursSumID(idFrom)).innerText.change(hours);
        updateSumHours();
    }
}

function updateSumHours(){
    var sumIntended=0, sumActual=0;
    for(var i=0; i<5;i++){
        var id = "hours_i"+i;
        if ($("#"+id).innerText!==""){
            sumIntended+=parseInt( $("#"+id).innerText);
        }
    }
    for(var i=0; i<5;i++){
        var id = "hours_a"+i;
        if ($("#"+id).innerText!==""){
            sumActual+=parseInt( $("#"+id).innerText);
        }
    }
    $("#sum-hours-intended").innerText=sumIntended;
    $("#sum-hours-actual").innerText=sumActual;
}

function getHoursSumID(fromID){
    var id="hours_";
    var index = fromID[11] === 'i' ? 'i' : 'a';
    index += fromID[12];
    id+=index;
    return id;
}

function isTimeValid(fromTime,toTime ){
    if( fromTime==="" || toTime==="")
        return true;
    if (fromTime >= toTime)
        return false;
    return true;
}

function subTimes(from, to){
    var fromHours = parseInt(from.slice(0,2));
    var fromMinutes = parseInt(from.slice(3));
    var toHours = parseInt(to.slice(0,2));
    var toMinutes = parseInt(to.slice(3));

    var resultMinutes = toMinutes-fromMinutes;
    var resultHours;
    if (resultMinutes<0){
        resultMinutes+=60;
        resultHours=toHours-fromHours-1;
    }
    else resultHours=toHours-fromHours;

    return resultHours+(resultMinutes/60);
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

