import React from 'react';

import { Form, Input, TextArea, Button } from '/components/form';

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
            <Input label="title">
                <TextArea name="title" onChange={this.handleInputChange}
                    value={this.state.title} minLength={1} maxLength={100}
                    required />
            </Input>
            <span className="self-end text-sm font-mono">
                {this.state.title.length}/100 B
            </span>
            <Input label="subtitle">
                <TextArea name="subtitle" onChange={this.handleInputChange}
                    value={this.state.subtitle} maxLength={140} />
            </Input>
            <span className="self-end text-sm font-mono">
                {this.state.subtitle.length}/140 B
            </span>
            <Input label={<>
                body (markdown and <span className="underline decoration-dotted"
                title="e.g. $E = mc^2$"><span className="font-mono">\LaTeX
                </span> math environments</span> work here)
            </>}>
                <TextArea name="body" onChange={this.handleInputChange}
                    value={this.state.body} />
            </Input>
            <span className="self-end text-sm font-mono">
                {this.state.body.length} B
            </span>
            <Button type="submit">{this.props.cta}</Button>
        </Form>;
    }
}
