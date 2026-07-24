#	HTTP response status codes
<script setup lang="ts">
	import HTTP from "/000.md.vue"
</script>

##	1xx: Informational
<HTTP :r="/^1/" />

##	2xx: Success
<HTTP :r="/^2/" />

##	3xx: Redirection
<HTTP :r="/^3/" />

##	4xx: Client Error
<HTTP :r="/^4/" />

##	5xx: Server Error
<HTTP :r="/^5/" />

##	See also
<https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status>

