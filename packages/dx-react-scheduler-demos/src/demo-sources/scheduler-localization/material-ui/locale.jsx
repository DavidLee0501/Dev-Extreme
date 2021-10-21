import * as React from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { ViewState } from '@devexpress/dx-react-scheduler';
import withStyles from '@mui/styles/withStyles';
import {
  Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
  AllDayPanel,
} from '@devexpress/dx-react-scheduler-material-ui';

import { appointments } from '../../../demo-data/appointments';

const allDayLocalizationMessages = {
  'fr-FR': {
    allDay: 'Temps plein',
  },
  'de-GR': {
    allDay: 'Ganztägig',
  },
  'en-US': {
    allDay: 'All Day',
  },
};

const getAllDayMessages = locale => allDayLocalizationMessages[locale];

const styles = theme => ({
  container: {
    display: 'flex',
    marginBottom: theme.spacing(2),
    justifyContent: 'flex-end',
  },
  text: {
    ...theme.typography.h6,
    marginRight: theme.spacing(2),
  },
});

const LocaleSwitcher = withStyles(styles, { name: 'LocaleSwitcher' })(
  ({ onLocaleChange, currentLocale, classes }) => (
    <div className={classes.container}>
      <div className={classes.text}>
        Locale:
      </div>
      <TextField
        select
        variant="standard"
        value={currentLocale}
        onChange={onLocaleChange}
      >
        <MenuItem value="fr-FR">Le français (French)</MenuItem>
        <MenuItem value="de-GR">Deutsch (German)</MenuItem>
        <MenuItem value="en-US">English (United States)</MenuItem>
      </TextField>
    </div>
  ),
);

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: appointments,
      currentDate: '2018-06-27',
      locale: 'fr-FR',
    };

    this.changeLocale = event => this.setState({ locale: event.target.value });
  }

  render() {
    const { data, currentDate, locale } = this.state;

    return (
      <div>
        <LocaleSwitcher
          currentLocale={locale}
          onLocaleChange={this.changeLocale}
        />
        <Paper>
          <Scheduler
            data={data}
            locale={locale}
            height={660}
          >
            <ViewState
              defaultCurrentDate={currentDate}
            />
            <WeekView
              startDayHour={9}
              endDayHour={19}
            />
            <Toolbar />
            <DateNavigator />
            <Appointments />
            <AllDayPanel
              messages={getAllDayMessages(locale)}
            />
          </Scheduler>
        </Paper>
      </div>
    );
  }
}
