export default class Template {
    test: number;
    key: number;

    constructor(cTest: number) {
        this.test = cTest;
        this.key = 0;
    }

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
                    <div key='_hcc' className='section-content'>
                        <div key='_hcc_t' className='section-t head'>{title}</div>
                        <div key='_hcc_p' className='section-p head'>{summary}</div>
                        <input key='_hcc_b' type='button' className='section-b head' value='Reach out to us today!'/>
                    </div>
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
                <div key='_s1c' className='section-container'>
                    <h1 key='_s1h' className='section-title'>Our Services</h1>
                    {this.ourServices()}
                </div>
            </div>
        );
    }

    public ourServices(): JSX.Element {
        let outputServices: JSX.Element[] = [];
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

        // Convert the list of services from JSON to list elements
        services.forEach((part, index) => {
            let listItem: JSX.Element[] = [];
            // Save all of the list of services for each of the section
            part.list.forEach((item) => { listItem.push(<ul>{item}</ul>); })
            // Save all of the sections of services.
            outputServices.push(
                <ul key={`_sv_list${index}`} className='service-list'> 
                    <ul>{part.title}</ul>
                    {listItem}
                    <ul>Starting at ${part.price}</ul> 
                </ul>
            );
        });

        return (
            <div key='_sv_flexbox' className='section-flexbox'>
                {outputServices}
            </div>
        )
        /* OLD

        <ul key='_sv_1L' className='service-list'>
                    <li>Silver Package</li>
                    <li>Brushing</li>
                    <li>Emprushing</li>
                    <li>brushing</li>
                </ul>

        */
    }
    
}