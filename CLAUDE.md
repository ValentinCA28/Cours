# Cours — Site de supports pédagogiques

Plateforme multi-cours pour étudiants Holberton School. Chaque cours est un ensemble de chapitres MDX avec démos interactives et exercices.

## Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS v4 (via @tailwindcss/postcss, PAS de tailwind.config)
- MDX (next-mdx-remote/rsc) pour le contenu
- rehype-pretty-code (Shiki, theme github-dark) pour la coloration syntaxique
- Déploiement : Vercel (auto-deploy sur push, repo GitHub ValentinCA28/Cours)

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
    ProgressBar.tsx         # Barre de progression (pas utilisée actuellement, TopBar a sa propre)
    mdx-components.tsx      # Composants MDX : Callout, InlineCode, DemoBlock, Badge + tous les demos
    demos/
      CodeExercise.tsx      # Éditeur de code + iframe sandboxé + validation
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
      chapters/
        00-slug.mdx         # Frontmatter YAML: number, title, subtitle
  lib/
    courses.ts              # getAllCourses(), getCourse(), getChapter()
```

## Cours existants
- **js-dom** — JS DOM Manipulation (8 chapitres, 6 démos interactives, ~20 exercices)

## Ajouter un nouveau cours
1. Créer `src/content/{slug}/meta.json` avec { title, description, icon, color }
2. Créer les chapitres MDX dans `src/content/{slug}/chapters/`
   - Nommage : `00-introduction.mdx`, `01-sujet.mdx`, etc.
   - Frontmatter : `number`, `title`, `subtitle`
3. Si le cours a besoin de démos interactives : créer les composants dans `components/demos/`, les exporter dans `index.ts`, les ajouter au map dans `mdx-components.tsx`
4. Le cours apparaît automatiquement sur la page d'accueil et le sommaire se génère

## Composants MDX disponibles
- `<Callout variant="info|warn|success" title="...">contenu</Callout>` — encadrés colorés
- `<InlineCode>texte</InlineCode>` ou `<ic>texte</ic>` — code inline orange
- `<DemoBlock>contenu</DemoBlock>` — wrapper pour démos avec label vert
- `<Badge>texte</Badge>` — petit label bleu
- `<CodeExercise instruction="..." starterCode={`...`} solution={`...`} htmlSetup={`...`} expectedOutput="..." validate="console|dom" />` — exercice interactif
- Tous les composants de démo : `<SelectorDemo />`, `<TextContentDemo />`, etc.

## Conventions
- Contenu rédigé en **français**, tutoiement, style pédagogique
- Noms de variables et code en **anglais**
- Commentaires dans le code en **français**
- Exercices interactifs après chaque sous-section de cours
- Les props string contenant du code/HTML utilisent `{` + backtick + `}` dans le MDX

## Thème
Couleurs dans globals.css via `@theme` : bg, surface, surface2, border, accent (#f97316), accent2, blue, green, purple, pink, yellow, text (#e2e8f0), muted, code-bg
Fonts : Syne (sans, titres) + JetBrains Mono (mono, code)

## Notes techniques
- TopBar : z-50, fixed, 52px de haut → les pages ajoutent `pt-[52px]`
- Sidebar : z-40, sticky sous la TopBar, `h-[calc(100vh-52px)]`
- CodeExercise : exécute le JS dans un `<iframe sandbox="allow-scripts">` via srcdoc + postMessage
- Les cours avec fetch dans les exercices ont besoin de `allow-scripts` (pas de same-origin)
