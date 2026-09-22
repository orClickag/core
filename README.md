# Core

Pacotes compartilhados para os projetos Astro.

## Instalação pelo GitHub

Os pacotes são instalados diretamente do repositório `orClickag/core`, usando
`#path:` para indicar o pacote dentro do monorepo:

```bash
pnpm add \
  @keystar/ui@github:orClickag/core#path:design-system/pkg \
  @keystatic/astro@github:orClickag/core#path:astro \
  @keystatic/core@github:orClickag/core#path:keystatic
```

Isso gera as seguintes dependências no `package.json`:

```json
{
  "dependencies": {
    "@keystar/ui": "github:orClickag/core#path:design-system/pkg",
    "@keystatic/astro": "github:orClickag/core#path:astro",
    "@keystatic/core": "github:orClickag/core#path:keystatic"
  }
}
```

Durante o desenvolvimento local, os sites podem usar `link:` apontando para os
diretórios correspondentes deste repositório.
