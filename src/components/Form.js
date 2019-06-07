import React, { Component } from 'react';

export class Form extends Component {
  state = {
    currentIndex: 1,
    selectedOpt: ''
  };

  componentDidMount() {
    console.log(this.props.applyForm);
  }

  render() {
    const { currentIndex } = this.state;
    const { applyForm } = this.props;
    return (
      <article id="form" class="active">
        {applyForm.map((item, itemIndex) => {
          if (currentIndex === item.itemId)
            return (
              <>
                <h2>Form{currentIndex}</h2>
                <form class="form-horizontal">
                  <p>{item.title}</p>
                  <fieldset>
                    <div class="form-group">
                      <div class="col-md-9 col-md-offset-3">
                        <ul>
                          {item.options.map((option, optionIndex) => {
                            return (
                              <li className="item-list">
                                <div className="checkbox-lable">
                                  <input type="checkbox" className="checkbox" />
                                  {option.text}
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </fieldset>
                </form>
              </>
            );
          else return null;
        })}
      </article>
    );
  }
}

export default Form;
