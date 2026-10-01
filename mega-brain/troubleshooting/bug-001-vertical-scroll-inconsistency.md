# Bug 001: Inconsistência de Scroll Vertical entre Dashboard e Telas Internas

## Sintoma
Na tela de Dashboard não havia scroll vertical, enquanto nas páginas internas (`/entradas`, `/saidas`, `/relatorios`) surgia uma barra de rolagem vertical indesejada e comportamento de scroll duplo.

## Causa-Raiz
1. **Container Elástico**: O layout usava `min-h-screen`, permitindo que o container raiz se expandisse além da viewport (`100vh`) quando o conteúdo crescia, ativando a rolagem na janela do navegador.
2. **Espaçamentos Excessivos**: O header utilizava `lg:p-8`, os cards de tabela usavam `p-8` e as células tinham `py-5`, somados ao container com `max-h-[50vh]`, ultrapassando os limites verticais de telas desktop padrão (1080p).
3. **Scroll Duplo**: `<main>` com `overflow-y-auto` continha um container de tabela com `max-h-[50vh] overflow-y-auto`.

## Solução & Prevenção
- Padronizado container raiz para `h-screen overflow-hidden` em todas as páginas com navegação lateral.
- Compactados paddings verticais para manter o design enxuto (`p-4 md:p-6 lg:px-8 lg:py-6` no header, `p-6` no card de tabela e `py-3.5` nas células).
- Eliminada a restrição de altura fixa com scroll duplo na tabela, permitindo rolagem única e fluida através do `<main>`.

## Módulos Relacionados
- [[specs/modules/layout-and-scroll]]
