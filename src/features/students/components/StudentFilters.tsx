import { Box, FormControl, Grid, InputLabel, OutlinedInput } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { City, ListParams } from 'models';
import { ChangeEvent } from 'react';

export interface StudentFiltersProps {
	filter: ListParams;
	cityList: City[];

	onChange?: (newFilter: ListParams) => void;
	onSearchChange?: (newFilter: ListParams) => void;
}

export default function StudentFilters({ filter, onSearchChange }: StudentFiltersProps) {
	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (!onSearchChange) return;

		const newFilter = { ...filter, _page: 1, name_like: e.target.value };

		onSearchChange(newFilter);
	};

	return (
		<Box>
			<Grid container spacing={3}>
				<Grid item xs={12} md={6}>
					<FormControl fullWidth variant="outlined" size="small">
						<InputLabel htmlFor="searchByName">Search by name</InputLabel>
						<OutlinedInput
							id="searchByName"
							label="Search by name"
							endAdornment={<Search />}
							defaultValue={filter.name_like}
							onChange={handleSearchChange}
						/>
					</FormControl>
				</Grid>
			</Grid>
		</Box>
	);
}