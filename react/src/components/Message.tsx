import React from 'react';

interface Props {
  text: string;
  closeMessage: Function;
}
class Message extends React.Component<Props> {
  closeMessage = () => {
    this.props.closeMessage('');
  };

  render() {
    return (
      <div id="error-message">
        <h3>Error:</h3>
        <p>{this.props.text}</p>
        <button onClick={this.closeMessage}>Close</button>
      </div>
    );
  }
}

export default Message;
