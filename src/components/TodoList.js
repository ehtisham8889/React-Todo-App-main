import React from 'react';

function Todolist({ item, index, deleteItem, suggestTodo }) {
  return (
    <div className="list-container">
      <span className="list-item">{item}</span>
      <div className="icons">
        <i className="icon-suggest" onClick={suggestTodo}>
          💡 {/* Suggestion icon */}
        </i>
        <i className="icon-delete" onClick={() => deleteItem(index)}>
          🗑️ {/* Delete icon */}
        </i>
      </div>
    </div>
  );
}

export default Todolist;
