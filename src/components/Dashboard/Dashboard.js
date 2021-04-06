import '../../styles/styles.scss';
import { Pagination } from '@material-ui/lab';
import { ThemeProvider } from '@material-ui/styles';
import React from "react";
import { NewsDashboard } from './NewsDashboard';
import { makeStyles } from "@material-ui/core/styles";
import ReactPaginate from 'react-paginate';

const useStyles = makeStyles(() => ({
    ul: {
        "& .MuiPaginationItem-root": {
            color: "white",

        }
    }
}));

export const Dashboard = () => {


    const classes = useStyles();
    return (
        <>

            <NewsDashboard />


        </>
    )
}

