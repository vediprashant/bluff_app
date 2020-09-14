import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {
    Button,
    Form,
    Grid,
    Header,
    Image,
    Message,
    Segment,
} from "semantic-ui-react";

import deck from "../Images/deck.png";
import handleTokens from "../Utils/handleTokens";
import inviteUser from "../Utils/inviteUser";

import "../App.css";

export default class InvitePage extends Component {
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
        inviteUser(this.state.email, this.props.game).then(
            message => {
                if (message === 'Success') {
                    this.setState({
                        recentlyAdded: [...this.state.recentlyAdded, this.state.email],
                        message: 'User Invited'
                    })
                }
                else {
                    this.setState({ message: message })
                }
            }
        )
    };

    showMessage = () => {
        if (this.state.message === "") {
            return null;
        } else if (this.state.message === 'Inviting') {
            return (
                <div className="ui bottom attached message">
                    {this.state.message}
                </div>
            );
        }
        else if (this.state.message === 'User Invited'){
            return (
                <div className="ui bottom attached success message">
                    {this.state.message}
                </div>
            );
        }
        else {
            return (
                <div id='inviteWarn' className="ui bottom attached red warning message">
                    {this.state.message}
                </div>
            );
        }
    };

    showRecentlyAdded = () => {
        var recentlyAdded = this.state.recentlyAdded
        if (recentlyAdded.length !== 0) {
            let list = []
            recentlyAdded.map(user => {
                list.push(<li>{user}</li>)
            })
            let message = (
                <div class="ui info  message">
                    <p>Recently invited players</p>
                    <ol class='ui list'>
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
                                            "Login"
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
