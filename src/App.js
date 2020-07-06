import React, {useState, useEffect} from "react";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const repository = await api.post('/repositories', {
      title: 'Bruno Giminiani',
      url: 'https://github.com/bgiminiani',
      techs: ['ReactJS', 'AngularJS'],
    });

    setRepositories([...repositories, repository.data]);
  }

  async function handleRemoveRepository(id) {
    const newRepositories = repositories.filter(repository => repository.id !== id);

    await api.delete(`/repositories/${id}`)

    setRepositories([...newRepositories]);

  }

  return (
    <>
      <ul data-testid="repository-list">
        {repositories.map( repository => 
          <li key={repository.id}>
            {repository.title} 

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </>
  );
}

export default App;
