# CR Instalações Hidráulicas — Site

Landing page (site de uma página) para a **CR Instalações Hidráulicas**.
Feito em **HTML + CSS + JavaScript puro** — sem framework, sem build. É só abrir o `index.html`.

## 📁 Arquivos

```
cr-instalacoes/
├── index.html        → o conteúdo do site (textos, seções)
├── styles.css        → as cores e o visual
├── script.js         → menu do celular e animações
├── assets/
│   ├── logo.png      → logo oficial (fundo já removido / transparente)
│   └── logo.svg      → versão provisória antiga (pode apagar)
└── README.md         → este arquivo
```

## ✏️ Como editar os dados (FAÇA ISTO PRIMEIRO)

Abra o `index.html` e troque **tudo que estiver entre colchetes `[ ]`**. Os principais:

| Placeholder | O que colocar | Exemplo |
|---|---|---|
| `[WHATSAPP]` | número do WhatsApp só com números: DDD + número | `49999998888` |
| `[TELEFONE]` | número pra ligação (pode ser o mesmo) | `49999998888` |
| `[TELEFONE FORMATADO]` | telefone bonito pra mostrar | `(49) 99999-8888` |
| `[CIDADE]` / `[UF]` | cidade e estado de atuação | `Chapecó` / `SC` |
| `[NOME]` | nome do encanador (seu pai) | `Carlos` |
| `[ANOS]` | anos de experiência | `15` |
| `[EMAIL]` | e-mail (se tiver) | `contato@cr...` |
| `[Bairro 1]`... | bairros atendidos | `Centro`, `São Cristóvão` |
| `[Cliente], [Bairro]` | depoimentos reais de clientes | — |
| `[08h – 18h]` | horários de atendimento | — |

> ⚠️ **Importante no WhatsApp:** o número vai no formato `55` + DDD + número, **sem** espaços, parênteses ou traço.
> O site já coloca o `55` (Brasil) na frente — você só preenche o `[WHATSAPP]` com `DDD+numero`.
> Ex.: WhatsApp `(49) 99999-8888` → você escreve `49999998888`.

## 🖼️ Logo

A logo oficial já está no site em `assets/logo.png`, com o **fundo removido** (transparente),
então ela fica bem tanto no header claro quanto nos fundos azul-escuros do rodapé e da seção "Sobre".
Se um dia tiver uma versão nova, é só substituir esse arquivo mantendo o nome `logo.png`.

## 👀 Ver o site no computador

É só **dar dois cliques no `index.html`** que abre no navegador. Não precisa instalar nada.

## 🌐 Colocar no ar de graça (GitHub Pages)

1. Suba os arquivos pro GitHub (este repositório).
2. No GitHub, vá em **Settings → Pages**.
3. Em **Source**, escolha a branch `main` e a pasta `/ (root)` e salve.
4. Em 1-2 minutos o site fica no ar num endereço tipo:
   `https://felipericci1005.github.io/CR-Instala-es-Hidraulicas/`

Depois dá pra ligar um domínio próprio (ex.: `crinstalacoes.com.br`) se quiser.
