const gameBoard = document.querySelector('.game-board');
const cardDimensionMax = 180;
const revealClassName = 'reveal-card';

let viewportWidth = window.innerWidth;
let viewportHeight = window.innerHeight;

let columns = Math.round(viewportWidth / cardDimensionMax);
gameBoard.style.gridTemplateColumns = 'repeat(' + columns + ', 1fr)';

let maxRows = viewportHeight / cardDimensionMax;
let rows = columns % 2 !== 0 ? RoundToEven(maxRows) : Math.floor(maxRows);
let cardHeight = viewportHeight / rows;
let cardHeightValue = (cardHeight / viewportHeight) * 100 + 'vh';

let cardCount = columns * rows;

let iconsNeeded = cardCount / 2;
let gameIcons = [];
let iconIndex;
do {
    iconIndex = GetRandomNumberRange(0, icons.length);
    gameIcons.push(iconIndex);
    gameIcons = Array.from(new Set(gameIcons)); //get only unique numbers in array
} while (gameIcons.length < iconsNeeded);
gameIcons.forEach(i => gameIcons.push(i));
Shuffle(gameIcons);

let divCardWrapper, divCard, cardIconElem;
let index, iconName, iconCategory;
for (let j = 0; j < cardCount; j++) {
    index = gameIcons[j];
    iconName = icons[index][0];

    divCardWrapper = document.createElement('div');
    divCardWrapper.classList.add('card-wrapper');
    divCardWrapper.style.height = cardHeightValue;

    divCard = document.createElement('div');
    divCard.classList.add('card');
    divCard.classList.add('js-card');
    divCard.dataset.icon = iconName;

    iconCategory = icons[index][2] ? 'fab' : 'fas';
    cardIconElem = document.createElement('i');
    cardIconElem.classList.add(iconCategory);
    cardIconElem.classList.add('fa-' + iconName);

    divCard.appendChild(cardIconElem);
    divCardWrapper.appendChild(divCard);
    gameBoard.appendChild(divCardWrapper);
}

const cards = document.querySelectorAll('.js-card');
const cardIcons = document.querySelectorAll('.js-card i');
let activeCard = null;
let target, classes, isFlipped;
cards.forEach(c => c.addEventListener('click', (e) => ClickOnCard(e.target)));
/*
cards.forEach(c => c.addEventListener('click', (e) => {
    target = e.target;
    classes = target.classList.value.split(' ');
    isFlipped = classes.indexOf(revealClassName) > -1 ? true : false;
    if (isFlipped) {
        FlipCard(target, 'conceal');
    } else {
        if (activeCard === null) {
            activeCard = target;
            FlipCard(target, 'reveal');
        } else {
            FlipCard(target, 'reveal');
            if (activeCard.dataset.icon === target.dataset.icon) {
                target.classList.remove('js-card');
                activeCard.classList.remove('js-card');
            } else {
                MatchNotFound(target, activeCard);
            }
            activeCard = null;
        }
    }
}));
*/
cardIcons.forEach(i => i.addEventListener('click', (e) => ClickOnCard(e.target.parentElement)));
/*
cardIcons.forEach(i => i.addEventListener('click', (e) => {
    target = e.target.parentElement;
    classes = target.classList.value.split(' ');
    isFlipped = classes.indexOf(revealClassName) > -1 ? true : false;
    if (isFlipped) {
        FlipCard(target, 'conceal');
    } else {
        if (activeCard === null) {
            activeCard = target;
            FlipCard(target, 'reveal');
        } else {
            FlipCard(target, 'reveal');
            if (activeCard.dataset.icon === target.dataset.icon) {
                target.classList.remove('js-card');
                activeCard.classList.remove('js-card');
            } else {
                MatchNotFound(target, activeCard);
            }
            activeCard = null;
        }
    }
}));
*/

function ClickOnCard(target){
    classes = target.classList.value.split(' ');
    isFlipped = classes.indexOf(revealClassName) > -1 ? true : false;
    if (isFlipped) {
        FlipCard(target, 'conceal');
    } else {
        if (activeCard === null) {
            activeCard = target;
            FlipCard(target, 'reveal');
        } else {
            FlipCard(target, 'reveal');
            if (activeCard.dataset.icon === target.dataset.icon) {
                target.classList.remove('js-card');
                activeCard.classList.remove('js-card');
            } else {
                MatchNotFound(target, activeCard);
            }
            activeCard = null;
        }
    }
}

function RoundToEven(num) {
    let evenNumber;
    let integer = Math.trunc(num);
    if ((integer / 2) % 2 === 0) {
        evenNumber = integer;
    } else {
        evenNumber = Math.ceil(num);
    }
    return evenNumber;
}

/* Return a number between min (inclusive) and max (exclusive) */
function GetRandomNumberRange(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

/* Fisher-Yates shuffle, https://bost.ocks.org/mike/shuffle/ */
function Shuffle(arr){
    let itemsToShuffle = arr.length;
    let itemToMove, temp;

    while (itemsToShuffle) {
        itemToMove = Math.floor(Math.random() * itemsToShuffle--);

        //Swap item with last item in array
        temp = arr[itemsToShuffle];
        arr[itemsToShuffle] = arr[itemToMove];
        arr[itemToMove] = temp;
    }

    return arr;
}

async function MatchNotFound(card1, card2) {
    const result = await DelayFlip(card1, card2);
}

function DelayFlip(card1, card2) {
    return new Promise(resolve => {
        setTimeout(() => {
            FlipCard(card1, 'conceal');
            FlipCard(card2, 'conceal');
        }, 3000);
    });
}

function FlipCard(card, flipType) {
    if (flipType === 'reveal') {
	card.classList.remove('conceal-card');
        card.classList.add(revealClassName);
    } else {
        card.classList.remove(revealClassName);
        card.classList.add('conceal-card');
    }
}