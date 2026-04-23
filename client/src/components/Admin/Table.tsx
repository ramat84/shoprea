import type { User } from "../../generated/prisma/client.ts"
import type { ChangeEvent, MouseEvent } from 'react';
import type { Orderable } from '../../types/Orderable.ts';
import type { TableCallbackParams, TableParams } from '../../types/Table.ts';

import { useForm } from 'react-hook-form'
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext.tsx';

import '../../css/pages/admin/table.css'

export const AdminTable = ({ data, setData, orderCallback, editCallback, createCallback, deleteCallback, columns }: TableParams) => {
    const [user] = useContext<User>(UserContext)

    const NewForm = useForm()

    let lock = -1

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

        let newData = [...data]
        newData[curOrder] = otherItem;
        newData[curOrder + direction] = curItem;

        orderCallback({ user, data, setData, newData })

        setTimeout(() => {
            lock = -1;
            document.querySelectorAll(".move-up,.move-down").forEach((el) => {
                el.classList.remove("move-up")
                el.classList.remove("move-down")
            })
        }, 340)

        return true;
    }

    const MoveUp = (e: MouseEvent) => { Move(e, true) }
    const MoveDown = (e: MouseEvent) => { Move(e, false) }

    let i = 0

    const AddNew = () => {
        const newName = NewForm.getValues('name')
        createCallback({ user, data, setData, newName })
    }

    var prodOrder = 0

    const GetDomRow = (num: number): HTMLDivElement | null => {
        return document.querySelector(`.admin-data > div:nth-child(${num})`)
    }

    const ChangeOrderNumber = (e: ChangeEvent<HTMLSelectElement>) => {
        const from = parseInt(e.target.dataset.order ?? '')
        let to = parseInt(e.target.value)

        let newData: Orderable = [...data]

        if (to > from) {
            newData.splice(to, 0, data[from - 1])
            newData.splice(from - 1, 1)
        } else {
            newData.splice(to - 1, 0, data[from - 1])
            newData.splice(from, 1)
        }

        const curRow = GetDomRow(from);
        curRow?.classList.add('move-hide')

        setTimeout(() => {
            curRow?.classList.remove('move-hide');
            curRow?.classList.add('move-show');
        }, 400)

        orderCallback({ user, data, setData, newData } as TableCallbackParams)

        lock = -1

        return true;
    }

    return <div className="admin-data-page">
        <form className="add" onSubmit={NewForm.handleSubmit(AddNew)}>
            <input {...NewForm.register('name', { value: '' })} placeholder='New...' />
            <button className='btn-add'>Add</button>
        </form>
        <div className="admin-data">
            {data.map((item: any) => {
                var orderI = 1
                prodOrder++

                return <div data-id={'tableRow' + item.id} data-order={i++} key={'tablerow' + item.id}>
                    <select className="order" onChange={ChangeOrderNumber} data-order={prodOrder} value={prodOrder}>
                        {data.map(() => <option key={'orderOption' + orderI}>{orderI++}</option>)}
                    </select>
                    <button onClick={MoveDown} className="l arrow"><i></i></button>
                    <button onClick={MoveUp} className="r arrow"><i></i></button>
                    {columns.map((fieldName: string) => (
                        fieldName == 'image' ?
                            <img key={'tableCol' + fieldName} src={item[fieldName]} /> :
                            <div key={'tableCol' + fieldName} className={`col-${fieldName}`}>
                                {item[fieldName]}
                            </div>
                    ))}
                    <button onClick={() => editCallback({ user, data, setData, item })} className="l edit"><i></i></button>
                    <button onClick={() => deleteCallback({ user, data, setData, item })} className="r trash"><i></i></button>
                </div>
            })}
        </div>
    </div >
}
