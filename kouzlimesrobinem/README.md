# Kouzlíme s Robinem — samostatný web (niadobysar)

Web pro kouzelníka Robina Panuše. **Není součástí Neurea** — vlastní Vercel projekt a doména.

## Nasazení na Vercel (niadobysar)

1. [vercel.com](https://vercel.com) → přihlášení pod účtem **niadobysar**
2. **Add New Project** → import repozitář `neurea-web` (nebo samostatný repo, pokud ho vytvoříš)
3. **Root Directory:** `kouzlimesrobinem` ← důležité
4. **Project Name:** `kouzlimesrobinem` (URL bude `kouzlimesrobinem.vercel.app`)
5. Deploy
6. **Settings → Domains** → přidej `kouzlimesrobinem.cz` a `www.kouzlimesrobinem.cz`
7. U registrátora domény nastav DNS podle Vercelu (A/CNAME)

## Lokální náhled

```bash
cd kouzlimesrobinem
npm install
npm run dev
# → http://127.0.0.1:3000
```

Nebo dvakrát klikni **`OTEVRI-ROBIN.command`** v kořeni Neurea (otevře živý web).

## Co je v projektu

- Oranžový stánkový design (`RobinStage`)
- Hra „Najdi králíčka“
- Hero s ořezem Robina bez pozadí

Moderní alternativa zůstává v monorepu Neurea na `/robin/modern` (jen náhled).
