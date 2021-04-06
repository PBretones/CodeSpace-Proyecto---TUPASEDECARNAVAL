import "../../styles/styles.scss";
import React from "react";
import { Button, Card, Paper, Typography, CardContent, CardActions } from '@material-ui/core';



export const CategoriesElements = ({ image, title }) => {

    return (
        <div className="authorCard">
            <p >{title}</p>
            <img src={image} alt="" />
        </div>
    )
}
