import { useContext, MouseEvent } from 'react';
import { CategoriesContext } from '../../contexts/CategoriesContext.tsx'
import type { Category } from "../../../../shared/src/generated/prisma/client.ts";
import '../../css/pages/admin/categories.css'

export const AdminCategories = () => {
    const categories = useContext(CategoriesContext)
    let lock = 0

    const Move = (e: MouseEvent, isup = true) => {
        const targetEl = e.target as HTMLElement
        const rowEl = targetEl.closest("div")!
        const curID = parseInt(rowEl.dataset.id!)
        const directionName = isup ? 'up' : 'down'
        const otherSibling = isup ? rowEl.previousElementSibling : rowEl.nextElementSibling

        if (lock == curID) return false;
        lock = curID;

        if (!otherSibling) {
            lock = 0;
            return false;
        }

        const directionClass = `move-${directionName}`
        rowEl.classList.add(directionClass)

        setTimeout(() => {
            const parent = rowEl!.parentNode! as HTMLDivElement
            parent.insertBefore(isup ? rowEl : otherSibling, isup ? otherSibling : rowEl)
            lock = 0;
            rowEl?.classList.remove(directionClass)
        }, 500)
        return true;
    }

    const MoveUp = (e: MouseEvent) => {
        Move(e, true)
    }

    const MoveDown = (e: MouseEvent) => {
        Move(e, false)
    }

    return <div className="admin-categories-page">
        <h3>Manage categories</h3>
        <form className="add">
            <input placeholder='New Category...' />
            <button className='btn-add'>Add</button>
        </form>
        <div className="admin-categories">
            {categories.map((item: Category) => (
                <div data-id={item.id} key={item.id}>
                    <button onClick={MoveDown} className="l arrow"><i></i></button>
                    <button onClick={MoveUp} className="r arrow"><i></i></button>
                    <div>{item.name}</div>
                    <button className="l edit"><i></i></button>
                    <button className="r trash"><i></i></button>
                </div>
            ))}
        </div>
    </div>
}
