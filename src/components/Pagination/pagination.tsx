import classnames from 'classnames';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import s from './pagination.module.scss';

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const renderPages = () => {
    return Array.from({ length: totalPages }).map((_, idx) => {
      const pageNumber = idx + 1;
      const isCurrentPage = pageNumber === currentPage;

      return (
        <button
          key={pageNumber}
          aria-checked={isCurrentPage.valueOf()}
          className={classnames(s.pagination__button, {
            [s['pagination__button--active']]: isCurrentPage,
          })}
          onClick={() => handlePageClick(pageNumber)}
        >
          {pageNumber}
        </button>
      );
    });
  };

  return (
    <div className={s.pagination}>
      {currentPage > 1 && (
        <button
          aria-checked='true'
          className={s.pagination__prev}
          onClick={() => handlePageClick(currentPage - 1)}
        >
          <ArrowLeft color='grey' />
        </button>
      )}

      {renderPages()}

      {currentPage < totalPages && (
        <button
          aria-checked='true'
          className={s.pagination__next}
          onClick={() => handlePageClick(currentPage + 1)}
        >
          <ArrowRight color='grey' />
        </button>
      )}
    </div>
  );
};

export default Pagination;
