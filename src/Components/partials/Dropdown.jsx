import React from 'react';

const Dropdown = ({ title, options, func, value }) => {
  return (
    <div className="select text-red-600">
      <select value={value} onChange={func} name="format">
        <option value="0" disabled>
          {title}
        </option>
        {options.map((o, index) => (
          <option key={index} value={o}>
            {o.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
