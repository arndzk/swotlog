import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';

const styles = {
    card: {
        display: 'flex',
        marginBottom: 20
    },
    avatar: {
        minWidth: 200,
    },
    content: {
        marginTop: 10,
        padding: 25,
        objectFit: 'cover'
    }
}

const Post = props => {

    dayjs.extend(relativeTime);

    const { classes, post : { id, body, timestamp, likeCount, commentCount, userImage, username }} = props;

    return (
        <Card className = {classes.card}>
            <CardMedia className = {classes.avatar} title = "Profile Avatar" image = {personImage}/>
            <CardContent className = {classes.content}>
                <Typography 
                    variant = "h5"
                    color = "primary" 
                    component = {Link} href = {`/users/${username}`}
                >{username}</Typography>
                <Typography variant = "body2" color = "textSecondary">{dayjs(timestamp)}</Typography>
                <Typography variant = "body1">{body}</Typography>
            </CardContent>
        </Card>
    );
};

export default withStyles(styles)(Post);