import React, { useState } from 'react';
import '../App.css'; // Import the CSS file correctly

function ApiKeyInput({ onSetApiKey }) {
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSetApiKey(apiKey);
  };

  return (
    <div className="api-key-input">
      <h2 className="app-heading">Enter OpenAI API Key</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter API Key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
        <button type="submit">Start</button>
      </form>
    </div>
  );
}

export default ApiKeyInput;
