var $currentDay = $("#currentDay");
var $timeBlocks = $(".time-block");
var $scheduleArea = $(".schedule");

var toDoItems = [];
 
var currentDate = moment().format("dddd, MMMM Do");
var currentHour = moment().format("H");

function initializeSchedule(){

  $timeBlocks.each(function(){
    var $thisBlock = $(this);
    var thisBlockHr = parseInt($thisBlock.attr("data-hour"));
    // data-hour is attributed to given block
    var todoObj = {
      hour: thisBlockHr,
      text: "",
    }
    toDoItems.push(todoObj);
  });

  localStorage.setItem("todos", JSON.stringify(toDoItems));

}
// below changes color of time blocks based on current hr
function setUpTimeBlocks(){
    $timeBlocks.each(function(){
      var $thisBlock = $(this);
      var thisBlockHr = parseInt($thisBlock.attr("data-hour"));

      if (thisBlockHr == currentHour) {
        $thisBlock.addClass("present").removeClass("past future");
      }
      if (thisBlockHr < currentHour) {
        $thisBlock.addClass("past").removeClass("present future");
      }
      if (thisBlockHr > currentHour) {
        $thisBlock.addClass("future").removeClass("past present");
      }
    });
    // ^ if time block represents current hr, adds a class and differentiates from past and future time block
      // this sets appropriate color to time block of interest
}

function renderSchedule(){
  
  toDoItems = localStorage.getItem("todos");
  toDoItems = JSON.parse(toDoItems);

  for (var i = 0; i < toDoItems.length; i++){
    var itemHour = toDoItems[i].hour;
    var itemText = toDoItems[i].text; 
   
    $("[data-hour=" + itemHour + "]").children("textarea").val(itemText);
  }

  console.log(toDoItems);
}

function saveHandler(){
  var $thisBlock = $(this).parent();

  var hourToUpdate = $(this).parent().attr("data-hour");
  var itemToAdd = (($(this).parent()).children("textarea")).val();

  for (var i = 0; i < toDoItems.length; i++){
    if (toDoItems[i].hour == hourToUpdate){

      toDoItems[i].text = itemToAdd;
    } 
  } //sets text to what was typed into the text area

  localStorage.setItem("todos", JSON.stringify(toDoItems));
  renderSchedule();
}

$(document).ready(function(){

  //format the timeblocks depending on time
  setUpTimeBlocks();
  //if there's nothing for the todos in local storage
  if(!localStorage.getItem("todos")){
    //initialize the array of objects
    initializeSchedule();
  }

  $currentDay.text(currentDate);

  //schedule saved on localstorage is now shown
  renderSchedule();
  //saves todo when btn is clicked
  $scheduleArea.on("click", "button", saveHandler);
  
});
