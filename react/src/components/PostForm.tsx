import react from 'react';
import { cleanForm, movement } from '../assets/formsHelper';

interface Props {
  idString: string;
  inputsNames: string[];
  updateMessage: Function;
}

class PostForm extends react.Component<Props> {
  submitForm = async (e: react.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formId = this.props.idString + '-form';
    let headers = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(this.state),
    };

    let res = await (await fetch(`/${this.props.idString}`, headers)).json();
    if ((await res.message) == true) {
      cleanForm(formId);
    } else {
      this.props.updateMessage(res.message);
    }
  };

  componentDidMount() {
    movement(this.props.idString + '-form');
    this.props.inputsNames.forEach((name) => {
      let obj: any = {};
      obj[name] = '';
      this.setState(obj);
    });
  }

  updateState = (e: react.ChangeEvent<HTMLInputElement>, name: string) => {
    let obj: any = {};
    obj[name] = e.target.value;
    this.setState(obj);
  };

  render(): react.ReactNode {
    return (
      <form
        id={this.props.idString + '-form'}
        method="post"
        onSubmit={this.submitForm}
      >
        {this.props.inputsNames.map((name, index) => {
          return (
            <div key={name} className="form-field">
              <input
                type="text"
                name={name}
                placeholder={name}
                required
                onChange={(e) => this.updateState(e, name)}
              />
            </div>
          );
        })}
        <button
          id={this.props.idString + '-submit'}
          className="btn"
          type="submit"
        >
          Submit
        </button>
      </form>
    );
  }
}

export default PostForm;
