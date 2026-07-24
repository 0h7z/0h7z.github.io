#	HTTP 响应状态码
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

##	参见	{#see-also}
<https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Reference/Status>

