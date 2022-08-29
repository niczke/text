var min = 0;
var max = 100;
var Answers = null;
var gegnerATK = "";
var gegnerHP = "";
var gegnerINT = "";
var gegnername = "";
var hero = {
  Equipment: [],
  HP: [],
  INT: [],
  ATK: [],
};
var gegner1 = {
  name: "Gushina",
  HP: 150,
  INT: 90,
  ATK: 15,
};
var endboss = {
  name: "Ganondorf",
  HP: 500,
  INT: 50,
  ATK: 50,
};
var schild = {
  Equipment: ["Schild"],
  HP: 200,
  INT: 70,
  ATK: 10,
};
var schwert = {
  Equipment: ["Schwert"],
  HP: 130,
  INT: 60,
  ATK: 20,
};
var dolch = {
  Equipment: ["Dolch"],
  HP: 100,
  INT: 80,
  ATK: 30,
};
var zauberstab = {
  Equipment: ["Zauberstab"],
  HP: 80,
  INT: 80,
  ATK: 40,
};
var min = 1;
var max = 100;
var random = null;
var nodes = {
  "1:Waffe": {
    text: "Du bist nun alt genug um eine Waffe zu besitzen. Möchtest du mit einem Schild(1), einem Schwert(2), einem Dolch(3) oder einem Zauberstab(4) kämpfen?",
    Answers: {
      1: "schild", // var schild
      2: "schwert", // var schwert
      3: "dolch", //var dolch
      4: "Zauberstab", // var zauberstab
    },
  },
  "2:Bonbon": {
    text: "Du hast ein Bonbon auf dem Boden gefunden. Möchtest du es essen(1), es anschauen(2), es verkaufen(3) oder weiterlaufen(4?",
    Answers: {
      1: "essen", // hero HP-20
      2: "anschauen", // int + 5
      3: "verkaufen", // ATK + 5
      4: "weiterlaufen", // nichts
    },
  },
  "3:Gegner": {
    text: "Du triffst auf einen Gushina! Er sieht geschwächt aus. Möchtest du ihn angreifen(1), ausweichen(2), kontern(3) oder fliehen(4) ",
    Answers: {
      1: "angreifen", // hero INT true = gegner1 HP- hero ATK
      2: "ausweichen", // hero INT
      3: "kontern", // hero INT -> true = hero ATK*2
      4: "fliehen", // 20/80 chance sonst tod // Nach kampf hp + 30
    },
  },
  "4:Kind": {
    text: "Im Fluss vor dir ist ein Kind am ertrinken! Rettest du es(1), rufst du nach Hilfe(2), nutzt du ein Baumstamm zur Hilfe(3) oder läufst du weiter(4?",
    Answers: {
      1: "retten", // hero INT -> true = trank hero +10 ATK
      2: "hilfe", //hero INT - 10
      3: "baum", //hero INT + 20
      4: "weiterlaufen", // hero INT -20
    },
  },
  "5:Endboss": {
    text: "Du triffst auf den Ganondorf! Er sieht stark aus. Möchtest du ihn angreifen(1), ausweichen(2), kontern(3) oder aufgeben(4)? ",
    Answers: {
      1: "angreifen", //hero INT true = gegner2 HP - hero ATK
      2: "ausweichen", //hero INT
      3: "kontern", //hero INT true = gegner2 HP - 2*hero ATK
      4: "aufgeben", //verloren
    },
  },
};
var index = 0;
var currentnode;
var key;
function index1() {
  key = Object.keys(nodes)[index];
  currentnode = nodes[key]; //not defined bei console.log, da in funktion intigriert
  if (key == "3:Gegner") {
    if (gegner1.HP <= 0) {
      hero.HP = hero.HP * 3;
      hero.ATK = hero.ATK * 2.5;
      hero.INT = hero.INT * 1.1;
      index++;
      key = Object.keys(nodes)[index];
      currentnode = nodes[key]; //not defined bei console.log, da in funktion intigriert
    }
  } else if (key == "5:Endboss") {
    if (endboss <= 0) {
      index++;
      key = Object.keys(nodes)[index];
      currentnode = nodes[key]; //not defined bei console.log, da in funktion intigriert
    }
  } else {
    index++;
    render();
  }
}
index1();
function step() {
  render();
}
const hpbon = [-13, 14, 5, 2, -5];
function moja() {
	for (let i= hpbon.length -1; i >0; i--){
		let j = Math.floor(Math.random()*i)
		let k =hpbon[i]
		hpbon[i] = hpbon [j]
		hpbon[j] = k
	}

return hpbon[2];
}
function randomizer() {
  var random = Math.random();
  random = random * 100;
  return hero.INT <= random;
}
function answers(Answers, currentnode) {
  ergebnis = currentnode(Answers);
}
function buttononclick(button) {
  if (key == "1:Waffe") {
    switch (button) {
      case "1":
        hero = schild;
        break;
      case "2":
        hero = schwert;
        break;
      case "3":
        hero = dolch;
        break;
      case "4":
        hero = zauberstab;
        break;
    }
  } else if (key == "2:Bonbon") {
    switch (button) {
      case "1":
        hero.HP = hero.HP -moja();
        break;
      case "2":
        hero.INT = hero.INT + 5;
        break;
      case "3":
        hero.ATK = hero.ATK + 5;
        break;
      case "4":
        break;
    }
    gegnername = gegner1.name;
    gegnerATK = gegner1.ATK;
    gegnerHP = gegner1.HP;
    gegnerINT = gegner1.INT;
  } else if (key == "3:Gegner") {
    switch (button) {
      case "1":
        if (randomizer()) {
          gegner1.HP = gegner1.HP - hero.ATK;
        } else hero.HP = hero.HP - gegner1.ATK;
        break;
      case "2":
        if (randomizer()) {
          hero.ATK = hero.ATK + 10;
        } else {
          hero.HP = hero.HP - gegner1.ATK;
        }
        break;
      case "3":
        if (randomizer()) {
          hero.HP = hero.HP - 2 * gegner1.ATK;
        } else {
          gegner1.HP = gegner1.HP - 2 * hero.ATK;
        }
        break;
      case "4":
        endgame();
        break;
    }
    if (gegner1.HP <= 1) {
      gegnerATK = "";
      gegnerHP = "";
      gegnerINT = "";
      gegnername = "";
      gegner1.HP = 0;
      gegner1.ATK = 0;
      gegner1.INT = 0;
      gegner1.name = "";
      render();
    } else {
      index1();
    }
    gegnername = gegner1.name;
    gegnerATK = gegner1.ATK;
    gegnerHP = gegner1.HP;
    gegnerINT = gegner1.INT;
  } else if (key == "4:Kind") {
    switch (button) {
      case "1":
        if (randomizer()) {
          hero.ATK = hero.ATK + 10;
        }
        break;
      case "2":
        hero.INT = hero.INT - 10;
        break;
      case "3":
        hero.INT = hero.INT + 5;
        break;
      case "4":
        hero.INT = hero.INT - 20;
        break;
    }
    gegnername = endboss.name;
    gegnerATK = endboss.ATK;
    gegnerHP = endboss.HP;
    gegnerINT = endboss.INT;
    index++;
  } else {
    switch (button) {
      case "1":
        endboss.HP = endboss.HP - hero.ATK;
        break;
      case "2":
        if (randomizer()) {
          hero.HP = hero.HP - endboss.ATK;
        }
        break;
      case "3":
        if (randomizer()) {
          hero.HP = hero.HP - 2 * endboss.ATK;
        } else {
          endboss.HP = endboss.HP - 2 * hero.ATK;
        }
        break;
      case "4":
        endgame;
        break;
    }
    if (endboss.HP <= 1) {
      gegnerHP = 0;
      render();
      alert("Du hast gewonnen!");
    } else {
      index1();
    }
    gegnername = endboss.name;
    gegnerATK = endboss.ATK;
    gegnerHP = endboss.HP;
    gegnerINT = endboss.INT;

    render();
  }
  if (hero.HP <= 1) {
    endgame();
  }
  index1();
  render();
}
step();

function render() {
  console.log(hero, currentnode);
  document.getElementById("Eingabe").innerHTML = currentnode.text;
  document.getElementById("heroEquipment").innerHTML = hero.Equipment;
  document.getElementById("heroHP").innerHTML = hero.HP;
  document.getElementById("heroATK").innerHTML = hero.ATK;
  document.getElementById("heroINT").innerHTML = hero.INT;
  document.getElementById("gegnerHP").innerHTML = gegnerHP;
  document.getElementById("gegnerATK").innerHTML = gegnerATK;
  document.getElementById("gegnerINT").innerHTML = gegnerINT;
  document.getElementById("gegnername").innerHTML = gegnername;
}

document.createElement("input");

var button = document.createElement("input");

function endgame() {
  window.close();
}