import Pagination from '@material-ui/lab/Pagination';
import React, { useState } from 'react';



const Paginator = ({ totalPages, onPageChange }) => {

    const [currentPage, setCurrentPage] = useState(1)

    const handleChangePage = (event, newPage) => {
        // set the new page value
        setCurrentPage(newPage);

        // emit event to parent with the new page
        onPageChange(newPage);
    }

    return (
        <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handleChangePage}
            color="primary"
        />
    );
};

export default Paginator;
