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
                <path fill="#FFF" d="M0,96L15,128C30,160,60,224,90,224C120,224,150,160,180,128C210,96,240,96,270,128C300,160,330,224,360,229.3C390,235,420,181,450,181.3C480,181,510,235,540,250.7C570,267,600,245,630,218.7C660,192,690,160,720,149.3C750,139,780,149,810,165.3C840,181,870,203,900,218.7C930,235,960,245,990,245.3C1020,245,1050,235,1080,245.3C1110,256,1140,288,1170,298.7C1200,309,1230,299,1260,250.7C1290,203,1320,117,1350,117.3C1380,117,1410,203,1425,245.3L1440,288L1440,320L1425,320C1410,320,1380,320,1350,320C1320,320,1290,320,1260,320C1230,320,1200,320,1170,320C1140,320,1110,320,1080,320C1050,320,1020,320,990,320C960,320,930,320,900,320C870,320,840,320,810,320C780,320,750,320,720,320C690,320,660,320,630,320C600,320,570,320,540,320C510,320,480,320,450,320C420,320,390,320,360,320C330,320,300,320,270,320C240,320,210,320,180,320C150,320,120,320,90,320C60,320,30,320,15,320L0,320Z"></path>
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