import React from 'react';

interface Props {
  idString: string | undefined;
  buttonText: string;
  changeDisplay: Function;
}
class ButtonChange extends React.Component<Props> {
  deleteOrUpdate = () => {
    this.props.changeDisplay(this.props.idString);
  };

  removeTable = () => {
    this.props.changeDisplay('');
  };

  render() {
    if (this.props.idString === 'remove-tables') {
      return (
        <button id={this.props.idString} onClick={this.removeTable}>
          {this.props.buttonText}
        </button>
      );
    }

    return (
      <button id={this.props.idString} onClick={this.deleteOrUpdate}>
        {this.props.buttonText}
      </button>
    );
  }
}

export default ButtonChange;
