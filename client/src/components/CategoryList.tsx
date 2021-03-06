import React, { FC } from 'react'
import { NavLink } from 'react-router-dom';
import { ICategory } from '../types/ICategory'
import CategoryCard from './CategoryCard';
import '../styles/components/category-list.scss';

interface CategoryListProps {
    categories: ICategory[];
    onClick?: (category: ICategory) => void;
}

const CategoryList: FC<CategoryListProps> = ({ categories, onClick }) => {
    return (
        <div className='category-list rlc'>
            {categories.map((category) => (
                <CategoryCard key={category.id} category={category} onClick={onClick ? () => onClick(category) : undefined} />
            ))}
            {categories.length % 3 == 2 &&
                <div className='category-list__category-card category-list__category-card_empty  rlc'>

                </div>
            }
        </div>
    )
}

export default CategoryList