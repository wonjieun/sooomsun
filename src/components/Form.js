import React, { Component } from 'react';

export class Form extends Component {
  state = {
    currentIndex: 1,
    selectedOption: {
      id: 1,
      items: []
    },
    tempOption: []
  };

  componentDidMount() {
    console.log(this.props.applyForm);
  }

  _checkedOption = (e, option, itemId) => {
    const isChecked = e.target.checked;
    let { tempOption } = this.state;
    if (isChecked) {
      //1. tempOption를 만들어서 Next를 클릭하기 전에 저장한다.
      tempOption.push(option);
      //2. prevState를 이용한다. -> 조금 늦게 세팅 된다.
      // this.setState(prevState => ({
      //   tempOption: [...prevState.tempOption, option]
      // }));
    } else {
      tempOption = tempOption.filter(tempItem => tempItem.id !== option.id);
    }
    this.setState({
      tempOption,
      itemId
    });
    console.log(tempOption);
  };

  _setOption = () => {
    // Next클릭과 함께 선택한 tempOption를 output data에 담는다
    // 질문에 대한 대답은 "text" 키로 되어 있지만 output data를 위해서는
    // "answer" 키에 넣어주어야 한다. 키 자체를 변경하던지,(1)
    // 하나하나 요소를 빼서 다시 넣어준다.(2)
    let { selectedOption, tempOption, itemId } = this.state;
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
      this.setState(prevState => ({
        currentIndex: prevState.currentIndex + 1,
        selectedOption,
        tempOption: []
      }));
      console.log(selectedOption);
    } else {
      alert('값을 입력해주세요!');
    }
  };

  _resetOption = () => {
    let { selectedOption, tempOption, itemId } = this.state;
    tempOption = selectedOption.items.filter(item => item.id === itemId);
    for (let obj of tempOption) {
      obj['text'] = obj['answer'];
      delete obj['answer'];
    }
    console.log(tempOption);
  };

  _submitOptions = () => {
    let { selectedOption, tempOption, itemId } = this.state;
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
      this.setState(prevState => ({
        selectedOption,
        tempOption: []
      }));
      console.log(`Output Data : ${selectedOption}`);
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
                <div key={i}>
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
                <div>
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
              onChange={e => {
                let tempOption = [{ text: e.target.value }];
                this.setState({ tempOption, itemId });
              }}
            >
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
    // 첫 번째 질문일 경우, Back 버튼 숨기기 또는 disabled 처리
    // 마지막 질문일 경우, Next 버튼 숨기기 또는 disabled 처리 그리고 Submit 생성
    const { currentIndex } = this.state;
    const { applyForm } = this.props;
    return (
      <>
        <article id="form" className="active">
          {applyForm.map((item, itemIndex) => {
            if (currentIndex === itemIndex + 1)
              return (
                <>
                  <h2>Form{currentIndex}</h2>
                  <form className="form-horizontal">
                    <p>{item.title}</p>
                    <fieldset>
                      <div className="form-group">
                        <div className="col-md-9 col-md-offset-3">
                          <ul>{this._renderFormType(item)}</ul>
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
              onClick={() => {
                this._resetOption();
                this.setState({ currentIndex: currentIndex - 1 });
              }}
            >
              Back
            </button>
          )}
          {applyForm.length === currentIndex ? (
            <button
              className="btn btn-sm"
              name="submit"
              onClick={() => this._submitOptions()}
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
    );
  }
}

export default Form;
