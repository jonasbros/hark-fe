<template>
    <div>
        <v-img
          id="hark-profile__cover"
          max-height="240"
          max-width="100%"
          src="/images/hark_default_cover_white.png"
        >

          <UserAvatar
            id="hark-profile__avatar"
            size="164"
            :user="user"
            :inProfile="true"
          />

        </v-img><!-- hark-profile__cover -->

        <div id="hark-profile__header" class="text-center mt-9"> 
          <div>
            <h1 id="profile__name">{{ user.name }}</h1>
            <p id="profile__bio">{{ user.bio }}</p>
          </div>

          <UserProfileNavMenu :user="user"/>
        </div>

      </div>
</template>

<script>
export default {
  props: ['user'],
}

</script>

<style lang="scss">
#hark-profile__cover {
  overflow: inherit;

  .v-image__image {
    border-radius: 5px;
  }
}

#hark-profile__avatar {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 99 !important;
}

#hark-profile__name {
  height: 240px;
  width: 100%;
}

</style>