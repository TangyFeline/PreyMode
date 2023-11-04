function onload(){    
    document.addEventListener('mousemove', mousemove);
    let code = getURLCode();
    if (code){
        document.querySelector('.container').classList.add('unfade-up')
        document.querySelector('.container').classList.remove('lower')
        for (let i = 0; i < code.length; i += 2){            
            let challenge = challengeFromCode(code.substring(i,i+2))            
            addCard(challenge.difficulty, challenge.name, challenge.desc, challenge.img)
        }
        flipAll();
    }
    else{
        document.querySelector('.introcontainer').classList.remove('hide');
        document.querySelector('.introcontainer').classList.add('fade-in');
        chooseChallenge();
        chooseChallenge();
        chooseChallenge();
        chooseGoal();
    }
}
function startHere(){
    document.querySelector('.introcontainer').classList.add('fade-down')
    document.querySelector('.introcontainer').classList.add('lower')
    document.querySelector('.container').classList.add('unfade-up')
    document.querySelector('.container').classList.remove('lower')
}
function getURLCode(){
    let url = window.location.href;
    let code = url.split('?')[1];
    if (code && code.length == 8){
        return code;
    }
    else{
        console.log("Invalid code: ",code)
        return undefined
    }
}
function onloadall(){
    document.querySelector('.container').classList.remove('hide')
    document.querySelector('.container').classList.add('unfade-up')
    document.addEventListener('mousemove', mousemove);
    for (let category in all_challenges){
        for (let challenge of all_challenges[category]){            
            addCard(challenge.difficulty, challenge.name, challenge.desc, challenge.img)
        }
    }
    setUpObservers();
}
let key = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
function challengeFromCode(code){
    console.log(code);
    let difficultyCode = code[0]
    let numberCode = code[1]
    let number = key.indexOf(numberCode) 
    let category = all_challenges[Object.keys(all_challenges)[difficultyCode]]

    return category[number]
}
function challengeToCode(difficulty, index){
    let difficultyCode = Object.keys(all_challenges).indexOf(difficulty);    
    let numberCode = key[index]
    let code = difficultyCode.toString() + numberCode
    return code
}
function setUpObservers(){
    const observer = new IntersectionObserver( entries => {
        for (let i in entries){
            let entry = entries[i]
            if (entry.isIntersecting){       
                setTimeout(()=>{
                    entry.target.classList.add('flip')
                }, i*200)                      
            }
        }
    }, {threshold: 0.5})
    for (let card of document.querySelectorAll('.cardinner')){
        observer.observe(card);
    }
}
function flipAll(){
    let elems = document.querySelectorAll('.cardinner')
    for (let i =0;i<elems.length;i++){
        let card = elems[i];
        setTimeout(()=>{
            card.classList.add('flip')
        }, i*200)
    } 
}
let chosen_challenges = []
let chosen_challenges_class = []
function chooseChallenge(){
    let challenge = randChallenge();    
    chosen_challenges.push(challenge.name)    
    chosen_challenges_class.push(challenge)    
    addCard(challenge.difficulty, challenge.name, challenge.desc, challenge.img)
}
function chooseGoal(){
    let goal = randGoal();
    chosen_challenges.push(goal.name)    
    chosen_challenges_class.push(goal)    
    addCard('goal', goal.name, goal.desc, goal.img)
}
function randGoal(){
    return randChallenge('goal')
}
function randChallenge(category){
    if (category == undefined){
        category = randCategory();
    }    
    let challenges = all_challenges[category];    
    if (challenges.length == 0){
        console.log("Error! No challenges!")
    }
    let valid_challenges = challenges.filter( (challenge) => {
        return challenge.isValid(chosen_challenges);
    })
    
    if (valid_challenges.length == 0){
        console.log("Error! No valid challenges!")
    }
    else{
        return randomChoice(valid_challenges);
    }
}

function randCategory(){
    let chances = [0.4, 0.3, 0.2, 0.1]
    let rand = Math.random();
    if (rand < chances[0]){
        return 'easy';
    }else if (rand < chances[1] + chances[0]){
        return 'normal';
    }else if (rand < chances[2] + chances[1] + chances[0]){
        return 'hard';
    }else{
        return 'veryhard';
    }
}
function randomChoice(array) {
    var randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }
function cardClick(e){
    let elem = e.currentTarget;
    console.log(elem)
    if (!elem.querySelector('.flip')){
        elem.querySelector('.cardinner').classList.add('flip');    
        let unflipped = document.querySelectorAll('.cardcontainer:not(#cardtemplate) .cardinner:not(.flip)');    
        let code = ""
        for (let challenge of chosen_challenges_class){
            code += challengeToCode(challenge.difficulty, challenge.index)
        }
        let input = document.querySelector('.codeInput');
        let location = window.location.host
        let url = `${location}?${code}`
        input.value = url;
        if (unflipped.length == 0){
            setTimeout( ()=>{
                let info = document.querySelector('.info');
                info.classList.add('fade-in')
                info.classList.remove('hide')
                
                document.querySelector('.container').classList.add('shrink-up')

            }, 800)
        }
    }
}
function addCard(type, name, desc, img){
    let card = document.querySelector('#cardtemplate');
    let newCard = card.cloneNode(true);
    newCard.id = '';
    newCard.querySelector('.card').classList.add(type)
    newCard.onclick = cardClick;
    newCard.classList.remove('hide')

    newCard.querySelector('.nametext').innerText = name;
    newCard.querySelector('.desctext').innerText = desc;

    newCard.querySelector('.arttarget').src = img

    newCard.querySelector('.difficultytext').innerHTML= difficulty_flavors[type]

    document.querySelector('.container').appendChild(newCard);
}
function mousemove(event) {

    document.querySelectorAll('.cardinner').forEach( (elem) => { 
        var rect = elem.getBoundingClientRect();
        
        var centerX = rect.left + rect.width / 2;

        // Get the mouse coordinates
        var mouseX = event.clientX;        
        
        var distance = mouseX - centerX;
                
        let tamp = 0.01;

        let deg = distance * tamp;
        elem.style.transform = `rotateY(${deg}deg)`
    })

}