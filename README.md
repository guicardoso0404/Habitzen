
# Hackathon Project

Este repositório contém um projeto desenvolvido durante o hackathon, com foco na criação de uma aplicação web chamada **HabitZen**. O sistema é dividido em duas partes principais: o backend (servidor) e o frontend (interface do usuário). Abaixo está a descrição dos diretórios e arquivos principais.

## Estrutura do Projeto

### 1. **back**
Contém o código e configurações do servidor backend.
- **`db_config.js`**: Arquivo de configuração do banco de dados.
- **`node_modules/`**: Dependências do projeto.
- **`package.json`** e **`package-lock.json`**: Gerenciam as dependências e pacotes do Node.js.
- **`server.js`**: O arquivo principal que inicializa o servidor.

### 2. **front**
Contém os arquivos responsáveis pela interface de usuário (UI).
- **Arquivos HTML**: 
  - **`index.html`**: A página inicial da aplicação.
  - **`cadastro.html`**: Formulário de cadastro.
  - **`dicas.html`**: Página com dicas relacionadas ao projeto.
  - **`login.html`**: Página de login.
  - **`Inicio.html`**: Página inicial de navegação.
- **Pasta `css/`**: Contém os estilos (CSS) da aplicação.
- **Pasta `js/`**: Contém os scripts JavaScript da aplicação.
- **`HabitZen_Logo.png`**: O logotipo da aplicação.

### 3. **HabitZen.sql**
Arquivo SQL que contém a estrutura do banco de dados e possivelmente dados iniciais.

## Como Rodar o Projeto

### Backend
1. Navegue até o diretório **back**.
2. Instale as dependências do backend:
   ```bash
   npm install
   ```
3. Inicie o servidor:
   ```bash
   node server.js
   ```

### Frontend
1. Navegue até o diretório **front**.
2. Abra o arquivo `index.html` no navegador para acessar a interface do usuário.

### Banco de Dados
Importe o arquivo `HabitZen.sql` para o seu banco de dados MySQL para configurar a estrutura necessária para a aplicação.

## Contribuições
Este é um projeto em andamento e contribuições são bem-vindas. Se você deseja colaborar, sinta-se à vontade para fazer um fork do repositório e enviar um pull request.

## Licença
Este projeto está licenciado sob a [MIT License](LICENSE).
