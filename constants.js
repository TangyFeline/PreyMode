class Challenge{
    constructor(name, desc, difficulty, index, excludes){
        if (excludes == undefined){
            excludes = []
        }
        this.name = name
        this.desc = desc
        this.difficulty = difficulty
        this.index = index
        this.img = "./challenges/"+this.name.toLowerCase().replace(/[\s\W]+/g,'') + '.png';
        this.excludes = excludes        
    }    

    isValid(already_chosen){        
        if (already_chosen.includes(this.name)){
            return false;
        }
        else{
            for (let exclude of this.excludes){
                if (already_chosen.includes(exclude)){
                    return false
                }
            }
        }
        return true;
    }
}

let difficulty_flavors = {
    "easy": "Normal",
    "normal":"Fierce",
    "hard": "Wrathful",
    "veryhard": "Eternal",
    "goal":"Goal"
}

let rune_restrictions = ["Unruly", "Bleater", "Mundane Prey", "Blind Panic", "Unlucky Rabbit's Foot"];
let you_may_not_attack = ["Prancing Prey", "Woolen Armor", "A Gentle Doe", "Trophy Hunt"];

let all_challenges = {
    "easy":[
        ["Deer in the Headlights", "You may not move for three turns after being attacked by a player."],

        ["Unruly", "You may not use any runes that give discipline.", ["Prancing Prey", "Woolen Armor"]],        
        ["Bleater", "You may not use runes that give charisma.", ["Prancing Prey", "Woolen Armor", "Mundane Prey", "A Softer Touch"]],
        ["Mundane Prey", "You may not use any runes that give magicka.", ["Prancing Prey", "Woolen Armor", "Bleater"]],
        ["Blind Panic", "You may not use any runes that give perception.", ["Prancing Prey", "Woolen Armor", "A Softer Touch"]],
        ["Unlucky Rabbit's Foot", "You may not use any runes that give luck.", ["Prancing Prey", "Woolen Armor"]],
    ],

    "normal":[
        ["Wild Commerce", "You may not use Lindella's or Wuffie's shops to buy or sell items or pets."],
        ["A Softer Touch","You may not equip any runes, take any levels or use any items that boost your willpower damage.", ["Bleater", "Blind Panic"]],
        ["Overwhelmed","You may not equip any runes, take any levels or use any items that boost your restoration amount."]
    ],
    
    "hard":[
        ["A Gentle Doe", "You may not attack any person or NPC that does not attack you first."],
        ["Trophy Hunt", "You may not attack unless you are in the top 10 on the dungeon points leaderboard."],
        ["Glass Rabbit","You may never equip a rune that gives more than 10 fortitude."],
        ["No Grazing Zone","You may not use any items that boost your stats.",["Diminutive"]],
        ["Diminutive","You may not level past level 1.", ["No Grazing Zone"]]
    ],

    "veryhard":[
        ["Prancing Prey", "You may not attack unless you have ten agility runes equipped.", [...rune_restrictions, "Woolen Armor", "True Prey"]],
        ["Woolen Armor", "You may not attack unless you have ten regeneration runes equipped.", [...rune_restrictions, "Prancing Prey", "True Prey"]],
        ["True Prey", "You may not attack any player or NPC under any circumstances.", [...you_may_not_attack, "A Softer Touch", "Prancing Prey", "Woolen Armor"]],
    ],

    "goal":[        
        ["Unsafe Ground", "Disenchant all road tiles and keep them disenchanted."],
        ["Prepare for Hibernation", "Establish a stockpile of a specific kind of item. Protect your stockpile."],        
        ["Adorned","Construct an outfit consisting entirely of unique minibosses or bosses."]
    ]
}
for (let category in all_challenges){
    for (let i in all_challenges[category]){
        let challenge  = all_challenges[category][i]
        let name = challenge[0];
        let desc = challenge[1];
        let excludes = challenge[2];
        all_challenges[category][i] = new Challenge(name,desc,category,i, excludes)
    }
}

console.log(all_challenges)
