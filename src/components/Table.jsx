'use client';

const Table = ({ columns = [], children }) => (
  <div className="overflow-x-auto">
    <table className="custom-table">
      <thead>
        <tr className="custom-thead-tr">
          {columns.map((col, idx) => (
            <th key={idx} className="custom-thead">{col}</th>
          ))}
        </tr>
      </thead>
      <tbody className="custom-tbody">{children}</tbody>
    </table>
  </div>
);
export default Table;
