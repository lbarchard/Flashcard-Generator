function BasicCard(front, back) {
    this.front = front;
    this.back = back;
}

function ClozeCard(fullText, cloze) {
    this.fullText = fullText;
    this.cloze = cloze;
    if (fullText.search(cloze) === -1) {
        this.partialText = "Oops"
    }
    else {
        this.partialText = fullText.replace(cloze, "...");
    }

}


const firstCard = new ClozeCard("This is the full text", "full");

//put BasicCard
//put ClozeCard
//delete BasicCard
//delete ClozeCard
//post BasicCard
//post ClozeCard
//get BasicCard
//get ClozeCard


console.log(firstCard.partialText);