import React from 'react';
import Template from './template';
import '../resources/main.css';
import '../resources/mobile.css';

type Props = {
};
type State = {
    scroll: number;
};

export default class MainPage extends React.Component<Props, State> {
    private t: Template = new Template(1);
    constructor(p: Props) {
        super(p);
        this.state = {
            scroll: 0,
        };
    }

    public componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
        this.setState({ scroll: window.pageYOffset });
    }
    
    public componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll)
    }

    private handleScroll = () => {
        this.setState({ scroll: window.pageYOffset })
    }

    public render() {
        let content = (<React.Fragment key='_content'>
            {this.t.headerSocial()}
            {this.t.header(this.state.scroll)}
            {this.t.wavyBorder(this.state.scroll)}
            {this.t.section1()}
            {this.t.contactSection()}
            {this.t.footer()}
        </React.Fragment>);
        return (content);
    }
}