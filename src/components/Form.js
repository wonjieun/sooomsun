import React, { Component } from 'react';

export class Form extends Component {
  state = {
    currentIndex: 1,
    selectedOption: {
      id: 1,
      items: [
        // {
        //   id: 1,
        //   answer: ''
        // }
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
      // if (!selectedOption.items[i]) {
      selectedOption.items.push({
        id: 1,
        answer: ''
      });
      // }
      const top = selectedOption.items.length - 1;
      selectedOption.items[top].id = element.id;
      selectedOption.items[top].answer = element.text;
    });
    console.log(selectedOption);
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex + 1,
      selectedOption
    }));
  };

  _renderFormType = item => {
    const formType = item.formType;
    const options = item.options;
    switch (formType) {
      case 1:
        return (
          <li className="item-list">
            {options.map((option, i) => {
              return (
                <div>
                  <input
                    type="checkbox"
                    className="checkbox"
                    onChange={e => this._checkboxOption(e, option)}
                  />
                  {option.text}
                </div>
              );
            })}
          </li>
        );
      case 2:
        return (
          <li className="item-list">
            {options.map((option, i) => {
              return (
                <div>
                  <input
                    type="radio"
                    name="radio"
                    // {`radio${option.id}`}
                    className="checkbox"
                    // checked={`${option.id}` === this.state.tempItems.id}
                    onChange={e => {
                      let tempItems = [];
                      tempItems.push(option);
                      console.log(tempItems);
                      this.setState({ tempItems });
                    }}
                  />
                  <label for={`radio${option.id}`}>{option.text}</label>
                </div>
              );
            })}
          </li>
        );
      case 3:
        return (
          <li className="item-list">
            <input
              type="text"
              className="text"
              onChange={e => this._checkboxOption(e)}
            />
          </li>
        );
      case 4:
        return (
          <li className="item-list">
            <select onChange={e => this._checkboxOption(e)}>
              {options.map((option, i) => {
                return <option>{option.text}</option>;
              })}
            </select>
          </li>
        );
    }
  };
  /* _renderFormType = (formType, option) => {
    switch (formType) {
      case 1:
        return (
          <>
            <input
              type="checkbox"
              className="checkbox"
              onChange={e => this._checkboxOption(e, option)}
            />
            {option.text}
          </>
        );
      case 2:
        return (
          <>
            <input
              type="radio"
              className="radio"
              onChange={e => this._checkboxOption(e, option)}
            />
            {option.text}
          </>
        );
      case 3:
        return (
          <input
            type="text"
            className="text"
            onChange={e => this._checkboxOption(e, option)}
          />
        );
      case 4:
        return (
          <select onChange={e => this._checkboxOption(e, option)}>
            <option>{option.text}</option>
          </select>
        );
    }
  }; */

  render() {
    // 첫 번째 질문일 경우, Back 버튼 숨기기 또는 disabled 처리
    // 마지막 질문일 경우, Next 버튼 숨기기 또는 disabled 처리 그리고 Submit 생성
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
                            {this._renderFormType(item)}
                            {/* {item.options.map((option, optionIndex) => {
                              return (
                                <li className="item-list">
                                  <div>
                                    {this._renderFormType(
                                      item.formType,
                                      option
                                    )}
                                  </div>
                                </li>
                              );
                            })} */}
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
