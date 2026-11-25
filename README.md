# Kalmuhooldus

**A business website for a grave-care service, built with Next.js.**

![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-0F172A?logo=tailwindcss&logoColor=38BDF8)

> This is a public copy of a customer project. Contact details and business
> identifiers are placeholders. The site content is in Estonian.

## Features

- **Responsive design** with an animated navigation and a mobile menu
- **Pages** for the home sections, the price list and the privacy policy
- **Filterable gallery** of completed work
- **Contact form** that emails the business and sends a confirmation to the visitor
- **Image attachments**, up to 5 files and 12 MB in total
- **Cookie consent**: Google Analytics loads only after the visitor agrees
- **SEO**: page metadata, sitemap, robots file and structured data

## Component guide

Component names are kept short. They live in [`front/src/C`](front/src/C).

| File | Stands for | What it does |
| --- | --- | --- |
| `H.tsx` | Header | Logo, navigation, mobile menu and certificate badge |
| `Hero.tsx` | Hero | Opening banner with headline and buttons |
| `AU.tsx` | About Us | Short introduction to the business |
| `W.tsx` | Work | Descriptions of the services, as text cards |
| `CW.tsx` | Customer Work | Filterable image gallery of completed work |
| `CS.tsx` | Comment Section | Customer comments |
| `CT.tsx` | Contact | Contact form with image attachments |
| `F.tsx` | Footer | Company details and map |
| `PL.tsx` | Price List | Price table |
| `PP.tsx` | Privacy Policy | Privacy policy text |
| `CB.tsx` | Cookie Banner | Cookie consent and analytics loading |
| `CRT.tsx` | Certificate | Certificate badge as an SVG |

## Project structure

```text
front/
├── public/          images and logo
└── src/
    ├── app/         pages, server action, sitemap and robots
    ├── C/           components
    ├── font/        custom font
    └── lib/         shared helpers
```

## Tech stack

- **Framework:** Next.js (App Router) with React and TypeScript
- **Styling:** Tailwind CSS
- **Email:** Nodemailer over SMTP
- **Hosting (original site):** Hetzner Linux server with nginx, PM2 and Let's Encrypt

## Run locally

Requires Node.js 20.9 or newer.

```bash
cd front
npm install
cp .env.example .env.local
npm run dev
```

Open <http://localhost:3000>. The contact form needs real SMTP settings in
`.env.local` to send email.
