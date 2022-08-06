import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { filtersFetching, filtersFetched, filtersFetchingError, activeFilterChanged } from '../../actions';

import { v4 as uuidv4 } from 'uuid';
import Spinner from '../spinner/Spinner';
// const classNames = require('classnames');
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {

    const {filters, filtersLoadinStatus, activeFilter} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(filtersFetching());
        request('http://localhost:3001/filters')
            .then(data => dispatch(filtersFetched(data)))
            .catch(() => dispatch(filtersFetchingError()))
            
        // eslint-disable-next-line
    }, [])

    if (filtersLoadinStatus === 'loading') {
        return <Spinner/>;
    } else if (filtersLoadinStatus === 'error') {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5> 
    }

    const renderFilters = (arr) => {
        return arr.map(({text, className, value}) => {

            const btnClass = classNames('btn', className, {
                'active': activeFilter === value
            })

            return (
                <button key={uuidv4()}
                        className={btnClass}
                        onClick={() => dispatch(activeFilterChanged(value))}
                        >{text}</button>
            )
        })
    } 

    const elements = renderFilters(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;