import { state, cardData } from "./gameData.js";

export async function getRandomCardId() {
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id;
}

export async function createCardImage(IdCard, fieldSide) {
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id", IdCard);
    cardImage.classList.add("card");

    if(fieldSide === state.playerSides.player1) {

        cardImage.addEventListener("mouseover", () => {
        drawSelectCard(IdCard);
        });

        cardImage.addEventListener("click", () => {
            setCardsField(cardImage.getAttribute("data-id"));
        });
    }    

    return cardImage;
}

export async function setCardsField(cardId) {
    
    await removeAllCardsImages();

    let computerCardId = await getRandomCardId();

    await ShowHiddenCardFieldsImages(true);

    await hiddenCardDetails();

    await drawCardsInField(cardId, computerCardId);

    let duelResults = await checkDuelResults(cardData[cardId], cardData[computerCardId]);

    animateWinnerCard(duelResults);

    await updateScore();
    await drowButton(duelResults);
}

async function updateScore() {
    state.score.scoreBox.innerText = `Win: ${state.score.playerScore} | Lose: ${state.score.computerScore}`;

    state.score.scoreBox.classList.add('score-updated');

    setTimeout(() => {
        state.score.scoreBox.classList.remove('score-updated');
    }, 3000);
}

async function drowButton(text) {
    state.actions.button.innerHTML = text.toUpperCase();
    state.actions.button.style.display = "block";
}

export async function drawCardsInField(cardId, computerCardId) {
    state.fieldCard.player.src = cardData[cardId].img;
    state.fieldCard.computer.src = cardData[computerCardId].img;
}

export async function ShowHiddenCardFieldsImages(value) {

    if (value === true) {
        state.fieldCard.player.style.display = "block";
        state.fieldCard.computer.style.display = "block";
    } else {
        state.fieldCard.player.style.display = "none";
        state.fieldCard.computer.style.display = "none";
    }
}

export async function checkDuelResults(playerCard, computerCard) {
    let duelResults = "Draw";

    //let playerCard = cardData[playerCardId];

    if (playerCard.WindOf.includes(computerCard.type)) {
        duelResults = "Win";
        state.score.playerScore++;
    }

    if (playerCard.LoseOf.includes(computerCard.type)) {
        duelResults = "Lose";        
        state.score.computerScore++;
    }
    
    await playAudio(duelResults);

    return duelResults;
}

async function playAudio(status) {
    const audioPath = `./src/assets/audios/${status}.wav`;
    const audio = new Audio(audioPath);

    try {
        await audio.play();
    } catch (error) {
        console.warn(`Erro ao tentar tocar o audio "${audioPath}": ${error.message}`);
    }
}

export async function hiddenCardDetails() {    
    state.cardSprites.avatar.src = "";
    state.cardSprites.name.innerText = "";
    state.cardSprites.type.innerText = "";
}

export async function removeAllCardsImages() {
    let { computerBOX, player1BOX } = state.playerSides;
    let imgElements = computerBOX.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());

    imgElements = player1BOX.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());
}

export async function drawSelectCard(index) {
    state.cardSprites.avatar.src = cardData[index].img;
    state.cardSprites.name.innerText = cardData[index].name;
    state.cardSprites.type.innerHTML = `
        Attribute: ${cardData[index].type}
        <img src="${cardData[index].typeIcon}" alt="${cardData[index].type}" width="24" height="24" style="vertical-align: middle;">
    `;
}

export async function drawCards(cardNumbers, fieldSide) {

    for(let i = 0; i < cardNumbers; i++) {
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard, fieldSide);

        document.getElementById(fieldSide).appendChild(cardImage);
    }
}

function animateWinnerCard(winner) {
    let element;
    if (winner === "Win") {
        element = state.fieldCard.player;
    } else if (winner === "Lose") {
        element = state.fieldCard.computer;
    } else {
        return;
    }

    element.classList.add("winner");

    setTimeout(() => {
        element.classList.remove("winner");
    }, 3000);
}

const savedVolume = localStorage.getItem('volume');
if (savedVolume !== null) {
    const volume = parseInt(savedVolume) / 100;
    state.volumeControls.bgm.volume = volume;
    state.volumeControls.slider.value = savedVolume;
}

state.volumeControls.slider.addEventListener('input', () => {
    const volume = parseInt(state.volumeControls.slider.value) / 100;
    state.volumeControls.bgm.volume = volume;
    localStorage.setItem('volume', state.volumeControls.slider.value);
});