import React, { Component } from 'react';

export class Form extends Component {
  state = {
    currentIndex: 1,
    selectedOption: {
      id: 1,
      items: [
        {
          id: 1,
          answer: ''
        }
      ]
    },
    tempItems: []
  };

  componentDidMount() {
    console.log(this.props.applyForm);
  }

  _checkboxOption = (e, option) => {
    const isChecked = e.target.checked;
    let { tempItems } = this.state;
    if (isChecked) {
      //1. tempItems를 만들어서 Next를 클릭하기 전에 저장한다.
      tempItems.push(option);

      //2. prevState를 이용한다. -> 조금 늦게 세팅 된다.
      // this.setState(prevState => ({
      //   tempItems: [...prevState.tempItems, option]
      // }));
    } else {
      tempItems = tempItems.filter(id => {
        if (id !== option.id) console.log();
        return id !== option.id;
      });
      console.log(tempItems);
    }
    this.setState({
      tempItems
    });
  };

  _setOption = () => {
    // Next클릭과 함께 선택한 tempItems를 output data에 담는다
    // 질문에 대한 대답은 "text" 키로 되어 있지만 output data를 위해서는
    // "answer" 키에 넣어주어야 한다. 키 자체를 변경하던지,(1)
    // 하나하나 요소를 빼서 다시 넣어준다.(2)
    let { selectedOption, tempItems } = this.state;
    tempItems.map((element, i) => {
      console.log(element);
      if (!selectedOption.items[i]) {
        selectedOption.items.push({
          id: 1,
          answer: ''
        });
      }
      selectedOption.items[i].id = element.id;
      selectedOption.items[i].answer = element.text;
    });
    console.log(selectedOption);
    this.setState(prevState => ({ currentIndex: prevState.currentIndex + 1 }));
  };

  render() {
    const { currentIndex } = this.state;
    const { applyForm } = this.props;
    return (
      <>
        <article id="form" className="active">
          {applyForm.map((item, itemIndex) => {
            if (currentIndex === item.itemId)
              return (
                <>
                  <h2>Form{currentIndex}</h2>
                  <form className="form-horizontal">
                    <p>{item.title}</p>
                    <fieldset>
                      <div className="form-group">
                        <div className="col-md-9 col-md-offset-3">
                          <ul>
                            {item.options.length === 0 ? (
                              <input type="text" />
                            ) : (
                              item.options.map((option, optionIndex) => {
                                return (
                                  <li className="item-list">
                                    <div className="checkbox-lable">
                                      <input
                                        type="checkbox"
                                        className="checkbox"
                                        onChange={e =>
                                          this._checkboxOption(e, option)
                                        }
                                      />
                                      {option.text}
                                    </div>
                                  </li>
                                );
                              })
                            )}
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
        <section id="controls">
          {currentIndex === 1 ? null : (
            <button
              className="btn btn-sm"
              name="back"
              onClick={() => this.setState({ currentIndex: currentIndex - 1 })}
            >
              Back
            </button>
          )}
          {applyForm.length === currentIndex ? (
            <button className="btn btn-sm" name="submit">
              Submit
            </button>
          ) : (
            <button
              className="btn btn-sm"
              name="next"
              onClick={() => this._setOption()}
            >
              Next
            </button>
          )}
        </section>
      </>
    );
  }
}

export default Form;
