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

          {/* <article id="error" className="">
            <h2 style={{ color: 'red' }}>Sorry</h2>
            <p>There was a problem saving your details to the server</p>
          </article> */}
        </section>
      </main>
    </div>
  );
}

export default App;
