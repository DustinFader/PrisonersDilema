class Player {
  constructor() {
    this.history = [];
  }
}

class TitForTat extends Player {
  alg(vs) {
    return vs.history.length ? vs.history[0] : 1;
    // Player colludes as default
    // Player defects only if last game the other defects
  }
}

class TatForTit extends Player {
  alg(vs) {
    return vs.history.length ? 1 - vs.history[0] : 1;
    // Player colludes as default
    // Player does the opposite of the other player
  }
}

class Defector extends Player {
  alg(vs) {
    // always defect
    return 0;
  }
}

class Colluder extends Player {
  alg(vs) {
    // always cooperate
    return 1;
  }
}

class Tester extends Player {
  alg(vs) {
    // defect at first and if no vengeance then defect every other time.
    // Else titfortat afterward.
    // not correct as of yet
    if (!vs.history.length) {
      return 0;
    }

    if (vs.history.includes(0)) {
      return vs.history[0];
    }
    return 0;
  }
}

// choice
// cooperate 1
// defect 0
const games = (player1Act, player2Act) => {
  let score = [0, 0];
  let gameLength = 100;
  let error = 0.1; // i could make it non universale

  for (let i = 0; i < gameLength; i++) {
    // Reverse true to false and vice versa with a percentage of error flipping it.
    let player1Seen = player1Act.alg(player2Act);
    let player2Seen = player2Act.alg(player1Act);
    // refered by copilot.
    if (Math.random() < error) {
      player1Seen = !player1Seen;
      player2Seen = !player2Seen;
    }
  // ------------------------------
    
    // both cooperate
    if (player1Seen && player2Seen) {
      score[0] += 3;
      score[1] += 3;
      player1Act.history.unshift(1);
      player2Act.history.unshift(1);
      continue;
    }
    // Player1 cooperate
    if (player1Seen && !player2Seen) {
      score[0] += 0;
      score[1] += 5;
      player1Act.history.unshift(1);
      player2Act.history.unshift(0);
      continue;
    }
    // player2 cooperate
    if (!player1Seen && player2Seen) {
      score[0] += 5;
      score[1] += 0;
      player1Act.history.unshift(0);
      player2Act.history.unshift(1);
      continue;
    }
    // none cooperate
    if (!player1Seen && !player2Seen) {
      score[0] += 1;
      score[1] += 1;
      player1Act.history.unshift(0);
      player2Act.history.unshift(0);
    }
  }
  console.log("p1", player1Act.history, "p2", player2Act.history);
  return `PLayer 1: ${Math.round(
    (score[0] / (score[0] + score[1])) * 100
  )}% ${score[0]} Player 2: ${Math.round((score[1] / (score[1] + score[0])) * 100)}% ${score[1]}`;
};

let player1 = new TitForTat();
let player2 = new TitForTat();

console.log(games(player1, player2));
