import Connect from './connect';

export default function Config () {

    const AWS_KEY = 'AKIAV3QMJHML43DMYOGG';
    const AWS_SECRET =  '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';
    const AWS_REGION = 'us-east-1';

    const data = {key: AWS_KEY, secret: AWS_SECRET, region: AWS_REGION}
    return (
        <div>
            <Connect props={data}/>
        </div>
        
    )
}
