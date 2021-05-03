import axios, { AxiosResponse } from 'axios';
import React from 'react';

type Props = { disabled: boolean, };
type State = { name: string, email: string, phone: string, title: string, message: string, recaptcha: boolean, sending: boolean };
type rc_it = React.ChangeEvent<HTMLInputElement>;
type rc_ta = React.ChangeEvent<HTMLTextAreaElement>;
enum Form { name, email, phone, title, message, };

export default class Contact extends React.Component<Props, State> {
    constructor(p: Props) {
        super(p);
        this.state = {
            name: '', email: '', phone: '', title: '', message: '', recaptcha: false, sending: false
        }
    }

    // Reset the default - pretty obvious
    private resetValue(): void {
        this.setState({
            name: '', email: '', phone: '', title: '', message: '', recaptcha: false, sending: false
        });
    }

    private sendEmail(): void {
        // Useful variables
        const { name, email, phone, title, message } = this.state;
        const JSON = require('../secrets.json');
        const salt = window.btoa(JSON.email_salt + Math.round(Date.now() / 10000));
        const url = JSON.domain_name + JSON.email_api;

        // Prepare the POST data
        const postData = new FormData();
        postData.append('name', name);
        postData.append('email', email);
        postData.append('phone', phone);
        postData.append('title', title);
        postData.append('message', message);
        postData.append('secret', salt);
        const header = {
            headers: { 'Content-Type': 'application/x-www-form-urlencode', },
            proxy: { host: 'localhost', port: 3000, }
        };

        axios.post(url, postData, header).then((response: AxiosResponse<string>) => {
            console.log(response.data);
        });

    }

    // Used to format inputs that can be formatted as phone number (used for phone number forms)
    private formatPhoneText(value: string): string {
        value = value.replace(/[^0-9\b]/g, '').substring(0, 10);
        
        if (value.length > 3 && value.length <= 6) {
            value = value.slice(0,3) + "-" + value.slice(3);
        } else if (value.length > 6) {
            value = value.slice(0,3) + "-" + value.slice(3,6) + "-" + value.slice(6);
        }
        return value;
    }

    // Use this for updating the texts in forms, remember to check the Enum "Form"
    private updateForm(state: number, value: string): void {
        switch (state) {
            case (Form.name): this.setState({ name: value }); break;
            case (Form.email): this.setState({ email: value }); break;
            case (Form.phone): this.setState({ phone: this.formatPhoneText(value) }); break;
            case (Form.title): this.setState({ title: value }); break;
            case (Form.message): this.setState({ message: value }); break;
        }
    }


    // All of the forms 
    private templateForms(): JSX.Element[] {
        const { name, email, phone, title } = this.state;
        // Prepare all of the forms as OBJ
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

        // Map the array of OBJ for forms into JSX.Element[]
        const inputs = forms.map((item, n) => {
            return(
                <React.Fragment key={`_placeholder_form${n}`}>
                    <label>{item.l}</label>
                    <input name={item.n} type={item.t} value={item.v} onChange={(e: rc_it) => { this.updateForm(item.e, e.target.value) }}></input>
                </React.Fragment>
            );
        });

        return inputs;
    }

    // MAIN contact template
    private template(): JSX.Element {
        const { message } = this.state;
        const textbox = (
            <React.Fragment key={`_placeholder_textarea`}>
                <label>Message</label>
                <textarea name='message' rows={8} value={message} onChange={(e: rc_ta) => { this.updateForm(Form.message, e.target.value) }}></textarea>
            </React.Fragment>
        );
        const button = (
            <input type="button" value="Submit" onClick={() => {this.sendEmail()}}></input>
        );

        return (
            <div key='_c' className='section contact'>
                <div key='_cc' className='section-container'>
                    <h1 key='_ch' className='section-title'>Contact Us</h1>
                    <form key='_cf' className='contact-form'>
                        {this.templateForms()}{textbox}{button}
                    </form>
                </div>
            </div>
        );
    }


    public render() {
        return this.template();
    }

    
}