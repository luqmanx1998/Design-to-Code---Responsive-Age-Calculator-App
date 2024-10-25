const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const form = document.getElementById('form');

// Function to determine if a year is a leap year
function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// Highlighting functions
function showHighlight(label) {
    label.classList.add('invalid-highlight');
}

function removeHighlight(label) {
    label.classList.remove('invalid-highlight');
}

// Error handling functions
function showErrorState(input) {
    input.classList.add('show-error-state');
}

function removeErrorState(input) {
    input.classList.remove('show-error-state');
}

// Invalid date styles
function showInvalidDates(type) {
    type.classList.add('invalid-dates');
}

function removeInvalidDates(type) {
    type.classList.remove('invalid-dates');
}

// Display error messages
function displayErrors(type, errorMessage, label, input) {
    type.textContent = errorMessage;
    showErrorState(type);
    showHighlight(input);
    showInvalidDates(label);
}

// Remove error messages
function removeErrors(type, label, input) {
    removeErrorState(type);
    removeHighlight(input);
    removeInvalidDates(label);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const day = document.getElementById('day');
    const month = document.getElementById('month');
    const year = document.getElementById('year');
    const dayLabel = document.querySelector(".form__date--day label");
    const monthLabel = document.querySelector(".form__date--month label");
    const yearLabel = document.querySelector(".form__date--year label");
    const dayError = document.querySelector(".form__date--day .error-state");
    const monthError = document.querySelector(".form__date--month .error-state");
    const yearError = document.querySelector(".form__date--year .error-state");

    let isValid = true;

    const dayInput = day.value;
    const monthInput = month.value - 1; // Adjust for 0-based index
    const yearInput = Number.parseInt(year.value);

    // Check day validity
    if (!dayInput) {
        displayErrors(dayError, 'This field is required', dayLabel, day);
        isValid = false;
    } else if (dayInput < 1 || dayInput > (monthInput === 1 && isLeapYear(yearInput) ? 29 : daysInMonth[monthInput])) {
        displayErrors(dayError, 'Must be a valid day', dayLabel, day);
        isValid = false;
    } else {
        removeErrors(dayError, dayLabel, day);
    }

    // Check month validity
    if (!month.value) {
        displayErrors(monthError, 'This field is required', monthLabel, month);
        isValid = false;
    } else if (monthInput < 0 || monthInput > 11) {
        displayErrors(monthError, 'Must be a valid month', monthLabel, month);
        isValid = false;
    } else {
        removeErrors(monthError, monthLabel, month);
    }

    // Check year validity
    if (!yearInput) {
        displayErrors(yearError, 'This field is required', yearLabel, year);
        isValid = false;
    } else if (yearInput > new Date().getFullYear()) {
        displayErrors(yearError, 'Must be a valid year', yearLabel, year);
        isValid = false;
    } else {
        removeErrors(yearError, yearLabel, year);
    }

    // If all validations pass, calculate age
    if (isValid) {
        const yearResult = document.querySelector('.yearResult');
        const monthResult = document.querySelector('.monthResult');
        const dayResult = document.querySelector('.dayResult');

        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1; 
        const currentDay = currentDate.getDate();

        let userYear = currentYear - yearInput;
        let userMonth = currentMonth - (monthInput + 1);
        let userDay = currentDay - dayInput;

        // Calculate results
        if (userDay < 0) {
            userDay += daysInMonth[(currentMonth - 2 + 12) % 12]; 
            userMonth--;
        }

        if (userMonth < 0) {
            userMonth += 12;
            userYear--;
        }

        yearResult.textContent = `${userYear}`;
        monthResult.textContent = `${userMonth}`;
        dayResult.textContent = `${userDay}`;
        form.reset();
    }
});
