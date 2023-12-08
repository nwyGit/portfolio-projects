import React, { useState } from "react";
import { useAtom } from "jotai";
import { Box, Button, Typography, useTheme } from "@mui/material";
import {
	AddBoxRounded,
	DeleteForever,
	Download,
	Edit,
} from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../layout/Header";
import { tokens } from "../../styles/theme";
import { isStartToScanAtom, isUpdateRecordAtom, recordsAtom } from "@/state";
import AlertMessage from "../image-components/AlertMessage";
import ReceiptForm from "../forms/ExpenseForm";
import styles from "@/styles";
import { deleteRecords } from "@/lib/recordService";

const Record = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const [isStartToScan, setIsStartToScan] = useAtom(isStartToScanAtom);
	const [isUpdateRecord, setIsUpdateRecord] = useAtom(isUpdateRecordAtom);
	const [records] = useAtom(recordsAtom);
	const [record, setRecord] = useState({});
	const [deleteItems, setDeleteItems] = useState([]);
	const [resMsg, setResMsg] = useState("");

	const photoUrls = [
		"/receipt-1.jpeg",
		"/receipt-2.jpeg",
		"/receipt-3.jpeg",
		"/receipt-4.jpeg",
		"/receipt-5.jpeg",
	];

	const downloadDemoPhotos = () => {
		photoUrls.forEach((photoUrl, index) => {
			const fileName = `receipt-${index + 1}.jpg`;
			const link = document.createElement("a");

			link.href = photoUrl;
			link.download = fileName;

			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		});
	};

	const deleteRecord = (items) => {
		deleteRecords(items)
			.then((msg) => {
				setResMsg(msg);
				setTimeout(() => {
					window.location.reload();
				}, 2000);
			})
			.catch((err) => {
				console.log(err);
				throw new Error("Failed to delete records.");
			});
	};

	const columns =
		records && records.length > 0
			? [...Object.keys(records[0]), "actions"]
					.filter((key) => {
						return key !== "_id" && key !== "items" && key !== "imageURL"
							? true
							: false;
					})
					.map((key) => {
						const obj = {
							field: key,
							headerName: key.charAt(0).toUpperCase() + key.slice(1),
							flex: 1,
							cellClassName: "name-column--cell",
						};
						if (key === "merchant") {
							obj.flex = 1.5;
							return obj;
						} else if (key === "description") {
							obj.flex = 4;
							return obj;
						} else if (key === "amount") {
							obj.headerAlign = "right";
							obj.align = "right";
							return obj;
						} else if (key === "actions") {
							obj.headerAlign = "center";
							obj.align = "center";
							obj.renderCell = (params) => {
								const row = records.find(
									(record) => record._id === params.row._id
								);
								if (row) {
									const formattedDate =
										row.date &&
										new Date(row.date).toISOString().substring(0, 10);
									row.date = formattedDate;
								}
								return (
									<>
										<Button
											onClick={() => {
												setRecord(row);
												setIsUpdateRecord(!isUpdateRecord);
											}}
											sx={{ color: colors.orangeAccent[500] }}
										>
											<Edit />
										</Button>
									</>
								);
							};
							return obj;
						} else {
							return obj;
						}
					})
			: [];

	function getRowId(row) {
		return row._id;
	}

	return (
		<>
			{resMsg && <AlertMessage resMsg={resMsg} type="info" />}
			<Box display="flex" justifyContent="space-between" alignItems="center">
				<Header
					title="EXPENSE RECORDS"
					subtitle="Managing your expense records"
				/>
				<Box className="grid grid-cols-3 gap-4">
					<Button
						variant="contained"
						endIcon={<Download />}
						onClick={() => {
							downloadDemoPhotos();
						}}
						sx={{
							backgroundColor: colors.orangeAccent[500],
							"&:hover": {
								backgroundColor: colors.orangeAccent[500],
							},
						}}
					>
						Demo photos
					</Button>
					<Button
						variant="contained"
						endIcon={<DeleteForever />}
						onClick={() => {
							deleteRecord(deleteItems);
						}}
						sx={{
							backgroundColor: colors.redAccent[500],
							"&:hover": {
								backgroundColor: colors.redAccent[500],
							},
						}}
					>
						Delete
					</Button>
					<Button
						variant="contained"
						endIcon={<AddBoxRounded />}
						onClick={() => {
							setIsStartToScan(!isStartToScan);
						}}
						sx={{
							color: colors.primary[100],
							backgroundColor: colors.greenAccent[400],
							"&:hover": {
								backgroundColor: colors.greenAccent[400],
							},
						}}
					>
						Add a record
					</Button>
				</Box>
			</Box>
			{records && records.length > 0 ? (
				<>
					<Box
						m="20px 0 0 0"
						height="80vh"
						sx={{
							"& .MuiDataGrid-root": { border: "none" },
							"& .MuiDataGrid-cell": { borderBottom: "none" },
							"& .name-column--cell": { color: colors.greenAccent[300] },
							"& .MuiDataGrid-columnHeaderTitle": {
								fontWeight: "bold",
							},
						}}
					>
						<DataGrid
							rows={records}
							columns={columns}
							autoPageSize
							getRowId={getRowId}
							checkboxSelection
							disableRowSelectionOnClick
							onRowSelectionModelChange={(IDs) => {
								setDeleteItems(IDs);
							}}
						/>
					</Box>
				</>
			) : (
				<>
					<Box p="3rem 0" textAlign="center">
						<Typography variant="h4" color={colors.grey[400]}>
							It seems like you haven&apos;t created any records yet. <br />
							Would you like to start by creating one?
						</Typography>
					</Box>
				</>
			)}
			{isUpdateRecord && (
				<>
					<Box
						className={`${styles.blurOverlay} z-5`}
						onClick={() => {
							setIsStartToScan(false);
							setIsUpdateRecord(false);
						}}
					></Box>
					<ReceiptForm receiptData={record} action="Update" />
				</>
			)}
		</>
	);
};

export default Record;
