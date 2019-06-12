import React from 'react';
import jsonResponse from './assets/indexJson';
import Form from './components/Form';

function App() {
  return (
    <div className="App">
      <h1>{jsonResponse.title}</h1>
      <main className="steps">
        <section id="states" data-state="form" className="">
          <Form applyForm={jsonResponse.items} />
        </section>
      </main>
    </div>
  );
}

export default App;
