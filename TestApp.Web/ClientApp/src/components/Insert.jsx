import { useState } from 'react';
import { useHistory } from 'react-router-dom'

export function Insert() {
    const [data, setData] = useState([]); 
    const [isDataLoaded, setIsDataLoaded] = useState(false); 
    const history = useHistory();

    function remove(index) {
        data.splice(index, 1);
        setData([...data])
    }

    async function load() {
        if (isDataLoaded) return;
        const response = await fetch(`/api/data`);
        const body = await response.json();
        setIsDataLoaded(true)
        setData([
            ...data,
            ...body,
        ]);
    }
    function add(code, value) {
        setData([
            ...data,
            { code, value }
        ])
    }

    async function onSave() {
        const request = data.map(x => {
            const o = {}
            o[x.code] = x.value;
            return o;
        })
        const params = { method: 'POST', body: JSON.stringify(request), headers: { 'content-type': 'application/json' } };
        await fetch('/api/data', params);
            history.push('/values')
    }

    return <>
        <div className="row">

            {!isDataLoaded && <div className="col-md-3">
                <button onClick={load} type="button" className="btn btn-primary">Загрузить текущий список</button>
            </div>
            }
            <div className="col-md-1">
                <button onClick={onSave} type="button" className="btn btn-primary">Сохранить</button>
            </div>
        </div>
        <br/>
        <FormComponent onCreate={add} />
    <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
            <tr>
                <th>Код</th>
                <th>Значение</th>
                <th>#</th>
            </tr>
        </thead>
        <tbody>
            {data.map((x, i) =>
                <tr key={i}>
                    <td>{x.code}</td>
                    <td>{x.value}</td>
                    <td>
                        <p style={{ cursor: 'pointer' }} onClick={() => remove(i)}>Удалить</p>
                    </td>
                </tr>
            )}
        </tbody>
        </table>
    </>
}


function FormComponent({ onCreate }) {
    const [code, setCode] = useState(0);
    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    function create() {
        if (code == null) {
            setError('Код не может быть пустым');
            return;
        }

        if (!value) {
            setError('Значение не может быть пустым');
            return;
        }

        onCreate && onCreate(+code, value);

        setCode(0);
        setValue('');
        setError('');
    }

    return <>
        <div className="row">
        <div className="col-md-2">
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">Код</span>
                </div>
                <input onChange={e => setCode(e.target.value)} value={code} type="number" className="form-control" placeholder="123" aria-label="123" aria-describedby="basic-addon1" />
            </div>
        </div>
        <div className="col-md-4">
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">Значение</span>
                </div>
                <input onChange={e => setValue(e.target.value)} value={value} type="text" className="form-control" placeholder="текстовое значение" aria-label="123" aria-describedby="basic-addon1" />
            </div>
        </div>
        <div className="col-md-1">
            <button onClick={create} type="button" className="btn btn-primary">Добавить</button>
        </div>
        </div>
        {error && <div className="row" style={{ color: 'red' }}>
            {error}
        </div>
        }

    </>
}