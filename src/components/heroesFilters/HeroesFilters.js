import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchFilters } from '../../actions';
import { filtersChanged } from './filtersSlice';

import { v4 as uuidv4 } from 'uuid';
import Spinner from '../spinner/Spinner';

const HeroesFilters = () => {

    const {filters, filtersLoadinStatus, activeFilter} = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchFilters(request));

        // eslint-disable-next-line
    }, [])

    if (filtersLoadinStatus === 'loading') {
        return <Spinner/>;
    } else if (filtersLoadinStatus === 'error') {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5> 
    }

    const renderFilters = (arr) => {
        return arr.map(({text, className, value}) => {

            let btnClass;
            if (activeFilter === value) {
                btnClass = `btn ${className} active`;
            } else {
                btnClass = `btn ${className}`;
            }

            return (
                <button key={uuidv4()}
                        className={btnClass}
                        onClick={() => dispatch(filtersChanged(value))}
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