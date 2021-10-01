// file to display overlay and render markers
import React from 'react';
import Select from 'react-select';

const markers = [
  { label: "Warehouse 1", value: 1 },
  { label: "Warehouse 2", value: 2 },
  { label: "Warehouse 3", value: 3 },
  { label: "Warehouse 4", value: 4 },
  { label: "Warehouse 5", value: 5 },
  { label: "Warehouse 6", value: 6 },
];

const Overlay = () => (
  <div className="container">
    <div className="row">
      <div className="col-md-4"></div>
      <div className="col-md-4">
        <Select options={ markers } />
      </div>
      <div className="col-md-4"></div>
    </div>
  </div>
);

export default React.memo(Overlay)