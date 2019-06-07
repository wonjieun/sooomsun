import React from 'react';
import jsonResponse from './assets/indexJson';
import Form from './components/Form';

function App() {
  return (
    <div className="App">
      <h1>{jsonResponse.title}</h1>
      <main class="steps">
        <section id="states" data-state="form" class="">
          <Form applyForm={jsonResponse.items} />

          <article id="finish" class="">
            <h2>Thank you!</h2>
            <p>Your membership information has been emailed to you</p>
          </article>

          <article id="error" class="">
            <h2 style={{ color: 'red' }}>Sorry</h2>
            <p>There was a problem saving your details to the server</p>
          </article>
        </section>
      </main>
    </div>
  );
}

export default App;
