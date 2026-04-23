export const SCREENS = {
    DEFAULT: "DEFAULT",
    PLAYING: "PLAYING",
}

export const DIFFICULTIES = {
    Easy: 5,
    Medium: 10,
    Hard: 20,
}

export const STATE = {
    DEFAULT: "DEFAULT",
    DEFEAT: "DEFEAT",
    VICTORY: "VICTORY",
}

import victory from "../assets/victory.gif";
import defeat from "../assets/defeat.gif";

export const VIDEOS = {
    VICTORY: victory,
    DEFEAT: defeat,
};

import victoryAudio from "../audio/victory.mp3";
import defeatAudio from "../audio/defeat.mp3";
import flipCardAudio from "../audio/flipcard.mp3";

export const AUDIOS = {
    VICTORY: victoryAudio,
    DEFEAT: defeatAudio,
    FLIP: flipCardAudio,
};
