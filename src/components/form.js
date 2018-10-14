import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as firebase from "firebase"
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';


const styles = {
    card: {
        width: "20%",
        textAlign: "center"
    },
    textField: {
        width: 200,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    cardPar: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    }
};

class Form extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            fatherName: '',
            contactNo: '',
            data: null
        }
    }

    componentDidMount() {
        const database = firebase.database();
        database.ref('/users/info').on("value", snapshot => {
            this.setState({
                data: snapshot.val()
            })
        })
    }
    submit = () => {
        const databaase = firebase.database();
        databaase.ref(`/users/info`).push({
            data: {
                name: this.state.name,
                fatherName: this.state.fatherName,
                contactNo: this.state.contactNo,
            }
        }).then(() => {
            document.getElementById("standard-name").value = ""
            document.getElementById("standard-name2").value = ""
            document.getElementById("standard-name3").value = ""
        })
    };
    render() {
        let data;
        if (this.state.data !== null) {
            data = Object.values(this.state.data);

        }
        const { classes } = this.props;
        const bull = <span className={classes.bullet}>•</span>;
        return (
            <div>
                <div className={classes.cardPar}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                <h1>User Information</h1>
                                <TextField
                                    id="standard-name"
                                    label="Name"
                                    className={classes.textField}
                                    margin="normal"
                                    onChange={e => this.setState({ name: e.target.value })}
                                />
                                <br />
                                <TextField
                                    id="standard-name2"
                                    label="Father Name"
                                    className={classes.textField}
                                    margin="normal"
                                    onChange={e => this.setState({ fatherName: e.target.value })}

                                />
                                <br />
                                <TextField
                                    id="standard-name3"
                                    label="Contact No"
                                    className={classes.textField}
                                    margin="normal"
                                    onChange={e => this.setState({ contactNo: e.target.value })}

                                />
                                <br />
                                <Button onClick={() => this.submit()}>Submit</Button>
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
                <br />
                <br />
                <div>
                    <table class="table">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">fatherName</th>
                                <th scope="col">ContactNo</th>
                            </tr>
                        </thead>
                        <tbody>{
                            this.state.data !== null ?
                                data.map((value, index) => {
                                    return (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{value.data.name}</td>
                                            <td>{value.data.fatherName}</td>
                                            <td>{value.data.contactNo}</td>
                                        </tr>
                                    )
                                }
                                ) : ""
                        }


                        </tbody>
                    </table>
                </div>
            </div>


        );
    }


}


Form.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Form);