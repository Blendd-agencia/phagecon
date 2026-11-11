# Phagecon — expansão do website, 11 novembro 2026

## Estado e continuidade

Implementação baseada no PDF `Roadmap site_26102026.pdf` (23 páginas), fornecido pelo cliente. O projeto está em `C:\Users\joaos\Documents\ChatGPT\Website Phagecon`. A homepage existente foi preservada como referência visual. Repositório: https://github.com/Blendd-agencia/phagecon. Destino: https://phagecon-k21q.vercel.app/.

## Páginas e experiência

- `/about`: missão, valores, linha do tempo 2006–2026, mensagem da direção, equipa e vantagens competitivas.
- `/services`: índice editorial das sete áreas.
- `/services/regulatory-scientific-affairs`: etapas do ciclo de vida, documentação, autorização, manutenção, escrita científica e acesso ao mercado.
- `/services/pharmacovigilance`: implementação, monitorização e apoio especializado.
- `/services/quality-assurance`: sistemas, responsáveis, licenciamento, auditorias, operações e conformidade por produto.
- `/services/good-manufacturing-practices`: inspeções, auditorias, documentação e apoio técnico.
- `/services/translations`: documentos, ferramentas, terminologia e qualidade.
- `/services/training`: abordagem e contacto com necessidades formativas.
- `/services/tailored-services`: experiência, flexibilidade, controlo, conhecimento e rede.
- `/news`: destaque editorial, pesquisa e filtros por tema; seleção de notícias do arquivo existente com datas e links para as fontes.
- `/events`: formatos de eventos, formação e podcast; programação preparada para receber dados confirmados.
- `/quotation`: pedido orientado por serviço, com contexto transportado das páginas de serviços.
- `/careers`: proposta de carreira, listagem expansível de vagas e candidatura espontânea.
- `/contacts`: contactos diretos, escritórios, instruções de acesso e pedido geral.

As páginas de serviços têm índice lateral persistente em desktop, hierarquia de títulos e listas legíveis num fundo claro. Em ecrãs pequenos, o índice passa para o início. Header e footer são partilhados por todo o site.

## Conteúdos e decisões

- O roadmap junta Regulatory e Scientific Affairs: são sete serviços, substituindo as oito áreas da homepage inicial. O contador e o carrossel acompanham a nova organização.
- Texto em inglês, como o roadmap e a homepage. Correções ortográficas e pequenos ajustes editoriais para legibilidade.
- Linha do tempo, nome e mensagem de Catarina Cardoso transcritos das imagens incorporadas na página 7 do PDF. Vantagens competitivas da imagem da página 8.
- Fotografias da equipa não fornecidas: retratos não foram inventados; apresentação tipográfica com iniciais e cargos.
- Vagas e eventos: os exemplos do PDF não são ofertas ou eventos reais. As listas ficam vazias até serem fornecidos dados confirmados. Templates funcionais já implementados.
- Notícias: seleção do arquivo https://www.phagecon.com/noticias.php, consultado em 11 novembro 2026. São entradas históricas identificadas, não um feed automático. Conteúdo em `app/content/updates.ts`.
- Links legais mantêm os destinos existentes; não foram redigidas políticas novas.
- Newsletter mantém o estado da entrega anterior, sem plataforma de subscrição.
- Não foi confirmado um perfil LinkedIn específico da Phagecon. Não se atribui o perfil do grupo à empresa.

## Formulários

O cliente confirmou que não existe serviço de envio de email configurado. Os formulários validam os campos, preparam o conteúdo localmente e disponibilizam um link para abrir a aplicação de email e uma opção para copiar a mensagem. O utilizador revê e envia. Nenhum pedido é apresentado como enviado pelo site.

Destinatário de contacto retirado do roadmap: `phagecon@phagecon.pt`. Confirmar eventual caixa própria de recrutamento antes de ativar envio direto. Nas candidaturas, o CV é anexado pelo candidato ao email; não há upload ou armazenamento de CV no site.

Para ligar envio direto no futuro: configurar destinatários, fornecedor, domínio autenticado, proteção antispam, tratamento de anexos e estados reais de sucesso/erro. Não colocar credenciais no browser ou neste repositório.

## Manutenção

- Serviços: `app/content/services.ts`.
- Notícias, eventos e vagas: `app/content/updates.ts` (tipos definidos).
- Equipa e percurso: `app/about/page.tsx`.
- Contactos: `app/contacts/page.tsx`.
- Formulários: `app/components/enquiry-form.tsx`.
- Estilos das novas páginas: `app/interior.css`.
- SEO continua com `noindex`, conforme a entrega anterior, até à aprovação de lançamento.

## Validação

Build de produção e TypeScript concluídos com sucesso. Verificação visual e funcional registada na entrega.
