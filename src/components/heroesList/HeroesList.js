import {useHttp} from '../../hooks/http.hook';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { heroesFetching, heroesFetched, heroesFetchingError, heroDeleted } from '../../actions';

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import './heroesList.scss';

const HeroesList = () => {

    const filteredHeroesSelector = createSelector(
        (state) => state.filters.activeFilter,
        (state) => state.heroes.heroes,
        (filter, heroes) => {
            if (filter === 'all') {
                return heroes;
            } else {
                return heroes.filter(item => item.element === filter)
            }
        } 
    )

    // const filteredHeroes = useSelector(state => {
    //     if (state.filters.activeFilter === 'all') {
    //         console.log('render')
    //         return state.heroes.heroes;
    //     } else {
    //         return state.heroes.heroes.filter(item => item.element === state.filters.activeFilter)
    //     }
    // })
    const filteredHeroes = useSelector(filteredHeroesSelector);
    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch('HEROES_FETCHING'); 
        request("https://my-cool-dbase.herokuapp.com/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))

        // eslint-disable-next-line
    }, []);

    const onDelete = useCallback((id) => {
        request(`https://my-cool-dbase.herokuapp.com/heroes/${id}`, "DELETE")
            .then(data => console.log(data, "Deleted"))
            .then(dispatch(heroDeleted(id)))
            .catch(err => console.log(err));
        // eslint-disable-next-line 
    }, [request])

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return (
                <CSSTransition 
                    timeout={500} 
                    classNames='hero'>
                    <h5 className="text-center mt-5">Героев пока нет</h5>
                </CSSTransition>
            )
        }

        return arr.map(({id, ...props}) => {
            return (
                <CSSTransition 
                        key={id} 
                        timeout={500} 
                        classNames='hero'>
                    <HeroesListItem {...props} onDelete={() => onDelete(id)}/>
                </CSSTransition>
            )
        })
    }

    const items = renderHeroesList(filteredHeroes);
    return (
        <TransitionGroup component='ul'>
            {items}
        </TransitionGroup>
    )
}

export default HeroesList;