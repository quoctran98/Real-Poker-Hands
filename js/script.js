class PokerHand {
    constructor(title, description, cards, active_cards) {
        this.title = title;
        this.description = description;
        this.cards = cards;
        this.active_cards = active_cards;
    }

    generate_HTML(hand_index) {
        let html = `
            <div class="row">
                <div class="col-md-12">
                <div class="title-container" id="hand-${hand_index}-title">
                    ${this.title}
                </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-12">
                <div class="description-container" id="hand-${hand_index}-description">
                    ${this.description}
                </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-12">
                <div class="cards-container" id="hand-${hand_index}-cards">
                    <img src="images/cards/${this.cards[0]}.png" class=${this.active_cards[0] ? "on-card" : "off-card"}></img>
                    <img src="images/cards/${this.cards[1]}.png" class=${this.active_cards[1] ? "on-card" : "off-card"}></img>
                    <img src="images/cards/${this.cards[2]}.png" class=${this.active_cards[2] ? "on-card" : "off-card"}></img>
                    <img src="images/cards/${this.cards[3]}.png" class=${this.active_cards[3] ? "on-card" : "off-card"}></img>
                    <img src="images/cards/${this.cards[4]}.png" class=${this.active_cards[4] ? "on-card" : "off-card"}></img>
                </div>
                </div>
            </div>
        `;
        return(html);
    }

    set_HTML(hand_index) {
        let hand_container = document.getElementById("hand-" + hand_index);
        hand_container.innerHTML = this.generate_HTML(hand_index);
    }
}

function object_to_poker_hand(object) {
    return new PokerHand(object.title, object.description, object.cards, object.active_cards);
}

function intiate_list (n_hands) {
    let html = "";
    for (let i = 0; i < n_hands; i++) {
        html += `
            <div class="poker-hand" id="hand-${i}">
            </div>
        `;
    }
    document.getElementById("list-of-hands").innerHTML = html;
}

// hands in the order they should be displayed
let real_hands = [
    "straight_flush",
    "four_of_a_kind",
    "full_house",
    "flush",
    "straight",
    "three_of_a_kind",
    "two_pair",
    "pair",
    "high_card"
];

let fake_hands = [
    "jarts",
    "double_back",
    "gene_name",
    "no_cards",
    "all_odds",
    "all_evens",
    "all_primes",
    "flipped_pair"
]

let hands = [
    "straight_flush",
    "four_of_a_kind",
    "jarts",
    "full_house",
    "gene_name",
    "no_cards",
    "flush",
    "all_primes",
    "straight",
    "all_odds",
    "all_evens",
    "three_of_a_kind",
    "flipped_pair",
    "two_pair",
    "double_back",
    "pair",
    "high_card"
];

// choosing the hands and creating blank html boxes for them
intiate_list(hands.length);

// retrieve the hands from the json file and display them
fetch('./poker_hands.json')
.then((response) => response.json())
.then((poker_hands) => {
    for (let i = 0; i < hands.length; i++) {
        let hand = object_to_poker_hand(poker_hands[hands[i]]);
        hand.set_HTML(i);
    }
});
