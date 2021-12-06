import { Box, Button, Typography, makeStyles, LinearProgress } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { useEffect } from 'react';
import {
	selectStudentFilter,
	selectStudentList,
	selectStudentLoading,
	selectStudentPagination,
	studentActions,
} from '../studentSlice';
import StudentTable from '../components/StudentTable';
import { selectCityList, selectCityMap } from 'features/city/citySlice';
import StudentFilters from '../components/StudentFilters';
import { ListParams } from 'models';

const useStyles = makeStyles((theme) => ({
	root: {
		position: 'relative',
	},

	titleContainer: {
		display: 'flex',
		flexFlow: 'row nowrap',
		justifyContent: 'space-between',
		alignItems: 'center',

		marginBottom: theme.spacing(4),
	},

	loading: {
		position: 'absolute',
		top: theme.spacing(-1),
		width: '100%',
	},
}));

export default function ListPage() {
	const studentList = useAppSelector(selectStudentList);
	const pagination = useAppSelector(selectStudentPagination);
	const filter = useAppSelector(selectStudentFilter);
	const loading = useAppSelector(selectStudentLoading);
	const cityMap = useAppSelector(selectCityMap);
	const cityList = useAppSelector(selectCityList);

	const dispatch = useAppDispatch();
	const classes = useStyles();

	useEffect(() => {
		dispatch(studentActions.fetchStudentList(filter));
	}, [dispatch, filter]);

	const handlePageChange = (e: any, page: number) => {
		dispatch(studentActions.setFilter({ ...filter, _page: page }));
	};

	const handleSearchChange = (newFilter: ListParams) => {
		console.log('Search change: ', newFilter);
		dispatch(studentActions.setFilterWithDebounce(newFilter));
	};

	return (
		<Box className={classes.root}>
			{loading && <LinearProgress className={classes.loading} />}

			<Box className={classes.titleContainer}>
				<Typography variant="h4">Students</Typography>

				<Button variant="contained" color="primary">
					Add new student
				</Button>
			</Box>

			<Box mb={3}>
				<StudentFilters filter={filter} cityList={cityList} onSearchChange={handleSearchChange} />
			</Box>

			{/* StudentTable */}
			<StudentTable studentList={studentList} cityMap={cityMap} />

			{/* Pagination */}
			<Box my={2} display="flex" justifyContent="center">
				<Pagination
					color="primary"
					count={Math.ceil(pagination?._totalRows / pagination?._limit)}
					page={pagination?._page}
					onChange={handlePageChange}
				></Pagination>
			</Box>
		</Box>
	);
}
