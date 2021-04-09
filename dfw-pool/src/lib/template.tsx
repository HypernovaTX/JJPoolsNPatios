export default class Template {
    test: number;
    key: number;

    constructor(cTest: number) {
        this.test = cTest;
        this.key = 0;
    }

    misc_key(): number {
        return this.key ++;
    }

    header(): JSX.Element {
        return (
            <div key='_h' className='section head'>
                <div key='_hc' className='section-container'>
                    <div key='_hcc' className='section-content'>
                        <div key='_hcc_t' className='section-t head'>JJ Pools n Patios</div>
                        <div key='_hcc_p' className='section-p head'>About us goes here....lorem ipsum.....etc....etc..</div>
                        <input key='_hcc_b' type='button' className='section-b head' value='Reach out to us today!'/>
                    </div>
                </div>
            </div>
        )
    }

    wavyBorder(): JSX.Element {
        return (
            <div key='_s1_wave' className='wavy-border'></div>
            
            
        ); //Div is a placeholder

        /*
            <svg key={`${this.misc_key()}`} className='wavy-border'>
                <clipPath id="wave" clipPathUnits="objectBoundingBox">
                    <path className="st0" d="M1,0c0,0-0.3,0.1-0.5,0.1S0.3,0,0,0.1V1h1L1,0z"/>
                </clipPath>
            </svg>
        */
    }

    section1(): JSX.Element {
        return (
            <div key='_s1' className='section'>
                <div key='_s1c' className='section-container'>
                </div>
            </div>
        );
    }
    
}