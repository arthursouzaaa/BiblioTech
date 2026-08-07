// Configuração simulada de banco de dados
module.exports = {
  // Simula um banco de dados de produtos
  produtos: [
    { id: 1, nome: 'Notebook', preco: 3500.00, estoque: 10 },
    { id: 2, nome: 'Mouse', preco: 150.00, estoque: 25 },
    { id: 3, nome: 'Teclado', preco: 200.00, estoque: 15 },
    { id: 4, nome: 'Monitor', preco: 1200.00, estoque: 5 },
    { id: 5, nome: 'Headset', preco: 300.00, estoque: 8 }
  ],
  
  // Função para buscar produto por ID
  buscarProduto: function(id) {
    return this.produtos.find(p => p.id === id);
  }
};