export default class Template {
    test: number;
    constructor(cTest: number) {
        this.test = cTest;
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
    
}