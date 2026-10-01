# Spec: Consistência de Layout e Gerenciamento de Scroll

## Contexto & Problema
Na página de Dashboard (`dashbord.tsx`), todo o conteúdo cabe confortavelmente no viewport desktop sem disparar rolagem vertical. Em contrapartida, as páginas de Entradas (`entradas.tsx`), Saídas (`saidas.tsx`) e Relatórios (`relatorios.tsx`) apresentam rolagem vertical indesejada e comportamentos de scroll inconsistentes devido a:
1. Uso de `min-h-screen` no container raiz, permitindo que a janela do navegador estique e gere scroll global.
2. Padding excessivo no Header (`lg:p-8`), no container das tabelas (`p-8`), nas linhas das tabelas (`py-5`) e nos espaçamentos verticais (`space-y-6`, `pb-8`).
3. Rolagem duplicada (*double scrollbar*): `<main>` com `overflow-y-auto` contendo uma tabela interna com `max-h-[50vh] overflow-y-auto`.

## Requisitos e Critérios de Aceitação
1. **App Shell Bloqueado a 100vh**:
   - As páginas internas autenticadas (`dashbord.tsx`, `entradas.tsx`, `saidas.tsx`, `relatorios.tsx`) devem utilizar `h-screen overflow-hidden` no container raiz para fixar a barra lateral e o viewport da aplicação.
2. **Eliminação de Scroll Desnecessário em Desktop**:
   - Ajustar a densidade visual (paddings do header para `p-4 md:p-6`, padding do container de tabela para `p-6` e altura de linha para `py-3.5`) para que as telas caibam em viewports desktop padrão sem gerar scroll vertical.
3. **Unificação da Rolagem (Single Scroll Container)**:
   - Eliminar aninhamento conflitante de `overflow-y-auto`. Quando a lista de transações for extensa, a rolagem deve ocorrer de forma suave e unificada dentro da tabela ou do `<main>` via `custom-scrollbar`.

## Módulos Relacionados
- `[[specs/modules/layout-and-scroll]]`
- [dashbord.tsx](file:///C:/Users/victo/OneDrive/Documentos/Github/Financely/frontend/src/pages/dashbord.tsx)
- [entradas.tsx](file:///C:/Users/victo/OneDrive/Documentos/Github/Financely/frontend/src/pages/entradas.tsx)
- [saidas.tsx](file:///C:/Users/victo/OneDrive/Documentos/Github/Financely/frontend/src/pages/saidas.tsx)
- [relatorios.tsx](file:///C:/Users/victo/OneDrive/Documentos/Github/Financely/frontend/src/pages/relatorios.tsx)
