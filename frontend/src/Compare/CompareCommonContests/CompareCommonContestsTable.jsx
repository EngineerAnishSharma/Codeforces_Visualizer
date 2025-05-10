import { useState } from 'react';
import {
    Link,
    Paper,
    TableContainer,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TablePagination,
    TableCell,
    Tooltip
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';

const useStyles = makeStyles({
    tableHead1: {
        backgroundColor: '#3e84d4',
        color: 'white',
        fontSize: '1.1rem',
    },
    tableHead2: {
        backgroundColor: '#c1e8f7',
        fontWeight: 'bold',
    },
    row: {
        transition: 'background-color 0.3s ease',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
        },
    },
    winner: {
        fontWeight: 'bold',
        color: '#2e7d32', // green
    },
    loser: {
        color: '#c62828', // red
    },
    draw: {
        fontWeight: 'bold',
        color: '#ff9800', // yellow
    },
    container: {
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
});

const contest_url = 'https://codeforces.com/contest/';

const CompareCommonContestsTable = ({ userContests1, userContests2, username1, username2 }) => {
    const classes = useStyles();

    let contest1 = new Map();
    for (let i = 0; i < userContests1.length; i++) {
        contest1.set(userContests1[i].contestId, userContests1[i]);
    }

    let rows = [];
    for (let i = 0; i < userContests2.length; i++) {
        if (!contest1.has(userContests2[i].contestId)) {
            continue;
        }

        const c1 = contest1.get(userContests2[i].contestId).rank;
        const c2 = userContests2[i].rank;

        rows.push({
            name: userContests2[i].contestName,
            url: `${contest_url}/${userContests2[i].contestId}`,
            rank1: c1,
            rank2: c2,
            diff: c1 - c2,
        });
    }

    rows = rows.reverse();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div className={classes.container}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                className={classes.tableHead1}
                                align="center"
                                colSpan={4}
                            >
                                <strong>Common Contests Comparison</strong>
                            </TableCell>
                        </TableRow>
                        <TableRow className={classes.tableHead2}>
                            <TableCell>Contest</TableCell>
                            <TableCell align="right">{username1}</TableCell>
                            <TableCell align="right">{username2}</TableCell>
                            <TableCell align="right">Difference</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                const isDraw = row.diff === 0;
                                const user1Won = row.diff > 0;
                                const user2Won = row.diff < 0;

                                return (
                                    <TableRow
                                        key={row.name}
                                        className={classes.row}
                                        style={
                                            isDraw
                                                ? { backgroundColor: 'rgba(255, 206, 86, 0.2)' }
                                                : user1Won
                                                ? { backgroundColor: 'rgba(28, 109, 208, 0.2)' }
                                                : { backgroundColor: 'rgba(255, 99, 132, 0.2)' }
                                        }
                                    >
                                        <TableCell component="th" scope="row">
                                            <Link
                                                href={row.url}
                                                underline="hover"
                                                target="_blank"
                                                style={{ fontWeight: 'bold' }}
                                            >
                                                {row.name}
                                            </Link>
                                        </TableCell>

                                        <TableCell
                                            align="right"
                                            className={
                                                isDraw
                                                    ? classes.draw
                                                    : user1Won
                                                    ? classes.loser
                                                    : classes.winner
                                            }
                                        >
                                            {row.rank1}
                                            {user2Won && (
                                                <Tooltip title={`${username1} performed better`}>
                                                    <EmojiEventsIcon
                                                        style={{ color: '#2e7d32', fontSize: 18, marginLeft: 6 }}
                                                    />
                                                </Tooltip>
                                            )}
                                        </TableCell>

                                        <TableCell
                                            align="right"
                                            className={
                                                isDraw
                                                    ? classes.draw
                                                    : user2Won
                                                    ? classes.loser
                                                    : classes.winner
                                            }
                                        >
                                            {row.rank2}
                                            {user1Won && (
                                                <Tooltip title={`${username2} performed better`}>
                                                    <EmojiEventsIcon
                                                        style={{ color: '#2e7d32', fontSize: 18, marginLeft: 6 }}
                                                    />
                                                </Tooltip>
                                            )}
                                        </TableCell>

                                        <TableCell align="right">
                                            {Math.abs(row.diff)}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
};

export default CompareCommonContestsTable;
