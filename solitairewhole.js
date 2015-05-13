function Game() {  
  var families = ['Hearts',
                  'Spades',
                  'Diamonds',
                  'Clubs']; 
  var ranks = ['Ace',
               '2',
               '3',
               '4',
               '5',
               '6',
               '7',
               '8',
               '9',
               '10',
               'Jack',
               'Queen',
               'King'];
   var deck = []; 
   var stacks = [
    [],
    [],
    [],
    [],
    [],
    [],
    []
  ];
  var wastePile = [];
  var aceSlots = [
    [],
    [],
    [],
    []
  ];
  
  while(deck.length < 52) { 
    var familySpot = Math.round(Math.random() * 3);
    var rankSpot = Math.round(Math.random() * 12);
  
    var card = {
      family: families[familySpot],
      rank: ranks[rankSpot],
      facedown: true
    }; 
    
    if(isCardInDeck(card)) {
      continue;
    } else {
      deck.push(card);
    }
   }
 
   //console.log(deck.length);
  for(var i = 0; i < deck.length; i++) {
    //console.log('  ' + deck[i].rank + ' of ' + deck[i].family);
  }
  

  function isCardInDeck(potentialCard) {
   for(var i = 0; i < deck.length; i++){
    if(deck[i].family == potentialCard.family && deck[i].rank == potentialCard.rank)
       
      {
        return true;
      }
   }     
   return false;
     
  }

  
  fillStacks(stacks);
  
function fillStacks(sourceDeck, destinationDeck) {
  for(var x = 0; x < stacks.length; x++) {
      for(var y = 0; y < x + 1; y++) {

        var cardToPush = deck.splice(0,1)[0];
        cardToPush.facedown = true;
        stacks[x].push(cardToPush);
      }

      stacks[x][stacks[x].length-1].facedown = false;
      //console.log(stacks[x]);
  }
}
  function drawCard() {
    var drawnCard = deck.pop();
    drawnCard.facedown = false;
    wastePile.push(drawnCard);
    return drawnCard;
  }
  
  function isFirstCardMoreThanSecond(firstCard, secondCard) {
    if(ranks.indexOf(firstCard.rank) - 1 === ranks.indexOf(secondCard.rank)) {
      return true;
    } else {
      return false;
    }
  }
  
  function isCardOpposite(cardA, cardB) {
    var positionValueOfFamilyA = families.indexOf(cardA.family);
    var positionValueOfFamilyB = families.indexOf(cardB.family);
    if(positionValueOfFamilyA % 2 !== positionValueOfFamilyB % 2) {
      return true;
    } else {
      return false;
    }
  }
  
  function isFamilySame(cardA, cardB){
    return cardA.family === cardB.family; 
  }
  
  function canMoveWasteCardToStack(stackIndex) {
    var stack = stacks[stackIndex];
    var topCardOnStack = stack[stack.length - 1];
    var wasteCard = wastePile[wastePile.length - 1];
    if(isCardOpposite(topCardOnStack, wasteCard) && isFirstCardMoreThanSecond(topCardOnStack, wasteCard)) {
      return true;
    } else {
      return false;
    }
  }
  
   function canMoveWasteCardToAceSlot(slotIndex) {
    var aceSlot = aceSlots[slotIndex];
    var wasteCard = wastePile[wastePile.length - 1];
    var topCardOnSlot = aceSlot[aceSlot.length - 1];
    if (aceSlot.length === 0) {
      if(ranks.indexOf(wasteCard.rank) === 0){
      return true;
      } else {
        return false;        
      }
    } else {
    if(isFamilySame(topCardOnSlot, wasteCard) && isFirstCardMoreThanSecond(wasteCard, topCardOnSlot)) {
      return true;
    } else {
      return false;
      }
    }
  }
  
  function canMoveAceCardToStack(slotIndex){
    var aceSlot = aceSlots[slotIndex];
    var stack = stacks[stack.length - 1];
    var topCardOnSlot = aceSlot[aceSlot.length - 1];
    if (aceSlot.length === 0){
      if (ranks.indexOf(stack.rank) === 0){
        return true;
      } else {
        return false;
      }
    } else {
      if (isFamilySame(topCardOnSlot, stack) && isFirstCardMoreThanSecond(stack, topCardOnSlot)){
        return true;
      } else {
        return false;
      }
    }
  }

  function moveWasteCardToStack(stackIndex) {
    var canMove = canMoveWasteCardToStack(stackIndex);
    if (canMove){
    var wasteCard = wastePile.pop();
    var stack = stacks[stackIndex];
    stack.push(wasteCard);
    } else{
      throw "You made an illegal move";
    }
  }

  function moveWasteCardToAceSlot(slotIndex) {
    var canMove = canMoveWasteCardToStack(slotIndex);
    if (canMove){
    var wasteCard = wastePile.pop();
    var aceSlot = aceSlots[slotIndex];
    aceSlot.push(wasteCard);
    } else{
      throw "You made an illegal move";
    }
  }
  
   function moveStackCardToAceSlot(stackIndex,slotIndex) {
    var canMove = canMoveStackCardToAceSlot(stackIndex,slotIndex);
    if (canMove){
    var stackCard = stacks[stackIndex].pop();
    var aceSlot = aceSlot[slotIndex];
    aceSlot.push(stackCard);
    } else{
      throw "You made an illegal move";
    }
  }
  
  return {
    drawCard: drawCard,
    canMoveWasteCardToStack: canMoveWasteCardToStack,
    canMoveWasteCardToAceSlot: canMoveWasteCardToAceSlot,
    moveWasteCardToStack: moveWasteCardToStack,
    moveWasteCardToAceSlot: moveWasteCardToAceSlot,
    moveStackCardToAceSlot: moveStackCardToAceSlot
  };
}

var game = new Game();
var drawnCard = game.drawCard();
console.log(drawnCard);
//var moveCard = game.wastePile[x];
for (var i = 0; i < 4; i++){
  var canMove = game.canMoveWasteCardToAceSlot(i);
  console.log("ace slots: ");
  console.log(canMove);
  if (canMove){
    game.canMoveWasteCardToAceSlot(i);
    break;
  }
}
for (var i = 0; i < 7; i++){
var canMove = game.canMoveWasteCardToStack(i);
  console.log("waste cards to stack: ");
    console.log(canMove);
    if(canMove) {
    game.moveWasteCardToStack(i);
      break;
  } 
}
