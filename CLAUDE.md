# Cours — Site de supports pédagogiques

Plateforme multi-cours pour étudiants Holberton School. Chaque cours est un ensemble de chapitres MDX avec démos interactives et exercices.

## Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS v4 (via @tailwindcss/postcss, PAS de tailwind.config)
- MDX (next-mdx-remote/rsc) pour le contenu
- rehype-pretty-code (Shiki, theme github-dark) pour la coloration syntaxique
- Déploiement : Vercel (auto-deploy sur push, repo GitHub ValentinCA28/Cours)
- URL production : https://cours-swart.vercel.app

## Structure
```
src/
  app/
    layout.tsx              # Layout global (fonts Syne + JetBrains Mono, metadata)
    page.tsx                # Accueil — grille de cards listant tous les cours
    not-found.tsx           # Page 404
    [courseSlug]/
      page.tsx              # Sommaire du cours — table des matières cliquable
      [chapter]/page.tsx    # Rendu d'un chapitre MDX avec sidebar + TopBar
  components/
    TopBar.tsx              # Barre fixe : breadcrumb, recherche ⌘K, sommaire, progression
    Sidebar.tsx             # Navigation latérale (desktop sticky + mobile hamburger)
    ChapterNav.tsx          # Flèches prev/next entre chapitres
    ProgressBar.tsx         # Barre de progression (pas utilisée, TopBar a sa propre)
    mdx-components.tsx      # Composants MDX : Callout, InlineCode, DemoBlock, Badge + demos
    demos/
      CodeExercise.tsx      # Éditeur de code + iframe sandboxé + validation + preview DOM
      ExerciseById.tsx      # Wrapper qui charge un exercice par ID depuis exercises.ts
      SelectorDemo.tsx      # Démo sélecteurs CSS interactifs
      TextContentDemo.tsx   # Démo textContent vs innerHTML
      StyleDemo.tsx         # Démo manipulation de styles
      EventLogDemo.tsx      # Démo journal d'événements
      TodoDemo.tsx          # Démo todo list dynamique
      FetchDemo.tsx         # Démo fetch API
      index.ts              # Re-exports
  content/
    {course-slug}/
      meta.json             # { title, description, icon, color }
      exercises.ts          # Exercices interactifs par ID
      chapters/
        00-slug.mdx         # Frontmatter YAML: number, title, subtitle
  lib/
    courses.ts              # getAllCourses(), getCourse(), getChapter()
```

## Cours existants
- **js-dom** — JS DOM Manipulation (8 chapitres, 6 démos interactives, 22 exercices)

## Branches
- `main` — branche de développement, auto-deploy Vercel
- `v1-stable` — backup V1 stable (2026-03-24)

---

## Workflow : intégrer un nouveau cours depuis un dump

Quand l'utilisateur fournit un dump de cours (HTML, Markdown, ou texte brut), voici la procédure complète :

### Étape 1 — Analyser le dump
- Identifier le sujet, le nombre de chapitres, les sous-sections
- Repérer les démos interactives et les exercices existants
- Choisir un slug (ex: `js-dom`, `python-basics`, `sql-intro`)

### Étape 2 — Créer la structure (agents en parallèle)

**Agent 1 : meta.json**
```json
// src/content/{slug}/meta.json
{ "title": "...", "description": "...", "icon": "🐍", "color": "#f97316" }
```

**Agent 2 : Chapitres MDX** (un agent par lot de 3-4 chapitres)
- Convertir le contenu en MDX avec les composants existants
- Frontmatter YAML : `number`, `title`, `subtitle`
- Utiliser `<Callout>`, `<InlineCode>`, `<Badge>`, `<DemoBlock>`
- Code blocks avec triple backtick + langage
- **PAS de template literals multi-lignes dans les props JSX** (bug MDX)
- Insérer `<ExerciseById id="..." />` après chaque sous-section

**Agent 3 : exercises.ts**
- Créer `src/content/{slug}/exercises.ts`
- Un exercice par sous-section avec : instruction, starterCode (avec `_____` pour les blancs), solution, htmlSetup, expectedOutput, validate
- Les `\n` dans les strings TypeScript fonctionnent correctement
- IDs : `{chapitre}-{topic}` (ex: `01-queryselector`, `03-toggle`)

**Agent 4 : ExerciseById wrapper** (si nouveau cours)
- Créer un `ExerciseByIdXxx.tsx` qui importe depuis le bon `exercises.ts`
- Ou modifier `ExerciseById.tsx` pour supporter plusieurs cours

**Agent 5 : Démos interactives** (si le cours en a)
- Composants React "use client" dans `components/demos/`
- Exporter dans `index.ts` + ajouter au map `mdx-components.tsx`

### Étape 3 — Build + Deploy
```bash
npm run build          # Vérifier que tout compile
git add -A && git commit -m "..."
git push origin main
npx vercel --prod --yes  # Deploy en prod
```

### Points critiques à ne PAS oublier
- **Exercices** : TOUJOURS dans un fichier `.ts` séparé, JAMAIS inline dans le MDX (bug template literals)
- **MDX** : les `<ExerciseById id="..." />` sont sur UNE seule ligne
- **Preview DOM** : le CSS du preview iframe (dans CodeExercise.tsx) doit couvrir les classes utilisées dans les exercices du nouveau cours
- **Recherche** : les chapitres apparaissent automatiquement dans la recherche TopBar
- **Sommaire** : la page `/slug` se génère automatiquement

---

## Composants MDX disponibles
- `<Callout variant="info|warn|success" title="...">contenu</Callout>`
- `<InlineCode>texte</InlineCode>` ou `<ic>texte</ic>`
- `<DemoBlock>contenu</DemoBlock>`
- `<Badge>texte</Badge>`
- `<ExerciseById id="..." />` — charge un exercice depuis exercises.ts
- Démos : `<SelectorDemo />`, `<TextContentDemo />`, `<StyleDemo />`, `<EventLogDemo />`, `<TodoDemo />`, `<FetchDemo />`

## Conventions
- Contenu en **français**, tutoiement, style pédagogique
- Code et variables en **anglais**, commentaires en **français**
- Exercice interactif après **chaque sous-section** (pas juste en fin de chapitre)
- L'utilisateur donne carte blanche sur le design → enrichir l'UX proactivement
- Utiliser des **agents en parallèle** pour maximiser la vitesse

## Thème
Couleurs dans globals.css via `@theme` : bg, surface, surface2, border, accent (#f97316), accent2, blue, green, purple, pink, yellow, text (#e2e8f0), muted, code-bg
Fonts : Syne (sans, titres) + JetBrains Mono (mono, code)

## Notes techniques
- TopBar : z-50, fixed, 52px → pages ajoutent `pt-[52px]`
- Sidebar : z-40, sticky sous TopBar, `h-[calc(100vh-52px)]`
- CodeExercise : iframe `sandbox="allow-scripts"`, srcdoc + postMessage
- Preview DOM : mini-iframe visible avec CSS pour `.active`, `.visible`, `.selected`, `.open`, `.hidden`, `.highlighted`, etc.
- Exercices fetch : besoin de `allow-scripts` dans le sandbox (pas de same-origin)
