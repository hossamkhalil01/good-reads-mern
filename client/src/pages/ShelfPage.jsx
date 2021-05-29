import { useEffect, useState } from "react";
import Footer from "../components/layouts/Footer";
import Navbar from "../components/layouts/Navbar";
import Paginator from "../components/Paginator";
import ShelfTable from "../components/ShelfTable";
import { bookStatus, getUserShelf } from "../services/userBooksService";
import {
    createPaginationParams,
    parsePaginatedResponse
} from "../utils/pagination";
import { capitalize } from "../utils/utils";


const BooksPage = () => {

    const [filter, setFilter] = useState('all');
    const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
    const [books, setBooks] = useState([]);

    const handlePageChange = async (newPage = 1, filterObj = {}) => {

        // construct the params
        const params = createPaginationParams(
            filterObj,
            { ...pagination, page: newPage, limit: 5 }
        );

        // get the new page from api
        const { data, paginationInfo } = parsePaginatedResponse(
            await getUserShelf(params)
        );

        // set the values
        setPagination(paginationInfo);
        setBooks(data);
    };

    const handleFilterChange = async (newFilter) => {
        if (filter === newFilter) return;

        // set the new filter
        setFilter(newFilter);

        let filterObj = {};
        if (newFilter !== 'all') filterObj.status = newFilter;

        // request new page
        return handlePageChange(1, filterObj);
    }

    useEffect(() => {
        handlePageChange();
    }, []);


    return (
        <div>
            <Navbar />
            <div className="row mt-5 container-fluid justify-content-center main-content">
                <aside className="col-2 h-100">
                    <ul className="list-group">
                        {['all', ...Object.values(bookStatus)].map(status => (
                            <li key={status}
                                className={filter === status ? 'list-group-item active-selection' : 'list-group-item'}
                                onClick={() =>
                                    handleFilterChange(status)
                                }
                            >
                                {capitalize(status)}
                            </li>
                        ))}
                    </ul>
                </aside>
                <div className="col-8">
                    <ShelfTable shelf={books} />
                    <div className="row justify-content-end">
                        <div className="w-auto mt-4">
                            <Paginator
                                paginationInfo={pagination}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default BooksPage;
