import { state, cardData } from "./gameData.js";
import { ShowHiddenCardFieldsImages, drawCards,
} from "./cardActions.js";

async function resetDuel() {
    state.cardSprites.avatar.src = "";
    state.actions.button.style.display = "none";

    await ShowHiddenCardFieldsImages(false);

    init();
}

function init() {

    ShowHiddenCardFieldsImages(true);    

    drawCards(5, state.playerSides.player1);
    drawCards(5, state.playerSides.computer);

    state.cardSprites.name.innerText = "Selecione";
    state.cardSprites.type.innerText = "uma carta";
}

init();

window.resetDuel = resetDuel; // Fix function global