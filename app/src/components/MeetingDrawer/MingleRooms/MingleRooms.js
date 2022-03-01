import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
	participantListSelector,
	makePermissionSelector
} from '../../../store/selectors';
import { permissions } from '../../../permissions';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Menu from './Menu/Menu';
import List from './List/List';
import Collapse from '@material-ui/core/Collapse';

const styles = (theme) =>
	({
		root :
		{
			width     : '100%',
			overflowY : 'auto',
			padding   : theme.spacing(1)
		},
		'@global' : {
			'*' : {
				'scrollbar-width' : 'thin'
			},
			'*::-webkit-scrollbar' : {
				width  : '5px',
				height : '5px'
			},
			'*::-webkit-scrollbar-track' : {
				background : 'white'

			},
			'*::-webkit-scrollbar-thumb' : {
				backgroundColor : '#999999'
			}
		},
		list :
		{
			listStyleType   : 'none',
			padding         : theme.spacing(1),
			boxShadow       : '0 2px 5px 2px rgba(0, 0, 0, 0.2)',
			backgroundColor : 'rgba(255, 255, 255, 1)'
		},
		listheader :
		{
			fontWeight : 'bolder'
		},
		listItem :
		{
			width                : '100%',
			overflow             : 'hidden',
			cursor               : 'pointer',
			'&:not(:last-child)' :
			{
				borderBottom : '1px solid #CBCBCB'
			}
		}
	});

const MingleRooms = (props) =>
{
	const {
		isModerator,
		classes,
		list,
		tablesExpanded
	} = props;

	console.log({tablesExpanded}); // eslint-disable-line

	return (
		<div className={classes.root}>
			<ul className={classes.list}>
				<li className={classes.listheader}>
					<FormattedMessage
						id='label.tables'
						defaultMessage='Tables'
					/>
				</li>
				<Menu/>
				<Collapse in={tablesExpanded}>
					<List/>
				</Collapse>

			</ul>
		</div>
	);
};

MingleRooms.propTypes =
{
	isModerator    : PropTypes.bool.isRequired,
	classes        : PropTypes.object.isRequired,
	list           : PropTypes.object.isRequired,
	tablesExpanded : PropTypes.bool.isRequired
};

const makeMapStateToProps = () =>
{
	const hasPermission = makePermissionSelector(permissions.MODERATE_ROOM);

	const mapStateToProps = (state) =>
	{
		return {
			isModerator    : hasPermission(state),
			tablesExpanded : state.mingleRooms.tablesExpanded
		};
	};

	return mapStateToProps;
};

const MingleRoomsContainer = connect(
	makeMapStateToProps,
	null,
	null,
	{
		areStatesEqual : (next, prev) =>
		{
			return (
				prev.me.roles === next.me.roles &&
				prev.mingleRooms.list === next.mingleRooms.list &&
				prev.mingleRooms.tablesExpanded === next.mingleRooms.tablesExpanded
			);
		}
	}
)(withStyles(styles)(MingleRooms));

export default MingleRoomsContainer;
