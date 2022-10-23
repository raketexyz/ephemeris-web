import React from 'react';
import { withRouter } from 'next/router';

import { Form, Input, Text, Button, Loading, Error } from '/components/form';
import { register } from '/components/api';

class SignUp extends React.Component {
    constructor({ router }) {
        super();
        this.state = {
            username: "",
            password: "",
            verifyPassword: "",
            error: null,
            showForm: true,
            router,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (window.localStorage.getItem("token"))
            this.state.router.push("/");
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    async handleSubmit(event) {
        event.preventDefault();
        if (this.state.password !== this.state.verifyPassword) {
            this.setState({ error: "Passwords don't match!" });
            return;
        }
        this.setState({ showForm: false });
        register(this.state.username, this.state.password)
            .then(async res => {
                if (!res.ok) return Promise.reject(await res.text())
            })
            .then(() => {
                this.state.router.push("/login");
            })
            .catch(error => {
                this.setState({ error, showForm: true });
            });
    }

    render() {
        return <>
            <div className="mx-auto max-w-fit font-bold text-neutral-200
                text-3xl">
                sign up
            </div>
            {this.state.showForm && this.form()}
            {!(this.state.showForm || this.state.error) && <Loading />}
        </>
    }

    form() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Error error={this.state.error} />
                <Input label="username:">
                    <Text name="username" onChange={this.handleInputChange}
                        value={this.state.username} autoComplete="username"
                        minLength={3} maxLength={20} required />
                </Input>
                <Input label="password:">
                    <Text name="password" onChange={this.handleInputChange}
                        value={this.state.password} autoComplete="password"
                        minLength={6} type="password" required />
                </Input>
                <Input label="verify password:">
                    <Text name="verifyPassword" onChange={this.handleInputChange}
                        value={this.state.verifyPassword} autoComplete="password"
                        type="password" required />
                </Input>
                <Button type="submit">
                    sign up
                </Button>
            </Form>
        );
    }
}

export default withRouter(SignUp);
