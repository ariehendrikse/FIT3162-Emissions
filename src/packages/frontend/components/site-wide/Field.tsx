import { Box, TextFieldProps, Typography, TextField } from "@material-ui/core";

export default function Field(props: TextFieldProps & {setValue: (val: string) => any}) {
  const {label, value, setValue, type, required} = props
  
  
  return (
        <Box>
          <Typography variant='caption'>
            {label}<br/>
          </Typography>
          < TextField 
            inputProps={props.inputProps}
            fullWidth
            type = { type ? type : "text"}
            value = {value}
            variant = {'outlined'}
            onChange = {e => setValue(e.target.value)}
            required = {required }
          />
        </Box>
        
  );
}