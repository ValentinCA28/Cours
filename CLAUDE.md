# Cours — Site de supports pédagogiques

## Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS v4 (via @tailwindcss/postcss, PAS de tailwind.config)
- MDX (next-mdx-remote/rsc) pour le contenu
- rehype-pretty-code (Shiki) pour la coloration syntaxique
- Déploiement : Vercel

## Structure
```
src/
  app/                      # Next.js App Router
    layout.tsx              # Layout global (fonts, metadata)
    page.tsx                # Accueil — liste des cours
    [courseSlug]/
      page.tsx              # Redirige vers le 1er chapitre
      [chapter]/page.tsx    # Rendu d'un chapitre MDX
  components/
    Sidebar.tsx             # Navigation latérale du cours
    ChapterNav.tsx          # Flèches prev/next
    ProgressBar.tsx         # Barre de progression
    mdx-components.tsx      # Composants MDX custom (Callout, Badge, etc.)
    demos/                  # Composants interactifs pour les cours
  content/
    {course-slug}/
      meta.json             # { title, description, icon, color }
      chapters/
        00-slug.mdx         # Frontmatter: number, title, subtitle
  lib/
    courses.ts              # Utilitaires lecture cours/chapitres
```

## Ajouter un nouveau cours
1. Créer `src/content/{slug}/meta.json`
2. Créer `src/content/{slug}/chapters/00-xxx.mdx`, `01-xxx.mdx`, etc.
3. Le cours apparaît automatiquement sur la page d'accueil

## Conventions
- Contenu en français, code en anglais
- Fichiers MDX : frontmatter YAML (number, title, subtitle)
- Chapitres numérotés 00, 01, 02... et triés alphabétiquement
- Composants MDX disponibles : Callout, InlineCode, DemoBlock, Badge
- Démos interactives : composants React "use client" dans components/demos/

## Thème
Couleurs définies dans globals.css via @theme : bg, surface, surface2, border, accent, accent2, blue, green, purple, pink, yellow, text, muted, code-bg
