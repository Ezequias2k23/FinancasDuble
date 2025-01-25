// Abrindo ou criando o banco de dados "metaDatabase"
const request = indexedDB.open("metaDatabase", 1);

// Criando a estrutura do banco de dados (caso seja a primeira vez que o banco é criado)
request.onupgradeneeded = function (event) {
  const db = event.target.result;

  // Criação de uma tabela "metas" com uma chave primária baseada no nome da meta
  const objectStore = db.createObjectStore("metas", { keyPath: "nome" });

  // Definindo índices para facilitar a pesquisa
  objectStore.createIndex("valorNecessario", "valorNecessario", { unique: false });
  objectStore.createIndex("valorAtual", "valorAtual", { unique: false });
};

let db; // Variável global para reutilizar a conexão

// Inicializando a conexão
request.onsuccess = function (event) {
  db = event.target.result;
  console.log("Banco de dados conectado com sucesso.");
};

request.onerror = function (event) {
  console.error("Erro ao conectar ao banco de dados:", event.target.error);
};

// Função para realizar transações no banco
function executarTransacao(storeName, mode, callback, errorCallback) {
  if (!db) {
    const errorMsg = "Banco de dados ainda não está pronto.";
    console.error(errorMsg);
    if (errorCallback) errorCallback(errorMsg);
    return;
  }
  const transaction = db.transaction(storeName, mode);
  const objectStore = transaction.objectStore(storeName);
  return callback(objectStore);
}

// Função para adicionar ou atualizar uma meta
function adicionarMeta(nome, valorNecessario, valorAtual) {
  return new Promise((resolve, reject) => {
    executarTransacao("metas", "readwrite", (objectStore) => {
      const metaRequest = objectStore.get(nome);

      metaRequest.onsuccess = function () {
        const existingMeta = metaRequest.result;
        const meta = { nome, valorNecessario, valorAtual };

        if (existingMeta) {
          const updateRequest = objectStore.put(meta);
          updateRequest.onsuccess = () => resolve("Meta atualizada com sucesso!");
          updateRequest.onerror = () => reject("Erro ao atualizar meta.");
        } else {
          const addRequest = objectStore.add(meta);
          addRequest.onsuccess = () => resolve("Meta adicionada com sucesso!");
          addRequest.onerror = () => reject("Erro ao adicionar meta.");
        }
      };

      metaRequest.onerror = () => reject("Erro ao verificar a existência da meta.");
    }, reject);
  });
}

// Função para buscar uma meta
function buscarMeta(nome) {
  return new Promise((resolve, reject) => {
    executarTransacao("metas", "readonly", (objectStore) => {
      const metaRequest = objectStore.get(nome);

      metaRequest.onsuccess = function () {
        const meta = metaRequest.result;
        if (meta) {
          console.log("Meta encontrada:", meta);
          resolve(meta);
        } else {
          console.log("Meta não encontrada.");
          resolve(null);
        }
      };

      metaRequest.onerror = () => reject("Erro ao buscar meta.");
    }, reject);
  });
}

// Função para listar todas as metas
function listarMetas() {
  return new Promise((resolve, reject) => {
    executarTransacao("metas", "readonly", (objectStore) => {
      const allMetas = objectStore.getAll();

      allMetas.onsuccess = function () {
        console.log("Todas as metas:", allMetas.result);
        resolve(allMetas.result);
      };

      allMetas.onerror = () => reject("Erro ao listar as metas.");
    }, reject);
  });
}

// Função para remover uma meta
function removerMeta(nome) {
  return new Promise((resolve, reject) => {
    executarTransacao("metas", "readwrite", (objectStore) => {
      const metaRequest = objectStore.delete(nome);

      metaRequest.onsuccess = () => resolve("Meta removida com sucesso!");
      metaRequest.onerror = () => reject("Erro ao remover meta.");
    }, reject);
  });
}

// Função para limpar o banco de dados
function limparBanco() {
  const deleteRequest = indexedDB.deleteDatabase("metaDatabase");
  deleteRequest.onsuccess = () => console.log("Banco de dados apagado com sucesso!");
  deleteRequest.onerror = (event) => console.error("Erro ao apagar banco de dados:", event.target.error);
}
