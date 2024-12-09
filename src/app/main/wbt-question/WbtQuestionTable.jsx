/* eslint-disable react/no-unstable-nested-components */
import { useMemo } from 'react';
import DataTable from 'app/shared-components/data-table/DataTable';
import FuseLoading from '@fuse/core/FuseLoading';
import { ListItemIcon, MenuItem, Paper } from '@mui/material';
import _ from '@lodash';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Button from '@mui/material/Button';
import {useState, useEffect} from 'react';
import { useDeleteECommerceProductsMutation, useGetECommerceProductsQuery } from 'app/main/apps/e-commerce/ECommerceApi';

function WbtQuestionTable() {
	const { data: products, isLoading } = useGetECommerceProductsQuery();
	const [removeProducts] = useDeleteECommerceProductsMutation();
	const [questionData, setQuestionData] = useState([]);

	const columns = useMemo(
		() => [
			{
				accessorKey: 'title',
				header: 'Title',
				accessorFn: (row) => `${row.title}`
			},
			{
				accessorKey: 'description',
				header: 'Description',
				accessorFn: (row) => `${row.description}`
			},
			{
				accessorKey: 'inputType',
				header: 'Input Type',
				accessorFn: (row) => `${row.inputType}`
			},
		],
		[]
	);

	useEffect(() => {
		setQuestionData([
			{
				id: 1,
				title: 'How many people are in your team?',
				description: 'How many people are in your team?',
				inputType: 'text'
			},
			{
				id: 2,
				title: 'What is your current salary?',
				description: 'What is your current salary?',
				inputType: 'text'
			},
			{
				id: 3,
				title: 'What is your current salary?',
				description: 'What is your current salary?',
				inputType: 'text'
			},
			{
				id: 4,
				title: 'Do you have any children?',
				description: 'Do you have any children?',
				inputType: 'text'
			},
			{
				id: 5,
				title: 'Do you have any children?',
				description: 'Do you have any children?',
				inputType: 'text'
			},
			{
				id: 6,
				title: 'Are you a student?',
				description: 'Are you a student?',
				inputType: 'text'
			},
			{
				id: 7,
				title: 'Are you a student?',
				description: 'Are you a student?',
				inputType: 'text'
			},
			{
				id: 8,
				title: 'Which country do you live in?',
				description: 'Which country do you live in?',
				inputType: 'text'
			},
			{
				id: 9,
				title: 'Which country do you live in?',
				description: 'Which country do you live in?',
				inputType: 'text'
			},
			{
				id: 10,
				title: 'Where do you live?',
				description: 'Where do you live?',
				inputType: 'text'
			},
		])
	}, [])

	if (isLoading) {
		return <FuseLoading />;
	}

	const deleteQuestion = (id) => {
		console.log('delete question function');
		setQuestionData(questionData.filter(item => item.id !== id));
	}

	const editQuestion = (id) => {
		console.log('edit question function');
	}

	return (
		<Paper
			className="flex flex-col flex-auto shadow-3 rounded-t-16 overflow-hidden rounded-b-0 w-full h-full"
			elevation={0}
		>
			<DataTable
				data={questionData}
				columns={columns}
				renderRowActionMenuItems={({ closeMenu, row, table }) => [
					<MenuItem
						key={0}
						onClick={() => {
							editQuestion(row.original.id);
						}}
					>
						<ListItemIcon>
							<FuseSvgIcon>heroicons-outline:pencil</FuseSvgIcon>
						</ListItemIcon>
						Edit
					</MenuItem>,
					<MenuItem
						key={0}
						onClick={() => {
							deleteQuestion(row.original.id);
						}}
					>
						<ListItemIcon>
							<FuseSvgIcon>heroicons-outline:trash</FuseSvgIcon>
						</ListItemIcon>
						Delete
					</MenuItem>
				]}
				renderTopToolbarCustomActions={({ table }) => {
					const { rowSelection } = table.getState();

					if (Object.keys(rowSelection).length === 0) {
						return null;
					}

					return (
						<Button
							variant="contained"
							size="small"
							onClick={() => {
								const selectedRows = table.getSelectedRowModel().rows;
								removeProducts(selectedRows.map((row) => row.original.id));
								table.resetRowSelection();
							}}
							className="flex shrink min-w-40 ltr:mr-8 rtl:ml-8"
							color="secondary"
						>
							<FuseSvgIcon size={16}>heroicons-outline:trash</FuseSvgIcon>
							<span className="hidden sm:flex mx-8">Delete selected items</span>
						</Button>
					);
				}}
			/>
		</Paper>
	);
}

export default WbtQuestionTable;
