import { useEffect, useState, type ChangeEvent } from 'react'
import '../../css/components/search.css'
import type { Product } from "../../generated/prisma/client.ts";
import axios from 'axios';
import { Link, useNavigate } from 'react-router';

export const Search = () => {
    const [results, setResults] = useState<Product[]>([])
    const [selected, setSelected] = useState<number>(0)
    const [value, setValue] = useState<string>('')
    const navigate = useNavigate()

    const SearchEvent = async (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)

        if (!e.target.value) return;

        const url = `http://localhost:4000/api/products/search`
        await axios.post(url, { search: e.target.value })
            .then((res) => {
                if (!res.data) return;

                setResults(res.data)
                setSelected(0)
            })
    }

    const ClearInput = () => {
        setValue(() => '')
        setResults([])
    }

    const KeyPressEvent = (e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.code) {
            case 'ArrowDown':
                setSelected(selected + 1);
                break;
            case 'ArrowUp':
                setSelected(selected - 1);
                break;
            case 'Enter':
                if (!results[selected]) return;
                const product = results[selected]
                navigate(`/p/${product.id}/${product.title}`)
                ClearInput()
                break;
        }
    }

    return (
        <div className="search">
            <input placeholder='' onChange={SearchEvent} value={value} onKeyUp={KeyPressEvent} />
            <label><i></i></label>
            <div className="search-results">
                {results.map((product: Product, i) => (
                    <Link
                        onClick={ClearInput}
                        key={'result' + product.id}
                        to={`/p/${product.id}/${product.title}`}
                        className={'result' + (i == selected ? ' selected' : '')}
                    >
                        {product.title}
                    </Link>
                ))}
            </div>
        </div >
    )
}
