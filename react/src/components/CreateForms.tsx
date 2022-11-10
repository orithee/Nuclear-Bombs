import react from 'react';
import PostForm from './PostForm';
import PutForm from './PutForm';
import { formsData } from '../assets/formsData';
interface Props {
  formStr: string;
  updateMessage: Function;
}
class CreateForms extends react.Component<Props> {
  render(): react.ReactNode {
    const form = formsData.map(({ idString, inputsNames }) => {
      if (this.props.formStr === 'update' && idString === 'update') {
        return (
          <PutForm
            key={idString}
            idString={idString}
            inputsNames={inputsNames}
            updateMessage={this.props.updateMessage}
          />
        );
      } else if (this.props.formStr === 'delete' && idString === 'delete') {
        return (
          <PutForm
            key={idString}
            idString={idString}
            inputsNames={inputsNames}
            updateMessage={this.props.updateMessage}
          />
        );
      } else if (this.props.formStr === idString) {
        return (
          <PostForm
            key={idString}
            idString={idString}
            inputsNames={inputsNames}
            updateMessage={this.props.updateMessage}
          />
        );
      }
    });
    return <>{form}</>;
  }
}

export default CreateForms;
