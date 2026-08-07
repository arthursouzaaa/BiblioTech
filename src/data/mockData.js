export const LIVROS_MOCK = [
  { id: 1, titulo: "Dom Casmurro", autor: "Machado de Assis", categoria: "Romance", ano: 1899, status: "Disponível" },
  { id: 2, titulo: "1984", autor: "George Orwell", categoria: "Ficção Científica", ano: 1949, status: "Emprestado" },
  { id: 3, titulo: "O Cortiço", autor: "Aluísio Azevedo", categoria: "Romance", ano: 1890, status: "Disponível" },
  { id: 4, titulo: "A Hora da Estrela", autor: "Clarice Lispector", categoria: "Romance", ano: 1977, status: "Disponível" },
  { id: 5, titulo: "Sapiens", autor: "Yuval Noah Harari", categoria: "Ensaio", ano: 2011, status: "Emprestado" },
];

export const USUARIOS_MOCK = [
  { id: 1, nome: "Ana Beatriz", email: "ana.beatriz@email.com", emprestimosAtivos: 1 },
  { id: 2, nome: "Carlos Eduardo", email: "carlos.edu@email.com", emprestimosAtivos: 0 },
  { id: 3, nome: "Fernanda Lima", email: "fernanda.lima@email.com", emprestimosAtivos: 2 },
];

export const EMPRESTIMOS_MOCK = [
  { id: 1, livro: "1984", usuario: "Ana Beatriz", dataEmprestimo: "2026-07-20", dataDevolucao: "2026-08-03", status: "Em atraso" },
  { id: 2, livro: "Sapiens", usuario: "Fernanda Lima", dataEmprestimo: "2026-08-01", dataDevolucao: "2026-08-15", status: "Ativo" },
];

export const STATUS_STYLES = {
  "Disponível": "bg-emerald-50 text-emerald-700 border border-emerald-200",
  "Emprestado": "bg-amber-50 text-amber-700 border border-amber-200",
  "Ativo": "bg-blue-50 text-blue-700 border border-blue-200",
  "Em atraso": "bg-red-50 text-red-700 border border-red-200",
};

export const DEMO_USUARIO = { email: "admin", senha: "admin" };