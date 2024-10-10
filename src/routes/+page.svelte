<script lang="ts">
  import { apiRequest } from "$lib/client/api-fetch-request";

  async function createUserAccountAndUser() {
    try {
      const response = await apiRequest(
        "POST",
        "/users/create-user-account-and-user"
      );

      console.log("createUserAccountAndUser Response:", response);
    }
    catch(err) {
      console.error("createUserAccountAndUser:", err);
    }
  }

  async function getUserAndUserAccount() {
    try {
      const response = await apiRequest(
        "GET",
        "/users/get-user-and-user-account"
      );

      console.log("getUserAndUserAccount Response:", response);
    }
    catch(err) {
      console.error("getUserAndUserAccount:", err);
    }
  }
</script>

<div id="page">

  <h1>Welcome to the Web Development Tutorial with TigerGraph</h1>

  <button on:click={createUserAccountAndUser}>
    Create User In TigerGraph
  </button>

  <br><br>

  <button on:click={getUserAndUserAccount}>
    Get User In TigerGraph
  </button>

  <br><br>

</div>

<style>
  #page {
    font-family: sans-serif;
  }
</style>
