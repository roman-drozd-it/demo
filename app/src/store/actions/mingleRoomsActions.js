export const setTablesViewOpen = (flag) =>
	({
		type    : 'SET_TABLES_VIEW_OPEN',
		payload : { tablesViewOpened: flag }
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
