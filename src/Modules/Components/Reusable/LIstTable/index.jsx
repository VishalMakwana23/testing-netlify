import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
// import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import search_icon from "../../../../assets/icons/search_icon.svg"; 
import Pagination from "../Paginations/Pagination";
// import axios from "axios";
import "./index.scss";
import { VscAdd } from "react-icons/vsc";
import { Button } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#F1F6FC",
  },
  ".Mui-active": {
    color: "#fff !important",
    ".MuiSvgIcon-root": {
      color: "#fff !important",
    },
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#ffffff",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#F1F6FC",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function ListTable(prop) {
  const {
    headCells,
    title,
    action,
    ListData,
    dropdown,
    btnshow,
    onBtnClick,
    prdAddAr,
    AddStudents,
    actionFirst,
    as,
  } = prop;
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState(as ? as : "EventName");

  function descendingComparator(a, b, orderBy) {
    if (orderBy === "no") {
      if (b[orderBy] < a[orderBy]) {
        return -1;
      }
      if (b[orderBy] > a[orderBy]) {
        return 1;
      }
    } else if (
      b[orderBy]?.toString()?.toLowerCase() <
      a[orderBy]?.toString()?.toLowerCase()
    ) {
      return -1;
    }
    if (
      b[orderBy]?.toString()?.toLowerCase() >
      a[orderBy]?.toString()?.toLowerCase()
    ) {
      return 1;
    }

    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  function stableSort(array, comparator) {
    const stabilizedThis = array?.map((el, index) => [el, index]);
    stabilizedThis?.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis?.map((el) => el[0]);
  }

  function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
          {actionFirst ? (
            <StyledTableCell align="center">
              <TableSortLabel>Actions</TableSortLabel>
            </StyledTableCell>
          ) : (
            ""
          )}
          {headCells?.map((headCell) => (
            <StyledTableCell
              key={headCell?.id}
              align="left"
              sortDirection={orderBy === headCell?.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell?.id}
                direction={orderBy === headCell?.id ? order : "asc"}
                onClick={createSortHandler(headCell?.id)}
              >
                {headCell.label}
                {orderBy === headCell?.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </StyledTableCell>
          ))}
          {actionFirst ? (
            ""
          ) : (
            <>
              {action ? (
                <StyledTableCell align="center">
                  <TableSortLabel>Actions</TableSortLabel>
                </StyledTableCell>
              ) : (
                ""
              )}
            </>
          )}
        </TableRow>
      </TableHead>
    );
  }

  EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [searchField, setSearchField] = useState("");
  const formattedSearchResults = ListData?.filter((user) => {
    if (searchField) {
      let state = false;
      headCells?.forEach((property) => {
        let value = String(user[property?.id]);
        if (typeof value === "string") {
          if (value?.toLowerCase()?.includes(searchField.toLowerCase())) {
            state = true;
          }
        }
      });
      return state;
    } else return user;
  });

  //   const token = useSelector((state) => state.login.LoginDetails.accessToken);
  //   const LogUserId = useSelector((state) => state.login.LoginDetails);
  //   const headers = {
  //     Authorization: `Bearer ${token}`,
  //     "Content-Type": "application/json",
  //     Accept: "*/*",
  //   };

  return (
    <>
      <div className="mb-4 d-flex justify-content-between listdata_control_sec">
        {dropdown ? (
          <select
            className="form-select w-25 me-auto"
            onChange={(e) => prop.Company(e.target.value)}
          >
            <option value="Company">Company</option>
            <option value="Individual">Individual</option>
          </select>
        ) : (
          <div className="title">{title}</div>
        )}
        <div className=" search_sec ms-auto">
          <div className="search_input w-100">
            <img src={search_icon} alt="" />
            <input
              onChange={(e) => {
                setSearchField(e.target.value);
                setCurrentPage(1);
              }}
              type="text"
              className="form-control"
              placeholder="Type your search here"
            />
          </div>
        </div>
        {btnshow && (
          <Button onClick={onBtnClick} className="detail_button">
            <VscAdd className="me-2" />
            Add
          </Button>
        )}
      </div>
      {formattedSearchResults?.length > 0 ? (
        <>
          {prop?.selectAllBtn ? (
            <>
              <Button
                className="detail_button"
                onClick={() =>
                  prop?.selectingAll(true, formattedSearchResults)
                }
              >
                Select All
              </Button>
              <Button
                className="ms-3 back_button"
                onClick={() =>
                  prop?.selectingAll(false, formattedSearchResults)
                }
              >
                Deselect All
              </Button>

              {prdAddAr?.length > 0 ? (
                <>
                  <Button className="ms-3 detail_button" onClick={AddStudents}>
                    Save
                  </Button>
                </>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}
      <div className="mt-3 all_list">
        <Paper className="table-box">
          <TableContainer className="">
            <Table>
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {stableSort(
                  formattedSearchResults,
                  getComparator(order, orderBy)
                )
                  ?.slice(
                    (currentPage - 1) * pageSize,
                    (currentPage - 1) * pageSize + pageSize
                  )
                  ?.map((row, index) => {
                    return (
                      <StyledTableRow className="table_body" key={index + 1}>
                        {actionFirst ? (
                          <StyledTableCell
                            className={`column_data`}
                            key={index + 1}
                          >
                            <div className="edit_delete justify-content-center">
                              {row?.Action}
                            </div>
                          </StyledTableCell>
                        ) : (
                          ""
                        )}
                        {headCells?.map((column) => {
                          const value = row[column?.id];
                          return (
                            <StyledTableCell
                              className="column_data"
                              key={column?.id}
                            >
                              {column?.format && typeof value === "number"
                                ? column?.format(value)
                                : value}
                            </StyledTableCell>
                          );
                        })}
                        {actionFirst ? (
                          ""
                        ) : (
                          <>
                            {action ? (
                              <StyledTableCell
                                className="column_data"
                                key={index + 1}
                              >
                                <div className="edit_delete">
                                  {row?.Action}
                                </div>
                              </StyledTableCell>
                            ) : (
                              ""
                            )}
                          </>
                        )}
                      </StyledTableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          {formattedSearchResults?.length === 0 ? (
            <div className="er_nodata">No Data Found</div>
          ) : (
            ""
          )}
          <div className="page_nation">
            <div className="rowsPerPageOptions">
              <span className="p_18_text">show</span>
              <select
                className="pagination_select p_16_text"
                value={pageSize}
                onChange={(e) => {
                  setPageSize(parseInt(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="500">500</option>
              </select>
              <span className="p_18_text">entries</span>
            </div>
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={formattedSearchResults?.length}
              pageSize={pageSize}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </Paper>
      </div>
    </>
  );
}
export default React.memo(ListTable);
