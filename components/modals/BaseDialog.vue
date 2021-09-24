<template>
    <v-dialog
        content-class="base-dialog"
        v-model="dialog"
        width="500"
        v-click-outside="{ handler: clickedOutside, include: newPostIncluded }"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                id="dialog-activator"
                class="lighten-1 mb-10"
                color="dark_grey"
                width="100%"
                :ripple="false"
                dark
                v-bind="attrs"
                v-on="on"
            >
                <slot name="btnlabel"></slot>
            </v-btn>
        </template> 

      <v-card>
        <v-card-title class="text-h5 accent secondary--text font-weight-bold">
            <slot name="title"></slot>
        </v-card-title>
        
        <div id="dialog-content">
            <slot name="content"></slot>
        </div>

        <v-divider></v-divider>

        <v-card-actions>
            <v-spacer></v-spacer>
            <slot name="actionbtns"></slot>

        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
    data: () => ({
        dialog: false,
    }),
    watch: {
        dialog(nV, oV) {
            if( nV === false ) {
                this.$emit('closedDialog')
            }
        }
    },
    methods: {
        clickedOutside() {
            if( !this.dialog ) return
            this.$emit('clickedOutside')
        },
        newPostIncluded() {
            return [               
                ...document.querySelectorAll('.newpost-included')
            ]
        },
    }
}
</script>

<style lang="scss">
    .base-dialog {
        // overflow: scroll !important;
    }

    #dialog-content {
        position: relative;
        padding: 1em;
    }
</style>