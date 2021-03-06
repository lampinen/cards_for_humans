var straight_flush_hand_order = [
"h_0_0_0_0",
"h_0_1_0_0",
"h_0_0_0_1",
"h_0_1_0_1",
"h_1_0_1_0",
"h_1_1_1_0",
"h_1_0_1_1",
"h_1_1_1_1",
"h_2_0_0_0",
"h_0_0_2_0",
"h_2_0_0_1",
"h_0_1_2_0",
"h_2_1_0_0",
"h_0_0_2_1",
"h_2_1_0_1",
"h_0_1_2_1",
"h_2_0_2_0",
"h_2_0_2_1",
"h_2_1_2_0",
"h_2_1_2_1",
"h_0_0_3_0",
"h_3_0_0_0",
"h_0_1_3_0",
"h_3_0_0_1",
"h_3_1_0_0",
"h_0_0_3_1",
"h_3_1_0_1",
"h_0_1_3_1",
"h_3_0_1_0",
"h_1_0_3_0",
"h_1_1_3_0",
"h_3_0_1_1",
"h_3_1_1_0",
"h_1_0_3_1",
"h_3_1_1_1",
"h_1_1_3_1",
"h_3_0_3_0",
"h_3_1_3_0",
"h_3_0_3_1",
"h_3_1_3_1",
"h_0_1_1_0",
"h_1_0_0_1",
"h_1_1_0_0",
"h_0_0_1_1",
"h_2_0_1_1",
"h_1_1_2_0",
"h_1_0_2_1",
"h_2_1_1_0",
"h_3_0_2_1",
"h_2_1_3_0",
"h_3_1_2_0",
"h_2_0_3_1",
"h_1_0_0_0",
"h_0_0_1_0",
"h_1_1_0_1",
"h_0_1_1_1",
"h_1_0_2_0",
"h_2_0_1_0",
"h_1_1_2_1",
"h_2_1_1_1",
"h_3_0_2_0",
"h_2_0_3_0",
"h_2_1_3_1",
"h_3_1_2_1"
];

var straight_flush_losers_hand_order = [
"h_2_1_3_1",
"h_3_1_2_1",
"h_3_0_2_0",
"h_2_0_3_0",
"h_1_1_2_1",
"h_2_1_1_1",
"h_2_0_1_0",
"h_1_0_2_0",
"h_1_1_0_1",
"h_0_1_1_1",
"h_1_0_0_0",
"h_0_0_1_0",
"h_3_1_2_0",
"h_2_0_3_1",
"h_3_0_2_1",
"h_2_1_3_0",
"h_1_0_2_1",
"h_2_1_1_0",
"h_2_0_1_1",
"h_1_1_2_0",
"h_1_1_0_0",
"h_0_0_1_1",
"h_0_1_1_0",
"h_1_0_0_1",
"h_3_1_3_1",
"h_3_0_3_1",
"h_3_1_3_0",
"h_3_0_3_0",
"h_3_1_1_1",
"h_1_1_3_1",
"h_3_1_1_0",
"h_1_0_3_1",
"h_1_1_3_0",
"h_3_0_1_1",
"h_3_0_1_0",
"h_1_0_3_0",
"h_0_1_3_1",
"h_3_1_0_1",
"h_3_1_0_0",
"h_0_0_3_1",
"h_3_0_0_1",
"h_0_1_3_0",
"h_3_0_0_0",
"h_0_0_3_0",
"h_2_1_2_1",
"h_2_0_2_1",
"h_2_1_2_0",
"h_2_0_2_0",
"h_2_1_0_1",
"h_0_1_2_1",
"h_2_1_0_0",
"h_0_0_2_1",
"h_2_0_0_1",
"h_0_1_2_0",
"h_2_0_0_0",
"h_0_0_2_0",
"h_1_1_1_1",
"h_1_0_1_1",
"h_1_1_1_0",
"h_1_0_1_0",
"h_0_1_0_1",
"h_0_1_0_0",
"h_0_0_0_1",
"h_0_0_0_0",
];

// not strictly win probs, because these include ties
var straight_flush_win_probs = {
h_0_0_0_0: 0.015625,
h_0_1_0_0: 0.046875,
h_0_0_0_1: 0.046875,
h_0_1_0_1: 0.0625,
h_1_0_1_0: 0.078125,
h_1_1_1_0: 0.109375,
h_1_0_1_1: 0.109375,
h_1_1_1_1: 0.125,
h_2_0_0_0: 0.15625,
h_0_0_2_0: 0.15625,
h_2_0_0_1: 0.1875,
h_0_1_2_0: 0.1875,
h_2_1_0_0: 0.21875,
h_0_0_2_1: 0.21875,
h_2_1_0_1: 0.25,
h_0_1_2_1: 0.25,
h_2_0_2_0: 0.265625,
h_2_0_2_1: 0.296875,
h_2_1_2_0: 0.296875,
h_2_1_2_1: 0.3125,
h_0_0_3_0: 0.34375,
h_3_0_0_0: 0.34375,
h_0_1_3_0: 0.375,
h_3_0_0_1: 0.375,
h_3_1_0_0: 0.40625,
h_0_0_3_1: 0.40625,
h_3_1_0_1: 0.4375,
h_0_1_3_1: 0.4375,
h_3_0_1_0: 0.46875,
h_1_0_3_0: 0.46875,
h_1_1_3_0: 0.5,
h_3_0_1_1: 0.5,
h_3_1_1_0: 0.53125,
h_1_0_3_1: 0.53125,
h_3_1_1_1: 0.5625,
h_1_1_3_1: 0.5625,
h_3_0_3_0: 0.578125,
h_3_1_3_0: 0.609375,
h_3_0_3_1: 0.609375,
h_3_1_3_1: 0.625,
h_0_1_1_0: 0.65625,
h_1_0_0_1: 0.65625,
h_1_1_0_0: 0.6875,
h_0_0_1_1: 0.6875,
h_2_0_1_1: 0.71875,
h_1_1_2_0: 0.71875,
h_1_0_2_1: 0.75,
h_2_1_1_0: 0.75,
h_3_0_2_1: 0.78125,
h_2_1_3_0: 0.78125,
h_3_1_2_0: 0.8125,
h_2_0_3_1: 0.8125,
h_1_0_0_0: 0.84375,
h_0_0_1_0: 0.84375,
h_1_1_0_1: 0.875,
h_0_1_1_1: 0.875,
h_1_0_2_0: 0.90625,
h_2_0_1_0: 0.90625,
h_1_1_2_1: 0.9375,
h_2_1_1_1: 0.9375,
h_3_0_2_0: 0.96875,
h_2_0_3_0: 0.96875,
h_2_1_3_1: 1.0,
h_3_1_2_1: 1.0
};

var straight_flush_losers_win_probs = {
h_2_1_3_1: 0.03125,
h_3_1_2_1: 0.03125,
h_3_0_2_0: 0.0625,
h_2_0_3_0: 0.0625,
h_1_1_2_1: 0.09375,
h_2_1_1_1: 0.09375,
h_2_0_1_0: 0.125,
h_1_0_2_0: 0.125,
h_1_1_0_1: 0.15625,
h_0_1_1_1: 0.15625,
h_1_0_0_0: 0.1875,
h_0_0_1_0: 0.1875,
h_3_1_2_0: 0.21875,
h_2_0_3_1: 0.21875,
h_3_0_2_1: 0.25,
h_2_1_3_0: 0.25,
h_1_0_2_1: 0.28125,
h_2_1_1_0: 0.28125,
h_2_0_1_1: 0.3125,
h_1_1_2_0: 0.3125,
h_1_1_0_0: 0.34375,
h_0_0_1_1: 0.34375,
h_0_1_1_0: 0.375,
h_1_0_0_1: 0.375,
h_3_1_3_1: 0.390625,
h_3_0_3_1: 0.421875,
h_3_1_3_0: 0.421875,
h_3_0_3_0: 0.4375,
h_3_1_1_1: 0.46875,
h_1_1_3_1: 0.46875,
h_3_1_1_0: 0.5,
h_1_0_3_1: 0.5,
h_1_1_3_0: 0.53125,
h_3_0_1_1: 0.53125,
h_3_0_1_0: 0.5625,
h_1_0_3_0: 0.5625,
h_0_1_3_1: 0.59375,
h_3_1_0_1: 0.59375,
h_3_1_0_0: 0.625,
h_0_0_3_1: 0.625,
h_3_0_0_1: 0.65625,
h_0_1_3_0: 0.65625,
h_3_0_0_0: 0.6875,
h_0_0_3_0: 0.6875,
h_2_1_2_1: 0.703125,
h_2_0_2_1: 0.734375,
h_2_1_2_0: 0.734375,
h_2_0_2_0: 0.75,
h_2_1_0_1: 0.78125,
h_0_1_2_1: 0.78125,
h_2_1_0_0: 0.8125,
h_0_0_2_1: 0.8125,
h_2_0_0_1: 0.84375,
h_0_1_2_0: 0.84375,
h_2_0_0_0: 0.875,
h_0_0_2_0: 0.875,
h_1_1_1_1: 0.890625,
h_1_0_1_1: 0.921875,
h_1_1_1_0: 0.921875,
h_1_0_1_0: 0.9375,
h_0_1_0_1: 0.953125,
h_0_1_0_0: 0.984375,
h_0_0_0_1: 0.984375,
h_0_0_0_0: 1.0
}

// returns hand with cards in opposite order, for checking ties
function swap_order(hand) {
    return "h_" + hand.substring(6, 9) + "_" + hand.substring(2, 5);
}

function play_hand(game, losers, hand) {
    var opponents_hand, my_hand_index, opponents_hand_index, win, win_prob, expected_value;
    if (game == "straight_flush") {
        if (losers) {
            opponents_hand = argchoice(straight_flush_losers_hand_order)
            my_hand_index = straight_flush_losers_hand_order.indexOf(hand);
            win_prob = straight_flush_losers_win_probs[hand];
        } else {
            opponents_hand = argchoice(straight_flush_hand_order)
            my_hand_index = straight_flush_hand_order.indexOf(hand);
            win_prob = straight_flush_win_probs[hand];
        }
    }
    opponents_hand_index = opponents_hand[0];
    opponents_hand = opponents_hand[1];
    tie = (hand === opponents_hand )|| (hand === swap_order(opponents_hand));
    win = (!tie) && (my_hand_index >= opponents_hand_index);
    
    var lose_prob = 1 - win_prob;
    //correct for ties
    if (hand === swap_order(hand)) { 
        win_prob -= 1/64;
    } else {
        win_prob -= 1/32;
    }
    expected_value = win_prob - lose_prob; 

    return [win, tie, opponents_hand, expected_value]; 
}


