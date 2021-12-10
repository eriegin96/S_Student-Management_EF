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
import { ListParams, Student } from 'models';
import studentApi from 'api/studentApi';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

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
	const match = useRouteMatch();
	const history = useHistory();

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
		dispatch(studentActions.setFilterWithDebounce(newFilter));
	};

	const handleFilterChange = (newFilter: ListParams) => {
		dispatch(studentActions.setFilter(newFilter));
	};

	const hanldeRemoveStudent = async (student: Student) => {
		try {
			await studentApi.remove(student?.id || '');

			toast.success('Remove student successfully');

			dispatch(studentActions.setFilter({ ...filter }));
		} catch (error) {
			console.log('Failed to fetch student', error);
		}
	};

	const handleEditStudent = async (student: Student) => {
		history.push(`${match.url}/${student.id}`);
	};

	return (
		<Box className={classes.root}>
			{loading && <LinearProgress className={classes.loading} />}

			<Box className={classes.titleContainer}>
				<Typography variant="h4">Students</Typography>

				<Link to={`${match.url}/add`} style={{ textDecoration: 'none' }}>
					<Button variant="contained" color="primary">
						Add new student
					</Button>
				</Link>
			</Box>
			<Box mb={3}>
				<StudentFilters
					filter={filter}
					cityList={cityList}
					onChange={handleFilterChange}
					onSearchChange={handleSearchChange}
				/>
			</Box>

			{/* StudentTable */}
			<StudentTable
				studentList={studentList}
				onEdit={handleEditStudent}
				cityMap={cityMap}
				onRemove={hanldeRemoveStudent}
			/>

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
