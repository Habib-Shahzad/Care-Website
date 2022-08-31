import React, { useEffect } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import { useParams } from 'react-router';
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import { FormControl, Input, InputLabel } from '@mui/material';
import {
  Link,
} from "react-router-dom";


const StyledToolBar = styled(Toolbar, {
})(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(1),
}));


function EnhancedTableToolbar(props) {
  const { model } = useParams();
  const { selected, modelName, editAllowed, deleteAllowed, addAllowed, actionOptions, startAction, setOriginalTableRows, setTableRows, deleteObjects } = props;
  const navigate = useNavigate();
  const numSelected = selected.length;

  let editID = '';
  if (selected.length === 1) editID = selected[0];

  function handleRouteChange() {
    navigate(`/admin/${model}/add`);
  }

  const [actionState, setActionState] = React.useState(actionOptions[0]);
  const [disabled, setDisabled] = React.useState(true);

  const handleActionStateChange = (event) => {
    const { value } = event.target;
    const selectedAction = actionOptions.find(obj => obj.value === value);
    setActionState(selectedAction);
  };

  useEffect(() => {
    if (actionState.value === '') setDisabled(true);
    else setDisabled(false);
  }, [actionState])

  return (
    <StyledToolBar >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography style={{ textTransform: 'capitalize' }} sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          {modelName}
        </Typography>
      )}

      {numSelected > 0 ? (
        <div style={{ display: 'flex' }}>
          {deleteAllowed === true ? (
            <Link onClick={(e) => {
              e.preventDefault();
              deleteObjects();
            }}
              to={""}
            >
              <Tooltip title="Delete">
                <IconButton aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Link>
          ) : null}
          {numSelected === 1 && editAllowed ? (
            <Link to={`/admin/${model}/edit/${editID}`}>
              <Tooltip title="Edit">
                <IconButton aria-label="edit">
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </Link>
          ) : null
          }
          {
            actionOptions.length !== 1 ? (
              <>
                <FormControl sx={{ marginRight: '1rem', width: '15rem' }}>
                  <InputLabel htmlFor="age-native-simple">Choose option</InputLabel>
                  <Select
                    native
                    value={actionState.value}
                    onChange={handleActionStateChange}
                  >
                    {actionOptions.map((value, index) => (
                      <option key={index} value={value.value}>{value.label}</option>
                    ))}

                  </Select>
                </FormControl>
                <Button disabled={disabled} variant="contained" onClick={e => { startAction(actionState, selected, setOriginalTableRows, setTableRows); }} color="primary">
                  Go
                </Button>
              </>
            ) : null
          }
        </div>
      ) : (
        <div style={{ display: 'flex' }}>
          <FormControl sx={{ marginRight: '1rem', width: '15rem' }}>
            <InputLabel color="secondary" htmlFor="search">Search</InputLabel>
            <Input
              color="secondary"
              autoComplete="none"
              value={props.searchState}
              type="text"
              id="search"
              name="search"
              onChange={props.searchTableRows}
              aria-describedby="search-helper"
            />
          </FormControl>
          {addAllowed === true ? (
            <Tooltip onClick={handleRouteChange} title="Add">
              <IconButton aria-label="Add button">
                <AddIcon />
              </IconButton>
            </Tooltip>
          ) : null}
        </div>
      )}
    </StyledToolBar>
  );
}

export default EnhancedTableToolbar;