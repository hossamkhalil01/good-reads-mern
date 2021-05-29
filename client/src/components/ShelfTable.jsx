import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { hostUrl } from "../api/urls";
import AvgRating from "../components/AvgRate";
import UserBookStatus from "../components/UserBookStatus";
import UserRating from "../components/UserRate";
import { capitalize } from "../utils/utils";
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


const ShelfTable = ({ shelf }) => {

    const checkEmptyTable = () => {
        if (shelf.length) return

        return (
            <TableRow>
                <TableCell colSpan={6} align="center">

                    <h4 className="alert alert-info text-center">
                        No avaliable books yet!
                    </h4>
                </TableCell>
            </TableRow>
        )
    }

    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Cover</TableCell>
                        <TableCell align="center">Title</TableCell>
                        <TableCell align="center">Author</TableCell>
                        <TableCell align="center">Avg Rate</TableCell>
                        <TableCell align="center">My Rating</TableCell>
                        <TableCell align="center">Status</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>

                    {checkEmptyTable()}

                    {shelf.map(({ book }) => (
                        <TableRow key={book._id} >
                            <TableCell align="center" component="th" scope="row">
                                <img src={`${hostUrl}${book.coverImage}`} alt="" />
                            </TableCell>
                            <TableCell align="center">
                                {capitalize(book.title)}
                            </TableCell>
                            <TableCell align="center">
                                {capitalize(book.authors[0].firstName) + ' ' + capitalize(book.authors[0].lastName)}
                            </TableCell>
                            <TableCell align="center">
                                <AvgRating bookId={book._id} />
                            </TableCell>
                            <TableCell align="center">
                                <UserRating bookId={book._id} />
                            </TableCell>
                            <TableCell align="center">
                                <UserBookStatus bookId={book._id}
                                    onStatusChange={() => { }} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    );
};

export default ShelfTable;
