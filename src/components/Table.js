import React from 'react';
import shortId from 'shortid';

import './Table.css';

const Table = ({ headers, rows, placeholder }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          {headers.map(({ title, onClickSort }, i) => {
            return (
              <th key={shortId.generate()} className={`column-${i}`}>
                {title}
                {onClickSort && (
                  <>
                    <button className="sort-btn" onClick={() => onClickSort(false)}>
                      {/* in prod i'd use an icon instead of unicode here */}
                      ∧
                    </button>
                    <button
                      className="sort-btn"
                      onClick={() => onClickSort(true)}
                    >
                      ∨
                    </button>
                  </>
                )}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {!rows.length ? (
          <tr><td>{placeholder}</td></tr>
        ) : (
          rows.map(columns => (
            <tr key={shortId.generate()}>
              {columns.map((col, i) => (
                <td key={shortId.generate()} className="pivoted">
                  <div className="tdBefore">{headers[i].title}</div>
                  {col}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default Table;
