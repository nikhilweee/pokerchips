export interface Player {
    /** ID of the player */
    id: number;
    /** Name of the player */
    name: string;
    /** Player's total balance */
    balance: number;
    /** Player's contribution in the current round */
    bet: number;
    /** Whether the player has folded */
    folded: boolean;
    /** Whether it is this player's turn */
    turn: boolean;
    /** Whether the player is the Dealer / SB / BB */
    role: string;
    /** Bet required to call */
    callAmount: number;
    /** Number of times the player has played / raised */
    numRaises: number;
    /** Actions available to the player */
    actions: string[];
}
