import React, { useEffect, useRef, useState } from 'react';
import LoadingMode from './LoadingMode';

interface Props {
  tableOpen: string;
}

function Table(props: Props) {
  const tableHeader = React.useRef<HTMLTableCellElement>(null);
  const [data, setData] = useState<Array<Object>>([{ loading: LoadingMode() }]);
  const ref: React.MutableRefObject<string> = useRef('');

  useEffect(() => {
    (async function () {
      setData(await getTableData(props.tableOpen));
    })();
  }, []);

  useEffect(() => {
    ref.current = props.tableOpen;
    const loading = async () => setData([{ loading: LoadingMode() }]);
    const updateData = async () => setData(await getTableData(props.tableOpen));
    loading();
    updateData();
  }, [props.tableOpen]);

  useEffect(() => {
    tableHeader.current?.setAttribute(
      'colspan',
      Object.keys(data[0]).length.toString()
    );
  }, [data]);

  const getTableData = async (tableName: string) => {
    // Function that get the table data from the dataBase:
    let headers = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'Get',
    };
    const emptyTable = [
      {
        officer_id: '-',
        name: '-',
        army_identity_number: '-',
        email: '-',
        phone_number: '-',
      },
    ];
    try {
      let res = await (await fetch(`/get-table/${tableName}`, headers)).json();
      if (res.length === 0) return emptyTable;
      else return await res;
    } catch (error) {
      return emptyTable;
    }
  };

  return (
    <table style={{ border: '1px solid black' }}>
      <tbody>
        <tr key={'h1'}>
          <td
            ref={tableHeader}
            style={{
              height: '40px',
              border: '2px solid black',
            }}
          >
            <h1>{props.tableOpen + ' Table'}</h1>
          </td>
        </tr>
        {
          <tr key={'title'}>
            {Object.entries(data[0]).map(([key, value], index) => {
              return (
                <td
                  key={key}
                  style={{
                    userSelect: 'text',
                    width: '120px',
                    height: '50px',
                    border: '2px solid black',
                  }}
                >
                  {key}
                </td>
              );
            })}
          </tr>
        }
        {data.map((row, index) => {
          return (
            <tr key={index}>
              {Object.entries(row).map(([key, value], index) => {
                return (
                  <td
                    key={index}
                    style={{
                      width: 'auto',
                      height: '50px',
                      border: '1px solid black',
                    }}
                  >
                    {value}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
