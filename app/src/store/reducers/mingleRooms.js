// import { config } from '../../config';

const initialState =
{
	enabled          : true,
	tablesViewOpened : false,
	tablesExpanded   : false,
	list             : []
};

const mingleRooms = (state = initialState, action) =>
{
	switch (action.type)
	{
		case 'SET_TABLES_VIEW_OPEN':
		{
			const { tablesViewOpened } = action.payload;

			return { ...state, tablesViewOpened };
		}

		case 'SET_TABLES_EXPANDED':
		{
			const { tablesExpanded } = action.payload;

			return { ...state, tablesExpanded };
		}

		case 'CREATE_SESSION':
		{
			const { list } = action.payload;

			return { ...state, list };
		}

		case 'CLOSE_SESSION':
		{
			const list = [];

			return { ...state, list };
		}

		default:
			return state;
	}
};

export default mingleRooms;
