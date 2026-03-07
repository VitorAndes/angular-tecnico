# Countries Explorer

Aplicação web que consome a API Rest Countries para listar países do mundo, permitindo busca, filtro por região e visualização de detalhes de cada país.

---

## Funcionalidades

- Listagem de aproximadamente 250 países
- Filtro por nome do país
- Filtro por região
- Página de detalhes do país
- URL com estado dos filtros (compartilhável)
- Cache de requisições para evitar chamadas repetidas à API

---

## Tecnologias utilizadas

| Tecnologia | Descrição |
|---|---|
| Angular | Framework principal |
| TypeScript | Linguagem base |
| Angular Router | Navegação e URL state |
| HttpClient | Consumo da API |
| RxJS | Gerenciamento de estado reativo |
| [Rest Countries API](https://restcountries.com/) | Fonte dos dados |

---

## Como rodar o projeto localmente

**1. Clonar o repositório**
```bash
git clone <url-do-repositorio>
```

**2. Entrar na pasta do projeto**
```bash
cd <nome-do-projeto>
```

**3. Instalar dependências**
```bash
npm install
```

**4. Rodar o projeto**
```bash
ng serve
```

**5. Abrir no navegador**
```
http://localhost:4200
```

---

## Decisões técnicas

### Estrutura preparada para crescimento

O projeto foi estruturado de forma componentizada, separando responsabilidades entre:

- componentes de interface
- serviços de acesso à API
- lógica de filtro

Essa abordagem facilita manutenção e escalabilidade caso novas funcionalidades sejam adicionadas.

---

### Cache de requisições

Foi implementado cache no service utilizando RxJS (`shareReplay`).

**Motivo:**
- evitar múltiplas chamadas desnecessárias à API
- melhorar performance da aplicação
- permitir reutilização dos dados entre diferentes componentes

Além disso, os detalhes de países também possuem cache baseado no código do país.

---

### URL State para filtros

Os filtros de busca e região são armazenados na URL através de query params.

**Exemplo:**
```
/countries?search=brazil&region=Americas
```

**Vantagens:**
- permite compartilhar links com filtros aplicados
- mantém o estado ao atualizar a página
- melhora a experiência de navegação

---

### Componentização

A interface foi dividida em componentes menores (ex: lista de países, card de país, filtro e busca).

**Benefícios:**
- melhor reutilização
- código mais organizado
- manutenção mais simples

---

## O que eu faria diferente com mais tempo

Se tivesse mais tempo para evoluir o projeto, algumas melhorias que eu pesquisaria ou implementaria seriam:

- **Virtualização de listas** para otimizar a renderização caso o número de países fosse muito maior
- Melhorias de performance 
- Testes automatizados
- Melhorias de acessibilidade
- Refinamento de UI/UX
