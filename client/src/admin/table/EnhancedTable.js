import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { userObj, activityObj, blogObj, imageObj, departmentObj, outreachBlogObj } from '../../db';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import {
  useLocation,
} from "react-router-dom";
import { EnhancedTableHead, EnhancedTableToolbar, DeleteConfirmModal } from '../components'
import { useParams } from 'react-router';

import LinearProgress from '@mui/material/LinearProgress';
import './EnhancedTable.scss';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

EnhancedTableToolbar.propTypes = {
  selected: PropTypes.array.isRequired,
};

const AlertStyled = styled(Alert)(({ theme }) => ({
  width: '100%',
  '& > * + *': {
    marginTop: theme.spacing(2),
  },
  marginBottom: 15
}));

const PaperStyled = styled(Paper)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(2)
}));


export default function EnhancedTable(props) {
  const { model } = useParams();

  const location = useLocation();
  let tableFetch = {};

  if (model === 'user') tableFetch = userObj;
  else if (model === 'activity') tableFetch = activityObj;
  else if (model === 'blog') tableFetch = blogObj;
  else if (model === 'image') tableFetch = imageObj;
  else if (model === 'department') tableFetch = departmentObj;
  else if (model === 'outreachBlog') tableFetch = outreachBlogObj;
  else tableFetch = {};

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState(tableFetch['ordering']);
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [originalTableRows, setOriginalTableRows] = React.useState([]);
  const [tableRows, setTableRows] = React.useState([]);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertText, setAlertText] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  const [searchState, setSearchState] = React.useState('');

  useEffect(() => {
    try {
      if (location.state.content.data === 'success') {
        if (location.state.length === 1) {
          setAlertText('1 element has been deleted.');
        } else {
          setAlertText(`${location.state.length} elements have been deleted.`);
        }
        setAlertOpen(true);
        setTimeout(() => {
          setAlertOpen(false);
        }, 5000);
      }
    } catch (error) {

    }
  }, [location]);

  const apiURL = tableFetch.apiTable;
  const createTableData = tableFetch.createTableData;

  useEffect(() => {
    (
      async () => {
        setTableRows([]);
        setOriginalTableRows([]);
        setLoading(true);
        setSelected([]);
        setPage(0);
        const rows = [];
        const response = await fetch(apiURL, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          withCredentials: true
        });
        const content = await response.json();

        content.data.forEach(element => {
          rows.push(createTableData(element));
        });
        setTimeout(() => {
          setTableRows(rows);
          setOriginalTableRows(rows);
          setLoading(false);
        }, 1000)
      })();
  }, [apiURL, createTableData]);



  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = tableRows.map((n) => n[tableFetch['checkboxSelection']]);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const searchTableRows = event => {
    const { value } = event.target;
    setSearchState(value);
    const rows = originalTableRows.filter(obj => obj[`${tableFetch.searchField}`].toLowerCase().trim().includes(value.toLowerCase().trim()));
    setTableRows(rows);
  }

  const handleClick = (event, value) => {
    const selectedIndex = selected.indexOf(value);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, value);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (value) => selected.indexOf(value) !== -1;

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const [deleteLoading, setDeleteLoading] = React.useState(false);



  if (Object.keys(tableFetch).length === 0) {
    return <div>No data</div>;
  }

  const deleteAction = async (selected, setTableRows, setOriginalTableRows) => {
    let rows = [];
    const del_api = tableFetch.deleteApi;

    const response = await fetch(del_api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      withCredentials: true,
      body: JSON.stringify({ data: selected })
    });
    const content = await response.json();
    content.data.forEach(element => {
      rows.push(tableFetch.createTableData(element));
    });
    setTableRows(rows);
    setOriginalTableRows(rows);
  }

  const deleteObjects = async () => {
    setDeleteLoading(true);
    await deleteAction(selected, setTableRows, setOriginalTableRows);
    setDeleteLoading(false);
    handleCloseModal();
    setSelected([]);
  }

  return (
    <div id='data' className="table-admin">
      <DeleteConfirmModal
        loading={deleteLoading}
        open={openModal}
        handleClose={handleCloseModal}
        yesButtonPressed={deleteObjects}
      />

      {loading ? (
        <LinearProgress color="secondary" />
      ) : null}

      <Collapse in={alertOpen}>
        <AlertStyled
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setAlertOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {alertText}
        </AlertStyled>
      </Collapse>

      <PaperStyled>
        <EnhancedTableToolbar
          modelName={tableFetch.modelName}
          searchTableRows={searchTableRows}
          searchState={searchState}
          editAllowed={tableFetch.editAllowed}
          deleteAllowed={tableFetch.deleteAllowed}
          addAllowed={tableFetch.addAllowed}
          setOriginalTableRows={setOriginalTableRows}
          setTableRows={setTableRows}
          startAction={tableFetch.startAction}
          actionOptions={tableFetch.actionOptions}
          selected={selected}
          deleteObjects={handleOpenModal}
        />
        <TableContainer>
          <Table
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={tableRows.length}
              headCells={tableFetch.headCells}
              tableType={tableFetch.type}
            />
            <TableBody>
              {stableSort(tableRows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row[tableFetch['checkboxSelection']]);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  const tableRow = [];

                  let c = 0;

                  for (const key in row) {

                    let textPosition = '';

                    if (tableFetch.rightAllign.includes(key)) textPosition = 'right';

                    else if (key === '_id') {
                      tableRow.push(
                        <TableCell style={{ display: 'none' }} key={c}>{row[key]}</TableCell>
                      );
                    }

                    else if (key === 'name') {
                      tableRow.push(
                        <TableCell key={c} component="th" id={labelId} scope="row" padding="none">
                          {row[key]}
                        </TableCell>
                      );
                    }

                    else if (key === 'image') {
                      tableRow.push(
                        <TableCell key={c} component="th" id={labelId} scope="row" padding="none">
                          <img className={'img'} src={row[key].filePath} alt="Preview"></img>
                        </TableCell>
                      );
                    }

                    else if (key === 'hexCode') {
                      tableRow.push(
                        <TableCell key={c} component="th" id={labelId} scope="row" padding="none">
                          <div style={{ backgroundColor: row[key] }} className="circle-db"></div>
                        </TableCell>
                      );
                    }

                    else if (row[key] === false || row[key] === '') {
                      tableRow.push(
                        <TableCell key={c}><CloseIcon sx={{ color: 'red' }} color="secondary" /></TableCell>
                      );
                    }

                    else if (row[key] === true) {
                      tableRow.push(
                        <TableCell key={c}><CheckIcon sx={{ color: 'green' }} color="primary" /></TableCell>
                      );
                    }


                    else {
                      tableRow.push(
                        <TableCell style={{ textAlign: textPosition }} key={c}>{row[key]}</TableCell>
                      );
                    }

                    c += 1;

                  }

                  return (
                    <React.Fragment
                      key={row[tableFetch['checkboxSelection']]}
                    >
                      {
                        tableFetch.type !== 'collapse' ? (

                          <TableRow
                            hover
                            onClick={(event) => handleClick(event, row[tableFetch['checkboxSelection']])}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            selected={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isItemSelected}
                                inputProps={{ 'aria-labelledby': labelId }}
                              />
                            </TableCell>

                            {tableRow}
                          </TableRow>)
                          : (
                            <>

                            </>
                          )
                      }

                    </React.Fragment>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={tableRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </PaperStyled>
    </div>
  );
}