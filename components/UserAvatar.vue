<template>
    <div>
        <v-avatar 
            v-if="user.profile_picture"
            class="profile"
            color="hark_black"
            :size="size"
        >
            <v-img :src="user.profile_picture"></v-img>
        </v-avatar>

        <v-avatar 
            v-else
            color="primary"
            :size="size"
        >
            <v-img
                :src="`https://avatars.dicebear.com/api/croodles-neutral/${user.display_name}.svg`" 
                :alt="user.display_name"
                v-bind:class="{'avatar-border-in-profile': inProfile}"
             ></v-img>

        </v-avatar>
    </div>         
</template>

<script>
export default {
    props: {
        user: {
            type: Object,
            required: true
        },
        size: {
            type: String,
            default: 64
        },
        inProfile: {
            type: Boolean,
            default: false,
            required: false
        }
    }
}
</script>

<style lang="scss" scoped>
    .v-application .primary {
        color: $hark-white;
    }

    .avatar-border-in-profile {
        border: 8px solid $hark-black;
    }
</style>