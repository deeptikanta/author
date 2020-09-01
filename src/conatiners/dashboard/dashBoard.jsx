/* eslint-disable no-unused-expressions */
import React from 'react';
import { connect } from 'react-redux';
import { fetchAuthorList, fetchArticleDetails } from './dashboard.action';
import { Button, Grid, withStyles } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import styles from './dashboard.style';

class DashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchedMovieName: '',
            searchedAuthor: false
        }
        this.searchForAuthor = this.searchForAuthor.bind(this);
    };



    changeInput(event) {
        this.setState({ searchedMovieName: event.target.value.trim() });
    }
    searchForAuthor() {
        const { apiKey } = this.props;
        const { searchedMovieName } = this.state;
        if (searchedMovieName) {
            this.setState({ searchedAuthor: false });
            this.props.fetchAuthorList(searchedMovieName);
        }
    }

    articleDetails(authorobject) {
        this.setState({ searchedAuthor: true });
        this.props.fetchArticleDetails(authorobject);
    }
    render() {
        const { classes, allBooks, articleDetails } = this.props;
        const { searchedAuthor } = this.state;
        return (
            <Grid container justify={'center'} >
                <Grid item xs={12}>
                    <Grid container justify={'center'}>
                        <Grid item xs={11} sm={8} md={6}>
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    &nbsp;
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    id="search-input"
                                    onBlur={this.changeInput.bind(this)}
                                    placeholder="Search for author Name"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </div>
                        </Grid>

                        <Grid item xs={10} sm={3} md={2}>
                            <Button variant="contained" color="secondary" onClick={this.searchForAuthor}>
                                Search
      </Button>
                        </Grid>
                    </Grid>
                    <br />
                    {searchedAuthor ? <CardHeader
                        title={articleDetails.content}
                        subheader={articleDetails.id}
                    /> : <Grid container >
                            {allBooks.length > 0 && allBooks.map((author, index) => {
                                return (<Grid item xs={11} sm={6} md={4} className={classes.paddingForCard} key={author.articleId}>
                                    <Card className={classes.root} onClick={this.articleDetails.bind(this, author)}>
                                        <CardHeader
                                            title={author.title}
                                            subheader={author.date}
                                        />
                                    </Card>
                                </Grid>
                                )
                            })}

                        </Grid>}
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = ({
    DashBoardReducer
}) => ({
    allBooks: DashBoardReducer.allBooks,
    articleDetails: DashBoardReducer.articleDetails
});
export default connect(mapStateToProps, { fetchAuthorList, fetchArticleDetails })(withStyles(styles)(DashBoard));