import React from 'react';

import { Form, Input, Text, TextArea, Button } from '/components/form';

export default class PostForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: (props.post ?? {}).title ?? "",
            subtitle: (props.post ?? {}).subtitle ?? "",
            body: (props.post ?? {}).body ?? "",
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        this.setState(state => {
            const post = {
                ...state,
                [event.target.name]: event.target.value,
            };

            this.props.setPost(post);
            return post;
        });
        this.props.setPost(post => ({
            ...post,
            [event.target.name]: event.target.value,
        }));
    }

    render() {
        return <Form onSubmit={this.props.handleSubmit}>
            <Input label="title:">
                <Text name="title" onChange={this.handleInputChange}
                    value={this.state.title} minLength={1} maxLength={100}
                    required />
            </Input>
            <Input label="subtitle:">
                <Text name="subtitle" onChange={this.handleInputChange}
                    value={this.state.subtitle} maxLength={140} />
            </Input>
            <div>
                You can use markdown and <span className="font-mono">\LaTeX
                </span> math environments like <span className="font-mono">
                $E = mc^2$</span> here.
            </div>
            <Input>
                <TextArea name="body" onChange={this.handleInputChange}
                    value={this.state.body} />
            </Input>
            <Button type="submit">{this.props.cta}</Button>
        </Form>;
    }
}
