import Vue from 'vue'
import moment from 'moment'

Vue.filter('dateFormat', function(date) {
    let d = moment(date).format('MMM DD, YYYY')
    let t = moment(date).format('HH:mm a')
    return `${d} at ${t}`
})


