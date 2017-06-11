Sleep Solutions Demo
====================

This application reads an array of objects from an endpoint and displays them on a page. It demonstrates knowledge of front-end technologies like React and Redux.

To run, you will need to have the `gulp-cli` installed:

    $ npm install -g gulp-cli

After cloning the repository, run these commands in its root directory.

    $ npm install
    $ gulp
    $ npm start

You will now have a server running locally on port 3000. Open a browser and visit `localhost:3000` to view the demonstration.

## Design and Implementation Details
### Container vs. Presentational Components
This application follows the Redux guidelines of separating components into [presentational and container ones](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0). In a nutshell, container components are aware of Redux state whereas presentational ones only concern how they present themselves based on the parameters provided to them.

This pattern can be seen most clearly in the `PatientTable` container component (in the `containers` directory) and the `SortTable` presentational component (in the `components` directory). `PatientTable` is aware of the Redux state -- in this case, the patient data to be displayed. Its role is to connect patient data to `SortTable` for displaying. `SortTable` is not designed to know what kind of data it will display. It is provided enough information, namely the patient record rows and columns, to display itself accordingly, but there are no dependencies on the type of data it displays. `SortTable` could easily be used by another component to display completely different data. Its role is solely to implement column sorting behavior.

### Local State in `SortTable`
The `SortTable` component uses local state. This might seem to fly in the face of the Redux design philosophy, but the choice was intentional. I often use local state in presentational components since they are unaware of the context they appear in. The state only governs how the component presents itself; here, it is used to set which column to sort on. This is fine because the choice of column sort does not appear anywhere else in the application; in fact, one could argue that it would muddy the Redux state to include this information among the reducers. Redux state is best used to represent application state, and a column sort on one component I find too minute a purpose to include at application-level. Storing state locally here also makes it much easier to use `SortTable` in another component. We would simply include it and the sorting behavior would come by default without having to connect to additional Redux state.

### Reducer Entities
I keep records fetched from an endpoint stored in an `entities` attribute in the root reducer. It is composed of each type of record used in the application. In this case, we only have a `patients` collection, but we can easily see how we can extend `entities` with records of other types.

This application makes an assumption about actions with a `response` object containing an `entities` object (`{ response: { entities: {...} } }`): This means that data has been fetched and new records need to be merged into the `entities` object. That is why there is no check on `action.type` in the `entities` reducer, since the presence of this kind of `response` object is sufficient.

### Miscellaneous
- The `filters` reducer is designed to accomodate more filters as they are added. For example, a date specifier for the "created" and "updated" columns would be appended to `filters`. I'm aware it looks a little odd at this point that `queryFilters` is the only child reducer.
- The Sass styling uses shallow inheritance. I try to divide styling by component, giving the component its own CSS class and styling particulars in nested selectors. I find this to be enough inheritance to get you out of trouble with clashing selectors while avoiding too much inflexibility as a result of the inheritance.
