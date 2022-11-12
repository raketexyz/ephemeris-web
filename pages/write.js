import React from 'react';
import { withRouter } from 'next/router';
import { Link } from 'next/link';

import { Loading, Error } from '/components/form';
import PostForm from '/components/postform';
import { post } from '/components/api';

class Write extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post: null,
            error: null,
            showForm: true,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ showForm: false });
        post(
            this.state.post,
            this.props.session.token,
        )
            .then(post => this.props.router.push(`/post/${post.id}`))
            .catch(error => {
                this.setState({ error, showForm: true });
            });
    }

    async componentDidMount() {
        if (this.props.session === null) this.props.router.push("/login");
    }

    render() {
        return <div>
            {!this.state.showForm && !this.state.error && <Loading />}
            <Error error={this.state.error} />
            {this.state.showForm && (
                <PostForm setPost={post => this.setState({post})} cta="publish"
                    handleSubmit={this.handleSubmit} post={this.state.post} />
            )}
        </div>;
    }
}

export default withRouter(Write);
