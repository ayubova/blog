import {FC} from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.css";

interface Props {
  total: number;
  handlePageClick(event: any): void;
  itemsPerPage: number;
}

const Pagination: FC<Props> = ({
  total = 100,
  itemsPerPage = 10,
  handlePageClick,
}): JSX.Element => {
  const pageCount = Math.ceil(total / itemsPerPage);

  return (
    <div className="my-5">
      <ReactPaginate
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="<"
        pageClassName={styles.pageItem}
        previousClassName={styles.pageItem}
        nextClassName={styles.pageItem}
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName={styles.pageItem}
        containerClassName={styles.pagination}
        activeClassName={styles.active}
        disabledClassName={styles.disabled}
        renderOnZeroPageCount={() => null}
      />
    </div>
  );
};

export default Pagination;
