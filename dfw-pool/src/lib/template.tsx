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
                    <div key='_s1_flexbox' className='section-flexbox'>

                    </div>
                </div>
            </div>
        );
    }

    public ourServices(): JSX.Element {
        return (
            <div key='_svs_1' className='list-main'></div>
        )
    }
    
}