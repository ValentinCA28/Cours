export interface Exercise {
  instruction: string;
  starterCode: string;
  solution: string;
  htmlSetup: string;
  expectedOutput?: string;
  validate: "console" | "dom";
}

const exercises: Record<string, Exercise> = {
  // === Chapter 00 : SSR vs CSR ===
  "00-ssr-avantage": {
    instruction: "Parmi ces affirmations, laquelle est un avantage du SSR ? Affiche 'SEO' dans la console.",
    starterCode: '// Quel est l\'avantage principal du SSR pour les moteurs de recherche ?\nconsole.log("_____");',
    solution: 'console.log("SEO");',
    htmlSetup: "",
    expectedOutput: "SEO",
    validate: "console",
  },

  // === Chapter 01 : Flask bases ===
  "01-flask-route": {
    instruction: "Complète la déclaration d'une route Flask qui répond sur '/hello'.",
    starterCode: 'from flask import Flask\napp = Flask(__name__)\n\n@app._____("/_____")\ndef hello():\n    return "Hello World!"',
    solution: 'from flask import Flask\napp = Flask(__name__)\n\n@app.route("/hello")\ndef hello():\n    return "Hello World!"',
    htmlSetup: "",
    validate: "console",
  },
  "01-flask-run": {
    instruction: "Complète le code pour lancer l'app Flask en mode debug.",
    starterCode: 'if __name__ == "__main__":\n    app._____(_____=True)',
    solution: 'if __name__ == "__main__":\n    app.run(debug=True)',
    htmlSetup: "",
    validate: "console",
  },

  // === Chapter 02 : Jinja2 syntaxe ===
  "02-jinja-variable": {
    instruction: "Écris la syntaxe Jinja2 pour afficher la variable 'username' dans un template.",
    starterCode: '<h1>Bonjour, _____ username _____</h1>',
    solution: '<h1>Bonjour, {{ username }}</h1>',
    htmlSetup: "",
    validate: "console",
  },
  "02-jinja-condition": {
    instruction: "Complète la condition Jinja2 qui affiche 'Admin' si is_admin est vrai.",
    starterCode: '_____ if is_admin _____\n  <span>Admin</span>\n_____ endif _____',
    solution: '{% if is_admin %}\n  <span>Admin</span>\n{% endif %}',
    htmlSetup: "",
    validate: "console",
  },
  "02-jinja-boucle": {
    instruction: "Écris une boucle Jinja2 qui parcourt une liste 'items' et affiche chaque élément dans un <li>.",
    starterCode: '_____ for item in items _____\n  <li>_____ item _____</li>\n_____ endfor _____',
    solution: '{% for item in items %}\n  <li>{{ item }}</li>\n{% endfor %}',
    htmlSetup: "",
    validate: "console",
  },
  "02-jinja-filtre": {
    instruction: "Utilise un filtre Jinja2 pour afficher 'name' en majuscules.",
    starterCode: '<p>{{ name | _____ }}</p>',
    solution: '<p>{{ name | upper }}</p>',
    htmlSetup: "",
    validate: "console",
  },

  // === Chapter 03 : Héritage de templates ===
  "03-extends": {
    instruction: "Complète la syntaxe pour hériter du template 'base.html'.",
    starterCode: '_____ extends "base.html" _____\n\n_____ block content _____\n  <h1>Ma Page</h1>\n_____ endblock _____',
    solution: '{% extends "base.html" %}\n\n{% block content %}\n  <h1>Ma Page</h1>\n{% endblock %}',
    htmlSetup: "",
    validate: "console",
  },
  "03-include": {
    instruction: "Utilise la directive Jinja2 pour inclure le fichier 'header.html'.",
    starterCode: '_____ include "header.html" _____',
    solution: '{% include "header.html" %}',
    htmlSetup: "",
    validate: "console",
  },

  // === Chapter 04 : render_template ===
  "04-render": {
    instruction: "Complète le code Flask pour rendre un template avec une variable 'name'.",
    starterCode: 'from flask import Flask, _____\n\n@app.route("/greet/<name>")\ndef greet(name):\n    return _____("greet.html", _____=name)',
    solution: 'from flask import Flask, render_template\n\n@app.route("/greet/<name>")\ndef greet(name):\n    return render_template("greet.html", name=name)',
    htmlSetup: "",
    validate: "console",
  },
  "04-route-dynamique": {
    instruction: "Crée une route dynamique qui capture un paramètre 'id' de type entier.",
    starterCode: '@app.route("/item/_____")\ndef item(id):\n    return render_template("item.html", item_id=id)',
    solution: '@app.route("/item/<int:id>")\ndef item(id):\n    return render_template("item.html", item_id=id)',
    htmlSetup: "",
    validate: "console",
  },

  // === Chapter 05 : Données JSON & CSV ===
  "05-json-load": {
    instruction: "Complète le code pour charger des données depuis un fichier JSON.",
    starterCode: 'import json\n\nwith open("data.json", "r") as f:\n    data = json._____(f)',
    solution: 'import json\n\nwith open("data.json", "r") as f:\n    data = json.load(f)',
    htmlSetup: "",
    validate: "console",
  },
  "05-csv-reader": {
    instruction: "Complète le code pour lire un fichier CSV avec DictReader.",
    starterCode: 'import csv\n\nwith open("data.csv", "r") as f:\n    reader = csv._____(f)\n    for row in reader:\n        print(row["name"])',
    solution: 'import csv\n\nwith open("data.csv", "r") as f:\n    reader = csv.DictReader(f)\n    for row in reader:\n        print(row["name"])',
    htmlSetup: "",
    validate: "console",
  },

  // === Chapter 06 : SQLite ===
  "06-sqlite-connect": {
    instruction: "Complète le code pour se connecter à une base SQLite et exécuter une requête.",
    starterCode: 'import sqlite3\n\nconn = sqlite3._____("database.db")\ncursor = conn.cursor()\ncursor._____("SELECT * FROM users")\nresults = cursor.fetchall()\nconn.close()',
    solution: 'import sqlite3\n\nconn = sqlite3.connect("database.db")\ncursor = conn.cursor()\ncursor.execute("SELECT * FROM users")\nresults = cursor.fetchall()\nconn.close()',
    htmlSetup: "",
    validate: "console",
  },
  "06-sqlite-param": {
    instruction: "Utilise une requête paramétrisée pour éviter les injections SQL.",
    starterCode: '# ❌ DANGEREUX : injection SQL possible\n# cursor.execute(f"SELECT * FROM users WHERE id = {user_id}")\n\n# ✅ Sécurisé : requête paramétrisée\ncursor.execute("SELECT * FROM users WHERE id = _____", (_____,))',
    solution: 'cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))',
    htmlSetup: "",
    validate: "console",
  },

  // === Chapter 07 : Formulaires ===
  "07-form-get": {
    instruction: "Récupère la valeur du champ 'search' envoyé via GET.",
    starterCode: 'from flask import request\n\n@app.route("/search")\ndef search():\n    query = request._____.get("search", "")\n    return render_template("results.html", query=query)',
    solution: 'from flask import request\n\n@app.route("/search")\ndef search():\n    query = request.args.get("search", "")\n    return render_template("results.html", query=query)',
    htmlSetup: "",
    validate: "console",
  },
  "07-form-post": {
    instruction: "Récupère la valeur du champ 'email' envoyé via POST.",
    starterCode: '@app.route("/register", methods=["GET", "_____"])\ndef register():\n    if request.method == "POST":\n        email = request._____.get("email")\n        return f"Inscrit : {email}"',
    solution: '@app.route("/register", methods=["GET", "POST"])\ndef register():\n    if request.method == "POST":\n        email = request.form.get("email")\n        return f"Inscrit : {email}"',
    htmlSetup: "",
    validate: "console",
  },
};

export default exercises;
