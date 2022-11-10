import React from 'react';
import Message from './components/Message';
import CreateForms from './components/CreateForms';
import Header from './components/Header';
import MainBody from './components/MainBody';
import './style/utilities/utilities.scss';
import style from './App.module.scss';

export interface State {
  message: string;
  showForm: string;
  tableOpen: string;
}

class App extends React.Component<{}, State> {
  state = {
    message: '',
    showForm: '',
    tableOpen: '',
  };

  updateTheDisplayedForm = (str: string) => {
    if (this.state.showForm === str) this.setState({ showForm: '' });
    else this.setState({ showForm: str });
  };

  updateTheDisplayedTable = (str: string) => {
    if (this.state.tableOpen === str) this.setState({ tableOpen: '' });
    else this.setState({ tableOpen: str });
  };

  updateMessageText = (str: string) => {
    this.setState({ message: str });
  };

  render() {
    return (
      <div className={style}>
        <Header />
        <MainBody
          tableOpenFunc={this.updateTheDisplayedTable}
          formDisplay={this.updateTheDisplayedForm}
          tableOpen={this.state.tableOpen}
        />
        {this.state.showForm != '' && (
          <CreateForms
            formStr={this.state.showForm}
            updateMessage={this.updateMessageText}
          />
        )}
        {this.state.message != '' && (
          <Message
            closeMessage={this.updateMessageText}
            text={this.state.message}
          />
        )}
      </div>
    );
  }
}

export default App;
