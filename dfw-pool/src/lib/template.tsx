export default class Template {
    test: number;
    constructor(cTest: number) {
        this.test = cTest;
    }
    header(): JSX.Element {
        return (
            <div key='h_' className={`TEST${this.test}`}>
                <div key='ht_'>Test</div>
            </div>
        )
    }
    
}