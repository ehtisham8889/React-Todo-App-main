import React, { useState } from 'react';
import axios from 'axios';
import "./App.css";
import TodoInput from './components/TodoInput';
import Todolist from './components/TodoList';
import ApiKeyInput from './components/ApiKeyInput'; // Import the new component

function App() {
  const [listTodo, setListTodo] = useState([]);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(true);

  const addList = async (inputText) => {
    if (inputText !== '' && apiKey) {
      // Add the initial to-do
      setListTodo([...listTodo, inputText]);

      // Call GPT-4 to get related to-dos
      try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
          model: "gpt-4",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: `Suggest 2-3 related to-dos for: ${inputText}` }
          ],
          max_tokens: 100
        }, {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          }
        });

        const suggestions = response.data.choices[0].message.content.split("\n").filter(Boolean);
        setListTodo(prevList => [...prevList, ...suggestions]);
      } catch (error) {
        console.error("Error fetching suggestions from GPT-4:", error);
      }
    }
  }

  const deleteListItem = (key) => {
    let newListTodo = [...listTodo];
    newListTodo.splice(key, 1);
    setListTodo([...newListTodo]);
  }

  const handleSetApiKey = (key) => {
    setApiKey(key);
    setShowApiKeyInput(false);
  };

  return (
    <div className="main-container">
      <div className="center-container">
        {showApiKeyInput ? (
          <ApiKeyInput onSetApiKey={handleSetApiKey} />
        ) : (
          <>
            <TodoInput addList={addList} />
            <h1 className="app-heading">TODO</h1>
            <hr />
            {listTodo.map((listItem, i) => (
              <Todolist key={i} index={i} item={listItem} deleteItem={deleteListItem} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
