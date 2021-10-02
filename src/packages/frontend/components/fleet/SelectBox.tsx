import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { LabelImportantOutlined } from '@material-ui/icons';
import { useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import { randomInt } from 'crypto';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};





export type SelectBoxProps = {
  label: String;
  searchValue?: string;
  search: (val: string) => Promise<{name: string, value: string}[]>;
  set: (val?: {name: string, value: string}) => any;
}


export default function SelectBox(props: SelectBoxProps) {
  const {label, search, searchValue, set} = props


  const theme = useTheme();
  const [currentValue, setCurrentValue] = useState<{name: string, value: string} | undefined >(undefined);
  const [items, setItems] = useState<{name: string, value: string}[] | undefined>(undefined)

  const getItems = () => {
    if (searchValue) {
      search(searchValue).then(setItems)
    }
  }
  React.useEffect(() => {
    setCurrentValue(undefined)
    setItems(undefined)
    set(undefined)
    getItems()
  }, [searchValue])

  const handleChange = (event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event;
    const newVal = items?.find(v=>v.value === value)
    setCurrentValue(newVal);
    set(newVal)
  };
  return (
    <div>
      <FormControl fullWidth sx={{ my: 1 }}>
        <InputLabel>{label}</InputLabel>
        <Select
          disabled={!searchValue}
          labelId={label.valueOf()}
          value={currentValue?.value}
          onChange={handleChange}
          input={<OutlinedInput label={label} />}
          MenuProps={MenuProps}
        >
          {items !== undefined ? items.map((item) => (
            <MenuItem
              key={item.value}
              value={item.value}
            >
              {item.name}
            </MenuItem>
          )) : <CircularProgress />}
        </Select>
      </FormControl>
    </div>
  );
}