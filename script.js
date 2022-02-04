let buttonSubmit = document.querySelector('.main-input__button');

// обьект с правилами какие окончания использовать у разных падежей
let rules = [
    { im: '', rod: 'а', dat: 'у', vin: '', tv: 'ом', pr: 'е', },
    { im: 'а', rod: 'и/ы', dat: 'е', vin: 'у', tv: 'ой/ою', pr: 'е' },
    { im: 'ь', rod: 'и', dat: 'и', vin: 'ь', tv: 'ью', pr: 'и' },
]

let resultRule = {}

// выбор правила в зависимости от окончания
function chooseRule(word) {
    let endings = {};
    let lastChar = word.slice(-1)
    let wordWithoutEnd = word.slice(0, -1)

    endings = (rules.filter(obj => {
        if (obj.im == lastChar) { 
            return obj
        }
    }
    )
    )

    if (endings.length == 0) {
        endings.push(rules[0])
    }
    resultRule.endings = endings;
    resultRule.lastChar = lastChar;
    resultRule.wordWithoutEnd = wordWithoutEnd;
    resultRule.word = word;    
}



// функция выбора по кейсам в зависимости от выбранного падежа
function chooseCase(word, option) {
    chooseRule(word);

    // проверка на то есть ли изменяемые окончания или нет
    if (resultRule.endings[0].im == '') {
        resultRule.wordWithoutEnd = resultRule.word;
    }

    
    result = '';

    switch (option) {
        case 'im': // Именительный
            result += `Есть кто? что?&nbsp<span> ${resultRule.wordWithoutEnd + resultRule.endings[0].im} </span>`
            break;
        case 'rod': // Родительный
            result += `Нет кого? чего?&nbsp<span> ${resultRule.wordWithoutEnd + resultRule.endings[0].rod} </span>`
        break;
        case 'dat': // Дательный
            result += `Рад кому? чему?&nbsp<span> ${resultRule.wordWithoutEnd + resultRule.endings[0].dat} </span>`  
            break;
        case 'vin': // Винительный
            result += `Вижу кого? что?&nbsp<span> ${resultRule.wordWithoutEnd + resultRule.endings[0].vin} </span>`
            break;
        case 'tv': // Творительный
            result += `Доволен кем? чем?&nbsp<span> ${resultRule.wordWithoutEnd + resultRule.endings[0].tv} </span>`
            break;
        case 'pr': // Предложынй
            result += `Думаю о ком? о чем?&nbsp<span>о ${resultRule.wordWithoutEnd + resultRule.endings[0].pr} </span>`
            break;

    }
    return result;
}


// функция вывода результата
function resultFunc() {
    let input = document.querySelector('.main-input__input');
    let wordInInput = document.querySelector('.main-input__input').value;
    let optionSelect = document.querySelector('.main-input__select').value;
    let outElement = document.querySelector('.main-input__output');
    // проверка на то пустая ли строка или нет
    if (wordInInput == '') {
        outElement.innerHTML = "<span>Введите слово</span>"
        input.classList.add('red');
    }
    else {
        outElement.innerHTML = chooseCase(wordInInput, optionSelect); // вывод результата
        input.classList.remove('red');
    }
    // Проверка на язык ввода
    if (wordInInput != '' && /[а-я]/i.test(wordInInput) == false) {
        outElement.innerHTML = "<span>Смените язык ввода</span>"
        input.classList.add('red'); 
    }
}


buttonSubmit.addEventListener('click', resultFunc);