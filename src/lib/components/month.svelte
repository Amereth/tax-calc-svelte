<script lang="ts">
	import { MONTHS } from '$lib/constants/month'
	import type { Payment } from '$lib/server/schemas/payments'
	import { CheckIcon, XIcon, PenIcon } from 'lucide-svelte'

	const { month, payments }: { month: number; payments: Payment[] } = $props()

	const total = $derived(payments.reduce((acc, payment) => acc + payment.sum, 0))

	const totalOriginal = $derived(
		payments.reduce(
			(acc, payment) => {
				if (!payment.originalCurrency) return acc
				acc[payment.originalCurrency] += payment.originalSum || 0
				return acc
			},
			{ EUR: 0, USD: 0 },
		),
	)

	let editedPayment: Payment['id'] | undefined = $state(undefined)
</script>

<div class="collapse border-[1px] border-primary bg-base-200">
	<input type="checkbox" checked={month === 0} class="min-h-[40px]" />
	<div class="text-md collapse-title flex min-h-[40px] justify-between py-2 font-medium">
		<div>{MONTHS[month]}</div>
		<div class="flex gap-8">
			<span>
				{total} &#8372;
			</span>
			<span>/</span>
			<span>
				{totalOriginal.EUR} &#8364;
			</span>
			<span>-</span>
			<span>
				{totalOriginal.USD} $
			</span>
		</div>
	</div>
	<div class="collapse-content flex gap-2">
		<div class="flex-1">
			{#each payments as payment}
				<div class="flex items-center gap-2">
					<div class="text-xl">{payment.sum}</div>
					<button type="button" class="btn btn-outline btn-xs ml-4">
						<PenIcon size="16" onclick={() => (editedPayment = payment.id)} />
					</button>
					<form action="?/delete" method="post">
						<input type="hidden" name="id" value={payment.id} />
						<button type="submit" class="btn btn-outline btn-xs">
							<XIcon size="16" />
						</button>
					</form>
				</div>
			{/each}
		</div>
		<form
			class="flex flex-1 flex-col gap-2"
			method="post"
			action={`?/${editedPayment ? 'update' : 'insert'}`}
		>
			<input name="id" type="hidden" value={editedPayment} />
			<input
				name="sum"
				type="text"
				class="input input-sm input-bordered input-primary block w-full"
				required
				value={editedPayment ? payments.find((payment) => payment.id === editedPayment)?.sum : ''}
			/>
			<input
				name="date"
				type="date"
				class="input input-sm input-bordered input-primary block w-full"
				required
				value={editedPayment ? payments.find((payment) => payment.id === editedPayment)?.date : ''}
			/>
			<input
				name="originalSum"
				type="text"
				class="input input-sm input-bordered input-primary block w-full"
				value={editedPayment
					? payments.find((payment) => payment.id === editedPayment)?.originalSum
					: ''}
			/>
			<select
				name="originalCurrency"
				class="select select-bordered select-sm"
				value={editedPayment
					? payments.find((payment) => payment.id === editedPayment)?.originalCurrency
					: ''}
			>
				<option value="EUR">EUR</option>
				<option value="USD">USD</option>
			</select>
			<div class="flex gap-2">
				<button type="submit" class="btn btn-outline btn-sm ml-auto">
					<CheckIcon size="16" />
				</button>
				<button
					type="reset"
					class="btn btn-outline btn-sm"
					onclick={() => (editedPayment = undefined)}
				>
					<XIcon size="16" />
				</button>
			</div>
		</form>
	</div>
</div>
