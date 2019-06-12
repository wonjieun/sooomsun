import React, { Component } from 'react';

export class Form extends Component {
  state = {
    isComplete: false,
    currentIndex: 1,
    selectedOption: {
      id: 1,
      items: []
    },
    tempOption: []
  };

  _checkedOption = (e, option, itemId) => {
    const isChecked = e.target.checked;
    let { tempOption } = this.state;
    if (isChecked) {
      tempOption.push(option);
    } else {
      tempOption = tempOption.filter(tempItem => tempItem.id !== option.id);
    }
    this.setState({
      tempOption,
      itemId
    });
  };

  _setOption = () => {
    let { selectedOption, tempOption, itemId, currentIndex } = this.state;
    const { applyForm } = this.props;
    if (tempOption.length !== 0) {
      let answer = '';
      selectedOption.items.push({
        id: 0,
        answer: ''
      });
      tempOption.forEach((element, i) => {
        if (i === 0) answer = element.text;
        else answer = answer.concat(',', element.text);
      });
      const top = selectedOption.items.length - 1;
      selectedOption.items[top].id = itemId;
      selectedOption.items[top].answer = answer;
      if (applyForm.length === currentIndex) {
        this.setState({
          isComplete: true
        });
        console.log('Output Data');
        console.log(selectedOption);
      } else {
        this.setState(prevState => ({
          currentIndex: prevState.currentIndex + 1,
          selectedOption,
          tempOption: []
        }));
      }
    } else {
      alert('값을 입력해주세요!');
    }
  };

  _renderFormType = item => {
    const itemId = item.itemId;
    const formType = item.formType;
    const options = item.options;
    switch (formType) {
      case 1:
        return (
          <li className="item-list">
            {options.map((option, i) => {
              return (
                <div key={i} className="checkbox-block">
                  <input
                    type="checkbox"
                    className="checkbox"
                    onChange={e => this._checkedOption(e, option, itemId)}
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
                <div key={i} className="radio-block">
                  <input
                    type="radio"
                    name="radio"
                    id={`radio${option.id}`}
                    className="radio"
                    onChange={() => {
                      let tempOption = [];
                      tempOption.push(option);
                      this.setState({ tempOption, itemId });
                    }}
                  />
                  <label htmlFor={`radio${option.id}`}>{option.text}</label>
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
              onChange={e => {
                let tempOption = [{ text: e.target.value }];
                this.setState({ tempOption, itemId });
              }}
            />
          </li>
        );
      case 4:
        return (
          <li className="item-list">
            <select
              className="selectbox"
              onChange={e => {
                let tempOption = [{ text: e.target.value }];
                this.setState({ tempOption, itemId });
              }}
            >
              <option>선택</option>
              {options.map((option, i) => {
                return <option>{option.text}</option>;
              })}
            </select>
          </li>
        );
      default:
        break;
    }
  };

  render() {
    const { currentIndex, isComplete } = this.state;
    const { applyForm } = this.props;
    return (
      <>
        {isComplete ? (
          <article id="finish">
            <h2>맞춤 견적서가 오고 있어요!</h2>
            <p>최대 6명의 선생님이 견적서를 보내요</p>
          </article>
        ) : (
          <>
            <article id="form" className="active">
              {applyForm.map((item, itemIndex) => {
                if (currentIndex === itemIndex + 1)
                  return (
                    <form className="form-horizontal">
                      <p>{item.title}</p>
                      <fieldset>
                        <div className="form-group">
                          <ul>{this._renderFormType(item)}</ul>
                        </div>
                      </fieldset>
                    </form>
                  );
                else return null;
              })}
            </article>
            <section id="controls">
              {applyForm.length === currentIndex ? (
                <button
                  className="btn btn-sm"
                  name="submit"
                  onClick={() => this._setOption()}
                >
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
        )}
      </>
    );
  }
}

export default Form;
