import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYelp } from '@fortawesome/free-brands-svg-icons';
import Contact from './contact';
import Wave from 'react-wavify';

export default class Template {
    test: number;
    key: number;
    phone: string;

    constructor(cTest: number) {
        this.test = cTest;
        this.key = 0;
        this.phone = '214-469-9009';
    }

    private phoneNumber= () => { document.location.href = `tel:${this.phone}`; };

    public misc_key(): number {
        return this.key ++;
    }

    public header(y: number): JSX.Element {
        const title = `JJ Pools & Patios`;
        const summary = `Established in 2010. Over 10 years of experience JJ Pools & Patios provides a reliable and trustworthy service for your pool. Cleaning and remodelling is what we do best for you to spend your time in a crystal-clear pool.`;
        const sectionStyle = { backgroundPosition: `0px ${y/3}px`, }
        return (
            <div key='_h' className='section head' style={sectionStyle}>
                <div key='_hc' className='section-container'>
                    <div key='_hcl' className='section-logo'></div>
                    <div key='_hcc' className='section-content'>
                        <div key='_hcc_t' className='section-t head'>{title}</div>
                        <div key='_hcc_p' className='section-p head'>{summary}</div>
                        <input key='_hcc_b' type='button' className='section-b head' value='Reach out to us today!'/>
                    </div>
                </div>
            </div>
        )
    }

    public headerSocial(): JSX.Element {
        const yelp = 'https://www.yelp.com/biz/jj-pools-and-patios-coppell-3';
        return (
            <div key='_social' className='social-bar'>
                <div key='_social_p' className='phone-box'>
                    <input key='_social_pb' type='button' className='section-b' value={`PHONE: ${this.phone}`} onClick={this.phoneNumber}/>
                </div>
                <div key='_social_y' className='social-box'>
                    <a href={yelp} key='_social_yb' className='social-b' target='_blank' rel="noreferrer">
                        <FontAwesomeIcon icon={faYelp}/>
                    </a>
                </div>
            </div>
        )
    }

    public wavyBorder(y: number): JSX.Element {
        // calculate how the wavy border is positioned
        // Note: 23 is the lowest point of the wave (manually calculated)
        const rawY = (y / 4) + 23;
        // Calculate the limit so the border doesn't go too far
        // Note: 180 is the height of the div
        const upperY = Math.min(180 - 23, rawY); 
        const style = {
            marginTop: `${-upperY}px`,
            backgroundPosition: `${y / 2}px 0px`,
        };
        return (
            <div key='_s1_wave' className='wavy-border' style={style}></div>
        );
    }

    public section1(): JSX.Element {
        return (
            <div key='_s1' className='section'>
                <div key='_s1c' className='section-container s1'>
                    <h1 key='_s1h' className='section-title'>Our Services</h1>
                    {this.ourServices()}
                </div>
            </div>
        );
    }

    public ourServices(): JSX.Element {
        // List of services
        const services = [
            {
                title: 'Silver Package',
                list: ['Brushing', 'Emptying the baskets', 'Chemical balancing'],
                price: 120,
            },
            {
                title: 'Chemical Package',
                list: ['Chemicals only'],
                price: 85,
            },
            {
                title: 'Full Service',
                list: ['Brushing', 'Vacuuming', 'Filter cleaning', 'Emptying the baskets', 'Chemical balancing'],
                price: 150,
            },
            {
                title: 'Green to Clean',
                list: ['Brushing', 'Draining the pool', 'Acid washing', 'Chemical balancing'],
                price: 650,
            },
        ];
        
        // Map out the list
        const output = services.map((s, i) => { return (
            <div key={`_sv_list${i}`} className='service-list'>
                <div key={`_sv_li${i}_t`} className='service-list-item'>{s.title}</div>
                { s.list.map((ss, ii) => { return <div key={`_sv_li${i}_${ii}`} className='service-list-item'>{ss}</div> }) }
                <div key={`_sv_li${i}_sp`} className='service-list-item spacer'></div>
                <div key={`_sv_li${i}_p`} className='service-list-item'>Starting at ${s.price}</div>
            </div>
        )});

        return (
            <div key='_sv_flexbox' className='section-flexbox'>
                {output}
            </div>
        )
    }

    public contactSection(): JSX.Element {
        return(
            <Contact disabled={false}/>
        );
    }

    public footer(): JSX.Element {
        const copyright = ' 2010 - 2021, JJ Industries';
        const author = 'Website designed and programmed by Arthur (Hypernova) Guo';
        return(
            <div key='_ft' className='section footer'>
                <Wave
                    fill='var(--accent-color)' paused={false}
                    options={{ height: 180, amplitude: 23, speed: 0.15, points: 6 }}
                />
                <Wave
                    fill='var(--accent-color)' paused={false}
                    options={{ height: 180, amplitude: 24, speed: 0.2, points: 8 }}
                />
                <Wave
                    fill='var(--accent-color)' paused={false}
                    options={{ height: 180, amplitude: 25, speed: 0.25, points: 10 }}
                />
                <div key='_ftc' className='section-container'>
                    <span key='_f_text1' className='footer-text'>Copyright &#169;{copyright}</span>
                    <span key='_f_text2' className='footer-text'>{author}</span>
                </div>
            </div>
        );
    }

    /**
     * Unused SVG
     * <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#0099ff" fill-opacity="1" d="M0,160L60,170.7C120,181,240,203,360,202.7C480,203,600,181,720,170.7C840,160,960,160,1080,154.7C1200,149,1320,139,1380,133.3L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                </svg>
     */
    
}