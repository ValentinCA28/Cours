export interface Exercise {
  instruction: string;
  starterCode: string;
  solution: string;
  htmlSetup: string;
  expectedOutput?: string;
  validate: "console" | "dom";
}

const exercises: Record<string, Exercise> = {
  // === Chapter 00 : let / const ===
  "00-const-vs-let": {
    instruction:
      "Modifie la propriété 'age' de l'objet user pour la passer à 26, puis affiche-la avec console.log. Note : on ne peut pas réassigner une const, mais on peut muter ses propriétés.",
    starterCode:
      "const user = { name: \"Alice\", age: 25 };\nuser._____ = 26;\nconsole.log(user.age);",
    solution:
      "const user = { name: \"Alice\", age: 25 };\nuser.age = 26;\nconsole.log(user.age);",
    htmlSetup: "",
    expectedOutput: "26",
    validate: "console",
  },
  "00-block-scope": {
    instruction:
      "Déclare un compteur 'count' à l'extérieur d'une boucle for. Dans la boucle, incrémente count à chaque tour (3 itérations). Affiche count après la boucle. Utilise let pour i.",
    starterCode:
      "let count = 0;\nfor (_____ i = 0; i < 3; i++) {\n  count++;\n}\nconsole.log(count);",
    solution:
      "let count = 0;\nfor (let i = 0; i < 3; i++) {\n  count++;\n}\nconsole.log(count);",
    htmlSetup: "",
    expectedOutput: "3",
    validate: "console",
  },

  // === Chapter 01 : Arrow Functions ===
  "01-arrow-basic": {
    instruction:
      "Convertis la fonction classique en arrow function qui double un nombre. Affiche double(5).",
    starterCode:
      "const double = (n) _____ {\n  return n * 2;\n};\nconsole.log(double(5));",
    solution:
      "const double = (n) => {\n  return n * 2;\n};\nconsole.log(double(5));",
    htmlSetup: "",
    expectedOutput: "10",
    validate: "console",
  },
  "01-arrow-implicit": {
    instruction:
      "Écris une arrow function avec retour implicite (sans accolades) qui retourne n + 1. Affiche le résultat avec 4.",
    starterCode:
      "const increment = n => _____;\nconsole.log(increment(4));",
    solution:
      "const increment = n => n + 1;\nconsole.log(increment(4));",
    htmlSetup: "",
    expectedOutput: "5",
    validate: "console",
  },
  "01-arrow-map": {
    instruction:
      "Utilise map() avec une arrow function pour doubler chaque nombre du tableau. Affiche le résultat sous forme de JSON.",
    starterCode:
      "const nums = [1, 2, 3];\nconst doubled = nums.map(_____);\nconsole.log(JSON.stringify(doubled));",
    solution:
      "const nums = [1, 2, 3];\nconst doubled = nums.map(n => n * 2);\nconsole.log(JSON.stringify(doubled));",
    htmlSetup: "",
    expectedOutput: "[2,4,6]",
    validate: "console",
  },

  // === Chapter 02 : Default Parameters ===
  "02-default-greet": {
    instruction:
      "Définis une fonction greet(name, greeting = \"Hello\") qui retourne \"Hello, World!\" quand on l'appelle avec greet(\"World\").",
    starterCode:
      "function greet(name, greeting _____ \"Hello\") {\n  return greeting + \", \" + name + \"!\";\n}\nconsole.log(greet(\"World\"));",
    solution:
      "function greet(name, greeting = \"Hello\") {\n  return greeting + \", \" + name + \"!\";\n}\nconsole.log(greet(\"World\"));",
    htmlSetup: "",
    expectedOutput: "Hello, World!",
    validate: "console",
  },
  "02-default-multiply": {
    instruction:
      "Définis multiply(a, b = a * 2) où b prend par défaut le double de a. Appelle multiply(3) (donc b = 6) et affiche le produit (3 * 6 = 18).",
    starterCode:
      "function multiply(a, b = _____) {\n  return a * b;\n}\nconsole.log(multiply(3));",
    solution:
      "function multiply(a, b = a * 2) {\n  return a * b;\n}\nconsole.log(multiply(3));",
    htmlSetup: "",
    expectedOutput: "18",
    validate: "console",
  },

  // === Chapter 03 : Rest & Spread ===
  "03-rest-sum": {
    instruction:
      "Écris une fonction sum qui utilise le rest parameter (...nums) pour accepter un nombre variable d'arguments et retourner leur somme.",
    starterCode:
      "function sum(_____nums) {\n  return nums.reduce((acc, n) => acc + n, 0);\n}\nconsole.log(sum(1, 2, 3, 4, 5));",
    solution:
      "function sum(...nums) {\n  return nums.reduce((acc, n) => acc + n, 0);\n}\nconsole.log(sum(1, 2, 3, 4, 5));",
    htmlSetup: "",
    expectedOutput: "15",
    validate: "console",
  },
  "03-spread-merge": {
    instruction:
      "Fusionne arr1 et arr2 dans un tableau merged en utilisant le spread operator. Affiche la longueur du tableau résultant.",
    starterCode:
      "const arr1 = [1, 2, 3];\nconst arr2 = [4, 5, 6];\nconst merged = [_____arr1, _____arr2];\nconsole.log(merged.length);",
    solution:
      "const arr1 = [1, 2, 3];\nconst arr2 = [4, 5, 6];\nconst merged = [...arr1, ...arr2];\nconsole.log(merged.length);",
    htmlSetup: "",
    expectedOutput: "6",
    validate: "console",
  },

  // === Chapter 04 : Destructuring ===
  "04-destruct-obj": {
    instruction:
      "Destructure les propriétés name et age depuis l'objet user, puis affiche name.",
    starterCode:
      "const user = { name: \"Alice\", age: 25 };\nconst { _____, age } = user;\nconsole.log(name);",
    solution:
      "const user = { name: \"Alice\", age: 25 };\nconst { name, age } = user;\nconsole.log(name);",
    htmlSetup: "",
    expectedOutput: "Alice",
    validate: "console",
  },
  "04-destruct-array": {
    instruction:
      "Destructure le tableau colors pour récupérer le 1er et le 3e élément (saute le 2e). Affiche third.",
    starterCode:
      "const colors = [\"red\", \"green\", \"blue\"];\nconst [first, _____, third] = colors;\nconsole.log(third);",
    solution:
      "const colors = [\"red\", \"green\", \"blue\"];\nconst [first, , third] = colors;\nconsole.log(third);",
    htmlSetup: "",
    expectedOutput: "blue",
    validate: "console",
  },
  "04-destruct-params": {
    instruction:
      "Écris une fonction describe qui prend un objet { name, age } destructuré en paramètre et retourne un template literal du type \"Alice (25)\".",
    starterCode:
      "function describe({ _____, age }) {\n  return `${name} (${age})`;\n}\nconsole.log(describe({ name: \"Alice\", age: 25 }));",
    solution:
      "function describe({ name, age }) {\n  return `${name} (${age})`;\n}\nconsole.log(describe({ name: \"Alice\", age: 25 }));",
    htmlSetup: "",
    expectedOutput: "Alice (25)",
    validate: "console",
  },

  // === Chapter 05 : Template Literals ===
  "05-template-basic": {
    instruction:
      "Utilise un template literal avec ${} pour interpoler name et score dans la chaîne. Affiche \"Score de Bob: 90\".",
    starterCode:
      "const name = \"Bob\";\nconst score = 90;\nconst msg = _____Score de ${name}: ${score}_____;\nconsole.log(msg);",
    solution:
      "const name = \"Bob\";\nconst score = 90;\nconst msg = `Score de ${name}: ${score}`;\nconsole.log(msg);",
    htmlSetup: "",
    expectedOutput: "Score de Bob: 90",
    validate: "console",
  },
  "05-template-multiline": {
    instruction:
      "Crée une chaîne multi-ligne avec un template literal contenant \"Ligne 1\\nLigne 2\". Affiche sa longueur (15 caractères, le \\n compte pour 1).",
    starterCode:
      "const text = _____Ligne 1\nLigne 2_____;\nconsole.log(text.length);",
    solution:
      "const text = `Ligne 1\nLigne 2`;\nconsole.log(text.length);",
    htmlSetup: "",
    expectedOutput: "15",
    validate: "console",
  },

  // === Chapter 06 : Classes ===
  "06-class-basic": {
    instruction:
      "Crée une classe Person avec un constructor(name) et une méthode greet() qui retourne \"Hello, \" + this.name. Affiche le résultat de greet() pour Eve.",
    starterCode:
      "class Person {\n  _____(name) {\n    this.name = name;\n  }\n  greet() {\n    return \"Hello, \" + this.name;\n  }\n}\nconsole.log(new Person(\"Eve\").greet());",
    solution:
      "class Person {\n  constructor(name) {\n    this.name = name;\n  }\n  greet() {\n    return \"Hello, \" + this.name;\n  }\n}\nconsole.log(new Person(\"Eve\").greet());",
    htmlSetup: "",
    expectedOutput: "Hello, Eve",
    validate: "console",
  },
  "06-class-inherit": {
    instruction:
      "Fais hériter Dog de Animal avec extends, et override la méthode speak() pour retourner \"<name> aboie !\".",
    starterCode:
      "class Animal {\n  constructor(name) { this.name = name; }\n  speak() { return this.name + \" fait du bruit\"; }\n}\nclass Dog _____ Animal {\n  speak() {\n    return this.name + \" aboie !\";\n  }\n}\nconsole.log(new Dog(\"Rex\").speak());",
    solution:
      "class Animal {\n  constructor(name) { this.name = name; }\n  speak() { return this.name + \" fait du bruit\"; }\n}\nclass Dog extends Animal {\n  speak() {\n    return this.name + \" aboie !\";\n  }\n}\nconsole.log(new Dog(\"Rex\").speak());",
    htmlSetup: "",
    expectedOutput: "Rex aboie !",
    validate: "console",
  },

  // === Chapter 08 : Promises ===
  "08-promise-basic": {
    instruction:
      "Crée une Promise déjà résolue avec la valeur \"Done\" et utilise .then() pour afficher cette valeur dans la console.",
    starterCode:
      "Promise._____(\"Done\").then(value => console.log(value));",
    solution:
      "Promise.resolve(\"Done\").then(value => console.log(value));",
    htmlSetup: "",
    expectedOutput: "Done",
    validate: "console",
  },
  "08-async-await": {
    instruction:
      "Définis une fonction async run() qui await Promise.resolve(42) puis affiche le résultat. Appelle run() à la fin.",
    starterCode:
      "async function run() {\n  const value = _____ Promise.resolve(42);\n  console.log(value);\n}\nrun();",
    solution:
      "async function run() {\n  const value = await Promise.resolve(42);\n  console.log(value);\n}\nrun();",
    htmlSetup: "",
    expectedOutput: "42",
    validate: "console",
  },

  // === Chapter 09 : Iterables ===
  "09-iterator-custom": {
    instruction:
      "Parcours le tableau [1, 2, 3] avec for...of et calcule la somme dans la variable total. Affiche total.",
    starterCode:
      "const nums = [1, 2, 3];\nlet total = 0;\nfor (const n _____ nums) {\n  total += n;\n}\nconsole.log(total);",
    solution:
      "const nums = [1, 2, 3];\nlet total = 0;\nfor (const n of nums) {\n  total += n;\n}\nconsole.log(total);",
    htmlSetup: "",
    expectedOutput: "6",
    validate: "console",
  },
  "09-generator": {
    instruction:
      "Définis une generator function gen() avec 3 yields (1, 2, 3). Parcours-la avec for...of et calcule la somme.",
    starterCode:
      "function_____ gen() {\n  yield 1;\n  yield 2;\n  yield 3;\n}\nlet sum = 0;\nfor (const n of gen()) sum += n;\nconsole.log(sum);",
    solution:
      "function* gen() {\n  yield 1;\n  yield 2;\n  yield 3;\n}\nlet sum = 0;\nfor (const n of gen()) sum += n;\nconsole.log(sum);",
    htmlSetup: "",
    expectedOutput: "6",
    validate: "console",
  },

  // === Chapter 10 : for...of / for...in ===
  "10-for-of": {
    instruction:
      "Utilise for...of pour parcourir le tableau [1, 2, 3, 4] et calculer la somme dans total.",
    starterCode:
      "const nums = [1, 2, 3, 4];\nlet total = 0;\nfor (const n _____ nums) {\n  total += n;\n}\nconsole.log(total);",
    solution:
      "const nums = [1, 2, 3, 4];\nlet total = 0;\nfor (const n of nums) {\n  total += n;\n}\nconsole.log(total);",
    htmlSetup: "",
    expectedOutput: "10",
    validate: "console",
  },
  "10-for-in": {
    instruction:
      "Utilise for...in pour parcourir les clés de l'objet user et compter combien il y en a. Affiche le compteur.",
    starterCode:
      "const user = { name: \"Alice\", age: 25, role: \"admin\" };\nlet count = 0;\nfor (const key _____ user) {\n  count++;\n}\nconsole.log(count);",
    solution:
      "const user = { name: \"Alice\", age: 25, role: \"admin\" };\nlet count = 0;\nfor (const key in user) {\n  count++;\n}\nconsole.log(count);",
    htmlSetup: "",
    expectedOutput: "3",
    validate: "console",
  },

  // === Chapter 11 : Map & Set ===
  "11-map-basic": {
    instruction:
      "Crée une Map vide, ajoute deux entrées avec set(), puis affiche la taille de la Map.",
    starterCode:
      "const map = new _____();\nmap.set(\"a\", 1);\nmap.set(\"b\", 2);\nconsole.log(map.size);",
    solution:
      "const map = new Map();\nmap.set(\"a\", 1);\nmap.set(\"b\", 2);\nconsole.log(map.size);",
    htmlSetup: "",
    expectedOutput: "2",
    validate: "console",
  },
  "11-set-dedup": {
    instruction:
      "Utilise un Set pour dédupliquer le tableau [1, 2, 2, 3, 3, 3], puis reconvertis-le en tableau avec le spread operator. Affiche la longueur du tableau résultant.",
    starterCode:
      "const arr = [1, 2, 2, 3, 3, 3];\nconst unique = [..._____ Set(arr)];\nconsole.log(unique.length);",
    solution:
      "const arr = [1, 2, 2, 3, 3, 3];\nconst unique = [...new Set(arr)];\nconsole.log(unique.length);",
    htmlSetup: "",
    expectedOutput: "3",
    validate: "console",
  },
};

export default exercises;
