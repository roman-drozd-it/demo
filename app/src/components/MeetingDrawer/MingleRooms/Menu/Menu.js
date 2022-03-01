import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { withRoomContext } from '../../../../RoomContext';
import { useIntl, FormattedMessage } from 'react-intl';
import * as mingleRoomsActions from '../../../../store/actions/mingleRoomsActions';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import Collapse from '@material-ui/core/Collapse';

const styles = (theme) =>
	({
		root :
		{
			padding     : theme.spacing(1),
			display     : 'flex',
			flexWrap    : 'wrap',
			marginRight : -theme.spacing(1),
			marginTop   : -theme.spacing(1)
		},
		menu :
		{
			marginTop      : theme.spacing(1),
			marginRight    : theme.spacing(1),
			flexGrow       : '1',
			justifyContent : 'space-between'
		},
		list :
		{
			marginTop      : theme.spacing(1),
			// marginRight    : theme.spacing(1),
			flexGrow       : '1',
			justifyContent : 'space-between'
		}

	});

const Menu = (props) =>
{
	const intl = useIntl();

	const {
		roomClient,
		classes,
		list,
		setTablesViewOpen,
		setTablesExpanded
	} = props;

	return (
		<div className={classes.root}>
			<Grid
				className={classes.menu}
				container
				wrap='nowrap'
				alignItems='center'
				justifyContent='space-between'
			>
				{/* BUTTON CREATE/CLOSE SESSION */}
				<Grid item>
					{ list.length === 0 ?
						<Button
							color='secondary'
							component='span'
							startIcon={<AddIcon/>}
							variant='contained'
							onClick={async () =>
							{
								await roomClient.createMingleRoomsSession();
								setTablesExpanded(true);
							}}
							aria-label={intl.formatMessage({
								id             : 'mingleRooms.createSession',
								defaultMessage : 'Create Session'
							})}
						>
							<FormattedMessage
								id='mingleRooms.createSession'
								defaultMessage='Create Session'
							/>
						</Button>
						:
						<Button
							color='secondary'
							component='span'
							startIcon={<CloseIcon/>}
							variant='contained'
							onClick={async () =>
							{
								setTablesExpanded(false);
								setTimeout(function()
								{
									roomClient.closeMingleRoomsSession();
								}, 500);
							}}
							aria-label={intl.formatMessage({
								id             : 'mingleRooms.closeSession',
								defaultMessage : 'Close session'
							})}
						>
							<FormattedMessage
								id='mingleRooms.closeSession'
								defaultMessage='Close Session'
							/>
						</Button>
					}
				</Grid>
				{/* /BUTTON CREATE/CLOSE SESSION */}

				{/* BUTTON CLOSE MAP */}
				{/*
				<Grid item>
					<Button
						color='secondary'
						component='span'
						disabled={list.length < 1}
						startIcon={<AccountTreeIcon/>}
						variant='contained'
						onClick={() => setTablesViewOpen(true)}
						aria-label={intl.formatMessage({
							id             : 'mingleRooms.map',
							defaultMessage : 'Map'
						})}
					>
						<FormattedMessage
							id='mingleRooms.map'
							defaultMessage='Map'
						/>
					</Button>
				</Grid>
				*/}
				{/* /BUTTON CLOSE MAP */}
			</Grid>
		</div>
	);
};

Menu.propTypes =
{
	roomClient        : PropTypes.any.isRequired,
	classes           : PropTypes.object.isRequired,
	list              : PropTypes.object.isRequired,
	tablesExpanded    : PropTypes.bool.isRequired,
	setTablesViewOpen : PropTypes.func.isRequired,
	setTablesExpanded : PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	list : state.mingleRooms.list
});

const mapDispatchToProps = (dispatch) =>
	({
		setTablesViewOpen : (flag) =>
		{
			dispatch(mingleRoomsActions.setTablesViewOpen(flag));
		},
		setTablesExpanded : (flag) =>
		{
			dispatch(mingleRoomsActions.setTablesExpanded(flag));
		}

	});

export default withRoomContext(connect(
	mapStateToProps,
	mapDispatchToProps,
	null,
	{
		areStatesEqual : (next, prev) =>
		{
			return (
				prev.mingleRooms.list === next.mingleRooms.list &&
				prev.mingleRooms.tablesExpanded === next.mingleRooms.tablesExpanded
			);
		}
	}
)(withStyles(styles)(Menu)));