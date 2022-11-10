import React from 'react';

interface Props {
  idString: string;
  buttonText: string;
  tableOpen: Function;
}

class ButtonTable extends React.Component<Props> {
  buttonClick = () => {
    console.log('get-table-' + this.props.idString);
    this.props.tableOpen(this.props.idString);
  };
  render() {
    return (
      <button
        id={'get-table-' + this.props.idString}
        onClick={this.buttonClick}
      >
        {this.props.buttonText}
      </button>
    );
  }
}

export function getDivElement(id: string): HTMLDivElement {
  return document.getElementById(id) as HTMLDivElement;
}

export default ButtonTable;
