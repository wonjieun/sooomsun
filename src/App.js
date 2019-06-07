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
          {/*           
          <article id="form" class="">
            <h2>Details</h2>
            <form class="form-horizontal">
              <p>Please provide some personal information</p>
              <fieldset>
                <div class="form-group">
                  <label class="col-md-3 control-label" for="email">
                    Email
                  </label>
                  <div class="col-md-9">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email"
                      class="form-control input-md"
                      required=""
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-md-3 control-label" for="password">
                    Password
                  </label>
                  <div class="col-md-9">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Password"
                      class="form-control input-md"
                      required=""
                    />
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-md-9 col-md-offset-3">
                    <label class="checkbox-inline">
                      <input
                        type="checkbox"
                        name="terms"
                        id="terms"
                        value="1"
                      />
                      Agree terms and conditions
                    </label>
                  </div>
                </div>
              </fieldset>
              <div class="form-group">
                <div class="col-md-9 col-md-offset-3">
                  <label class="checkbox-inline">
                    <input type="checkbox" id="submit-error" />
                    Simulate submission error
                  </label>
                </div>
              </div>
            </form>
          </article> */}

          <article id="finish" class="">
            <h2>Thank you!</h2>
            <p>Your membership information has been emailed to you</p>
          </article>

          <article id="error" class="">
            <h2 style={{ color: 'red' }}>Sorry</h2>
            <p>There was a problem saving your details to the server</p>
          </article>
        </section>

        <section id="controls">
          <button class="btn btn-sm" name="back">
            Back
          </button>
          <button class="btn btn-sm" name="next">
            Next
          </button>
          <button class="btn btn-sm" name="restart" disabled="">
            Restart
          </button>
        </section>
      </main>
    </div>
  );
}

export default App;
