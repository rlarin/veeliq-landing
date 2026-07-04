# VeelIQ: reestructura del sitio a "proveedor de soluciones de IA"

Instrucciones para transformar el landing actual (un solo producto: Skills marketplace) en un sitio de VeelIQ como proveedor de soluciones de inteligencia artificial con dos soluciones:

1. **Skills Marketplace** (Skills as a Service): estado **Coming soon**.
2. **Context**: capa de contexto privada via MCP (Knowledge RAG + Memory). Estado **Beta**, con plan **freemium gratis**. App en `https://app.context.veeliq.com/`.

Resultado final: 3 paginas con el mismo sistema visual.

| Archivo | Rol | Estado del contenido |
|---|---|---|
| `index.html` | Hub corporativo: VeelIQ como proveedor de soluciones de IA | Nuevo contenido |
| `skills.html` | Landing de Skills Marketplace | Copia del `index.html` actual, con ajustes minimos |
| `context.html` | Landing de Context | Nueva, mismo estilo |

## Regla de oro

**No inventar un estilo nuevo.** Las 3 paginas reutilizan exactamente el mismo `<style>` inline del `index.html` actual: tokens (`--orange: #ff4d00`, paleta crema/tinta), fuentes (Unbounded / Inter / JetBrains Mono), dot grid, nav sticky con blur, `.reveal` con IntersectionObserver, theme toggle claro/oscuro, pills, eyebrows numerados (`01 · ...`), botones `.btn-orange / .btn-primary / .btn-ghost`, secciones `.sec` y `.sec-dark`, CTA final con texto outline, footer de 4 columnas.

Cada pagina es autocontenida (CSS y JS inline) igual que hoy. Copiar el bloque `<style>` y los scripts base (reveals, nav scroll, theme toggle, hamburger) a cada archivo.

## Paso 0: preservar el index actual

Antes de tocar nada:

1. Copiar el `index.html` actual a `skills.html` (contenido completo).
2. Ya existe `prev-versions/index-skills.html` como respaldo historico; no tocarlo.

## Paso 1: nuevo `index.html` (hub de soluciones)

### Head / SEO

- `<title>`: `VeelIQ — AI Solutions for the tools you already use` (mantener formato con guion corto o dos puntos si se prefiere evitar el caracter largo: `VeelIQ | AI Solutions...`).
- `meta description`: "VeelIQ builds AI solutions that plug into the AI you already use. Context gives your AI private knowledge and memory via MCP (now in Beta, free plan available). Skills Marketplace is coming soon."
- `og:title` / `og:description`: alineados con lo anterior.
- `canonical`: `https://www.veeliq.com/`.
- Favicons y manifest: iguales (carpeta `coming-soon/`).

### Nav

Mismo componente. Links cambian a:

- `Solutions` (ancla `#solutions`)
- `Context` (link a `context.html`)
- `Skills` (link a `skills.html`)
- `Why VeelIQ` (ancla `#why`)
- `FAQ` (ancla `#faq`)

Boton derecho: `Try Context free →` apuntando a `https://app.context.veeliq.com/` (es la unica solucion usable hoy; el CTA principal del sitio debe llevar a ella). Replicar en el drawer mobile.

### Hero

Mantener layout de dos columnas (texto + panel visual) y el watermark `IQ`.

- Pill: `● AI solutions · built on MCP`
- H1 (3 lineas, misma estructura de `.line` + `.outline`):
  - `Intelligence,`
  - `delivered.` (con `.o` en alguna palabra)
  - linea outline: `Where you already work.`
  - Alternativa: `Your AI,` / `upgraded.` / outline: `No new tabs. No new tools.`
- Sub: "VeelIQ builds AI solutions that plug directly into the AI you already use. Private knowledge, persistent memory, and expert skills, delivered as native tools inside Claude, Cursor, ChatGPT, or any MCP client. One URL. No code."
- CTAs: `Try Context free →` (btn-orange, a `https://app.context.veeliq.com/`) y `Explore solutions` (btn-ghost, ancla `#solutions`).
- Franja "Plugs into": mantener tal cual (Claude.ai, Cursor, ChatGPT, + any MCP client). Es el mensaje diferencial y aplica a ambas soluciones.
- Panel derecho: reutilizar el diagrama MCP animado actual (`#mcp-panel`), cambiando los labels de skills por capacidades mixtas, por ejemplo: `Knowledge Search ✓`, `Memory Recall ✓`, `CRM Intelligence ·` (loading), `Code Reviewer ✓`, y el footer del panel a `2 solutions · 1 endpoint`.

### Stats (franja bajo el hero)

Reescribir los 4 stats al nuevo mensaje:

- `2` / `AI solutions on one platform`
- `1` / `MCP URL, works in every client`
- `0` / `Lines of code required`
- `60s` / `From signup to first tool call`

### Seccion nueva: `#solutions` (la seccion clave)

Eyebrow: `01 · Solutions`. Titulo: `Two solutions. One <span class="o">platform.</span>`. Lede: "Everything VeelIQ ships works the same way: subscribe, paste one URL into your AI client, done."

Grid de 2 tarjetas grandes (estilo `.skill-card` escalado o `.byo` panel; bordes `--line`, hover con sombra, radius `--radius-lg`). Cada tarjeta es clickeable completa hacia su pagina.

**Tarjeta 1: Context**

- Badge de estado: pill naranja `● Beta · Free plan available`
- Titulo: `Context`
- Tagline: `Private knowledge and memory for your AI.`
- Descripcion: "Upload your documents and let your AI answer from them. Let it remember facts between sessions. Your own private MCP endpoint, ready in a minute."
- Bullets (3, estilo `.byo-feat` con check): `Knowledge: your docs, searchable by your AI` / `Memory: facts that persist across sessions` / `Private per-user endpoint, RLS isolated`
- CTAs: `Learn more →` (a `context.html`) y `Start free` (btn-orange, a `https://app.context.veeliq.com/`).

**Tarjeta 2: Skills Marketplace**

- Badge de estado: pill neutra `● Coming soon`
- Titulo: `Skills Marketplace`
- Tagline: `Expert skills, on demand.`
- Descripcion: "Subscribe to expert skills, CRM analyst, code reviewer, research agent, and they appear as native tools inside your AI client. Hand-crafted prompts, retrieval, and guardrails."
- Bullets: `50+ expert skills at launch` / `Curated prompts and guardrails` / `Add or cancel anytime`
- CTAs: `Learn more →` (a `skills.html`) y `Join the waitlist` (btn-ghost, a `https://app.veeliq.com/` o mailto, decidir al implementar).

Nota visual: diferenciar estados. La tarjeta Context lleva acento naranja mas fuerte (es la que convierte hoy); la de Skills puede llevar un tratamiento levemente atenuado o el pill `Coming soon` bien visible, sin apagarla del todo.

### Seccion `#why` (por que VeelIQ, marketing)

Eyebrow: `02 · Why VeelIQ`. Titulo: `Your AI is smart. <span class="o">Ours is yours.</span>` (o `Built for the AI era, built for you.`). Grid de 3 o 4 features (reutilizar el patron `.byo-features` o step-cards):

- **One URL, every client.** "No SDKs, no API keys, no deployment. Paste an MCP URL and your AI gains new abilities in seconds."
- **Private by design.** "Your data lives in your own isolated space. Row level security on every table. We never train on your content."
- **You own the intelligence.** "Knowledge, memory, and skills stay attached to you, not to a single chat window or vendor."
- **Built on open standards.** "MCP is the USB-C of AI tools. VeelIQ works wherever MCP works: Claude, Cursor, ChatGPT, Zed, Windsurf, and more."

### Seccion `#how` (como funciona, version generica)

Reutilizar las step-cards actuales (3 pasos) pero con copy agnostico de solucion:

1. `Pick a solution` : "Start with Context (free) or join the Skills waitlist."
2. `Paste your URL` : "Copy your personal MCP endpoint into Claude, Cursor, or ChatGPT."
3. `Just ask` : "Your AI now knows your docs, remembers your facts, and calls expert tools."

### FAQ (`#faq`)

Reescribir a nivel compania (6 items, mismo componente `details.faq-item`):

- What is VeelIQ? -> proveedor de soluciones de IA sobre MCP; hoy Context (Beta) y Skills Marketplace (coming soon).
- What is Context? -> capa privada de conocimiento y memoria para tu IA; subes docs, tu agente los consulta y guarda hechos entre sesiones; Beta con plan gratis.
- When does the Skills Marketplace launch? -> coming soon; waitlist disponible; los suscriptores de Context lo veran primero.
- Do I need an API key or model? -> no; VeelIQ actua como proveedor de tools sobre el AI que ya usas.
- Which clients are supported? -> cualquier cliente MCP: Claude.ai, Cursor, ChatGPT, Zed, Windsurf.
- Is my data private? -> aislamiento por usuario, RLS, sin retencion del contenido de conversaciones, metadata solamente.

### CTA final

Mantener el componente `.final`:

- H2: `More <span class="o">IQ.</span><br><span class="outline">Instantly.</span>` (se conserva, funciona a nivel marca).
- P: "Context is live in Beta. Free plan, no credit card. The Skills Marketplace is next."
- Botones: `Try Context free →` (orange, a app.context.veeliq.com) y `Explore solutions` (ghost, `#solutions`).
- `.final-url`: `paste mcp.context.veeliq.com/<you> into your AI client` (verificar el dominio MCP real de Context antes de publicar; si no es publico aun, dejar `your-endpoint.veeliq.com/<you>`).

### Footer

- Tagline: `AI solutions for the AI you already use.`
- Columna `Solutions`: Context (`context.html`), Skills Marketplace (`skills.html`), How it works (`#how`), FAQ (`#faq`).
- Columna `Product`: Try Context (`https://app.context.veeliq.com/`), Docs (`https://app.context.veeliq.com/docs`), Skills waitlist, Changelog.
- Columna `Company`: About, Privacy Policy, Terms of Service, Status. (Privacy y Terms ya existen en la raiz.)
- Bottom: `© 2026 VeelIQ` y `v3.0 · veeliq.com`.

### JS del index

- Conservar: reveals, nav scroll state, theme toggle, hamburger, animacion del panel MCP (ajustada a los nuevos labels).
- Eliminar: `SKILLS` array, `renderSkills`, filtros de catalogo (eso vive ahora solo en `skills.html`).
- Side rail spy: actualizar la lista de ids a las secciones nuevas (`top, solutions, why, how, faq`).

## Paso 2: `skills.html`

Partir de la copia exacta del `index.html` actual. Cambios minimos:

1. **Head**: `<title>VeelIQ Skills — Skills as a Service for your AI</title>`; canonical `https://www.veeliq.com/skills.html`; og:url igual; description actual se mantiene pero anteponer "Coming soon:".
2. **Estado Coming soon**:
   - Pill del hero: cambiar `● Now live · MCP 1.0 ready` por `● Coming soon · MCP 1.0 ready`.
   - CTAs `Start free` -> `Join the waitlist` (destino: `https://app.veeliq.com/` o mailto, el mismo que se elija en el index).
   - Resto del contenido queda igual (catalogo, compare, under the hood, FAQ). El usuario pidio usar exactamente lo mismo; solo el estado cambia.
3. **Nav**: el logo ya apunta a `./index.html` (correcto, ahora vuelve al hub). Agregar un link `← All solutions` o simplemente dejar el logo como via de retorno. Anclas internas (`#how`, `#skills`, etc.) funcionan igual dentro de la pagina.
4. **FAQ item 1**: ajustar la respuesta de "What exactly is VeelIQ?" a "What is the Skills Marketplace?" para no contradecir el nuevo posicionamiento del index.
5. **Footer**: agregar en alguna columna links cruzados a `index.html` (Home) y `context.html` (Context).

## Paso 3: `context.html`

Nueva pagina, mismo esqueleto y estilo que `skills.html`. Estructura y copy sugerido (en ingles, como el resto del sitio):

### Head / SEO

- Title: `VeelIQ Context — Private knowledge and memory for your AI`
- Description: "Context gives your AI a private, persistent context layer via MCP. Upload documents, let your agent search them and remember facts between sessions. Now in Beta with a free plan."
- Canonical: `https://www.veeliq.com/context.html`.

### Hero

- Pill naranja: `● Now in Beta · Free plan`
- H1: `Your AI` / `finally <span class="o">remembers.</span>` / outline: `And reads your docs.`
- Sub: "Context is a private context layer for the AI you already use. Upload your documents, and your agent answers from them. Ask it to remember something, and it recalls it next session, in any client. One personal MCP URL. No code."
- CTAs: `Start free →` (orange, `https://app.context.veeliq.com/`) y `See how it works` (ghost, `#how`).
- Franja "Plugs into": identica al index (Claude.ai, Cursor, ChatGPT, + any MCP client).
- Panel derecho: adaptar el diagrama MCP animado. Chat de ejemplo: usuario pregunta "What did we decide about pricing last week?" y el agente responde citando un doc subido y una memoria guardada. Tools listadas: `search_knowledge ✓`, `recall ✓`, `remember ✓`, `list_sources ✓`. URL del panel: `...context.veeliq.com/<you>`.

### Seccion: dos capacidades (equivalente a la seccion solutions, eyebrow `01 · What you get`)

Titulo: `Knowledge and Memory. <span class="o">One endpoint.</span>`

Dos tarjetas:

- **Knowledge (RAG)**: "You upload documents from the dashboard: specs, contracts, notes, manuals. Your AI searches them and answers with your facts, not guesses." Bullets: `PDF and docs upload` / `Semantic search, grounded answers` / `Sources listed and inspectable`.
- **Memory**: "Your agent saves facts as you work: decisions, preferences, project state. Next session, in any client, it remembers." Bullets: `Agent writes, you stay in control` / `Recall across sessions and clients` / `Delete anything, anytime`.

Aclaracion de posicionamiento (puede ir como nota bajo las tarjetas): "Same private store, same endpoint. The only difference is who writes: you upload knowledge, your agent saves memories."

### How it works (`#how`, 3 pasos, mismas step-cards)

1. `Create your account` : "Sign up free at app.context.veeliq.com. No credit card."
2. `Upload and connect` : "Drop in your documents, copy your personal MCP URL into Claude, Cursor, or ChatGPT."
3. `Ask and remember` : "Your AI now cites your docs and keeps memory between sessions."

### Seccion privacidad (usar el patron `.byo` de "Under the hood")

Titulo: `Private by <span class="o">design.</span>` Features con check:

- "Your data lives in your own isolated space, enforced with row level security"
- "We never train models on your content"
- "Delete a source or a memory and it is gone from retrieval"
- Panel derecho tipo terminal: mostrar una llamada `search_knowledge("pricing decision")` devolviendo chunks con `source:` y `score:`, estetica identica al builder de skills.html.

### Pricing (seccion simple, nueva)

Eyebrow `04 · Pricing`. Dos tarjetas:

- **Free (Beta)**: `$0` : "Everything you need to try Context: document uploads, knowledge search, memory. Fair usage limits." CTA `Start free →`.
- **Pro**: `Coming soon` : "Higher limits, more sources, priority ingestion. Upgrade from the dashboard when you need it."

No inventar precios concretos de Pro; el billing real vive en Stripe y el plan free es el unico publico hoy.

### FAQ

6 items: que es Context / necesito API key (no) / que clientes soporta / que pasa con mis datos / que limites tiene el plan gratis (remitir al dashboard) / relacion con Skills Marketplace ("same platform, same URL philosophy; skills arrive next").

### CTA final

- H2: `Give your AI <span class="o">context.</span><br><span class="outline">Today.</span>`
- P: "Free Beta plan. No credit card. Set up in about a minute."
- Botones: `Start free →` (app.context.veeliq.com) y `Read the docs` (ghost, `https://app.context.veeliq.com/docs`).

### JS

Solo los scripts base (reveals, nav, theme, hamburger, animacion del panel adaptada). Sin catalogo de skills.

## Paso 4: SEO y archivos auxiliares

1. `sitemap.xml`: agregar `https://www.veeliq.com/skills.html` y `https://www.veeliq.com/context.html` con `lastmod` actual.
2. `robots.txt`: sin cambios (ya permite todo).
3. Verificar que cada pagina tenga `og:url` y `canonical` propios.
4. Favicons: mismas rutas relativas `coming-soon/...` funcionan desde la raiz para las 3 paginas.

## Checklist de QA

- [ ] Las 3 paginas comparten tokens, fuentes y componentes; ningun estilo nuevo inventado.
- [ ] Theme toggle claro/oscuro funciona en las 3 (misma clave de localStorage para que el tema persista entre paginas).
- [ ] Nav mobile (hamburger) funciona en las 3.
- [ ] Desde el index se llega a `skills.html` y `context.html` por al menos 2 vias (tarjeta de solucion y nav o footer).
- [ ] Desde skills y context se vuelve al index (logo).
- [ ] Todos los CTA de Context apuntan a `https://app.context.veeliq.com/`.
- [ ] Skills no tiene ningun CTA que prometa uso inmediato (todo dice Coming soon o waitlist).
- [ ] Sin errores de consola; animacion del panel MCP corre en index y context con sus labels propios.
- [ ] Lighthouse mobile razonable: las paginas siguen siendo un solo HTML sin dependencias nuevas.
- [ ] Titulos, descriptions, canonicals y sitemap actualizados.

## Notas de copy y marketing

- Tono: confiado, concreto, sin humo. Frases cortas. Numeros cuando existan (60s, 1 URL, 0 codigo). Es el tono ya establecido en el sitio.
- La jerarquia comercial hoy: Context convierte (Beta gratis), Skills capta demanda (waitlist). El index debe empujar primero a Context sin esconder Skills.
- No prometer features que no existen: en Context solo Knowledge y Memory; en Skills todo es "at launch" o "coming soon".
- Mantener la palabra MCP visible pero siempre explicada por beneficio ("appears as native tools", "one URL"), porque el visitante no tecnico no sabe que es MCP.
- No usar guiones largos en el HTML nuevo; usar comas, dos puntos o punto seguido.
