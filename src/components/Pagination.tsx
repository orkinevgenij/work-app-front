import ReactPaginate from 'react-paginate'
import { setCurrentPage } from '../store/features/pagination/paginationSlice'
import { useAppDispatch } from '../store/hooks'
import { FC } from 'react'
type Props = {
  totalPages: number
}
export const Pagination: FC<Props> = ({ totalPages }) => {
  const dispatch = useAppDispatch()
  const handlePageClick = (data: { selected: number }) => {
    dispatch(setCurrentPage(data.selected + 1))
  }
  return (
    <ReactPaginate
      previousLabel={'<'}
      nextLabel={'>'}
      breakLabel={'...'}
      marginPagesDisplayed={2}
      pageRangeDisplayed={4}
      pageCount={totalPages}
      onPageChange={handlePageClick}
      containerClassName="pagination"
      activeClassName="active-item"
      pageLinkClassName="page-link"
      previousLinkClassName="page-link"
      nextLinkClassName="page-link"
    />
  )
}
