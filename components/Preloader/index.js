import { connect } from 'react-redux';
import useStyles from './styles';

const Preloader = props => {
	const { barHeight, barWidth, bgColor, barColor, loading } = props;
  const classes = useStyles();

	if (loading) {
		return (
      <div className={classes.preloader} 
        style={{ height: barHeight, backgroundColor: barColor }}>
				<div
					className={classes.preloaderUndetermined}
					style={{ width: barWidth, backgroundColor: bgColor }}
				/>
			</div>
		);
	}

	return '';
};

export default connect(state => ({ loading: state.loading }))(Preloader);