import React from 'react';

export interface KV {
  [key: string]: string | number;
}
export interface KVTableProps {
  type: string;
  data: KV;
}

const KVTable = ({ type, data }: KVTableProps) => {
  const rows = Object.keys(data).map((key: string) => (
    <tr key={key} style={{ height: 40 }}>
      <td>{key}</td>
      <td>{/^#/.test(data[key].toString()) ? <ColorBlock value={data[key].toString()} /> : data[key]}</td>
      <td>{data[key]}</td>
    </tr>
  ));
  return (
    <div style={{ marginBottom: 30, textAlign: 'left' }}>
      <hr style={{ backgroundColor: '#DDD', border: 0, height: 1 }} />
      <table style={{ minWidth: 800 }}>
        <thead>
          <tr style={{ height: 40 }}>
            <th>JS</th>
            <th>Color</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody style={{ fontSize: 14 }}>{rows}</tbody>
      </table>
    </div>
  );
};

const ColorBlock = ({ value }: { value: string }) => (
  <span
    style={{
      display: 'inline-block',
      verticalAlign: 'middle',
      marginLeft: '10px',
      width: '60px',
      height: '20px',
      backgroundColor: value,
      borderRadius: '4px',
      boxShadow: '0 0 3px 1px #EEE',
    }}
  />
);

export default KVTable;
