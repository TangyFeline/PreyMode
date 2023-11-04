for (let category in all_challenges){
    for (let challenge of all_challenges[category]){        
        let url = challenge.img;        
        let img = new Image();
        img.src = url;
        img.onerror = function() {
            console.log("Couldn't find ", url);
        }
    }
}