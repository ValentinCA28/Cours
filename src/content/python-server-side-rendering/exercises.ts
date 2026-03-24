export interface Exercise {
  instruction: string;
  starterCode: string;
  solution: string;
  htmlSetup: string;
  expectedOutput?: string;
  validate: "console" | "dom";
  language?: "python" | "javascript";
}

const exercises: Record<string, Exercise> = {
  // === Chapter 00 : SSR vs CSR ===
  "00-ssr-avantage": {
    instruction: "Crée un dictionnaire représentant les avantages du SSR et affiche celui lié au SEO.",
    starterCode: 'ssr_advantages = {\n    "seo": "Les moteurs de recherche voient le HTML complet",\n    "performance": "Affichage rapide du premier contenu",\n    "accessibility": "Fonctionne sans JavaScript"\n}\n\n# Affiche l\'avantage SEO\nprint(ssr_advantages["_____"])',
    solution: 'ssr_advantages = {\n    "seo": "Les moteurs de recherche voient le HTML complet",\n    "performance": "Affichage rapide du premier contenu",\n    "accessibility": "Fonctionne sans JavaScript"\n}\n\nprint(ssr_advantages["seo"])',
    htmlSetup: "",
    expectedOutput: "Les moteurs de recherche voient le HTML complet",
    validate: "console",
    language: "python",
  },

  // === Chapter 01 : Flask bases ===
  "01-flask-route": {
    instruction: "Complète le code pour créer une application Flask avec une route '/hello' qui retourne 'Hello World!'.",
    starterCode: '# Simule la structure Flask\nclass FlaskApp:\n    def __init__(self, name):\n        self.name = name\n        self.routes = {}\n\n    def route(self, path):\n        def decorator(func):\n            self.routes[path] = func\n            return func\n        return decorator\n\n    def test(self, path):\n        if path in self.routes:\n            return self.routes[path]()\n        return "404 Not Found"\n\napp = FlaskApp(__name__)\n\n@app._____("/_____")\ndef hello():\n    return "Hello World!"\n\n# Test\nprint(app.test("/hello"))',
    solution: '# Simule la structure Flask\nclass FlaskApp:\n    def __init__(self, name):\n        self.name = name\n        self.routes = {}\n\n    def route(self, path):\n        def decorator(func):\n            self.routes[path] = func\n            return func\n        return decorator\n\n    def test(self, path):\n        if path in self.routes:\n            return self.routes[path]()\n        return "404 Not Found"\n\napp = FlaskApp(__name__)\n\n@app.route("/hello")\ndef hello():\n    return "Hello World!"\n\nprint(app.test("/hello"))',
    htmlSetup: "",
    expectedOutput: "Hello World!",
    validate: "console",
    language: "python",
  },
  "01-flask-run": {
    instruction: "Crée un dictionnaire de configuration Flask et active le mode debug.",
    starterCode: 'config = {\n    "host": "0.0.0.0",\n    "port": 5000,\n    "_____": True\n}\n\nprint(f"Serveur Flask: {config[\"host\"]}:{config[\"port\"]}, debug={config[\"debug\"]}")',
    solution: 'config = {\n    "host": "0.0.0.0",\n    "port": 5000,\n    "debug": True\n}\n\nprint(f"Serveur Flask: {config[\"host\"]}:{config[\"port\"]}, debug={config[\"debug\"]}")',
    htmlSetup: "",
    expectedOutput: "Serveur Flask: 0.0.0.0:5000, debug=True",
    validate: "console",
    language: "python",
  },

  // === Chapter 02 : Jinja2 syntaxe ===
  "02-jinja-variable": {
    instruction: "Utilise la méthode format() pour simuler le rendu d'un template avec une variable 'username'.",
    starterCode: 'template = "Bonjour, {username} !"\ndata = {"username": "Alice"}\n\n# Rends le template avec les données\nresult = template._____(**data)\nprint(result)',
    solution: 'template = "Bonjour, {username} !"\ndata = {"username": "Alice"}\n\nresult = template.format(**data)\nprint(result)',
    htmlSetup: "",
    expectedOutput: "Bonjour, Alice !",
    validate: "console",
    language: "python",
  },
  "02-jinja-condition": {
    instruction: "Écris une condition qui affiche le rôle de l'utilisateur selon la variable is_admin.",
    starterCode: 'is_admin = True\n\nif _____:\n    role = "Administrateur"\nelse:\n    role = "Utilisateur"\n\nprint(f"Rôle : {role}")',
    solution: 'is_admin = True\n\nif is_admin:\n    role = "Administrateur"\nelse:\n    role = "Utilisateur"\n\nprint(f"Rôle : {role}")',
    htmlSetup: "",
    expectedOutput: "Rôle : Administrateur",
    validate: "console",
    language: "python",
  },
  "02-jinja-boucle": {
    instruction: "Parcours la liste 'items' et affiche chaque élément avec son numéro (1, 2, 3...).",
    starterCode: 'items = ["Flask", "Jinja2", "SQLite"]\n\nfor i, item in _____(items, start=1):\n    print(f"{i}. {item}")',
    solution: 'items = ["Flask", "Jinja2", "SQLite"]\n\nfor i, item in enumerate(items, start=1):\n    print(f"{i}. {item}")',
    htmlSetup: "",
    expectedOutput: "1. Flask\n2. Jinja2\n3. SQLite",
    validate: "console",
    language: "python",
  },
  "02-jinja-filtre": {
    instruction: "Utilise les méthodes string Python pour convertir un nom en majuscules et le tronquer à 10 caractères.",
    starterCode: 'name = "holberton school"\n\n# Convertir en majuscules\nresult = name._____()\n# Tronquer à 10 caractères\nresult = result[:_____]\n\nprint(result)',
    solution: 'name = "holberton school"\n\nresult = name.upper()\nresult = result[:10]\n\nprint(result)',
    htmlSetup: "",
    expectedOutput: "HOLBERTON ",
    validate: "console",
    language: "python",
  },

  // === Chapter 03 : Héritage de templates ===
  "03-extends": {
    instruction: "Crée un système de templates basique avec un template parent et un enfant qui l'étend.",
    starterCode: 'def render_template(base, blocks):\n    """Simule l\'héritage de templates"""\n    result = base\n    for key, value in blocks.items():\n        result = result.replace(f"{{{key}}}", value)\n    return result\n\nbase = "<html><head><title>{title}</title></head><body>{content}</body></html>"\n\n# Remplis les blocs du template enfant\nblocks = {\n    "title": "Ma Page",\n    "_____": "<h1>Bienvenue</h1><p>Page d\'accueil</p>"\n}\n\nhtml = render_template(base, blocks)\nprint(html)',
    solution: 'def render_template(base, blocks):\n    """Simule l\'héritage de templates"""\n    result = base\n    for key, value in blocks.items():\n        result = result.replace(f"{{{key}}}", value)\n    return result\n\nbase = "<html><head><title>{title}</title></head><body>{content}</body></html>"\n\nblocks = {\n    "title": "Ma Page",\n    "content": "<h1>Bienvenue</h1><p>Page d\'accueil</p>"\n}\n\nhtml = render_template(base, blocks)\nprint(html)',
    htmlSetup: "",
    expectedOutput: "<html><head><title>Ma Page</title></head><body><h1>Bienvenue</h1><p>Page d'accueil</p></body></html>",
    validate: "console",
    language: "python",
  },
  "03-include": {
    instruction: "Simule un include en combinant plusieurs fragments de template.",
    starterCode: 'header = "<nav>Menu: Accueil | Contact</nav>"\nfooter = "<footer>© 2024 Holberton</footer>"\n\n# Combine header + contenu + footer\npage = f"{_____}\\n<main>Contenu de la page</main>\\n{_____}"\n\nprint(page)',
    solution: 'header = "<nav>Menu: Accueil | Contact</nav>"\nfooter = "<footer>© 2024 Holberton</footer>"\n\npage = f"{header}\\n<main>Contenu de la page</main>\\n{footer}"\n\nprint(page)',
    htmlSetup: "",
    expectedOutput: "<nav>Menu: Accueil | Contact</nav>\n<main>Contenu de la page</main>\n<footer>© 2024 Holberton</footer>",
    validate: "console",
    language: "python",
  },

  // === Chapter 04 : render_template ===
  "04-render": {
    instruction: "Simule render_template en remplaçant les placeholders d'un template HTML par des données.",
    starterCode: 'def render_template(template_str, **kwargs):\n    """Remplace {variable} par sa valeur"""\n    for key, value in kwargs._____():\n        template_str = template_str.replace(f"{{{key}}}", str(value))\n    return template_str\n\ntemplate = "<h1>Bonjour {name}</h1><p>Tu as {age} ans</p>"\nresult = render_template(template, name="Alice", _____=25)\nprint(result)',
    solution: 'def render_template(template_str, **kwargs):\n    """Remplace {variable} par sa valeur"""\n    for key, value in kwargs.items():\n        template_str = template_str.replace(f"{{{key}}}", str(value))\n    return template_str\n\ntemplate = "<h1>Bonjour {name}</h1><p>Tu as {age} ans</p>"\nresult = render_template(template, name="Alice", age=25)\nprint(result)',
    htmlSetup: "",
    expectedOutput: "<h1>Bonjour Alice</h1><p>Tu as 25 ans</p>",
    validate: "console",
    language: "python",
  },
  "04-route-dynamique": {
    instruction: "Crée un système de routes dynamiques qui capture des paramètres d'URL.",
    starterCode: 'import re\n\ndef match_route(pattern, url):\n    """Vérifie si l\'URL correspond au pattern et extrait les paramètres"""\n    # Convertit /user/<name> en regex /user/(?P<name>[^/]+)\n    regex = re.sub(r"<(\\w+)>", r"(?P<\\1>[^/]+)", pattern)\n    match = re._____(f"^{regex}$", url)\n    if match:\n        return match.groupdict()\n    return None\n\n# Test\nparams = match_route("/item/<id>", "/item/42")\nprint(f"ID capturé : {params[\"_____\"]}")',
    solution: 'import re\n\ndef match_route(pattern, url):\n    """Vérifie si l\'URL correspond au pattern et extrait les paramètres"""\n    regex = re.sub(r"<(\\w+)>", r"(?P<\\1>[^/]+)", pattern)\n    match = re.match(f"^{regex}$", url)\n    if match:\n        return match.groupdict()\n    return None\n\nparams = match_route("/item/<id>", "/item/42")\nprint(f"ID capturé : {params[\"id\"]}")',
    htmlSetup: "",
    expectedOutput: "ID capturé : 42",
    validate: "console",
    language: "python",
  },

  // === Chapter 05 : Données JSON & CSV ===
  "05-json-load": {
    instruction: "Charge des données JSON depuis une chaîne et affiche le nom du premier utilisateur.",
    starterCode: 'import json\n\njson_string = \'[{"name": "Alice", "age": 28}, {"name": "Bob", "age": 34}]\'\n\n# Parse le JSON\nusers = json._____(json_string)\n\n# Affiche le nom du premier utilisateur\nprint(users[0]["_____"])',
    solution: 'import json\n\njson_string = \'[{"name": "Alice", "age": 28}, {"name": "Bob", "age": 34}]\'\n\nusers = json.loads(json_string)\n\nprint(users[0]["name"])',
    htmlSetup: "",
    expectedOutput: "Alice",
    validate: "console",
    language: "python",
  },
  "05-csv-reader": {
    instruction: "Parse des données CSV et affiche chaque ligne comme un dictionnaire.",
    starterCode: 'import csv\nfrom io import StringIO\n\ncsv_data = """name,age,city\nAlice,28,Paris\nBob,34,Lyon"""\n\nreader = csv._____(StringIO(csv_data))\nfor row in reader:\n    print(f"{row[\"name\"]} habite à {row[\"city\"]}")',
    solution: 'import csv\nfrom io import StringIO\n\ncsv_data = """name,age,city\nAlice,28,Paris\nBob,34,Lyon"""\n\nreader = csv.DictReader(StringIO(csv_data))\nfor row in reader:\n    print(f"{row[\"name\"]} habite à {row[\"city\"]}")',
    htmlSetup: "",
    expectedOutput: "Alice habite à Paris\nBob habite à Lyon",
    validate: "console",
    language: "python",
  },

  // === Chapter 06 : SQLite ===
  "06-sqlite-connect": {
    instruction: "Crée une base SQLite en mémoire, insère des données et requête-les.",
    starterCode: 'import sqlite3\n\n# Connexion en mémoire (pas de fichier)\nconn = sqlite3._____("_____")\ncursor = conn.cursor()\n\n# Créer une table\ncursor.execute("CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER)")\n\n# Insérer des données\ncursor.execute("INSERT INTO users (name, age) VALUES (?, ?)", ("Alice", 28))\ncursor.execute("INSERT INTO users (name, age) VALUES (?, ?)", ("Bob", 34))\nconn.commit()\n\n# Requêter\ncursor.execute("SELECT name, age FROM users")\nfor row in cursor.fetchall():\n    print(f"{row[0]} a {row[1]} ans")\n\nconn.close()',
    solution: 'import sqlite3\n\nconn = sqlite3.connect(":memory:")\ncursor = conn.cursor()\n\ncursor.execute("CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER)")\n\ncursor.execute("INSERT INTO users (name, age) VALUES (?, ?)", ("Alice", 28))\ncursor.execute("INSERT INTO users (name, age) VALUES (?, ?)", ("Bob", 34))\nconn.commit()\n\ncursor.execute("SELECT name, age FROM users")\nfor row in cursor.fetchall():\n    print(f"{row[0]} a {row[1]} ans")\n\nconn.close()',
    htmlSetup: "",
    expectedOutput: "Alice a 28 ans\nBob a 34 ans",
    validate: "console",
    language: "python",
  },
  "06-sqlite-param": {
    instruction: "Utilise une requête paramétrisée pour rechercher un utilisateur par nom.",
    starterCode: 'import sqlite3\n\nconn = sqlite3.connect(":memory:")\ncursor = conn.cursor()\ncursor.execute("CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER)")\ncursor.execute("INSERT INTO users (name, age) VALUES (?, ?)", ("Alice", 28))\ncursor.execute("INSERT INTO users (name, age) VALUES (?, ?)", ("Bob", 34))\nconn.commit()\n\n# Requête paramétrisée (sécurisée contre les injections SQL)\nsearch_name = "Bob"\ncursor.execute("SELECT name, age FROM users WHERE name = _____", (_____,))\nresult = cursor.fetchone()\nprint(f"Trouvé : {result[0]} a {result[1]} ans")\n\nconn.close()',
    solution: 'import sqlite3\n\nconn = sqlite3.connect(":memory:")\ncursor = conn.cursor()\ncursor.execute("CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER)")\ncursor.execute("INSERT INTO users (name, age) VALUES (?, ?)", ("Alice", 28))\ncursor.execute("INSERT INTO users (name, age) VALUES (?, ?)", ("Bob", 34))\nconn.commit()\n\nsearch_name = "Bob"\ncursor.execute("SELECT name, age FROM users WHERE name = ?", (search_name,))\nresult = cursor.fetchone()\nprint(f"Trouvé : {result[0]} a {result[1]} ans")\n\nconn.close()',
    htmlSetup: "",
    expectedOutput: "Trouvé : Bob a 34 ans",
    validate: "console",
    language: "python",
  },

  // === Chapter 07 : Formulaires ===
  "07-form-get": {
    instruction: "Simule la récupération de paramètres GET depuis une URL.",
    starterCode: 'from urllib.parse import urlparse, parse_qs\n\nurl = "http://localhost:5000/search?query=python&page=2"\n\n# Parse l\'URL\nparsed = urlparse(url)\nparams = parse_qs(parsed._____)\n\n# Récupère les valeurs\nquery = params.get("query", [""])[0]\npage = params.get("page", ["1"])[0]\n\nprint(f"Recherche : {query}, Page : {page}")',
    solution: 'from urllib.parse import urlparse, parse_qs\n\nurl = "http://localhost:5000/search?query=python&page=2"\n\nparsed = urlparse(url)\nparams = parse_qs(parsed.query)\n\nquery = params.get("query", [""])[0]\npage = params.get("page", ["1"])[0]\n\nprint(f"Recherche : {query}, Page : {page}")',
    htmlSetup: "",
    expectedOutput: "Recherche : python, Page : 2",
    validate: "console",
    language: "python",
  },
  "07-form-post": {
    instruction: "Simule la validation de données de formulaire POST.",
    starterCode: 'def validate_form(data):\n    """Valide les données du formulaire"""\n    errors = []\n\n    if not data.get("_____"):\n        errors.append("Le nom est requis")\n\n    email = data.get("email", "")\n    if "@" not in _____:\n        errors.append("Email invalide")\n\n    return errors\n\n# Simule des données POST\nform_data = {"name": "Alice", "email": "alice@example.com"}\nerrors = validate_form(form_data)\n\nif errors:\n    print(f"Erreurs : {errors}")\nelse:\n    print("Formulaire valide !")',
    solution: 'def validate_form(data):\n    """Valide les données du formulaire"""\n    errors = []\n\n    if not data.get("name"):\n        errors.append("Le nom est requis")\n\n    email = data.get("email", "")\n    if "@" not in email:\n        errors.append("Email invalide")\n\n    return errors\n\nform_data = {"name": "Alice", "email": "alice@example.com"}\nerrors = validate_form(form_data)\n\nif errors:\n    print(f"Erreurs : {errors}")\nelse:\n    print("Formulaire valide !")',
    htmlSetup: "",
    expectedOutput: "Formulaire valide !",
    validate: "console",
    language: "python",
  },
};

export default exercises;
