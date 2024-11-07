import React from "react";
import classnames from "classnames";
import { usePagination, DOTS } from "./usePagination";
import "./pagination.scss";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";
const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });
  let lastPage =
    paginationRange !== undefined
      ? paginationRange[paginationRange?.length - 1]
      : "";
  const onNext = () => {
    onPageChange(currentPage + 1);
  };
  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };
  if (currentPage === 0 || paginationRange?.length < 2) {
    return (
      <ul
        className={classnames("pagination-container", {
          [className]: className,
        })}
      >
        <li
          className={classnames("pagination-item left", {
            disabled: currentPage === 1,
          })}
          onClick={onPrevious}
        >
          <VscChevronLeft className="icon" />
        </li>
        {paginationRange?.map((pageNumber, i) => {
          if (pageNumber === DOTS) {
            return (
              <li className="pagination-item dots" key={i}>
                &#8230;
              </li>
            );
          }
          return (
            <li
              className={classnames("pagination-item", {
                selected: pageNumber === currentPage,
              })}
              onClick={() => onPageChange(pageNumber)}
              key={i}
            >
              {pageNumber}
            </li>
          );
        })}
        <li
          className={classnames("pagination-item right", {
            disabled: currentPage === lastPage,
          })}
          onClick={onNext}
        >
          <VscChevronRight className="icon" />
        </li>
      </ul>
    );
  }
  return (
    <ul
      className={classnames("pagination-container", { [className]: className })}
    >
      <li
        className={classnames("pagination-item left", {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <VscChevronLeft className="icon" />
      </li>
      {paginationRange?.map((pageNumber, i) => {
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>;
        }
        return (
          <li
            className={classnames("pagination-item", {
              selected: pageNumber === currentPage,
            })}
            onClick={() => onPageChange(pageNumber)}
            key={i}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={classnames("pagination-item right", {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <VscChevronRight className="icon" />
      </li>
    </ul>
  );
};

export default Pagination;
