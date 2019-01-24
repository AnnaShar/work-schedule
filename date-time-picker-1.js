$(document).ready(function() {
    // document.getElementsByClassName("choose-week")[0].classList.add("choose-week--highlited");
    // setTimeout(function(){document.getElementsByClassName("choose-week")[0].classList.remove("choose-week--highlited");},  3000);

    //$('[data-toggle="tooltip"]').tooltip().mouseover();
    //setTimeout(function(){ $("#choose-week-tooltip").tooltip('hide'); }, 3000);
});


var mondayOfWeek;
var currentWeek = [];

$(function () {
    $(".datepicker").datepicker({
        buttonText: "Pick a date",
        firstDay: 1,
        onSelect: function(date) {
            setWeek(date);
            $("#choose-week-btn").val("Choose week");
        }
    });
});

function activateTimepicker() {


 $(".timepicker").mdtimepicker({
         readOnly: true,
         format: 'hh:mm',
         hourPadding: false,
         theme:'purple'
     }).on('timechanged', function(e){
         updateTimeArray(this.id, e.value);
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
    for (var i = 1; i <= 5; i++) {
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
    }
    else{
        toTime = time;
        var pairID=getPairID(id);
        fromTime = currentWeek[indexDay][pairID];
    }

    if (isTimeValid(fromTime,toTime)){
        currentWeek[indexDay][id]=time;
        if (isTimeFrom)
        updateHours(indexDay, id, getPairID(id));
        else updateHours(indexDay, getPairID(id), id);
    }
    else {
        $("#"+id).val("");
        alert("Time FROM must be less the time TO");
    }
}
function updateHours(day, idFrom, idTo){
    var fromTime = currentWeek[day][idFrom];
    var toTime = currentWeek[day][idTo];
    if (fromTime!==undefined && toTime!==undefined){
        var hours = subTimes(fromTime, toTime);
        $("#"+getHoursSumID(idFrom)).text(hours);
        updateSumHours();
    }
}

function updateSumHours(){
    var sumIntended=0, sumActual=0;
    for(var i=0; i<5;i++){
        var id = "hours_i"+i;
        if ($("#"+id).text()!==""){
            sumIntended+=parseFloat( $("#"+id).text());
        }
    }
    for(var i=0; i<5;i++){
        var id = "hours_a"+i;
        if ($("#"+id).text()!==""){
            sumActual+=parseFloat( $("#"+id).text());
        }
    }
    $("#sum-hours-intended").text(sumIntended);
    $("#sum-hours-actual").text(sumActual);
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

    return resultHours+roundMinutes((resultMinutes/60).toFixed(2));
}

function roundMinutes(partOfHour){
    var minutes = partOfHour*100;
    var currentDifference = minutes;
    var closerNumber = 0;
    for (var i=25; i<=100; i+=25){
        if (Math.abs(minutes-i)<currentDifference){
            currentDifference = minutes-i;
            closerNumber = i;
        }
        else return closerNumber/100;
    }
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

