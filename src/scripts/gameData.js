const pathImages = "./src/assets/icons/";

export const state = {
    score: {
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById("score_points"),
    },
    cardSprites: {
        avatar: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),
    },
    fieldCard: {
        player: document.getElementById("player-field-card"),
        computer: document.getElementById("computer-field-card"),
    },
    playerSides: {
        player1: "player-cards",
        player1BOX: document.querySelector("#player-cards"),
        computer: "computer-cards",
        computerBOX: document.querySelector("#computer-cards"),
    },
    actions: {
        button: document.getElementById("next-duel"),
    },
    volumeControls: {
        bgm: document.getElementById("bgm"),
        slider: document.getElementById("volume-slider")
    }
};

export const cardData = [
    {
        id: 0,
        name: "Blue Eyes White Dragon",
        type: "Paper",
        img: `${pathImages}dragon.png`,
        typeIcon: `${pathImages}paper-1pixel.png`,
        WindOf: ["Rock"],
        LoseOf: ["Scissors"],
    },
    {
        id: 1,
        name: "Dark Magician",
        type: "Rock",
        img: `${pathImages}magician.png`,
        typeIcon: `${pathImages}rock-1pixel.png`,
        WindOf: ["Scissors"],
        LoseOf: ["Paper"],
    },
    {
        id: 2,
        name: "Exodia",
        type: "Scissors",
        img: `${pathImages}exodia.png`,
        typeIcon: `${pathImages}scissors-1pixel.png`,
        WindOf: ["Paper"],
        LoseOf: ["Rock"],
    },
    {
        id: 3,
        name: "Summoned Skull",
        type: "Paper",
        img: `${pathImages}summoned-skull.png`,
        typeIcon: `${pathImages}paper-1pixel.png`,
        WindOf: ["Rock"],
        LoseOf: ["Scissors"],
    },
    {
        id: 4,
        name: "Celtic Guardian",
        type: "Rock",
        img: `${pathImages}celtic-guardian.png`,
        typeIcon: `${pathImages}rock-1pixel.png`,
        WindOf: ["Scissors"],
        LoseOf: ["Paper"],
    },
    {
        id: 5,
        name: "Red-Eyes Black Dragon",
        type: "Scissors",
        img: `${pathImages}red-eyes-black-dragon.png`,
        typeIcon: `${pathImages}scissors-1pixel.png`,
        WindOf: ["Paper"],
        LoseOf: ["Rock"],
    }
]
