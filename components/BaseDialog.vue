<template>
    <v-dialog
        content-class="base-dialog"
        v-model="dialog"
        width="500"
        v-click-outside="{ handler: clickedOutside, include: newPostIncluded }"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                class="lighten-1"
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
        <v-card-title class="text-h5 secondary black--text">
            <slot name="title"></slot>
        </v-card-title>
        
        <div id="dialog-content">
            <slot name="content"></slot>
        </div>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="secondary"
            text
            :ripple="false"
            @click="dialog = false"
          >
            Post
          </v-btn>
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
        dialog(oV, nV) {
            if( nV === false ) {
                this.$emit('closedDialog')
            }
        }
    },
    methods: {
        clickedOutside() {
            this.$emit('clickedOutside')
        },
        newPostIncluded() {
            return [               
                document.querySelectorAll('.newpost-included')[0],
                document.querySelectorAll('.newpost-included')[1],
            ]
        },
    }
}
</script>

<style lang="scss">

</style>