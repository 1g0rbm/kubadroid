import React from "react";
import {useDispatch} from "react-redux";

export const Pagination = ({limit, total, currentPage, loader}) => {

  const dispatch = useDispatch()

  const pages = Math.ceil(total / limit)

  const paginationGenerate = (begin, end, acc = []) => {
    if (begin >= end) {
      return [...acc, begin]
    }

    return paginationGenerate(begin + 1, end, [...acc, begin])
  }

  const paginationHandler = (event, pageNum) => {
    event.preventDefault()
    dispatch(loader()(pageNum))
  }

  const canLeft = () => currentPage - 1 > 0;
  const pageLeftHandler = (event) => {
    event.preventDefault()

    if (!canLeft()) {
      return
    }

    dispatch(loader()(currentPage - 1))
  }

  const canRight = () => currentPage + 1 <= pages;
  const pageRightHandler = (event) => {
    event.preventDefault()

    if (!canRight()) {
      return
    }

    dispatch(loader()(currentPage + 1))
  }

  const createPortions = () => {
    const sequencePages = paginationGenerate(1, pages)

    if (currentPage < 5 && pages <= 5) {
      return [...sequencePages.slice(0, 7)]
    }

    if (currentPage < 5) {
      return [...sequencePages.slice(0, 7), '...', pages]
    }

    if (currentPage === 5 && pages <= 5) {
      return [1, '...', ...sequencePages.slice(2, 7)]
    }

    if (currentPage === 5) {
      return [1, '...', ...sequencePages.slice(2, 7), '...', pages]
    }

    if (currentPage === pages - 4) {
      return [1, '...', ...sequencePages.slice(pages - 7, pages - 2,), '...', pages]
    }

    if (currentPage > pages - 4) {
      return [1, '...', ...sequencePages.slice(pages - 6, pages)]
    }

    return [1, '...', ...sequencePages.slice(currentPage - 3, currentPage + 2), '...', pages]
  }

  return (
    <ul className="pagination">
      <li className={canLeft() ? 'waves-effect' : 'disabled'}>
        <a href="#"
           onClick={event => pageLeftHandler(event)}
        >
          <i className="material-icons">chevron_left</i>
        </a>
      </li>
      {
        createPortions().map(num => {
          if (num === '...') {
            return <li className="disabled"><a>{num}</a></li>
          }

          return (
            <li
              onClick={event => paginationHandler(event, num)}
              className={num === currentPage ? 'active' : 'waves-effect'}
            >
              <a href="#">{num}</a>
            </li>
          )
        })
      }
      <li className={canRight() ? 'waves-effect' : 'disabled'}>
        <a href="#"
           onClick={event => pageRightHandler(event)}
        >
          <i className="material-icons">chevron_right</i>
        </a>
      </li>
    </ul>
  )
}
