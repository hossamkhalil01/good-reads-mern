import { useEffect, useState } from "react";
import Footer from "../components/layouts/Footer";
import Navbar from "../components/layouts/Navbar";
import Paginator from "../components/Paginator";
import ShelfTable from "../components/ShelfTable";
import { getUserShelf } from "../services/userBooksService";
import {
    createPaginationParams,
    parsePaginatedResponse
} from "../utils/pagination";

const BooksPage = () => {

    const [filter, setFilter] = useState('');
    const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
    const [books, setBooks] = useState([]);

    const handlePageChange = async (newPage) => {
        // construct the params
        const params = createPaginationParams(
            { status: filter },
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


    useEffect(() => {
        handlePageChange();
    }, []);


    return (
        <div>
            <Navbar />
            <div className="mt-5 container main-content">

                <ShelfTable shelf={books} />
                <div className="row justify-content-end">
                    <div className="w-auto">
                        <Paginator
                            paginationInfo={pagination}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
};

export default BooksPage;
