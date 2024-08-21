export let state = {
    players: [
        {
            id: 1,
            name: 'Alice',
            balance: 760,
            bet: 0,
            folded: false,
            turn: false,
            role: '',
            callAmount: 0,
            numRaises: 0,
            actions: ['Call', 'Raise', 'Fold']
        },
        {
            id: 2,
            name: 'Bob',
            balance: 2850,
            bet: 0,
            folded: false,
            turn: false,
            role: 'D',
            callAmount: 0,
            numRaises: 0,
            actions: ['Call', 'Raise', 'Fold']
        },
        {
            id: 3,
            name: 'Charlie',
            balance: 1520,
            bet: 0,
            folded: false,
            turn: false,
            role: 'SB',
            callAmount: 0,
            numRaises: 0,
            actions: ['Call', 'Raise', 'Fold']
        },
        {
            id: 4,
            name: 'David',
            balance: 230,
            bet: 0,
            folded: false,
            turn: false,
            role: 'BB',
            callAmount: 0,
            numRaises: 0,
            actions: ['Call', 'Raise', 'Fold']
        },
        {
            id: 5,
            name: 'Evans',
            balance: 180,
            bet: 0,
            folded: false,
            turn: true,
            role: '',
            callAmount: 0,
            numRaises: 0,
            actions: ['Call', 'Raise', 'Fold']
        }
    ], pot: { balance: 0, round: 'PreFlop', match: 0 }
};


