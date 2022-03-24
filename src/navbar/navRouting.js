
import SearchInstances from "../components/searchComponents/simpleSearch";
import CorelateSearch from "../components/searchComponents/CorelateSearch";
import AdvanceSearch from "../components/searchComponents/AdvanceSearch";
import FilterSearch from '../components/searchComponents/filterSearch'

const routing=[
    {
        id: 1,
        path: '/',
        name: 'Simple Search',
        // icon: <Dashboard fontSize='medium' />,
        component: <SearchInstances />
    },
    {
        id: 2,
        path: '/corelatesearch',
        name: 'Co-Relate Search',
        // icon: <CategoryIcon fontSize='medium' />,
        component: <CorelateSearch />
    },
    {
        id:3,
        path: '/advancesearch',
        name: 'Advance Search',
        // icon: <PeopleAlt fontSize="medium" />,
        component: <FilterSearch />
        // component: <AdvanceSearch  />
    }
]
export default routing;