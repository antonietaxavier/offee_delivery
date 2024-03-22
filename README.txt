Coffee D (Coffee Delivery) é um site simulando uma cafeteria. Nele você  pode pedir tipos de cafés diferentes para serem entregues.
O usuário escolhe os cafés disponíveis, as quantidades e depois preenche um formulário de endereço. É calculado o valor total a se pagar e no final é enviado o pedido.

O COFFE D foi desenvolvido usando React.js com Typescript, Vite, Jest, react-form-hooks e outras bibliotecas. Funciona com ContextAPI do React, servindo com um sistema de carrinho que engloba toda a aplicação. Nesse contexto, é efetivado a manipulação do carrinho como se fosse um CRUD, registrando novos cafés para o carrinho, editando sua quantidade, eliminando eles e lendo as informações como valor, nome e tags que cada item possui.

No formulário de entrega, ao acessar o carrinho, foi decidido o uso de uma API de CEP para facilitar o cadastro de informações. Ao preencher e distanciar do input com CEP, é feito uma chamada na API que busca demais dados do endereço fornecido.

O Typescript foi escolhido para facilitar a leitura do código e a manutenção de elementos, tendo em visto o sistema de interface e tipos da linguagem. Para rodar o projeto, deve se escrever os seguintes comando no terminal: yarn  yarn dev OU com npm: npm install npm run dev

