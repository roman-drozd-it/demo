import React from 'react';
import { connect } from 'react-redux';
import {
	participantListSelector,
	makePermissionSelector
} from '../../../store/selectors';
import { permissions } from '../../../permissions';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Flipper, Flipped } from 'react-flip-toolkit';
import { FormattedMessage } from 'react-intl';
import ListPeer from './ListPeer';
import ListMe from './ListMe';
import ListModerator from './ListModerator';
import Volume from '../../Containers/Volume';
import VodPanel from './Vod/Panel';

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

class ParticipantList extends React.PureComponent
{
	componentDidMount()
	{
		this.node.scrollTop = this.node.scrollHeight;
	}

	getSnapshotBeforeUpdate()
	{
		return this.node.scrollTop
			+ this.node.offsetHeight === this.node.scrollHeight;
	}

	componentDidUpdate(prevProps, prevState, shouldScroll)
	{
		if (shouldScroll)
		{
			this.node.scrollTop = this.node.scrollHeight;
		}
	}

	render()
	{
		const {
			advancedMode,
			isModerator,
			isPresenter,
			isVodEnabled,
			participants,
			spotlights,
			selectedPeers,
			classes
		} = this.props;

		return (
			<div className={classes.root} ref={(node) => { this.node = node; }}>
				{ !isModerator &&
					<ul className={classes.list}>
						<li className={classes.listheader}>
							<FormattedMessage
								id='room.moderatoractions'
								defaultMessage='Moderator actions'
							/>
						</li>
						<ListModerator />
					</ul>
				}
				{isPresenter && isVodEnabled &&
				<ul className={classes.list}>
					<li className={classes.listheader}>
						<FormattedMessage
							id='vod.vod'
							defaultMessage='Vod'
						/>
					</li>
					<VodPanel />
				</ul>
				}

				<ul className={classes.list}>
					<li className={classes.listheader}>
						<FormattedMessage
							id='room.me'
							defaultMessage='Me'
						/>
					</li>
					<ListMe />
				</ul>
				<ul className={classes.list}>
					<li className={classes.listheader}>
						<FormattedMessage
							id='label.participants'
							defaultMessage='Participants'
						/>
					</li>
					<Flipper
						flipKey={participants}
					>
						{ participants.map((peer) => (
							<Flipped key={peer.id} flipId={peer.id}>
								<li
									key={peer.id}
									className={classnames(classes.listItem)}
								>
									<ListPeer
										id={peer.id}
										advancedMode={advancedMode}
										isModerator={isModerator}
										spotlight={spotlights.includes(peer.id)}
										isSelected={selectedPeers.includes(peer.id)}
									>
										<Volume small id={peer.id} />
									</ListPeer>
								</li>
							</Flipped>
						))}
					</Flipper>
				</ul>
			</div>
		);
	}
}

ParticipantList.propTypes =
{
	advancedMode  : PropTypes.bool,
	isModerator   : PropTypes.bool.isRequired,
	isPresenter   : PropTypes.bool.isRequired,
	participants  : PropTypes.array.isRequired,
	spotlights    : PropTypes.array.isRequired,
	selectedPeers : PropTypes.array.isRequired,
	classes       : PropTypes.object.isRequired,
	isVodEnabled  : PropTypes.bool.isRequired
};

const makeMapStateToProps = () =>
{
	const hasModeratorPerm = makePermissionSelector(permissions.MODERATE_ROOM);

	const hasPresenterPerm = makePermissionSelector(permissions.SHARE_VOD);

	const mapStateToProps = (state) =>
	{
		return {
			isModerator   : hasModeratorPerm(state),
			isPresenter   : hasPresenterPerm(state),
			participants  : participantListSelector(state),
			spotlights    : state.room.spotlights,
			selectedPeers : state.room.selectedPeers,
			isVodEnabled  : state.vod.enabled
		};
	};

	return mapStateToProps;
};

const ParticipantListContainer = connect(
	makeMapStateToProps,
	null,
	null,
	{
		areStatesEqual : (next, prev) =>
		{
			return (
				prev.room.spotlights === next.room.spotlights &&
				prev.room.selectedPeers === next.room.selectedPeers &&
				prev.me.roles === next.me.roles &&
				prev.peers === next.peers &&
				prev.vod === next.vod
			);
		}
	}
)(withStyles(styles)(ParticipantList));

export default ParticipantListContainer;
