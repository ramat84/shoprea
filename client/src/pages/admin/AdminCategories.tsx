import { useContext, type MouseEvent, useEffect } from 'react';
import { CategoriesContext } from '../../contexts/CategoriesContext.tsx'
import type { Category } from "../../../../shared/src/generated/prisma/client.ts";
import '../../css/pages/admin/categories.css'

export const AdminCategories = () => {
    const [categories, setCategories] = useContext(CategoriesContext)
    let lock = -1

    useEffect(() => {
        document.querySelectorAll(".move-up,.move-down").forEach((el) => {
            el.classList.remove("move-up")
            el.classList.remove("move-down")
        })
    }, [categories])

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
        const otherCategory = categories[curOrder + direction]
        const curCategory = categories[curOrder]

        let new_categories = [...categories]
        new_categories[curOrder] = otherCategory;
        new_categories[curOrder + direction] = curCategory;

        setTimeout(() => {
            lock = -1;
            setCategories(new_categories)
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

    return <div className="admin-categories-page">
        <h3>Manage categories</h3>
        <form className="add">
            <input placeholder='New Category...' />
            <button className='btn-add'>Add</button>
        </form>
        <div className="admin-categories">
            {categories.map((item: Category) => (
                <div data-order={i++} key={item.id}>
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
