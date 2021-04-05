import React from 'react';
import Template from './template';

type Props = {
};
type State = {
};

export default class MainPage extends React.Component<Props, State> {
    t: Template = new Template(1);
    constructor(p: Props) {
        super(p);
        this.state = {};
    }

    public render() {
        let head = this.t.header();
        return (head);
    }
}