const yearIn = document.getElementById("year");
const monthIn = document.getElementById("month");
const dayIn = document.getElementById("day");

const calcYear = document.getElementById("calc-year");
const calcMonth = document.getElementById("calc-month");
const calcDay = document.getElementById("calc-day");

const dayError = document.getElementById("day-error");
const monthError = document.getElementById("month-error");
const yearError = document.getElementById("year-error");

const submitBtn = document.getElementById("submit-btn");
let error = false;
const currentDate = new Date();

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

// raising count Animation
const raisingCountAnimation = (htmlElement, maxNumber) => {
  var count = 0;
  var counting = setInterval(function () {
    if (count <= maxNumber) {
      htmlElement.innerText = count;
      count++;
    } else {
      clearInterval(counting);
    }
  }, 30);
};

const yearHandler = (year) => {
  yearError.innerText = "";
  yearIn.style.borderColor = "hsl(0, 0%, 86%)";
  if (year == "") {
    yearError.innerText = "Please Fill this filed";
    yearIn.style.borderColor = "hsl(0, 100%, 67%)";
    error = true;
  } else if (+year > currentDate.getFullYear() || +year < 1900) {
    yearError.innerText = "Enter a valid Year";
    yearIn.style.borderColor = "hsl(0, 100%, 67%)";
    error = true;
  } else if (!error) {
    raisingCountAnimation(calcYear, currentDate.getFullYear() - year);
  }
};

const monthHandler = (year, month) => {
  monthError.innerText = "";
  monthIn.style.borderColor = "hsl(0, 0%, 86%)";
  if (month == "") {
    monthError.innerText = "Please Fill this filed";
    monthIn.style.borderColor = "hsl(0, 100%, 67%)";
    error = true;
  } else if (+month > 12 || +month < 1) {
    monthError.innerText = "Enter a valid Month";
    monthIn.style.borderColor = "hsl(0, 100%, 67%)";
    error = true;
  } else if (!error) {
    if (currentDate.getMonth() + 1 - month < 0) {
      raisingCountAnimation(calcYear, currentDate.getFullYear() - year - 1);
      raisingCountAnimation(calcMonth, currentDate.getMonth() + 1 - month + 12);
    } else raisingCountAnimation(calcMonth, currentDate.getMonth() + 1 - month);
  }
};

const dayHandler = (year, month, day) => {
  dayError.innerText = "";
  dayIn.style.borderColor = "hsl(0, 0%, 86%)";
  if (day == "") {
    dayError.innerText = "Please Fill this filed";
    dayIn.style.borderColor = "hsl(0, 100%, 67%)";
    error = true;
  } else if (+day > daysInMonth(month - 1, year) || +day < 1) {
    dayError.innerText = "Enter a valid Day";
    dayIn.style.borderColor = "hsl(0, 100%, 67%)";
    error = true;
  } else if (!error) {
    if (currentDate.getDate() - day < 0) {
      raisingCountAnimation(calcMonth, calcMonth.innerText - 1);

      if (+calcMonth.innerText < 0) {
        raisingCountAnimation(calcYear, calcYear.innerText - 1);
        raisingCountAnimation(
          calcMonth,
          currentDate.getMonth() + 1 - month + 12
        );
      }
      raisingCountAnimation(
        calcDay,
        currentDate.getDate() - day + daysInMonth(month - 1, year)
      );

      console.log(daysInMonth(month - 1, year));
    } else raisingCountAnimation(calcDay, currentDate.getDate() - day);
  }
};

const submitHandler = () => {
  const yearValue = yearIn.value;
  const monthValue = monthIn.value;
  const dayValue = dayIn.value;
  console.log(yearValue, monthValue, dayValue);
  error = false;
  yearHandler(yearValue);
  monthHandler(yearValue, monthValue);
  dayHandler(yearValue, monthValue, dayValue);
};

submitBtn.addEventListener("click", function () {
  submitHandler();
});

// submitBtn.addEventListener("click", console.log("hello"));
