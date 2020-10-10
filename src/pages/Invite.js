import React, { Component, } from "react";
import { connect } from 'react-redux'
import inviteUserAction from '../actionCreators/inviteUser'
import listInvitedUsers from '../actionCreators/showInvitedUsers'
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
    componentDidMount() {
        this.props.listInvited(this.props.cookies, this.props.match.params.game)
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
        } else if (message === 'Forbidden'){
            this.props.history.push('/games/')
        }
        else if (message === 'Inviting') {
            return (
                <div className="ui bottom attached message">
                    {message}
                </div>
            );
        }
        else if (message === 'User Invited') {
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
        var recentlyAdded = this.props.invitedPlayers
        if (recentlyAdded.length !== 0) {
            let list = []
            recentlyAdded.map((user, index) => {
                list.push(<div className='item' key={index}>{user}</div>)
            })
            let message = (
                <div className="ui info message">
                    <div className='header'>Invited Players</div>
                    <div className='ui ordered list'>
                        {list}
                    </div>
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
                        <Header as='h3' color='brown'>
                            Game Code {this.props.match.params.game}
                        </Header>
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
        message: state.invite.inviteMessage,
        invitedPlayers: state.invite.invitedPlayers
    }
}
export default withCookies(
    connect(
        mapStateToProps,
        { invite: inviteUserAction , listInvited: listInvitedUsers}
    )
        (InvitePage))