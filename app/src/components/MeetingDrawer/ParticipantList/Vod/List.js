import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { withRoomContext } from '../../../../RoomContext';
import { useIntl } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import LinearProgress from '@material-ui/core/LinearProgress';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

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
		backgroundColor : '#f1f1f1',
		minWidth        : 0
	}
});

const List = (props) =>
{

	const intl = useIntl();

	const {
		roomClient,
		classes,
		loadedVideo,
		list,
		me
	} = props;

	return (
		<Grid container className={classes.root}>
			{
				list.map((v, i) =>
				{
					return (
						<Grid
							container
							item
							key={i}
							className={classes.item}
							justifyContent='space-between'
							alignItems='center'
						>
							<Grid
								xs
								style={{
									textOverflow : 'ellipsis',
									overflow     : 'hidden',
									whiteSpace   : 'nowrap'
								}}
							>
								<Tooltip
									title={v.name}
									enterDelay={1000}
								>
									<Typography 	style={{
										textOverflow : 'ellipsis',
										overflow     : 'hidden',
										whiteSpace   : 'nowrap'
									}}
									>{v.name}</Typography>
								</Tooltip>

								{(v.addingProgress < 100) &&
								<LinearProgress
									color='secondary'
									variant='determinate'
									value={v.addingProgress}
								/>
								}
							</Grid>
							{(
								!loadedVideo.isPlaying ||
								loadedVideo.peerId !== me.id ||
								loadedVideo.url !== v.url
							) ?
								<Grid item>
									{/* Button play */}
									<IconButton
										aria-label={intl.formatMessage({
											id             : 'vod.play',
											defaultMessage : 'Play'
										})}
										variant='contained'
										color='secondary'
										size='small'
										disabled={
											loadedVideo.peerId !== me.id ||
											(
												loadedVideo.peerId === me.id &&
												loadedVideo.url !== v.url
											)
										}
										onClick={() => roomClient.updateVod('0', 'play')}
									>
										<PlayArrowIcon/>
									</IconButton>
									{/* /Button play */}
								</Grid>
								:
								<Grid item>
									{/* Button pause */}
									<IconButton
										aria-label={intl.formatMessage({
											id             : 'vod.pause',
											defaultMessage : 'Pause'
										})}
										variant='contained'
										color='secondary'
										size='small'
										disabled={
											loadedVideo.peerId !== me.id ||
											(
												loadedVideo.peerId === me.id &&
												loadedVideo.url !== v.url
											)
										}
										onClick={() => roomClient.updateVod('0', 'pause')}
									>
										<PauseIcon/>
									</IconButton>
									{/* /Button pause */}
								</Grid>
							}

							<Grid item>
								{/* Button load */}
								<IconButton
									aria-label={intl.formatMessage({
										id             : 'vod.load',
										defaultMessage : 'Load'
									})}
									variant='contained'
									color='secondary'
									disabled={
										(loadedVideo.isLoaded &&
										(
											loadedVideo.peerId === me.id &&
											loadedVideo.url === v.url
										)) ||
										(v.addingProgress > 0 && v.addingProgress < 100)
									}
									size='small'
									// disabled={!isEnabled || left === '00:00:00'}
									onClick={() => roomClient.loadVod(v)}
								>
									<AutorenewIcon/>
								</IconButton>
								{/* /Button load */}
							</Grid>

							<Grid item>
								<IconButton
									aria-label={intl.formatMessage({
										id             : 'vod.remove',
										defaultMessage : 'Remove'
									})}
									variant='contained'
									color='secondary'
									size='small'
									disabled={
										(loadedVideo.isLoaded &&
										(
											loadedVideo.peerId === me.id &&
											loadedVideo.url === v.url
										)) ||
										(v.addingProgress > 0 && v.addingProgress < 100)
									}
									onClick={() =>
									{
										roomClient.removeVodFile(v.name, v.hash);
									}}
								>
									<HighlightOffIcon/>
								</IconButton>
							</Grid>
						</Grid>
					);
				})
			}
		</Grid>

	);
};

List.propTypes = {
	classes     : PropTypes.object.isRequired,
	roomClient  : PropTypes.any.isRequired,
	loadedVideo : PropTypes.object.isRequired,
	list        : PropTypes.array.isRequired,
	me          : PropTypes.object.isRequired

};

const mapStateToProps = (state) => ({
	loadedVideo : state.vod.loadedVideo,
	list        : state.vod.list,
	me          : state.me
});

export default withRoomContext(connect(
	mapStateToProps,
	null,
	null,
	{
		areStatesEqual : (next, prev) =>
		{
			return (
				prev.vod === next.vod &&
				prev.vod.loadedVideo === next.vod.loadedVideo &&
				prev.vod.list === next.vod.list &&
				prev.me === next.me
			);
		}
	}
)(withStyles(styles)(List)));
