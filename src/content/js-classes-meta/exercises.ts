export interface Exercise {
  instruction: string;
  starterCode: string;
  solution: string;
  htmlSetup: string;
  expectedOutput?: string;
  validate: "console" | "dom";
}

const exercises: Record<string, Exercise> = {
  // === Chapter 01 : Classes en profondeur ===
  "01-class-expression": {
    instruction:
      "Assigne une class expression anonyme à la constante Greeter. La classe doit avoir une méthode hello() qui retourne \"hi\".",
    starterCode:
      "const Greeter = _____ {\n  hello() { return \"hi\"; }\n};\nconsole.log(new Greeter().hello());",
    solution:
      "const Greeter = class {\n  hello() { return \"hi\"; }\n};\nconsole.log(new Greeter().hello());",
    htmlSetup: "",
    expectedOutput: "hi",
    validate: "console",
  },
  "01-strict-mode": {
    instruction:
      "Le corps d'une classe est toujours en strict mode. Si on détache une méthode et qu'on l'appelle sans contexte, this vaut undefined (pas window). Complète la méthode pour retourner \"no this\" si this est undefined.",
    starterCode:
      "class Foo {\n  hi() { return _____ === undefined ? \"no this\" : \"has this\"; }\n}\nconst f = new Foo();\nconst fn = f.hi;\nconsole.log(fn());",
    solution:
      "class Foo {\n  hi() { return this === undefined ? \"no this\" : \"has this\"; }\n}\nconst f = new Foo();\nconst fn = f.hi;\nconsole.log(fn());",
    htmlSetup: "",
    expectedOutput: "no this",
    validate: "console",
  },
  "01-evaluation-order": {
    instruction:
      "Dans un static field initializer, this fait référence à la classe elle-même. Utilise this pour lire le static field a et calculer b = a + 1.",
    starterCode:
      "class Foo {\n  static a = 1;\n  static b = _____.a + 1;\n}\nconsole.log(Foo.b);",
    solution:
      "class Foo {\n  static a = 1;\n  static b = this.a + 1;\n}\nconsole.log(Foo.b);",
    htmlSetup: "",
    expectedOutput: "2",
    validate: "console",
  },

  // === Chapter 02 : Public & private fields ===
  "02-public-field": {
    instruction:
      "Déclare un public field 'count' avec une valeur par défaut de 0 (sans passer par le constructor).",
    starterCode:
      "class Counter {\n  _____ = 0;\n  inc() { this.count++; }\n}\nconst c = new Counter();\nc.inc();\nc.inc();\nconsole.log(c.count);",
    solution:
      "class Counter {\n  count = 0;\n  inc() { this.count++; }\n}\nconst c = new Counter();\nc.inc();\nc.inc();\nconsole.log(c.count);",
    htmlSetup: "",
    expectedOutput: "2",
    validate: "console",
  },
  "02-private-field": {
    instruction:
      "Préfixe le champ 'balance' pour le rendre privé (inaccessible depuis l'extérieur de la classe).",
    starterCode:
      "class Wallet {\n  _____balance = 100;\n  spend(n) { this.#balance -= n; }\n  get total() { return this.#balance; }\n}\nconst w = new Wallet();\nw.spend(30);\nconsole.log(w.total);",
    solution:
      "class Wallet {\n  #balance = 100;\n  spend(n) { this.#balance -= n; }\n  get total() { return this.#balance; }\n}\nconst w = new Wallet();\nw.spend(30);\nconsole.log(w.total);",
    htmlSetup: "",
    expectedOutput: "70",
    validate: "console",
  },
  "02-private-method": {
    instruction:
      "Appelle la méthode privée #double depuis la méthode publique run.",
    starterCode:
      "class Calculator {\n  #double(n) { return n * 2; }\n  run(n) { return this._____(n); }\n}\nconsole.log(new Calculator().run(5));",
    solution:
      "class Calculator {\n  #double(n) { return n * 2; }\n  run(n) { return this.#double(n); }\n}\nconsole.log(new Calculator().run(5));",
    htmlSetup: "",
    expectedOutput: "10",
    validate: "console",
  },

  // === Chapter 03 : Static avancé ===
  "03-static-method": {
    instruction:
      "Une méthode statique s'appelle directement sur la classe, pas sur une instance. Appelle MathUtils.square(4).",
    starterCode:
      "class MathUtils {\n  static square(n) { return n * n; }\n}\nconsole.log(MathUtils._____(4));",
    solution:
      "class MathUtils {\n  static square(n) { return n * n; }\n}\nconsole.log(MathUtils.square(4));",
    htmlSetup: "",
    expectedOutput: "16",
    validate: "console",
  },
  "03-static-field": {
    instruction:
      "Déclare un static field 'version' avec la valeur \"1.0\" puis affiche-le.",
    starterCode:
      "class Config {\n  _____ version = \"1.0\";\n}\nconsole.log(Config.version);",
    solution:
      "class Config {\n  static version = \"1.0\";\n}\nconsole.log(Config.version);",
    htmlSetup: "",
    expectedOutput: "1.0",
    validate: "console",
  },
  "03-static-init": {
    instruction:
      "Utilise un static initialization block pour pousser \"b\" dans Registry.items après l'initialisation.",
    starterCode:
      "class Registry {\n  static items = [];\n  _____ {\n    Registry.items.push(\"a\");\n    Registry.items.push(\"b\");\n  }\n}\nconsole.log(Registry.items.length);",
    solution:
      "class Registry {\n  static items = [];\n  static {\n    Registry.items.push(\"a\");\n    Registry.items.push(\"b\");\n  }\n}\nconsole.log(Registry.items.length);",
    htmlSetup: "",
    expectedOutput: "2",
    validate: "console",
  },

  // === Chapter 04 : Symbols, les bases ===
  "04-symbol-create": {
    instruction:
      "Crée un Symbol avec la description \"user-id\" et affiche son typeof (qui doit valoir \"symbol\").",
    starterCode:
      "const id = _____(\"user-id\");\nconsole.log(typeof id);",
    solution:
      "const id = Symbol(\"user-id\");\nconsole.log(typeof id);",
    htmlSetup: "",
    expectedOutput: "symbol",
    validate: "console",
  },
  "04-symbol-unique": {
    instruction:
      "Deux Symbols créés avec le même libellé restent différents. Crée b avec Symbol(\"x\") et compare.",
    starterCode:
      "const a = Symbol(\"x\");\nconst b = _____(\"x\");\nconsole.log(a === b);",
    solution:
      "const a = Symbol(\"x\");\nconst b = Symbol(\"x\");\nconsole.log(a === b);",
    htmlSetup: "",
    expectedOutput: "false",
    validate: "console",
  },
  "04-symbol-for": {
    instruction:
      "Symbol.for() utilise le registre global : deux appels avec la même clé retournent le MÊME symbol. Utilise Symbol.for(\"shared\") pour a et b.",
    starterCode:
      "const a = Symbol._____(\"shared\");\nconst b = Symbol.for(\"shared\");\nconsole.log(a === b);",
    solution:
      "const a = Symbol.for(\"shared\");\nconst b = Symbol.for(\"shared\");\nconsole.log(a === b);",
    htmlSetup: "",
    expectedOutput: "true",
    validate: "console",
  },
  "04-symbol-key": {
    instruction:
      "Utilise le Symbol ID comme clé d'un objet user (clé calculée entre crochets).",
    starterCode:
      "const ID = Symbol(\"id\");\nconst user = {\n  name: \"Alice\",\n  [_____]: 42\n};\nconsole.log(user[ID]);",
    solution:
      "const ID = Symbol(\"id\");\nconst user = {\n  name: \"Alice\",\n  [ID]: 42\n};\nconsole.log(user[ID]);",
    htmlSetup: "",
    expectedOutput: "42",
    validate: "console",
  },

  // === Chapter 05 : Symbol.iterator ===
  "05-symbol-iterator": {
    instruction:
      "Implémente Symbol.iterator pour rendre Range itérable avec for...of et le spread. La méthode doit retourner un objet avec next().",
    starterCode:
      "class Range {\n  constructor(end) { this.end = end; }\n  [Symbol._____]() {\n    let i = 1;\n    const end = this.end;\n    return {\n      next() {\n        return i <= end\n          ? { value: i++, done: false }\n          : { value: undefined, done: true };\n      }\n    };\n  }\n}\nconsole.log([...new Range(3)].join(\",\"));",
    solution:
      "class Range {\n  constructor(end) { this.end = end; }\n  [Symbol.iterator]() {\n    let i = 1;\n    const end = this.end;\n    return {\n      next() {\n        return i <= end\n          ? { value: i++, done: false }\n          : { value: undefined, done: true };\n      }\n    };\n  }\n}\nconsole.log([...new Range(3)].join(\",\"));",
    htmlSetup: "",
    expectedOutput: "1,2,3",
    validate: "console",
  },
  "05-iterator-generator": {
    instruction:
      "Version courte avec un generator method (préfixe *). Utilise yield pour produire chaque valeur.",
    starterCode:
      "class Counter {\n  constructor(max) { this.max = max; }\n  *[Symbol.iterator]() {\n    for (let i = 1; i <= this.max; i++) _____ i;\n  }\n}\nconsole.log([...new Counter(3)].join(\",\"));",
    solution:
      "class Counter {\n  constructor(max) { this.max = max; }\n  *[Symbol.iterator]() {\n    for (let i = 1; i <= this.max; i++) yield i;\n  }\n}\nconsole.log([...new Counter(3)].join(\",\"));",
    htmlSetup: "",
    expectedOutput: "1,2,3",
    validate: "console",
  },

  // === Chapter 06 : Coercion ===
  "06-to-primitive": {
    instruction:
      "Implémente Symbol.toPrimitive pour que l'opérateur unaire + retourne le montant numérique.",
    starterCode:
      "class Money {\n  constructor(amount) { this.amount = amount; }\n  [Symbol._____](hint) {\n    if (hint === \"number\") return this.amount;\n    return this.amount + \"\\u20ac\";\n  }\n}\nconst m = new Money(42);\nconsole.log(+m);",
    solution:
      "class Money {\n  constructor(amount) { this.amount = amount; }\n  [Symbol.toPrimitive](hint) {\n    if (hint === \"number\") return this.amount;\n    return this.amount + \"\\u20ac\";\n  }\n}\nconst m = new Money(42);\nconsole.log(+m);",
    htmlSetup: "",
    expectedOutput: "42",
    validate: "console",
  },
  "06-to-string-tag": {
    instruction:
      "Implémente le getter Symbol.toStringTag pour personnaliser Object.prototype.toString.",
    starterCode:
      "class Box {\n  get [Symbol._____]() { return \"Box\"; }\n}\nconsole.log(Object.prototype.toString.call(new Box()));",
    solution:
      "class Box {\n  get [Symbol.toStringTag]() { return \"Box\"; }\n}\nconsole.log(Object.prototype.toString.call(new Box()));",
    htmlSetup: "",
    expectedOutput: "[object Box]",
    validate: "console",
  },

  // === Chapter 07 : String operations ===
  "07-symbol-match": {
    instruction:
      "Implémente Symbol.match pour qu'un objet Contains fonctionne avec String#match. Retourne [this.value] si trouvé, sinon null.",
    starterCode:
      "class Contains {\n  constructor(value) { this.value = value; }\n  [Symbol._____](str) {\n    return str.includes(this.value) ? [this.value] : null;\n  }\n}\nconsole.log(\"foobar\".match(new Contains(\"bar\"))[0]);",
    solution:
      "class Contains {\n  constructor(value) { this.value = value; }\n  [Symbol.match](str) {\n    return str.includes(this.value) ? [this.value] : null;\n  }\n}\nconsole.log(\"foobar\".match(new Contains(\"bar\"))[0]);",
    htmlSetup: "",
    expectedOutput: "bar",
    validate: "console",
  },
  "07-symbol-replace": {
    instruction:
      "Implémente Symbol.replace pour qu'un objet Censor remplace toutes les occurrences de this.word par replacement dans la chaîne.",
    starterCode:
      "class Censor {\n  constructor(word) { this.word = word; }\n  [Symbol.replace](str, replacement) {\n    return str.split(this.word).join(_____);\n  }\n}\nconsole.log(\"hello world\".replace(new Censor(\"world\"), \"***\"));",
    solution:
      "class Censor {\n  constructor(word) { this.word = word; }\n  [Symbol.replace](str, replacement) {\n    return str.split(this.word).join(replacement);\n  }\n}\nconsole.log(\"hello world\".replace(new Censor(\"world\"), \"***\"));",
    htmlSetup: "",
    expectedOutput: "hello ***",
    validate: "console",
  },

  // === Chapter 08 : hasInstance & isConcatSpreadable ===
  "08-has-instance": {
    instruction:
      "Override l'opérateur instanceof avec Symbol.hasInstance pour qu'il retourne true sur les nombres pairs.",
    starterCode:
      "class Even {\n  static [Symbol._____](value) {\n    return typeof value === \"number\" && value % 2 === 0;\n  }\n}\nconsole.log(4 instanceof Even);",
    solution:
      "class Even {\n  static [Symbol.hasInstance](value) {\n    return typeof value === \"number\" && value % 2 === 0;\n  }\n}\nconsole.log(4 instanceof Even);",
    htmlSetup: "",
    expectedOutput: "true",
    validate: "console",
  },
  "08-concat-spreadable": {
    instruction:
      "Active Symbol.isConcatSpreadable sur un objet array-like pour qu'il soit spread par Array#concat (au lieu d'être ajouté tel quel).",
    starterCode:
      "const arr = [1, 2];\nconst obj = { 0: \"a\", 1: \"b\", length: 2, [Symbol._____]: true };\nconsole.log([].concat(arr, obj).length);",
    solution:
      "const arr = [1, 2];\nconst obj = { 0: \"a\", 1: \"b\", length: 2, [Symbol.isConcatSpreadable]: true };\nconsole.log([].concat(arr, obj).length);",
    htmlSetup: "",
    expectedOutput: "4",
    validate: "console",
  },

  // === Chapter 09 : Symbol.species ===
  "09-species": {
    instruction:
      "Override Symbol.species pour qu'Array#map sur une instance de MyArray retourne un Array natif (pas un MyArray).",
    starterCode:
      "class MyArray extends Array {\n  static get [Symbol._____]() { return Array; }\n}\nconst a = new MyArray(1, 2, 3);\nconst mapped = a.map(x => x * 2);\nconsole.log(mapped instanceof MyArray);",
    solution:
      "class MyArray extends Array {\n  static get [Symbol.species]() { return Array; }\n}\nconst a = new MyArray(1, 2, 3);\nconst mapped = a.map(x => x * 2);\nconsole.log(mapped instanceof MyArray);",
    htmlSetup: "",
    expectedOutput: "false",
    validate: "console",
  },
};

export default exercises;
