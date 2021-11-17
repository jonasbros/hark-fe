import Vue from 'vue'
import moment from 'moment-timezone'

Vue.filter('dateFormat', function(date) {
    // date = date.slice(0, -1) + ' UTC'
    let now = moment()
    let tz = moment.tz.guess()

    if( now.diff(date, 'days') >= 2 ) {
        return moment(date).tz(tz).format('MMM DD, YYYY [at] hh:mm a')
    }
    
    return moment(date).tz(tz).fromNow()
})

Vue.filter('dateFormatFromNow', function(date) {
    // date = date + ' UTC'
    let tz = moment.tz.guess()

    return moment(date).tz(tz).fromNow()
})


