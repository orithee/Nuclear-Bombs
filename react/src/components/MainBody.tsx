import React from 'react';
import ButtonTable from './ButtonTable';
import ButtonNew from './ButtonNew';
import ButtonChange from './ButtonChange';
import Table from './Table';

// TODO: Change the create table to JSX code... with react.
interface Props {
  formDisplay: Function;
  tableOpenFunc: Function;
  tableOpen: string;
}
class MainBody extends React.Component<Props> {
  updateFormDisplay = (str: string) => {
    this.props.formDisplay(str);
  };
  render() {
    return (
      <div id="global-div">
        <h1>- Nuclear Bombs Web -</h1>
        <div id="head-buttons">
          <div className="get-tables-buttons">
            <ButtonTable
              tableOpen={this.props.tableOpenFunc}
              idString="officers"
              buttonText="Show Officers"
            />
            <ButtonTable
              tableOpen={this.props.tableOpenFunc}
              idString="bombs"
              buttonText="Show Bombs"
            />
            <ButtonTable
              tableOpen={this.props.tableOpenFunc}
              idString="locations"
              buttonText="Show Locations"
            />
            <ButtonTable
              tableOpen={this.props.tableOpenFunc}
              idString="locations_history"
              buttonText="Show Locations_history"
            />
          </div>
          <div className="new-buttons">
            <ButtonNew
              showForm={this.updateFormDisplay}
              idString="officer"
              buttonText="New Officer"
            />
            <ButtonNew
              showForm={this.updateFormDisplay}
              idString="bomb"
              buttonText="New Bomb"
            />
            <ButtonNew
              showForm={this.updateFormDisplay}
              idString="location"
              buttonText="New Location"
            />
            <ButtonNew
              showForm={this.updateFormDisplay}
              idString="locations_history"
              buttonText="New Locations_history"
            />
          </div>
          <div>
            <ButtonChange
              changeDisplay={this.updateFormDisplay}
              idString="update"
              buttonText="Update Tables"
            />
            <ButtonChange
              changeDisplay={this.updateFormDisplay}
              idString="delete"
              buttonText="Delete Rows"
            />
            <ButtonChange
              changeDisplay={this.props.tableOpenFunc}
              idString="remove-tables"
              buttonText="Close Table"
            />
            <ButtonChange
              changeDisplay={this.updateFormDisplay}
              idString={undefined}
              buttonText="Close Form"
            />
          </div>
          <div id="table-container">
            {this.props.tableOpen != '' && (
              <Table tableOpen={this.props.tableOpen} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default MainBody;
