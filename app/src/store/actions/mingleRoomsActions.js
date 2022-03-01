export const setTablesViewOpen = (flag) =>
	({
		type    : 'SET_TABLES_EXPANDED',
		payload : { tablesViewOpened: flag }
	});

export const setTablesExpanded = (flag) =>
	({
		type    : 'SET_TABLES_EXPANDED',
		payload : { tablesExpanded: flag }
	});

export const createSession = (list) =>
	({
		type    : 'CREATE_SESSION',
		payload : { list }
	});

export const closeSession = () =>
	({
		type : 'CLOSE_SESSION'
	});
