import React, { useState, useEffect } from "react";
import api from './services/api';
import "./styles.css";

function App() {

  const [repos, setRepos] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepos(response.data);
    })
  }, [] );

  async function handleAddRepository(e) {
    e.preventDefault();

    const data = {
      "title":`Meu Projeto ${Date.now()}`,
      "url":"https://github.com/pedrivas/go-stack-desafio-03-reactjs",
      "techs":["React, React Native, Imsomnia, NodeJS"]
    }

    try {
        const response = await api.post('repositories', data);
        setRepos([ ...repos, response.data])
    } catch (err) {
        alert(`Erro no cadastro. Tente novamente.`)
    }
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepos(repos.filter(
      repo => repo.id !== id
    ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repos.map(repo => (
            <li key={repo.id}>
              {repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
