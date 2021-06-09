import axios, { AxiosResponse } from 'axios';
import React from 'react';
import ReCAPTCHA from "react-google-recaptcha";

type Props = { disabled: boolean, };
type State = { name: string, email: string, phone: string, title: string, message: string, recaptcha: boolean, sending: boolean, verify: verify };
type rc_it = React.ChangeEvent<HTMLInputElement>;
type rc_ta = React.ChangeEvent<HTMLTextAreaElement>;
interface verify { [key: string]: boolean };
enum Form { name, email, phone, title, message, };

export default class Contact extends React.Component<Props, State> {
    emailRegex: RegExp;
    phoneRegex: RegExp;
    constructor(p: Props) {
        super(p);
        this.state = {
            name: '', email: '', phone: '', title: '', message: '', recaptcha: false, sending: false, verify: {}
        }
        // eslint-disable-next-line no-control-regex
        this.emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        this.phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    }

    // Reset the default - pretty obvious
    private resetValue(): void {
        this.setState({
            name: '', email: '', phone: '', title: '', message: '', recaptcha: false, sending: false
        });
    }

    private sendEmail(): void {
        // Useful variables
        const { name, email, phone, title, message, recaptcha, verify } = this.state;
        const JSON = require('../secrets.json');
        const salt = window.btoa(JSON.email_salt + Math.round(Date.now() / 10000));
        const url = JSON.domain_name + JSON.email_api;
        this.setState({ sending: true });

        // First, verify if all of the inputs are filled out
        let noError = true;
        if ((!name || !email || !phone || !title || !message) && noError) {
            verify.name = (this.state.name === '') ? false : true;
            verify.email = (this.state.email === '') ? false : true;
            verify.phone = (this.state.phone === '') ? false : true;
            verify.title = (this.state.title === '') ? false : true;
            verify.message = (this.state.message === '') ? false : true;
            this.setState({ verify });
            window.alert('One or more form are left blank! Please check for any red input box!'); noError = false;
        }
        if (!this.verifyEmail() && noError) {
            window.alert('Please enter a valid email!'); noError = false;
        }
        if (!this.verifyPhone() && noError) {
            window.alert('Please enter a valid phone number!'); noError = false;
        }
        if (!recaptcha && noError) {
            window.alert('Please verify reCaptcha that you are not a bot.'); noError = false; 
        }

        // Stop when error occurs
        this.setState({ sending: noError });
        if (!noError) { return; }

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
            if (response.data === 'success') {
                window.alert('Thank you for submitting your inquiry! We will get back to you as soon as possible!');
            } else {
                window.alert(`Seems like there is an issue sending the email. \r\n \r\n Resonse: ${response.data}`);
            }
            this.setState({ sending: false });
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

    // Use this to check if the form is blank or not
    private checkBlank(state: number) {
        const { verify } = this.state;
        switch (state) {
            case (Form.name): verify.name = (this.state.name === '') ? false : true; break;
            case (Form.email): verify.email = (this.state.email === '') ? false : true; break;
            case (Form.phone): verify.phone = (this.state.phone === '') ? false : true; break;
            case (Form.title): verify.title = (this.state.title === '') ? false : true; break;
            case (Form.message): verify.message = (this.state.message === '') ? false : true; break;
        }
        this.setState({ verify });
    }

    // Use this to verify whether if the email is valid or not
    private verifyEmail(): boolean {
        this.checkBlank(Form.email);
        const { verify, email } = this.state;
        if (!email.match(this.emailRegex) && verify?.email) {
            verify.email = false;
            this.setState({ verify });
            return false;
        }
        return true;
    }

    // Use this to verify whether if the phone number is valid or not
    private verifyPhone(): boolean {
        this.checkBlank(Form.phone);
        const { verify, phone } = this.state;
        if (!phone.match(this.phoneRegex) && verify?.phone) {
            verify.phone = false;
            this.setState({ verify });
            return false;
        }
        return true;
    }


    // All of the forms 
    private templateForms(): JSX.Element[] {
        const { name, email, phone, title, verify, sending } = this.state;
        // Prepare all of the forms as OBJ
        /** Property types
         * l: label text
         * n: name of the input
         * t: input type
         * e: see Enum Form
         * v: value
         * b: onBlur action
         * */ 
        const forms = [
            { l: 'Name', n: 'name', t: 'text', e: Form.name, v: name, b: () => { this.checkBlank(Form.name) } },
            { l: 'Email', n: 'email', t: 'email', e: Form.email, v: email, b: () => { this.verifyEmail() } },
            { l: 'Phone', n: 'phone', t: 'text', e: Form.phone, v: phone, b: () => { this.verifyPhone() } },
            { l: 'Subject', n: 'title', t: 'text', e: Form.title, v: title, b: () => { this.checkBlank(Form.title) } },
        ];

        // Map the array of OBJ for forms into JSX.Element[] 
        const inputs = forms.map((item, n) => {
            const className = (verify[item.n] || verify[item.n] === undefined) ? ' ' : 'error';
            return(
                <React.Fragment key={`_placeholder_form${n}`}>
                    <label>{item.l}</label>
                    <input
                        name={item.n} type={item.t} value={item.v} className={className} onBlur={item.b} disabled={sending}
                        onChange={(e: rc_it) => {
                            this.updateForm(item.e, e.target.value);
                            setTimeout(item.b, 100);
                        }}
                    ></input>
                </React.Fragment>
            );
        });

        return inputs;
    }

    // MAIN contact template
    private template(): JSX.Element {
        const { message, sending, verify } = this.state;
        const className = (verify.message || verify.message === undefined) ? ' ' : 'error';
        const JSON = require('../secrets.json');
        const textbox = (
            <React.Fragment key={`_placeholder_textarea`}>
                <label>Message</label>
                <textarea
                    name='message' rows={8} value={message} disabled={sending} className={className}
                    onBlur={() => { this.checkBlank(Form.message) }}
                    onChange={(e: rc_ta) => { 
                        this.updateForm(Form.message, e.target.value);
                        setTimeout(() => { this.checkBlank(Form.message) }, 100);
                    }}
                ></textarea>
            </React.Fragment>
        );
        const button = (
            <input type="button" value="Submit" onClick={() => {this.sendEmail()}} disabled={sending}></input>
        );
        /*const reset = (
            <input type="button" value="&#11119;" onClick={() => {
                // eslint-disable-next-line no-restricted-globals
                if (confirm("Confirm to clear everything in the contact form?")) { this.resetValue(); }
            }} disabled={sending}></input>
        );*/

        return (
            <div key='_c' className='section contact'>
                <div key='_cc' className='section-container'>
                    <h1 key='_ch' className='section-title'>Contact Us</h1>
                    <form key='_cf' className='contact-form'>
                        {this.templateForms()}{textbox}
                        <script src="https://www.google.com/recaptcha/api.js" async defer></script>
                        <div key='_cr' className='recaptcha'>
                            <ReCAPTCHA
                                sitekey={JSON.recaptcha}
                                onChange={() => { this.setState({ recaptcha: true }); }}
                            />
                        </div>
                        {button}
                    </form>
                </div>
            </div>
        );
    }


    public render() {
        return this.template();
    }

    
}