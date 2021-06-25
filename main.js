let totalMarks = 0;
let totalQuestions = 0;
let marksPerQuestion = 0;
let deduction = 0;
let abArr = [];
let cArr = [];
let rightAnsCounter = 0;
let wrongAnsCounter = 0;
let emptyAnsCounter = 0;
let rightAnsList = [];
let wrongAnsList = [];
let emptyAnsList = [];
let marksObtained = 0;

function getExamData() {
    totalMarks = document.querySelector('#totalmarks').value;
    totalQuestions = document.querySelector('#noq').value;
    marksPerQuestion = totalMarks / totalQuestions;
    deduction = marksPerQuestion / 3;
}

function generateRows(totalQuestions) {
    let insertRows = document.querySelector('.insert-rows');

    for (let i = 1; i <= totalQuestions; i++) {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'row margin2';

        let div1 = document.createElement('div');
        div1.className = 'col to-the-right';
        div1.innerHTML = i;

        const div2 = document.createElement('div');
        div2.className = 'col';

        const input2 = document.createElement('input');
        input2.className = 'form-control ab-ans';
        input2.setAttribute('type', 'text');
        input2.setAttribute('placeholder', 'Your Answer');

        div2.appendChild(input2);

        const div3 = document.createElement('div');
        div3.className = 'col';

        const input3 = document.createElement('input');
        input3.className = 'form-control c-ans';
        input3.setAttribute('type', 'text');
        input3.setAttribute('placeholder', 'Correct Answer');

        div3.appendChild(input3);

        const div4 = document.createElement('div');
        div4.className = 'col';

        rowDiv.appendChild(div1);
        rowDiv.appendChild(div2);
        rowDiv.appendChild(div3);
        rowDiv.appendChild(div4);

        insertRows.appendChild(rowDiv);
    }
}

function getAnswerData() {
    let abInput = document.querySelectorAll('.ab-ans');
    let cInput = document.querySelectorAll('.c-ans');
    for (let i = 0; i < totalQuestions; i++) {
        abArr.push(abInput[i].value);
        cArr.push(cInput[i].value);
    }
}

function compareAnswers() {
    for (let i = 0; i < totalQuestions; i++) {
        if (abArr[i] == "") {
            if (cArr[i] == "") {
                rightAnsCounter++;
                rightAnsList.push(i+1);
            } else {
                emptyAnsCounter++;
                emptyAnsList.push(i+1);
            }
        } else {
            if (abArr[i] == cArr[i]) {
                rightAnsCounter++;
                rightAnsList.push(i+1);
            }
            else if (abArr[i] != cArr[i]) {
                wrongAnsCounter++;
                wrongAnsList.push(i+1);
            }
        }
    }
}

function calculateMarksObtained() {
    let rightAns = rightAnsCounter * marksPerQuestion;
    let wrongAns = wrongAnsCounter * deduction;
    marksObtained = rightAns - wrongAns;
}

function displayResult() {
    document.querySelector('.right-ans').innerHTML = rightAnsCounter;
    document.querySelector('.wrong-ans').innerHTML = wrongAnsCounter;
    document.querySelector('.empty-ans').innerHTML = emptyAnsCounter;
    document.querySelector('.right-ans-list').innerHTML = rightAnsList;
    document.querySelector('.wrong-ans-list').innerHTML = wrongAnsList;
    document.querySelector('.empty-ans-list').innerHTML = emptyAnsList;
    document.querySelector('.marks-obtained').innerHTML = marksObtained;
    document.querySelector('.total-marks').innerHTML = totalMarks;
}

function hasClass(elem, className) {
    return elem.classList.contains(className);
}

document.addEventListener('click', function (e) {
    if (hasClass(e.target, 'next1')) {
        getExamData();
        document.querySelector('.formbox1').style = 'display : none';
        document.querySelector('.formbox2').style = 'display : block';
        generateRows(totalQuestions);
    }
    else if (hasClass(e.target, 'next2')) {
        getAnswerData();
        compareAnswers();
        calculateMarksObtained();
        document.querySelector('.formbox2').style = 'display : none';
        document.querySelector('.formbox3').style = 'display : block';
        displayResult();
    }
    e.preventDefault();
}, false);