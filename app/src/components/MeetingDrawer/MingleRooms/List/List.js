import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { withRoomContext } from '../../../../RoomContext';
import { useIntl, FormattedMessage } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TelegramIcon from '@material-ui/icons/Telegram';
import PersonIcon from '@material-ui/icons/Person';
import Chip from '@material-ui/core/Chip';
import Badge from '@material-ui/core/Badge';
import PeopleIcon from '@material-ui/icons/People';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
	root : {
		margin    : theme.spacing(0),
		marginTop : theme.spacing(1)
	},

	item :
	{
		margin          : theme.spacing(0),
		marginTop       : theme.spacing(1),
		marginRight     : theme.spacing(1),
		padding         : theme.spacing(1),
		backgroundColor : '#f1f1f1'
		// minWidth        : 0
	},
	name :
	{
		margin : theme.spacing(1, 1, 0, 0)
	}
});

const PeersNumber = (props) =>
{
	const { count } = props;

	const StyledBadge = withStyles((theme) => ({
		badge : {
			right   : -3,
			top     : 12,
			border  : `2px solid ${theme.palette.background.paper}`,
			padding : '0 4px'
		}
	}))(Badge);

	return (
		<StyledBadge badgeContent={count} color='secondary'>
			<PeopleIcon />
		</StyledBadge>
	);
};

const List = (props) =>
{
	const intl = useIntl();

	const {
		roomClient,
		classes,
		list
	} = props;

	return (
		//  TABLES
		<Grid container className={classes.root}>
			{
				list.map((table, i) =>
				{
					/* TABLE */
					return (
						<Grid container item key={i} className={classes.item} >
							{/* HEADER */}
							<Grid container item
								justify='space-between'
								alignItems='center'
							>
								<Grid item container style={{
									flexBasis      : '85px',
									justifyContent : 'space-between'
								}}
								>
									{/* TABLE NAME */}
									<Typography style={{ fontWeight: 'bold' }}>
										<FormattedMessage
											id='mingleRooms.table'
											defaultMessage='Table'
										/> {i+1}
									</Typography>
									{/* /TABLE NAME */}

									{/* PEERS NUMBER */}
									<PeersNumber count={table.users.length}/>
									{/* /PEERS NUMBER */}
								</Grid>
								<Grid item>
									{/* JOIN BUTTON */}
									<Button
										variant='contained'
										color='primary'
										size='small'
										className={classes.button}
										endIcon={<TelegramIcon />}
										href={table.url}
										onClick={() => roomClient.joinToMingleRoom(table.name, table.hash)}
										aria-label={intl.formatMessage({
											id             : 'mingleRooms.join',
											defaultMessage : 'Join'
										})}
									>
										<FormattedMessage
											id='mingleRooms.join'
											defaultMessage='Join'
										/>
									</Button>
									{/* /JOIN BUTTON */}
								</Grid>
							</Grid>
							{/* /HEADER */}

							{/* BODY */}
							<Grid constainer item>
								{/* PEERS */}
								{ table.users.map((user) => (
									<Chip
										key={user.id}
										className={classes.name}
										icon={<PersonIcon/>}
										label={user.name}
									/>
								))}
								{/* /PEERS */}
							</Grid>
							{/* /BODY */}
						</Grid>

					);

					/* /TABLE */
				})
			}
		</Grid>
		//  /TABLES

	);
};

List.propTypes = {
	classes    : PropTypes.object.isRequired,
	roomClient : PropTypes.any.isRequired,
	list       : PropTypes.array.isRequired

};

const mapStateToProps = (state) => ({
	list : state.mingleRooms.list
});

export default withRoomContext(connect(
	mapStateToProps,
	null,
	null,
	{
		areStatesEqual : (next, prev) =>
		{
			return (
				prev.mingleRooms === next.mingleRooms &&
				prev.mingleRooms.list === next.mingleRooms.list
			);
		}
	}
)(withStyles(styles)(List)));
