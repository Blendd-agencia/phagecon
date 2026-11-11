# Phagecon — website, 11 novembro 2026

## Versão atual — expansão com o roadmap

15 páginas: homepage, About Us, índice de serviços, sete páginas de serviços, Regulatory News, Events & Training, Ask Us a Quotation, Join Our Team e General Contacts.

Menu partilhado, páginas de serviços com índice e leitura por etapas, linha do tempo institucional, equipa, pesquisa e filtros de notícias e formulários com preparação de email.

O mapa de páginas, decisões editoriais, origem dos conteúdos e pontos pendentes estão em [docs/ROADMAP-IMPLEMENTATION.md](docs/ROADMAP-IMPLEMENTATION.md).

- O roadmap reúne Regulatory e Scientific Affairs: agora são sete serviços.
- Notícias: seleção datada do arquivo existente, com links para as fontes; não é um feed automático.
- Equipa: nomes e cargos fornecidos, com iniciais enquanto faltam as fotografias.
- Eventos e vagas: templates preparados; só adicionar entradas confirmadas em `app/content/updates.ts`.
- Formulários: validação, preparação de email, revisão e cópia da mensagem. O cliente confirmou que ainda não tem serviço de envio. Nenhum envio ou upload é simulado. O candidato anexa o CV na sua aplicação de email.
- Newsletter: mantém a apresentação anterior e informa que as subscrições ainda não estão disponíveis.
- Políticas legais apontam para o site existente; falta confirmar um perfil LinkedIn da Phagecon.
- `noindex` mantido até aprovação do lançamento definitivo.

Build de produção e TypeScript aprovados. Páginas verificadas em desktop e a 390px, sem overflow horizontal. Pesquisa, filtros, menu móvel, seleção do serviço e preparação de emails de orçamento e candidatura verificados no navegador, com dados fictícios e sem envio.

## Registo histórico da homepage — 10 novembro 2026

Os apontamentos abaixo documentam a entrega inicial. O âmbito e as limitações atuais são os descritos acima e em ROADMAP-IMPLEMENTATION.md.

## Conteúdo
- Homepage Next.js/React com TypeScript e CSS, baseada no frame Figma 15079:793.
- Vídeo original local, fontes Syne/Inter locais e 30 recursos gráficos descarregados do Figma.
- Hero, sobre nós, valores, serviços, estatísticas, notícias, contacto e rodapé.
- Vídeo em loop, texto em movimento, revelação ao scroll, contadores animados.
- Serviços: oito cartões, scroll vertical convertido em progressão horizontal em desktop; botões, teclado e arrasto. Mobile: scroll horizontal e botões, sem prender o scroll vertical.
- Preferência de movimento reduzido respeitada; botão para pausar o vídeo.

## Utilização
Node.js 22 ou superior.

```text
npm ci
npm run dev
```

Para produção Next.js: `npm run build`, depois `npm start`.
Para gerar a versão estática: `npm run export`. O resultado fica em `.next-export/` nesta versão do Next.js.
Para visualizar a exportação: `npm run preview`, abrir http://localhost:3001.
No Vercel existente: framework Next.js, raiz do repositório, comando `npm run build`. Não são necessárias variáveis secretas.

## Estado e limitações a manter visíveis
- As notícias conservam o texto e datas de exemplo do Figma, conforme autorizado pelo utilizador.
- Newsletter visual implementada; não recolhe nem envia dados. Mostra aviso de indisponibilidade ao submeter. Não simula sucesso.
- O Figma fornecido só representa fotografias para Quality Assurance, Good Manufacturing Practices e Translations. Os outros cinco cartões usam composições provisórias com o símbolo da marca. Os textos desses cartões são adaptações dos serviços do site atual, não copy final aprovado.
- A contagem de oito inclui Good Manufacturing Practices como no novo desenho; no site antigo GMP está sob Quality Assurance. A taxonomia final deve ser confirmada antes do lançamento definitivo.
- As ligações de serviços e contacto apontam para páginas do site atual. Páginas interiores não fazem parte desta entrega.
- Cookies aponta para a política de privacidade existente; Instagram está representado mas sem ligação até ser confirmado o URL.
- A homepage mantém noindex até aprovação para lançamento.
- A disposição mobile foi adaptada: não foi fornecido um frame mobile separado.

## Validação realizada
- Build de produção e TypeScript passaram.
- Exportação estática passou e foi servida localmente.
- Browser a 1440px e 390px: sem overflow horizontal do documento; vídeo carregado (readyState 4).
- Percorridos os oito serviços no desktop; botão seguinte desativado no último; carrossel móvel muda o serviço ativo.
- Menu mobile abre, navega e fecha.
- Fotografia sobre nós verificada após correção do enquadramento.
- Newsletter verificada com endereço fictício local, sem transmissão.
- Não foram observados erros de consola no teste final.

## Publicação e cópias
Destino indicado: https://github.com/Blendd-agencia/phagecon e https://vercel.com/gads-5906s-projects/phagecon-k21q.
Publicado em https://phagecon-k21q.vercel.app/ em 10/11/2026 às 15:41:58 (Europe/Lisbon). Estado Ready / Production / Current, confirmado no painel Vercel. A integração GitHub–Vercel funcionou apesar da falha de listagem no conector.
O utilizador autorizou explicitamente a publicação do projeto completo, vídeo e imagens. Os 61 ficheiros foram enviados e verificados. Commit da homepage: 9e8685ee8fe695a465c0a213504dc7f60a14b2ec. Vídeo confirmado a reproduzir no site publicado; sem erros de consola observados.
O projeto e os recursos existem no disco local e nos ZIPs de entrega, independentemente da continuidade da conversa.

