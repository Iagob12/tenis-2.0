// src/utils/localStorageUtils.js

const STORAGE_KEY = 'tenis';

// Função para obter a lista de tênis do LocalStorage
export const getTenis = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// Função para salvar a lista de tênis no LocalStorage
export const saveTenis = (tenis) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tenis));
};

// Função para adicionar um novo tênis
export const addTenis = (novoTenis) => {
  const tenisList = getTenis();
  novoTenis.id = Date.now(); // Gera um ID único (pode usar outra lógica se preferir)
  tenisList.push(novoTenis);
  saveTenis(tenisList);
};

// Função para atualizar um tênis existente
export const updateTenis = (id, tenisAtualizado) => {
  const tenisList = getTenis();
  const index = tenisList.findIndex((t) => t.id === parseInt(id));
  if (index !== -1) {
    tenisList[index] = { ...tenisAtualizado, id: parseInt(id) };
    saveTenis(tenisList);
    return true;
  }
  return false;
};

// Função para deletar um tênis
export const deleteTenis = (id) => {
  const tenisList = getTenis();
  const updatedList = tenisList.filter((t) => t.id !== parseInt(id));
  saveTenis(updatedList);
};