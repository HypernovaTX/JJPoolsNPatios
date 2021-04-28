import React from 'react';

type Props = {
    disabled: boolean,
};
type State = {
    name: string, email: string, phone: string, title: string, message: string, recaptcha: boolean,
};
enum Form {
    name, email, phone, title, message
};

type rc_it = React.ChangeEvent<HTMLInputElement>;
type rc_ta = React.ChangeEvent<HTMLTextAreaElement>;

export default class Contact extends React.Component<Props, State> {
    constructor(p: Props) {
        super(p);
        this.state = {
            name: '', email: '', phone: '', title: '', message: '', recaptcha: false,
        }
    }

    private resetValue(): void {
        this.setState({
            name: '', email: '', phone: '', title: '', message: '', recaptcha: false,
        });
    }

    private updateForm(state: number, value: string): void {
        switch (state) {
            case (Form.name): this.setState({ name: value }); break;
            case (Form.email): this.setState({ email: value }); break;
            case (Form.phone): this.setState({ phone: value }); break;
            case (Form.title): this.setState({ title: value }); break;
            case (Form.message): this.setState({ message: value }); break;
        }
    }

    private template(): JSX.Element {
        const { name, email, phone, title, message } = this.state;
        // Prepare all of the forums and then map it out to elements
        /** Property types
         * l: label text
         * n: name of the input
         * t: input type
         * e: see Enum Form
         * v: value
         * */ 
        const forms = [
            { l: 'Name', n: 'name', t: 'text', e: Form.name, v: name },
            { l: 'Email', n: 'email', t: 'email', e: Form.email, v: email },
            { l: 'Phone', n: 'phone', t: 'text', e: Form.phone, v: phone },
            { l: 'Subject', n: 'title', t: 'text', e: Form.title, v: title },
        ];
        const inputs = forms.map((item, n) => {
            return(
                <React.Fragment key={`_placeholder_form${n}`}>
                    <label>{item.l}</label>
                    <input
                        name={item.n}
                        type={item.t}
                        value={item.v}
                        onChange={(e: rc_it) => { this.updateForm(item.e, e.target.value) }}
                    ></input>
                </React.Fragment>
            );
        });

        const textbox = (
            <React.Fragment key={`_placeholder_textarea`}>
                <label>Message</label>
                <textarea
                    name='message'
                    rows={8}
                    value={message}
                    onChange={(e: rc_ta) => { this.updateForm(Form.message, e.target.value) }}
                ></textarea>
            </React.Fragment>
        );

        return (
            <div key='_c' className='section contact'>
                <div key='_cc' className='section-container'>
                    <h1 key='_ch' className='section-title'>Contact Us</h1>
                    <form key='_cf' className='contact-form'>
                        {inputs}{textbox}
                        <input type="submit" value="Submit"></input>
                    </form>
                </div>
            </div>
        );
    }


    public render() {
        return this.template();
    }

    
}