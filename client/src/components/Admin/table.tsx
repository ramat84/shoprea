import { type MouseEvent, useEffect } from 'react';

import '../../css/pages/admin/table.css'

export const AdminTable = ({ data, set, columns, title }: { data: any, set: any, columns: [string], title: string }) => {
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

        setTimeout(() => {
            lock = -1;
            set(new_data)
        }, 340)

        return true;
    }

    const MoveUp = (e: MouseEvent) => {
        Move(e, true)
    }

    const MoveDown = (e: MouseEvent) => {
        Move(e, false)
    }

    let i = 0;

    return <div className="admin-data-page">
        <h3>{title}</h3>
        <form className="add">
            <input placeholder='New...' />
            <button className='btn-add'>Add</button>
        </form>
        <div className="admin-data">
            {data.map((item: any) => (
                <div data-id={item.id} data-order={i++} key={item.id}>
                    <button onClick={MoveDown} className="l arrow"><i></i></button>
                    <button onClick={MoveUp} className="r arrow"><i></i></button>
                    {columns.map((fieldName: string) => (
                        <div>{item[fieldName]}</div>
                    ))}
                    <button className="l edit"><i></i></button>
                    <button className="r trash"><i></i></button>
                </div>
            ))}
        </div>
    </div>
}
