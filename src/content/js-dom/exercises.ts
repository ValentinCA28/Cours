export interface Exercise {
  instruction: string;
  starterCode: string;
  solution: string;
  htmlSetup: string;
  expectedOutput?: string;
  validate: "console" | "dom";
}

const exercises: Record<string, Exercise> = {
  // === Chapter 00 ===
  "00-document": {
    instruction: "Utilise l'objet document pour afficher le titre de la page avec console.log.",
    starterCode: "// Affiche le titre de la page\nconsole.log(document.____);",
    solution: "console.log(document.title);",
    htmlSetup: "",
    validate: "console",
  },
  "00-domcontentloaded": {
    instruction: "Écris un écouteur DOMContentLoaded qui affiche 'DOM prêt !' dans la console.",
    starterCode: 'document.addEventListener("_____", function () {\n  console.log("_____");\n});',
    solution: 'document.addEventListener("DOMContentLoaded", function () {\n  console.log("DOM prêt !");\n});',
    htmlSetup: "",
    expectedOutput: "DOM prêt !",
    validate: "console",
  },

  // === Chapter 01 ===
  "01-queryselector": {
    instruction: "Sélectionne le paragraphe avec la classe 'important' et affiche son contenu texte.",
    starterCode: 'const el = document._____(".important");\nconsole.log(el.textContent);',
    solution: 'const el = document.querySelector(".important");\nconsole.log(el.textContent);',
    htmlSetup: '<p>Normal</p><p class="important">Ce texte est important !</p>',
    expectedOutput: "Ce texte est important !",
    validate: "console",
  },
  "01-queryselectorall": {
    instruction: "Sélectionne tous les éléments <li> et affiche leur nombre avec console.log.",
    starterCode: 'const items = document._____("li");\nconsole.log(items.length);',
    solution: 'const items = document.querySelectorAll("li");\nconsole.log(items.length);',
    htmlSetup: "<ul><li>A</li><li>B</li><li>C</li><li>D</li></ul>",
    expectedOutput: "4",
    validate: "console",
  },
  "01-sibling": {
    instruction: "Sélectionne l'élément avec la classe 'current', puis affiche le texte de son frère suivant.",
    starterCode: 'const el = document.querySelector(".current");\nconst next = el._____;\nconsole.log(next.textContent);',
    solution: 'const el = document.querySelector(".current");\nconst next = el.nextElementSibling;\nconsole.log(next.textContent);',
    htmlSetup: '<ul><li>Premier</li><li class="current">Actuel</li><li>Suivant</li></ul>',
    expectedOutput: "Suivant",
    validate: "console",
  },

  // === Chapter 02 ===
  "02-textcontent": {
    instruction: "Change le texte du titre en 'Salut le DOM !' avec textContent.",
    starterCode: 'const title = document.querySelector("h1");\ntitle._____ = "_____";',
    solution: 'const title = document.querySelector("h1");\ntitle.textContent = "Salut le DOM !";',
    htmlSetup: "<h1>Ancien titre</h1>",
    validate: "dom",
  },
  "02-innerhtml": {
    instruction: "Utilise innerHTML pour ajouter un paragraphe en gras dans le conteneur.",
    starterCode: 'const box = document.querySelector("#box");\nbox._____ = "<strong>Texte en gras</strong>";',
    solution: 'const box = document.querySelector("#box");\nbox.innerHTML = "<strong>Texte en gras</strong>";',
    htmlSetup: '<div id="box">Contenu original</div>',
    validate: "dom",
  },
  "02-getattribute": {
    instruction: "Lis l'attribut href du lien et affiche-le dans la console.",
    starterCode: 'const link = document.querySelector("a");\nconst url = link._____("href");\nconsole.log(url);',
    solution: 'const link = document.querySelector("a");\nconst url = link.getAttribute("href");\nconsole.log(url);',
    htmlSetup: '<a href="https://example.com">Mon lien</a>',
    expectedOutput: "https://example.com",
    validate: "console",
  },
  "02-dataset": {
    instruction: "Lis la valeur de l'attribut data-role de l'élément #user et affiche-la.",
    starterCode: 'const user = document.querySelector("#user");\nconsole.log(user._____.role);',
    solution: 'const user = document.querySelector("#user");\nconsole.log(user.dataset.role);',
    htmlSetup: '<div id="user" data-role="admin" data-user-id="42">Alice</div>',
    expectedOutput: "admin",
    validate: "console",
  },

  // === Chapter 03 ===
  "03-style": {
    instruction: "Change la couleur de fond de la boîte en 'tomato' et sa taille de police en '20px'.",
    starterCode: 'const box = document.querySelector(".box");\nbox.style._____ = "tomato";\nbox.style._____ = "20px";',
    solution: 'const box = document.querySelector(".box");\nbox.style.backgroundColor = "tomato";\nbox.style.fontSize = "20px";',
    htmlSetup: '<div class="box" style="padding:10px;">Ma boîte</div>',
    validate: "dom",
  },
  "03-toggle": {
    instruction: "Bascule (toggle) la classe 'visible' sur l'élément .menu et affiche si elle est maintenant présente.",
    starterCode: 'const menu = document.querySelector(".menu");\nconst result = menu.classList._____("visible");\nconsole.log(result);',
    solution: 'const menu = document.querySelector(".menu");\nconst result = menu.classList.toggle("visible");\nconsole.log(result);',
    htmlSetup: '<nav class="menu">Navigation</nav>',
    expectedOutput: "true",
    validate: "console",
  },
  "03-replace": {
    instruction: "Ajoute la classe 'active' à la carte, puis remplace-la par 'selected'.",
    starterCode: 'const card = document.querySelector(".card");\ncard.classList._____("active");\ncard.classList._____("active", "selected");\nconsole.log(card.className);',
    solution: 'const card = document.querySelector(".card");\ncard.classList.add("active");\ncard.classList.replace("active", "selected");\nconsole.log(card.className);',
    htmlSetup: '<div class="card">Ma carte</div>',
    expectedOutput: "card selected",
    validate: "console",
  },

  // === Chapter 04 ===
  "04-addeventlistener": {
    instruction: "Ajoute un écouteur de clic sur le bouton qui affiche 'Cliqué !' dans la console.",
    starterCode: 'const btn = document.querySelector("button");\nbtn._____("_____", function () {\n  console.log("Cliqué !");\n});\nbtn.click(); // Simule un clic',
    solution: 'const btn = document.querySelector("button");\nbtn.addEventListener("click", function () {\n  console.log("Cliqué !");\n});\nbtn.click(); // Simule un clic',
    htmlSetup: '<button id="btn">Clique-moi</button>',
    expectedOutput: "Cliqué !",
    validate: "console",
  },
  "04-preventdefault": {
    instruction: "Empêche le formulaire de recharger la page et affiche 'Formulaire soumis !' dans la console.",
    starterCode: 'const form = document.querySelector("form");\nform.addEventListener("submit", function (e) {\n  e._____();\n  console.log("Formulaire soumis !");\n});\nform.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));',
    solution: 'const form = document.querySelector("form");\nform.addEventListener("submit", function (e) {\n  e.preventDefault();\n  console.log("Formulaire soumis !");\n});\nform.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));',
    htmlSetup: '<form><input type="text"><button type="submit">Envoyer</button></form>',
    expectedOutput: "Formulaire soumis !",
    validate: "console",
  },
  "04-delegation": {
    instruction: "Utilise la délégation d'événements : attache un seul écouteur sur la <ul> qui affiche le texte du <li> cliqué.",
    starterCode: 'const list = document.querySelector("ul");\nlist.addEventListener("click", function (e) {\n  if (e.target._____ === "_____") {\n    console.log(e.target.textContent);\n  }\n});\nlist.children[1].click();',
    solution: 'const list = document.querySelector("ul");\nlist.addEventListener("click", function (e) {\n  if (e.target.tagName === "LI") {\n    console.log(e.target.textContent);\n  }\n});\nlist.children[1].click();',
    htmlSetup: "<ul><li>Pomme</li><li>Banane</li><li>Cerise</li></ul>",
    expectedOutput: "Banane",
    validate: "console",
  },

  // === Chapter 05 ===
  "05-createelement": {
    instruction: "Crée un élément <p>, donne-lui le texte 'Nouveau paragraphe' et ajoute-le dans le conteneur.",
    starterCode: 'const p = document._____("p");\np.textContent = "_____";\ndocument.querySelector(".container")._____(p);',
    solution: 'const p = document.createElement("p");\np.textContent = "Nouveau paragraphe";\ndocument.querySelector(".container").appendChild(p);',
    htmlSetup: '<div class="container"><p>Existant</p></div>',
    validate: "dom",
  },
  "05-prepend": {
    instruction: "Crée un <li> avec le texte 'Premier !' et insère-le au début de la liste avec prepend.",
    starterCode: 'const li = document.createElement("li");\nli.textContent = "Premier !";\nconst list = document.querySelector("ul");\nlist._____(li);',
    solution: 'const li = document.createElement("li");\nli.textContent = "Premier !";\nconst list = document.querySelector("ul");\nlist.prepend(li);',
    htmlSetup: "<ul><li>A</li><li>B</li><li>C</li></ul>",
    validate: "dom",
  },
  "05-remove": {
    instruction: "Supprime l'élément avec la classe 'a-supprimer' du DOM.",
    starterCode: 'const el = document.querySelector(".a-supprimer");\nel._____();',
    solution: 'const el = document.querySelector(".a-supprimer");\nel.remove();',
    htmlSetup: '<div><p>Garde-moi</p><p class="a-supprimer">Supprime-moi !</p><p>Garde-moi aussi</p></div>',
    validate: "dom",
  },
  "05-clonenode": {
    instruction: "Clone la carte (deep clone) et ajoute la copie dans le conteneur.",
    starterCode: 'const card = document.querySelector(".card");\nconst copy = card._____(_____);\ndocument.querySelector(".container").appendChild(copy);',
    solution: 'const card = document.querySelector(".card");\nconst copy = card.cloneNode(true);\ndocument.querySelector(".container").appendChild(copy);',
    htmlSetup: '<div class="container"><div class="card"><h3>Titre</h3><p>Contenu</p></div></div>',
    validate: "dom",
  },

  // === Chapter 06 ===
  "06-async-get": {
    instruction: "Complète la fonction async pour parser correctement la réponse JSON et l'afficher.",
    starterCode: 'async function getData() {\n  const response = await fetch("https://jsonplaceholder.typicode.com/users/1");\n  if (!response._____) {\n    throw new Error("Erreur HTTP");\n  }\n  const data = await response._____();\n  console.log(data.name);\n}\ngetData();',
    solution: 'async function getData() {\n  const response = await fetch("https://jsonplaceholder.typicode.com/users/1");\n  if (!response.ok) {\n    throw new Error("Erreur HTTP");\n  }\n  const data = await response.json();\n  console.log(data.name);\n}\ngetData();',
    htmlSetup: "",
    expectedOutput: "Leanne Graham",
    validate: "console",
  },
  "06-post": {
    instruction: "Complète la requête POST pour envoyer un objet avec title et body en JSON.",
    starterCode: 'async function createPost() {\n  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {\n    method: "_____",\n    headers: {\n      "Content-Type": "_____",\n    },\n    body: JSON._____({\n      title: "Mon post",\n      body: "Contenu du post",\n    }),\n  });\n  const data = await response.json();\n  console.log(data.title);\n}\ncreatePost();',
    solution: 'async function createPost() {\n  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {\n    method: "POST",\n    headers: {\n      "Content-Type": "application/json",\n    },\n    body: JSON.stringify({\n      title: "Mon post",\n      body: "Contenu du post",\n    }),\n  });\n  const data = await response.json();\n  console.log(data.title);\n}\ncreatePost();',
    htmlSetup: "",
    expectedOutput: "Mon post",
    validate: "console",
  },

  // === Chapter 07 ===
  "07-console": {
    instruction: "Utilise console.warn pour afficher un avertissement et console.error pour afficher une erreur.",
    starterCode: 'console._____("Attention : valeur manquante");\nconsole._____("Erreur critique !");',
    solution: 'console.warn("Attention : valeur manquante");\nconsole.error("Erreur critique !");',
    htmlSetup: "",
    validate: "console",
  },
  "07-optional-chaining": {
    instruction: "Utilise l'optional chaining pour accéder au textContent d'un élément qui n'existe peut-être pas, et affiche le résultat.",
    starterCode: 'const text = document.querySelector(".inexistant")_____textContent;\nconsole.log(text);',
    solution: 'const text = document.querySelector(".inexistant")?.textContent;\nconsole.log(text);',
    htmlSetup: '<p class="existant">Texte existant</p>',
    expectedOutput: "undefined",
    validate: "console",
  },
  "07-fetch-error": {
    instruction: "Corrige ce code fetch pour qu'il détecte correctement une erreur HTTP 404.",
    starterCode: 'async function loadData() {\n  try {\n    const response = await fetch("https://jsonplaceholder.typicode.com/invalid-endpoint");\n    // Ajoute la vérification manquante ici\n    \n    const data = await response.json();\n    console.log("OK");\n  } catch (error) {\n    console.log("Erreur détectée");\n  }\n}\nloadData();',
    solution: 'async function loadData() {\n  try {\n    const response = await fetch("https://jsonplaceholder.typicode.com/invalid-endpoint");\n    if (!response.ok) {\n      throw new Error("Erreur HTTP " + response.status);\n    }\n    const data = await response.json();\n    console.log("OK");\n  } catch (error) {\n    console.log("Erreur détectée");\n  }\n}\nloadData();',
    htmlSetup: "",
    expectedOutput: "Erreur détectée",
    validate: "console",
  },
};

export default exercises;
