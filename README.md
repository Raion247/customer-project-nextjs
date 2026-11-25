# Kalmuhooldus website

Website for a grave-care service business. This is a public copy of a customer
project: contact details and business identifiers are placeholders.

## Features

- Responsive layout with a mobile menu, plus price list and privacy pages
- Contact form using a Next.js Server Action: server-side validation, image
  attachments checked by file content, honeypot, rate limiting, confirmation email
- Filterable work gallery
- Cookie consent before Google Analytics loads
- SEO metadata, sitemap, robots and structured data

## Stack

Next.js (App Router), React, TypeScript, Tailwind CSS, Nodemailer.
The original is deployed on a Linux server with nginx, PM2 and Let's Encrypt.

## Run locally

Requires Node 20.9 or newer.

```bash
cd front
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. The contact form needs real SMTP settings to send.
