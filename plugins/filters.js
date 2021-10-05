import Vue from 'vue'
import moment from 'moment-timezone'

Vue.filter('dateFormat', function(date) {
    date = date + ' UTC'
    let tz = moment.tz.guess()
    let d = moment(date).tz(tz).format('MMM DD, YYYY')
    let t = moment(date).tz(tz).format('hh:mm a')

    return `${d} at ${t}`
})


