
import { useRoutes } from "react-router-dom";
import AdvanceSearch from "./components/searchComponents/AdvanceSearch";
import CorelateSearch from "./components/searchComponents/CorelateSearch";
import FilterSearch from "./components/searchComponents/filterSearch";
import SearchInstances from "./components/searchComponents/simpleSearch";
import Navbar from "./navbar/navbar";
import TrialF from "./tial";
import SampleTrial from './trialFormik'

const Routes = () => {

    return useRoutes([
        {
            path: '/',
            element: <Navbar />,
            children: [
                {
                    path: '/',
                    element: <SearchInstances />
                },
                {
                    path: '/corelatesearch',
                    element: <CorelateSearch />
                },
                {
                    path: '/advancesearch',
                    element: <FilterSearch />,
                    // element: <AdvanceSearch  />
                },
                {
                    path: '/trialFormik',
                    element: <SampleTrial />,
                    // element: <AdvanceSearch  />
                }
                
            ]
        }
    ])
} 

export default Routes;