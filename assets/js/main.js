const {createApp} = Vue

createApp({
    data() {
      return {
        cardNumber: 4,
        restClick: 10,
        cards: [],
        openedCards: [],
        openingCards: [],
        timeout: null
      }
    },
    methods: {
        initCards() {
            let cards = []
            for(let i = 0; i < this.cardNumber; i++) {
                const index = Math.floor(Math.random() * pokemonCards.length)
                const card = pokemonCards[index]
                cards = [
                    ...cards,
                     JSON.parse(JSON.stringify(card)),
                     JSON.parse(JSON.stringify(card)),
                    ]
            }
            this.shuffleCards(cards)
            return cards;
        },
        shuffleCards(cards) {
            const resultCards = cards.sort(() => 0.5 - Math.random());
            return resultCards
        },
        checkUnOpenable(card) {
            return this.openedCards.includes(card) || this.openingCards.includes(card) || this.win != 0; 
        },
        handleReset() {
            this.cards = this.initCards()
            this.restClick = 10
            this.openedCards = []
            this.openingCards = []
            this.timeout = null
        },
        handleOpen(card) {
            if(!this.timeout) {
                this.openingCards.push(card)
                if(this.openingCards.length == 2) {
                    if(this.openingCards[0].id == this.openingCards[1].id) {
                        this.openedCards.push(this.openingCards[0], this.openingCards[1])
                        this.openingCards = []
                    } else {
                        this.restClick --;
                        this.timeout = setTimeout(() => {
                            this.openingCards = []
                            this.timeout = null
                        }, 800)
                    }
                }
            }
        }
    },
    computed: {
        win() {
            return this.openedCards.length == this.cardNumber * 2 ? 1 : this.restClick == 0 ? -1 : 0
        }
    },
    mounted() {
        this.cards = this.initCards()
    },
    watch: {
        cardNumber() {
            this.handleReset()
        }
    }
    
  }).mount('#app')