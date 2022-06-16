import { useEffect, useState } from "react"

export function Preview() {
    const [data, setData] = useState(null);

    const [code, setCode] = useState('');
    const [minCode, setMinCode] = useState('');
    const [maxCode, setMaxCode] = useState('');
    const [value, setValue] = useState('');

    useEffect(() => {
        load();
    }, [])

    async function load() {
        const response = await fetch(`/api/data?code=${code || ''}&min=${minCode || ''}&max=${maxCode || ''}&search=${value || ''}`);
        const body = await response.json();
        setData(body);
    }

    if (!data)
        return <>Loading...</>

    return <div>
        <p>
            <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample">
                Фильтр
            </button>
        </p>
        <div>
            <div className="collapse collapse-horizontal" id="collapseWidthExample">
                <div className="card card-body" style={{ width: '300px ' }}>
                    <input onKeyUp={e => setCode(e.target.value)} className="form-control" type="text" placeholder="Код" />
                    <input onKeyUp={e => setMinCode(e.target.value)} className="form-control" type="text" placeholder="Код (от)" />
                    <input onKeyUp={e => setMaxCode(e.target.value)} className="form-control" type="text" placeholder="Код (до)" />
                    <input onKeyUp={e => setValue(e.target.value)} className="form-control" type="text" placeholder="Значение"  />

                    <button className="btn btn-primary" onClick={load}>Искать</button>
                </div>
            </div>
        </div>

        <table className='table table-striped' aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Код</th>
                    <th>Значение</th>
                </tr>
            </thead>
            <tbody>
                {data.map(x =>
                    <tr key={x.id}>
                        <td>{x.id}</td>
                        <td>{x.code}</td>
                        <td>{x.value}</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
}