<template>
  <div class="hello">
    <h1>LeadHit</h1>
    <form v-if="!isLoggedIn" @submit.prevent="handleSubmit">
      <div class="form-floating mb-3">
        <input
          required
          minlength="24"
          name="siteId"
          type="text"
          class="form-control rounded-3"
          id="siteId"
          placeholder="name@example.com"
        />
        <label for="siteId">ID сайта</label>
      </div>
      <button class="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">
        Войти
      </button>
    </form>
    <div v-else class="btn-wrapper">
      <button
        @click="logOut"
        class="w-100 mb-2 btn btn-lg rounded-3 btn-primary"
      >
        Выйти
      </button>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import store from "@/store";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  computed: {
    isLoggedIn() {
      return store.state.isLoggedIn;
    },
  },
  methods: {
    logOut() {
      this.$store.commit("logOut");
    },
    async handleSubmit(e) {
      const form = new FormData(e.target);
      const formData = Object.fromEntries(form.entries());
      let data;
      try {
        const res = await fetch(
          "https://track-api.leadhit.io/client/test_auth",
          {
            headers: {
              "Api-Key": `${formData.siteId}:eEZn8u05G3bzRpdL7RiHCvrYAYo`,
              "Leadhit-Site-Id": formData.siteId,
            },
          }
        );

        if (res.status !== 200) {
          throw new Error("Error");
        }
        data = await res.json();

        if (data.message === "ok") {
          this.$store.commit("logIn", formData.siteId);
          router.push("/analytics");
        }
      } catch (error) {
        console.error(error);
      } finally {
        e.target.reset();
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
form,
.btn-wrapper {
  width: 600px;
  margin: 0 auto;
}
</style>
