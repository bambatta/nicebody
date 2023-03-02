<template></template>
<script setup>
let router = useRouter();
let tokenCookie = useCookie("access_token");
tokenCookie.value = router.currentRoute.value.query.access_token;
router.push("/");
</script>
