import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <PaginationItem key={i} active={i === currentPage}>
        <PaginationLink href="#" onClick={() => onPageChange(i)}>{i}</PaginationLink>
      </PaginationItem>
    )
  }

  return (
    <Pagination aria-label='Page navigation'>
      <PaginationItem disabled={currentPage <= 1}>
        <PaginationLink first href='#' onClick={() => onPageChange(1)} />
      </PaginationItem>
      <PaginationItem disabled={currentPage <= 1}>
        <PaginationLink
          previous
          href='#'
          onClick={() => onPageChange(currentPage - 1)}
        />
      </PaginationItem>
      {pages}
      <PaginationItem disabled={currentPage >= totalPages}>
        <PaginationLink next href='#' onClick={() => onPageChange(currentPage + 1)} />
      </PaginationItem>
      <PaginationItem disabled={currentPage >= totalPages}>
        <PaginationLink last href='#' onClick={() => onPageChange(totalPages)} />
      </PaginationItem>
    </Pagination>

  )
}

export default PaginationComponent;