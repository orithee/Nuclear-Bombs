import React from 'react';

interface Props {
  idString: string;
  buttonText: string;
  showForm: Function;
}
class ButtonNew extends React.Component<Props> {
  buttonClick = () => {
    this.props.showForm('new-' + this.props.idString);
  };
  render() {
    return (
      <button
        id={'open-new-' + this.props.idString + '-form'}
        onClick={this.buttonClick}
      >
        {this.props.buttonText}
      </button>
    );
  }
}

export default ButtonNew;
