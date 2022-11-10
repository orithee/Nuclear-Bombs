import react from 'react';
import style from '../App.module.scss';
import { cleanForm, movement } from '../assets/formsHelper';

interface Props {
  idString: string;
  inputsNames: string[];
  updateMessage: Function;
}

class PutForm extends react.Component<Props> {
  submitForm = async (e: react.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formId = this.props.idString + '-form';
    let headers = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(this.state),
    };

    let res = await (await fetch(`/${formId}`, headers)).json();
    if ((await res.message) == true) {
      cleanForm(formId);
    } else {
      this.props.updateMessage(res.message);
    }
  };

  componentDidMount() {
    movement(this.props.idString + '-form');
    this.setState({ table: 'bombs' });
    this.props.inputsNames.forEach((name) => {
      let obj: any = {};
      obj[name] = '';
      this.setState(obj);
    });
  }

  updateState = (
    e: react.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    name: string
  ) => {
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
        <select
          onChange={(e) => this.updateState(e, 'table')}
          className="sorter"
        >
          <option value="bombs">bombs</option>
          <option value="officers">officers</option>
          <option value="locations">locations</option>
          <option value="locations_history">locations_history</option>
        </select>
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
          className={style.btn}
          type="submit"
        >
          Submit
        </button>
      </form>
    );
  }
}

export default PutForm;
