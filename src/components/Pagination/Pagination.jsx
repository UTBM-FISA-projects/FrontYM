import React from 'react';

import { Pagination as BsPagination } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Pagination = ({ currentPage, lastPage, onPageChange }) => {
    const handlePageChange = React.useCallback(({ target }) => {
        if (onPageChange) {
            onPageChange(parseInt(target.getAttribute('to')));
        }
    }, [onPageChange]);

    return (
        <BsPagination className="d-flex justify-content-center">
            <BsPagination.Item to={1} onClick={handlePageChange}>«</BsPagination.Item>
            <BsPagination.Item to={currentPage - 1 <= 1 ? 1 : currentPage - 1} onClick={handlePageChange}>
                ‹
            </BsPagination.Item>

            {currentPage > 3 && (
                <>
                    <BsPagination.Item children={1} to={1} onClick={handlePageChange} />
                    <BsPagination.Ellipsis />
                </>
            )}

            {currentPage - 2 >= 1 && (
                <BsPagination.Item children={currentPage - 2} to={currentPage - 2} onClick={handlePageChange} />
            )}
            {currentPage - 1 >= 1 && (
                <BsPagination.Item children={currentPage - 1} to={currentPage - 1} onClick={handlePageChange} />
            )}
            <BsPagination.Item children={currentPage} active to={currentPage} onClick={handlePageChange} />
            {currentPage + 1 <= lastPage && (
                <BsPagination.Item children={currentPage + 1} to={currentPage + 1} onClick={handlePageChange} />
            )}
            {currentPage + 2 <= lastPage && (
                <BsPagination.Item children={currentPage + 2} to={currentPage + 2} onClick={handlePageChange} />
            )}

            {currentPage < lastPage - 2 && (
                <>
                    <BsPagination.Ellipsis />
                    <BsPagination.Item children={lastPage} to={lastPage} onClick={handlePageChange} />
                </>
            )}

            <BsPagination.Item
                to={currentPage + 1 >= lastPage ? lastPage : currentPage + 1}
                onClick={handlePageChange}
            >
                ›
            </BsPagination.Item>
            <BsPagination.Item to={lastPage} onClick={handlePageChange}>»</BsPagination.Item>
        </BsPagination>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number,
    lastPage: PropTypes.number,
    onPageChange: PropTypes.func,
};

Pagination.defaultProps = {
    currentPage: 1,
    lastPage: 1,
    onPageChange: null,
};

export default Pagination;
