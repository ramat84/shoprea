import { useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext.tsx';
import type { MouseEvent } from 'react';

import '../../css/pages/admin/table.css'

type tableParams = {
    data: any,
    setData: any,
    orderCallback: any,
    editCallback: any,
    createCallback: any,
    deleteCallback: any,
    columns: string[]
}

export const AdminTable = ({ data, setData, orderCallback, editCallback, createCallback, deleteCallback, columns }: tableParams) => {
    const user = useContext(UserContext)[0]

    const NewForm = useForm()

    let lock = -1

    useEffect(() => {
        document.querySelectorAll(".move-up,.move-down").forEach((el) => {
            el.classList.remove("move-up")
            el.classList.remove("move-down")
        })
    }, [data])

    const Move = (e: MouseEvent, isup = true) => {
        const targetEl = e.target as HTMLElement
        const rowEl = targetEl.closest("div")!
        const curOrder = parseInt(rowEl.dataset.order!)
        const directionName = isup ? 'up' : 'down'

        if (lock == curOrder) return false;
        lock = curOrder;

        const directionClass = `move-${directionName}`
        rowEl.classList.add(directionClass)

        const direction = isup ? -1 : 1;
        const otherItem = data[curOrder + direction]
        const curItem = data[curOrder]

        let new_data = [...data]
        new_data[curOrder] = otherItem;
        new_data[curOrder + direction] = curItem;

        orderCallback(user, data, setData, new_data)

        setTimeout(() => { lock = -1; }, 340)

        return true;
    }

    const MoveUp = (e: MouseEvent) => {
        Move(e, true)
    }

    const MoveDown = (e: MouseEvent) => {
        Move(e, false)
    }

    let i = 0;

    const AddNew = () => {
        createCallback(user, data, setData, NewForm.getValues('name'))
    }

    return <div className="admin-data-page">
        <form className="add" onSubmit={NewForm.handleSubmit(AddNew)}>
            <input {...NewForm.register('name', { value: '' })} placeholder='New...' />
            <button className='btn-add'>Add</button>
        </form>
        <div className="admin-data">
            {data.map((item: any) => (
                <div data-id={item.id} data-order={i++} key={item.id}>
                    <button onClick={MoveDown} className="l arrow"><i></i></button>
                    <button onClick={MoveUp} className="r arrow"><i></i></button>
                    {columns.map((fieldName: string) => (
                        fieldName == 'image' ? <img src={item[fieldName]} /> : <div>{item[fieldName]}</div>
                    ))}
                    <button onClick={() => editCallback(user, data, setData, item)} className="l edit"><i></i></button>
                    <button onClick={() => deleteCallback(user, data, setData, item)} className="r trash"><i></i></button>
                </div>
            ))}
        </div>
    </div>
}
