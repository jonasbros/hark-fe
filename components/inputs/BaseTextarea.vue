<template>
    <v-textarea        
        outlined
        :color="color"
        :label="label"
        :no-resize="true"
        :value="value"
        @input="updateValue"
        @blur="$v.value.$touch()"
        :error-messages="textAreaErrors"
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
        updateValue(value) {
            this.$emit('input', value)
        },
        undirty() {
            console.log('hehe')
            this.$v.value.$reset()
        }
    }
}
</script>

<style>

</style>