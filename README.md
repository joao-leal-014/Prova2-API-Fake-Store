# Os comandos para iniciar o Projeto

vue create painel-admin

cd nome-do-painel-admin

npm install vue-router@4   (para gerenciar a navegação entre as seções do painel (produtos, pedidos, usuários, login))

npm install vuex@4   (compartilhar dados entre componentes)

npm install axios   (consumir os dados da API)

________________________________________________________________________________________________________________________________________________________

## Para rodar o código

npm run serve

________________________________________________________________________________________________________________________________________________________

### Usuarios para fazer cadastro

PARA FAZER LOGIN (TEM QUE SER ALGUM USER JÁ CADASTRADO NA API:  https://fakestoreapi.com/ )

USERS CADASTRADOS:                        SENHAS:
---------------------------------------------------
john@gmail.com	                     m38rmF$
morrison@gmail.com	                     83r5^_
kevin@gmail.com	                     kev02937@
don@gmail.com	                            ewedon
derek@gmail.com	                     jklg*_56
david_r@gmail.com	                     3478*#54
miriam@gmail.com	                     f238&@*$
william@gmail.com	                     William56$hj
kate@gmail.com	                     kfejk@*_
jimmie@gmail.com	                     klein

________________________________________________________________________________________________________________________________________________________
#### Descrição do Projeto

Aqui está um resumo das principais funcionalidades e componentes de cada trecho de código descrito:

Sistema de Roteamento com Vue Router:
       Implementa navegação com Vue Router, utilizando createRouter e createWebHistory.
       Define rotas para páginas como login, home e páginas protegidas (produtos, pedidos, usuários).
       Protege rotas com meta.requiresAuth, redirecionando para login se o usuário não estiver autenticado (verificado via token no localStorage).

Dashboard Interativa:
       Exibe informações resumidas (produtos, categorias, pedidos, usuários) de uma API externa (FakeStoreAPI).
       Inclui botões de navegação para páginas do sistema e um botão "SAIR" para voltar ao login.
       Estilo simples com efeitos de hover nos botões.

Página de Login:
       Formulário de login com validação de e-mail e senha.
       Autenticação através de uma requisição GET para buscar usuários na API externa.
       Armazena um token fictício no localStorage em caso de sucesso e redireciona para a página principal.

Gestão de Pedidos:
       Exibe uma lista de pedidos com informações básicas (ID, data, valor, status).
       Modal para visualizar detalhes do pedido, com a opção de alterar o status e exibir uma tabela de produtos.
       Consome dados da API FakeStoreAPI e tem navegação para outras rotas.

Gestão de Produtos e Carrinho de Compras:
       Exibe produtos com detalhes e permite adicionar ao carrinho.
       Modal para adicionar, editar e excluir produtos.
       Carrinho de compras com visualização de itens, remoção de produtos e finalização da compra.
       Comunicação com API para carregar produtos e categorias, com filtros de categoria, preço e avaliação.

Gestão de Usuários:
       Pesquisa de usuários por nome ou e-mail, com filtragem em tempo real.
       Exibição de uma lista de usuários e funcionalidades para editar, excluir e adicionar novos usuários.
       Navegação para outras páginas e interface simples e responsiva.

Configuração da Aplicação Vue:
       Inicializa a aplicação com createApp(App) e configura o Vue Router.
       Define a montagem da aplicação no elemento HTML com ID #app.

Autenticação e Condição de Exibição do Header:
       O componente <Header> é exibido somente se o usuário estiver autenticado (verificação do token no localStorage).
       Utiliza computed para reatividade, garantindo que a interface se atualize quando o estado de autenticação mudar.

Essas funcionalidades e componentes formam uma aplicação Vue.js com navegação protegida, gestão de usuários, produtos e pedidos, e interação com APIs externas.