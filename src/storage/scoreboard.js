import { SCOREBOARD_PREFIX, SCOREBOARD_LENGTH } from '/src/constants.js'

export function readScoreboard() {
    let scores = [];

    Object.keys(localStorage)
        .filter(key => key.startsWith(SCOREBOARD_PREFIX))
        .forEach(key => {
            scores.push({
                'name': key.replace(SCOREBOARD_PREFIX, ''),
                'score': Number(localStorage.getItem(key))
            });
        });

    return scores.sort((a, b) => a['score'] >= b['score'] ? -1: 1);
}

export function updateScoreboard(name, score) {
    let scores = readScoreboard();

    if(scores.length < SCOREBOARD_LENGTH) localStorage.setItem(SCOREBOARD_PREFIX + name, score);
    else {
        for(let i = 0; i < scores.length; i ++) {
            if(scores[i]['score'] < score) {
                localStorage.setItem(SCOREBOARD_PREFIX + name, score);
                localStorage.removeItem(SCOREBOARD_PREFIX + scores.pop()['name']);
                break;
            }
        }
    }
}