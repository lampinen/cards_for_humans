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

// returns hand with cards in opposite order, for checking ties
function swap_order(hand) {
    return "h_" + hand.substring(6, 9) + "_" + hand.substring(2, 5);
}

function play_hand(game, losers, hand) {
    var opponents_hand, my_hand_index, opponents_hand_index, win;
    if (game == "straight_flush") {
        if (losers) {
            opponents_hand = argchoice(straight_flush_losers_hand_order)
            my_hand_index = straight_flush_losers_hand_order.indexOf(hand);
        } else {
            opponents_hand = argchoice(straight_flush_hand_order)
            my_hand_index = straight_flush_hand_order.indexOf(hand);
        }
    }
    opponents_hand_index = opponents_hand[0];
    opponents_hand = opponents_hand[1];
    tie = (hand === opponents_hand )|| (hand === swap_order(opponents_hand));
    win = (!tie) && (my_hand_index >= opponents_hand_index);
    return [win, tie, opponents_hand]; 
}


