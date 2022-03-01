import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withRoomContext } from '../../../../RoomContext';
import * as mingleRoomsActions from '../../../../store/actions/mingleRoomsActions';
import PropTypes from 'prop-types';
import { useIntl, FormattedMessage } from 'react-intl';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = (theme) =>
	({
		dialogPaper :
		{
			width                          : '90vw',
			height                         : '90vh',
			[theme.breakpoints.down('lg')] :
			{
				width  : '90vw',
				height : '90hw'
			},
			[theme.breakpoints.down('xs')] :
			{
				width  : '90vw',
				height : '90hw'
			},
			[theme.breakpoints.down('sm')] :
			{
				width  : '90vw',
				height : '90hw'
			},
			[theme.breakpoints.down('xs')] :
			{
				width  : '90vw',
				height : '90hw'
			},
			display       : 'flex',
			flexDirection : 'column'
		},
		paper : {
			padding      : theme.spacing(1),
			textAlign    : 'center',
			color        : theme.palette.text.secondary,
			whiteSpace   : 'nowrap',
			marginRight  : theme.spacing(3),
			marginBottom : theme.spacing(1),
			minWidth     : theme.spacing(8)
		},
		shortcuts : {
			display       : 'flex',
			flexDirection : 'row',
			alignItems    : 'center',
			paddingLeft   : theme.spacing(2),
			paddingRight  : theme.spacing(2)
		},
		tabsHeader :
		{
			flexGrow     : 1,
			marginBottom : theme.spacing(1)
		}
	});

const View = ({
	tablesViewOpened,
	handleCloseTablesView,
	classes
}) =>
{
	const intl = useIntl();

	return (
		<Dialog
			open={tablesViewOpened}
			onClose={() => handleCloseTablesView(false)}
			// onClose={() => { handleCloseTablesView(false); }}
			classes={{
				paper : classes.dialogPaper
			}}
			// hideBackdrop
			// disableBackdropClick
			// disableAutoFocus
			// disableEnforceFocus
			// style={{ position: 'relative' }}
		>
			<DialogTitle id='form-dialog-title'>
				<FormattedMessage
					id='mingleRooms.tables'
					defaultMessage='Tables'
				/>
			</DialogTitle>
			<Tabs
				value={0}
				className={classes.tabsHeader}
				indicatorColor='primary'
				textColor='primary'
				variant='fullWidth'
			>
				<Tab
					label={
						intl.formatMessage({
							id             : 'mingleRooms.chooseTable',
							defaultMessage : 'Choose table'
						})
					}
				/>
			</Tabs>

			<div className={classes.shortcuts}>
				TablesVisualisation
			</div>

			<DialogActions>
				<Button
					onClick={() => handleCloseTablesView(false)}
					color='primary'
				>
					<FormattedMessage
						id='label.close'
						defaultMessage='Close'
					/>
				</Button>
			</DialogActions>
		</Dialog>
	);
};

View.propTypes =
{
	roomClient            : PropTypes.object.isRequired,
	tablesViewOpened      : PropTypes.bool.isRequired,
	handleCloseTablesView : PropTypes.func.isRequired,
	classes               : PropTypes.object.isRequired
};

const mapStateToProps = (state) =>
	({
		tablesViewOpened : state.mingleRooms.tablesViewOpened
	});

const mapDispatchToProps = {
	handleCloseTablesView : mingleRoomsActions.setTablesViewOpen
};

export default withRoomContext(connect(
	mapStateToProps,
	mapDispatchToProps,
	null,
	{
		areStatesEqual : (next, prev) =>
		{
			return (
				prev.mingleRooms.tablesViewOpened === next.mingleRooms.tablesViewOpened
			);
		}
	}
)(withStyles(styles)(View)));
