import { state } from './data.js';

let pot = state.pot;
let players = state.players;

const roundMap = {
    PreFlop: 'Flop',
    Flop: 'Turn',
    Turn: 'River',
    River: 'End'
};

const updateActions = () => {
    players.forEach((p) => {
        p.actions[0] = 'Call';
        p.actions[1] = 'Raise';
        p.callAmount = pot.match - p.bet;
        if (pot.match === 0) {
            p.actions[0] = 'Check';
            p.actions[1] = 'Bet';
        }
        if (pot.match === p.bet) {
            p.actions[0] = 'Check';
        }
        if (pot.match > p.balance && p.balance > 0) {
            p.actions[0] = 'All In';
            p.callAmount = p.balance;
        }
        if (pot.match > p.balance && p.balance === 0) {
            p.callAmount = 0;
        }
    });
    // players = players;
    // state.set({ players: players });
};

const updatePlayers = (player) => {
    if (player === undefined) {
        // Initial Round
        player = players.find((p) => p.role === 'D') || players[0];
        players.forEach((player) => {
            if (player.role === 'SB') {
                player.callAmount = 10;
            }
            if (player.role === 'BB') {
                player.callAmount = 20;
            }
        });
    }
    const circularPlayers = [
        ...players.slice(player.id),
        ...players.slice(0, player.id)
    ];
    let nextPlayer = circularPlayers.find(
        (p) => !p.folded && (p.bet < pot.match || p.numRaises === 0)
    );
    if (nextPlayer === undefined) {
        // New Round
        const dealer = players.find((p) => p.role === 'D') || players[0];
        const circularPlayers = [
            ...players.slice(dealer.id),
            ...players.slice(0, dealer.id)
        ];
        nextPlayer = circularPlayers.find((p) => !p.folded);
        // Reset all players
        players.forEach((p) => {
            p.numRaises = 0;
            p.bet = 0;
        });
        pot.match = 0;
        pot.round = roundMap[pot.round];
    }
    if (nextPlayer === undefined) {
        nextPlayer = players[0];
    }
    nextPlayer.turn = true;
    return nextPlayer;
};


const updatePot = (message) => {
    // Guard clause
    let player = players.find((p) => p.id === message.id);
    if (player === undefined) {
        return;
    }
    // Handle action
    if (message.action === 'call') {
        let amount = player.callAmount;
        player.balance -= amount;
        player.bet += amount;
        pot.balance += amount;
    }
    if (message.action === 'raise') {
        let amount = message.amount + player.callAmount;
        player.balance -= amount;
        player.bet += amount;
        pot.balance += amount;
        pot.match = Math.max(player.bet, pot.match);
    }
    if (message.action === 'fold') {
        player.folded = true;
    }
    // Update turn
    player.turn = false;
    player.numRaises += 1;
    return player;
}



const handleMessage = (message) => {
    if ("action" in message) {
        let player = updatePot(message)
        // Update active player
        let nextPlayer = updatePlayers(player);
        // Update actions
        updateActions();
    }

    return JSON.stringify({ pot: pot, players: players });
};


export { handleMessage };
