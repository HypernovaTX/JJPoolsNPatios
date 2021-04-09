import React from 'react';
import Template from './template';
import '../resources/main.css';

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
        let content = (<React.Fragment key='_content'>
            {this.t.header()}
            {this.t.wavyBorder()}
            {this.t.section1()}
        </React.Fragment>);
        return (content);
    }
}