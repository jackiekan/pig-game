var scores, roundScore, activePlayer, gamePlaying; 

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) { 
        var diceOne = Math.floor(Math.random() * 6) + 1;
        var diceTwo = Math.floor(Math.random() * 6) + 1;
        
        var i = 0;
        
        while (i < 2) {
            var diceDOM = document.querySelector('.dice-' + i);
            diceDOM.style.display = 'block';
            if (i === 0) {
                diceDOM.src = 'dice-' + diceOne + '.png';
            }
            else {
                diceDOM.src = 'dice-' + diceTwo + '.png';
            }
            i++;
        }

        if (diceOne !== 1 && diceTwo !== 1) {
            roundScore += diceOne + diceTwo;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }

    }
 });

document.querySelector('.btn-hold').addEventListener('click', function() { 
    if (gamePlaying) {
        scores[activePlayer] += roundScore;
    
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        
        var input = document.querySelector('.final-score').value;
        
        // Undefined, 0, null, or "" are COERCED to false - anything else is coerced to true
        if (!input) {
            input = 100;
        }
    
        if (scores[activePlayer] >= input) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice-0').style.display = 'none'; 
            document.querySelector('.dice-1').style.display = 'none'; 
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);
                                                      
function nextPlayer() {
    roundScore = 0;
    document.getElementById('current-' + activePlayer).textContent = roundScore;
        
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    
    //document.querySelector('.dice').style.display = 'none';
}

function init() {
    scores = [0,0];
    roundScore = 0; 
    activePlayer = 0; 
    gamePlaying = true;

    document.querySelector('.dice-0').style.display = 'none';
    document.querySelector('.dice-1').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('active');
    
    document.querySelector('.player-0-panel').classList.add('active');
}