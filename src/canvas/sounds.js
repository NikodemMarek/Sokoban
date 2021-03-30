/**
 * @module sounds
 */

/**
 * Enum z identyfikatorami wydarzeń posiadających efekt dźwiękowy.
 * @see module:sounds#prepareSounds
 * @name module:sounds#events
 * @readonly
 * @enum {number}
 */
export const events = Object.freeze({
    MENU_BUTTON_CLICK: 0,
    MENU_BUTTON_HOVER: 1,
    WORKER_MOVE: 2,
    BOX_ON_TARGET: 3,
    VICTORY: 4
})

/**
 * Tablica z wczytanymi dźwiękami, przypisdanymi do wydarzeń.
 * @name module:sounds#sounds
 * @type {{ event: string, sound: Audio }}
 */
let sounds = []

/**
 * Wczytuje efekty dźwiękowe i zapisuje je do {@link module:sounds#sounds sounds}.
 * @name module:sounds#prepareSounds
 * @function
 */
export function prepareSounds() {
    sounds.push({ 'event': events.MENU_BUTTON_CLICK, 'sound': new Audio('assets/sounds/menu_button_click.wav') });
    sounds.push({ 'event': events.MENU_BUTTON_HOVER, 'sound': new Audio('assets/sounds/menu_button_hover.mp3') });
    sounds.push({ 'event': events.WORKER_MOVE, 'sound': new Audio('assets/sounds/worker_move.mp3') });
    sounds.push({ 'event': events.BOX_ON_TARGET, 'sound': new Audio('assets/sounds/box_on_target.wav') });
    sounds.push({ 'event': events.VICTORY, 'sound': new Audio('assets/sounds/victory.wav') });
}

/**
 * Gra dźwięk dla danego wydarzenia.
 * @name module:sounds#playSound
 * @function
 * @param {number} event - Identyfikator wydarzenia którego efekt dźwiękowy ma być zagrany
 */
export function playSound(event) {
    sounds.find(sound => sound['event'] == event)['sound'].play();
}