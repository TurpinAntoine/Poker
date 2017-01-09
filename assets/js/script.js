var game = {};
game.elements = {};
// DOM Elements
game.elements.dice = document.querySelector("div.dice");
game.elements.button = document.querySelector("div.roll-button a");

// Functions
game.elements.button.addEventListener('click', function(event) {
    
    event.preventDefault();
});
