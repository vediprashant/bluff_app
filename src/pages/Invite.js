import React, { Component, } from "react";
import { connect } from 'react-redux'
import inviteUserAction from '../actionCreators/inviteUser'
import {
    Button,
    Form,
    Grid,
    Header,
    Image,
    Message,
    Segment,
} from "semantic-ui-react";

import deck from "../assets/deck.png";

import "../App.css";
import { withCookies } from "react-cookie";
//import Logout from "../components/Logout";

class InvitePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            message: "",
            recentlyAdded: [],
        };
    }

    handleEmailChange = (event) => {
        this.setState({ email: event.target.value });
    };

    handleSubmit = async (event) => {
        this.setState({ message: 'Inviting' });
        event.preventDefault();
        this.props.invite(this.props.cookies, this.state.email, this.props.match.params.game)
    };

    showMessage = () => {
        let message = this.props.message
        if (message === "") {
            return null;
        } else if (message === 'Inviting') {
            return (
                <div className="ui bottom attached message">
                    {message}
                </div>
            );
        }
        else if (message === 'User Invited'){
            return (
                <div className="ui bottom attached success message">
                    {message}
                </div>
            );
        }
        else {
            return (
                <div id='inviteWarn' className="ui bottom attached red warning message">
                    {message}
                </div>
            );
        }
    };

    showRecentlyAdded = () => {
        var recentlyAdded = this.state.recentlyAdded
        if (recentlyAdded.length !== 0) {
            let list = []
            recentlyAdded.map((user, index) => {
                list.push(<li key={index}>{user}</li>)
            })
            let message = (
                <div className="ui info  message">
                    <p>Recently invited players</p>
                    <ol className='ui list'>
                        {list.map(li => li)}
                    </ol>
                </div>
            )
            return message
        } else return null
    }

    render() {
        return (
            <div className="login">
                <Grid textAlign="center">
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as="h2" color="grey" textAlign="center">
                            <Image src={deck} />
                            Invite your friends
                        </Header>
                        <Form size="large">
                            <Segment stacked>
                                <Form.Input
                                    fluid
                                    icon="mail"
                                    onChange={this.handleEmailChange}
                                    iconPosition="left"
                                    placeholder="Email"
                                />
                                <Button
                                    color="blue"
                                    fluid
                                    size="large"
                                    onClick={this.handleSubmit}
                                >
                                    {this.state.isLoading ? (
                                        <div className="ui active centered inline tiny inverted loader"></div>
                                    ) : (
                                            "Invite"
                                        )}
                                </Button>
                            </Segment>
                        </Form>
                        {this.showMessage()}
                        {this.showRecentlyAdded()}
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        message: state.inviteMessage
    }
}
export default withCookies(
    connect(
        mapStateToProps,
        { invite: inviteUserAction}
    )
(InvitePage))