<template>
    <v-textarea 
        class="hark__base-textarea"     
        outlined
        :auto-grow="true"
        :color="color"
        :label="label"
        :no-resize="true"
        :value="value"
        :rows="rows"
        :error-messages="textAreaErrors"
        @blur="undirty"
        @input="updateValue"
        @keydown.enter.exact.prevent="$emit('BaseTextAreaSubmit')"
        @keydown.shift.enter.exact.prevent="shiftEnterEvent"
        @click="getCursorPos"
    ></v-textarea> 
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'

export default {
    mixins: [validationMixin],
    props: {
        value: {
            default: ''
        },
        errorMessage: {
            type: String,
            default: 'This input is required'
        },
        color: {
            type: String,
            default: 'primary',
            required: false
        },
        label: {
            type: String,
           default: 'Base Textarea',
            required: false
        }, 
        rows: {
            type: String | Number,
            default: 5,
            required: false
        }, 
    },
    validations: {
      value: { required, maxLength: maxLength(63206) },
    },
    computed: {
        textAreaErrors () {
            const errors = []
            if (!this.$v.value.$dirty) return errors
            !this.$v.value.maxLength && errors.push('You went over the maximum character limit.')
            !this.$v.value.required && errors.push(this.errorMessage)
            return errors
        }
    },
    methods: {
        shiftEnterEvent() {
            this.$emit('BaseTextAreaNewLine')
            this.undirty()
        },
        updateValue(value) {
            this.$emit('input', value)
        },
        undirty() {
            this.$v.value.$reset()
        },

        blur() {
            document.querySelector('.hark__base-textarea textarea').blur()
        },
        
        getCursorPos(e) {
            this.$emit('setPostCursorPosition', e.target.selectionStart)
        }
    }
}
</script>

<style>

</style>