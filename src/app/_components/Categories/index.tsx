import React from 'react'
import Link from 'next/link'
import { Category } from '../../../payload/payload-types'
import CategoryCard from './CategoryCard'
import classes from './index.module.scss'

const Categories = ({ categories }: { categories: Category[] | null }) => {
  // ✅ Prevent crash if categories is null or empty
  if (!categories || categories.length === 0) {
    return <div>No categories found.</div>
  }

  return (
    <section className={classes.container}>
      <div className={classes.titleWrapper}>
        <h3>Shop by Categories</h3>
        <Link href="/products">Show All</Link>
      </div>

      <div className={classes.list}>
        {categories.map(category => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  )
}

export default Categories
