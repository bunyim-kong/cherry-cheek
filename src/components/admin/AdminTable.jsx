import "./AdminTable.css";

export default function AdminTable({
  caption,
  columns,
  emptyMessage = "No records found.",
  getRowKey,
  minWidth = "620px",
  rows,
}) {
  if (rows.length === 0) {
    return <div className="admin-table__empty">{emptyMessage}</div>;
  }

  return (
    <div className="admin-table-scroll">
      <table className="admin-table" style={{ "--admin-table-min-width": minWidth }}>
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} scope="col" data-align={column.align}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={getRowKey(row)}>
              {columns.map((column) => (
                <td key={column.key} data-align={column.align}>
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
