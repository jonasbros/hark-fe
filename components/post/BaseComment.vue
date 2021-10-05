<template>
    <article>
        <v-card
            class="mx-auto mb-8"
            max-width="100%"
            elevation="0"
            outlined
        >
            <div class="d-flex align-center">
                <UserAvatar 
                    class="pa-3"
                    size="48"
                    :user="{
                        display_name: comment.display_name,
                        profile_picture: comment.profile_picture
                    }"
                />

                <div class="d-inline-block">
                    <v-card-title class="text--primary font-weight-bold text-subtitle-1 pl-0">
                        {{ comment.display_name }}
                    </v-card-title>

                    <v-card-subtitle v-if="comment.created_at" class="pl-0">
                        {{ comment.created_at | dateFormat }}
                    </v-card-subtitle>
                </div>
            </div>


            <v-card-text class="text--primary text-subtitle-1">
                {{ comment.body }}
            </v-card-text>

            <!-- <v-card-subtitle>
                {{ likes }} likes
            </v-card-subtitle> -->

            <v-divider v-if="$store.state.firebaseAuth.authToken"></v-divider>

            <v-card-actions class="justify-space-around" v-if="$store.state.firebaseAuth.authToken">

                <v-btn
                    :class="{'font-weight-bold': isAuthLiked}"
                    :color="isAuthLiked ? 'primary' : 'secondary'"
                    text
                    plain
                    :ripple="false"
                    @click="likeOrUnlike"
                >
                    Like
                </v-btn>

                <v-btn
                    color="secondary"
                    text
                    plain
                    :ripple="false"            
                    @click="showCommentInput = !showCommentInput"    
                >
                    Reply
                </v-btn>
                
            </v-card-actions>         
        </v-card>
    </article>
</template>

<script>
export default {
    props: {
        comment: {
            type: Object,
            required: true
        }
    },
    data: () => ({
        
    }),
}
</script>

<style>

</style>