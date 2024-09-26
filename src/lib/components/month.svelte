<script lang="ts">
	import { MONTHS } from '$lib/constants/month'
	import { CheckIcon, XIcon, PenIcon } from 'lucide-svelte'

	const { month }: { month: number } = $props()
</script>

<div class="collapse border-[1px] border-primary bg-base-200">
	<input type="checkbox" checked={month === 0} />
	<div class="collapse-title text-xl font-medium">{MONTHS[month]}</div>
	<div class="collapse-content flex gap-2">
		<div class="flex-1">
			<div class="flex items-center gap-2">
				<div class="text-xl">129 928,12</div>
				<button type="button" class="btn btn-outline btn-xs ml-4">
					<PenIcon size="16" />
				</button>
				<button type="button" class="btn btn-outline btn-xs">
					<XIcon size="16" />
				</button>
			</div>
		</div>
		<form class="flex flex-1 flex-col gap-2">
			<input type="text" class="input input-sm input-bordered input-primary block w-full" />
			<input type="date" class="input input-sm input-bordered input-primary block w-full" />
			<div class="flex gap-2">
				<button type="submit" class="btn btn-outline btn-sm ml-auto">
					<CheckIcon size="16" />
				</button>
				<button type="reset" class="btn btn-outline btn-sm">
					<XIcon size="16" />
				</button>
			</div>
		</form>
	</div>
</div>
